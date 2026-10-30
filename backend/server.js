import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import Parser from "rss-parser";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = new Set([
    'https://discprofpaulorocha.com', 'https://www.discprofpaulorocha.com',
    'https://dashboard.discprofpaulorocha.com',
    'https://crv-disc-dashboard.onrender.com',
    'https://victor-arnez-93.github.io',
    ...(process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
]);
app.use(cors({
    origin(origin, callback) {
        const local = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');
        callback(null, !origin || local || allowedOrigins.has(origin));
    }
}));

app.use(express.json({ limit: "32kb" }));

// Health check
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================
// MODELOS COM FALLBACK AUTOMÁTICO
// ============================================================
// GPT-OSS 20B fica como principal por estar no catálogo atual da Groq
// e ter boa relação entre qualidade, velocidade e limite de uso.
const MODELOS = [
  { id: "openai/gpt-oss-20b",       nome: "GPT-OSS 20B" },
  { id: "llama-3.1-8b-instant",     nome: "Llama 3.1 8B" },
  { id: "llama-3.3-70b-versatile",  nome: "Llama 3.3 70B" }
];

// ============================================================
// PROMPT DO SISTEMA
// ============================================================
const SYSTEM_PROMPT = `Você é o Assistente DISC IA, integrado ao DISC Dashboard desenvolvido para o Prof. Paulo Rubens da CRV Soluções em TI.

Sua personalidade:
- Inteligente, direto e acolhedor — como um consultor sênior de RH que também sabe conversar
- Usa linguagem acessível, mas com embasamento técnico quando necessário
- É proativo: sugere aplicações práticas, dá exemplos reais, propõe ideias para o dashboard
- Tem senso de humor leve quando apropriado, mas mantém profissionalismo

Seu foco principal:
- Metodologia DISC (perfis D, I, S, C) — análise, aplicação e interpretação
- Gestão de Pessoas e RH — liderança, clima, cultura, recrutamento, feedback, conflitos
- Desenvolvimento humano e organizacional
- Psicologia comportamental aplicada ao trabalho
- Dados e fatos embasados sobre gestão, produtividade e comportamento humano

Você PODE e DEVE:
- Responder perguntas fora do tema com naturalidade, mas sempre trazer de volta ao contexto do dashboard
- Dar ideias novas de funcionalidades, frases ou insights para o DISC Dashboard
- Citar estudos, dados e fatos reais sobre RH e gestão comportamental
- Ajudar o professor a criar conteúdo didático sobre DISC
- Analisar situações reais de equipe descritas pelo usuário
- Ser criativo nas respostas — não apenas responder, mas enriquecer

Quando o assunto fugir do contexto:
- Responda brevemente e redirecione com elegância, não com bloqueio

Formato das respostas:
- Use **negrito** para destacar termos importantes
- Quebre em parágrafos curtos para facilitar leitura no chat
- Respostas entre 3-6 parágrafos
- Quando der listas, use marcadores simples

Rigor das respostas:
- Não invente autores, títulos, citações literais, percentuais ou links.
- Quando não houver uma referência verificável, explique a ideia sem atribuição inventada.
- Cenários criados por você são exemplos fictícios, não resultados comprovados.
- DISC descreve tendências, não diagnóstico clínico, competência técnica ou destino individual.
- Não recomende selecionar ou excluir candidatos apenas por estilos DISC.
- Inclua SWOT, Cinco Forças de Porter, BCG e Ansoff quando pertinente à gestão.
Idioma: sempre português brasileiro.`;

// ============================================================
// FUNÇÃO DE CHAMADA COM FALLBACK
// ============================================================
async function chamarGroq(messages) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY não configurada no ambiente.");
    return { erro: true, status: 500, codigo: "missing_api_key" };
  }

  for (let i = 0; i < MODELOS.length; i++) {
    const modelo = MODELOS[i];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelo.id,
          messages,
          temperature: 0.75,
          max_completion_tokens: 1024
        }),
        signal: controller.signal
      });

      const raw = await response.text();
      let data = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = { erro_raw: raw.substring(0, 500) };
      }

      if (!response.ok) {
        const code = data?.error?.code || data?.error?.type || "";
        const mensagemErro = data?.error?.message || "Erro sem mensagem retornada pela Groq";

        console.warn(
          `Groq falhou em ${modelo.nome}: HTTP ${response.status} | ${code} | ${mensagemErro}`
        );

        // Erros ligados a modelo, permissão/cota, capacidade ou indisponibilidade
        // tentam automaticamente o próximo modelo disponível.
        const podeTentarFallback =
          [403, 404, 408, 409, 429, 498, 500, 502, 503, 504].includes(response.status) ||
          [
            "rate_limit_exceeded",
            "model_decommissioned",
            "model_not_found",
            "model_not_allowed",
            "permission_denied",
            "capacity_exceeded",
            "server_error"
          ].includes(code);

        if (podeTentarFallback && i < MODELOS.length - 1) {
          continue;
        }

        return {
          erro: true,
          status: response.status,
          codigo: code || "groq_error"
        };
      }

      const resposta = data?.choices?.[0]?.message?.content;

      if (!resposta) {
        console.warn(`Resposta vazia recebida de ${modelo.nome}.`);
        if (i < MODELOS.length - 1) continue;
        return { erro: true, status: 502, codigo: "empty_response" };
      }

      return {
        resposta,
        modelo: modelo.nome,
        isFallback: i > 0
      };

    } catch (err) {
      const foiTimeout = err?.name === "AbortError";
      console.error(
        `${foiTimeout ? "Timeout" : "Erro"} ao chamar ${modelo.nome}:`,
        err
      );

      if (i < MODELOS.length - 1) continue;
      return {
        erro: true,
        status: foiTimeout ? 504 : 502,
        codigo: foiTimeout ? "timeout" : "network_error"
      };

    } finally {
      clearTimeout(timeout);
    }
  }

  return { erro: true, status: 502, codigo: "all_models_failed" };
}



// ============================================================
// NOTÍCIAS — MIT SLOAN MANAGEMENT REVIEW BRASIL
// ============================================================
// O feed /feed/ do site deixou de existir (404). Para não depender do
// RSS2JSON nesse caso, o próprio backend consulta o site e devolve os dados
// no mesmo formato de "items" esperado pelo frontend.
const MIT_SLOAN_BASE = "https://mitsloanreview.com.br";

function limparTextoHtml(valor = "") {
  return String(valor)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchComTimeout(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CRV-DISC-Dashboard/1.0)",
        "Accept": "application/json,text/html,application/xhtml+xml"
      },
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

function atributoHtml(tag, nome) {
  const regex = new RegExp(`${nome}=["']([^"']*)["']`, "i");
  return tag.match(regex)?.[1] || "";
}

function obterMetaHtml(html, chave) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];

  for (const meta of metas) {
    const identificador = atributoHtml(meta, "property") || atributoHtml(meta, "name");
    if (identificador.toLowerCase() === chave.toLowerCase()) {
      return limparTextoHtml(atributoHtml(meta, "content"));
    }
  }

  return "";
}

async function buscarMitViaWordPress() {
  const url = `${MIT_SLOAN_BASE}/wp-json/wp/v2/posts?per_page=6&_embed=1`;
  const response = await fetchComTimeout(url);

  if (!response.ok) {
    throw new Error(`WordPress REST retornou HTTP ${response.status}`);
  }

  const posts = await response.json();
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error("WordPress REST retornou lista vazia");
  }

  return posts.map(post => {
    const media = post?._embedded?.["wp:featuredmedia"]?.[0];

    return {
      title: limparTextoHtml(post?.title?.rendered || ""),
      description: limparTextoHtml(post?.excerpt?.rendered || ""),
      content: post?.content?.rendered || post?.excerpt?.rendered || "",
      pubDate: post?.date || post?.date_gmt || new Date().toISOString(),
      thumbnail: media?.source_url || "",
      link: post?.link || ""
    };
  }).filter(item => item.title && item.link);
}

function extrairLinksArtigos(html) {
  const matches = [...html.matchAll(/href=["']([^"']+)["']/gi)];
  const vistos = new Set();
  const links = [];
  const ignorar = [
    "/wp-", "/produto", "/categoria", "/category", "/tag/", "/author/", "/autor/",
    "/planos", "/faq", "/podcast", "/review", "/edicoes", "/login", "/minha-conta",
    "/newsletter", "/sobre", "/contato", "/pesquisa", "/search"
  ];

  for (const match of matches) {
    try {
      const url = new URL(match[1], MIT_SLOAN_BASE);
      if (url.origin !== MIT_SLOAN_BASE) continue;

      const path = url.pathname.replace(/\/+$/, "");
      if (!path || path === "") continue;
      if (ignorar.some(prefixo => path.toLowerCase().startsWith(prefixo))) continue;

      // Artigos do portal ficam majoritariamente na raiz: /slug-do-artigo/
      const partes = path.split("/").filter(Boolean);
      if (partes.length !== 1) continue;

      const canonica = `${MIT_SLOAN_BASE}/${partes[0]}/`;
      if (!vistos.has(canonica)) {
        vistos.add(canonica);
        links.push(canonica);
      }
    } catch {
      // Ignora href inválido.
    }
  }

  return links;
}

async function buscarMitViaPagina() {
  const homeResponse = await fetchComTimeout(`${MIT_SLOAN_BASE}/`);
  if (!homeResponse.ok) {
    throw new Error(`Home MIT Sloan retornou HTTP ${homeResponse.status}`);
  }

  const homeHtml = await homeResponse.text();
  const candidatos = extrairLinksArtigos(homeHtml).slice(0, 12);
  const artigos = [];

  for (const link of candidatos) {
    if (artigos.length >= 6) break;

    try {
      const response = await fetchComTimeout(link, 10000);
      if (!response.ok) continue;

      const html = await response.text();
      const tipo = obterMetaHtml(html, "og:type");
      const titulo = obterMetaHtml(html, "og:title");
      const descricao = obterMetaHtml(html, "og:description");
      const imagem = obterMetaHtml(html, "og:image");
      const data = obterMetaHtml(html, "article:published_time");
      const canonical = obterMetaHtml(html, "og:url") || link;

      if (!titulo || (tipo && tipo !== "article") || !data) continue;

      artigos.push({
        title: titulo.replace(/\s*[-–|]\s*MIT Sloan Management Review Brasil\s*$/i, "").trim(),
        description: descricao,
        content: descricao,
        pubDate: data,
        thumbnail: imagem,
        link: canonical
      });
    } catch (err) {
      console.warn("Falha ao ler artigo MIT Sloan:", link, err?.message || err);
    }
  }

  return artigos.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

app.get("/api/noticias-mit", async (req, res) => {
  try {
    let items = [];

    try {
      items = await buscarMitViaWordPress();
    } catch (err) {
      console.warn("MIT Sloan REST indisponível, usando fallback da página:", err?.message || err);
      items = await buscarMitViaPagina();
    }

    if (!items.length) {
      return res.status(502).json({ status: "error", items: [] });
    }

    res.set("Cache-Control", "public, max-age=900");
    return res.json({ status: "ok", items: items.slice(0, 6) });
  } catch (err) {
    console.error("Erro ao buscar notícias MIT Sloan:", err);
    return res.status(502).json({ status: "error", items: [] });
  }
});

// ============================================================
// ROTA DO CHAT
// ============================================================
const rssParser = new Parser({
    customFields: { item: ['content:encoded', 'media:content', 'media:thumbnail'] }
});
const FONTES_NOTICIAS = {
    vocerh: { nome: 'Você RH', feed: 'https://vocerh.abril.com.br/feed/', wp: 'https://vocerh.abril.com.br/wp-json/wp/v2/posts?per_page=6&_embed=1' },
    startups: { nome: 'Startups', feed: 'https://startups.com.br/feed/', wp: 'https://startups.com.br/wp-json/wp/v2/posts?per_page=6&_embed=1' },
    mitsloan: { nome: 'MIT Sloan BR' }
};
const cacheNoticias = new Map();
const pendentesNoticias = new Map();
const CACHE_TTL = 15 * 60 * 1000;
const STALE_TTL = 24 * 60 * 60 * 1000;
function urlPublica(value) {
    try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; }
    catch { return ''; }
}
function normalizarArtigo(item) {
    const link = urlPublica(item.link || '');
    const title = limparTextoHtml(item.title || '');
    const date = new Date(item.pubDate || item.isoDate || '');
    return { title, link, pubDate: Number.isNaN(date.getTime()) ? null : date.toISOString(),
        description: limparTextoHtml(item.description || item.contentSnippet || ''),
        content: String(item['content:encoded'] || item.content || item.description || '').slice(0, 80000),
        thumbnail: urlPublica(item.thumbnail || item.enclosure?.url || item['media:content']?.$?.url || '') };
}
async function lerFonteNoticias(id) {
    const fonte = FONTES_NOTICIAS[id];
    let items;
    if (id === 'mitsloan') {
        try { items = await buscarMitViaWordPress(); }
        catch { items = await buscarMitViaPagina(); }
    } else {
        try {
            const resposta = await fetchComTimeout(fonte.feed);
            if (!resposta.ok) throw new Error(`RSS HTTP ${resposta.status}`);
            const xml = await resposta.text();
            if (xml.length > 3000000) throw new Error('Feed excede limite');
            const feed = await rssParser.parseString(xml);
            items = feed.items;
            if (!items?.length) throw new Error('Feed vazio');
        } catch {
            const resposta = await fetchComTimeout(fonte.wp);
            if (!resposta.ok) throw new Error(`REST HTTP ${resposta.status}`);
            const posts = await resposta.json();
            if (!Array.isArray(posts)) throw new Error('REST inválida');
            items = posts.map(post => ({ title: post.title?.rendered, link: post.link,
                description: post.excerpt?.rendered, content: post.content?.rendered,
                pubDate: post.date_gmt ? post.date_gmt + 'Z' : null,
                thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url }));
        }
    }
    const normalizadas = items.map(normalizarArtigo).filter(item => item.title && item.link).slice(0, 6);
    if (!normalizadas.length) throw new Error('Nenhum artigo válido');
    return normalizadas;
}
async function obterFonteNoticias(id) {
    const cache = cacheNoticias.get(id);
    if (cache && Date.now() - cache.time < CACHE_TTL) return { ...cache, stale: false };
    if (pendentesNoticias.has(id)) return pendentesNoticias.get(id);
    const trabalho = (async () => {
        try {
            const items = await lerFonteNoticias(id);
            const entry = { items, time: Date.now() };
            cacheNoticias.set(id, entry);
            return { ...entry, stale: false };
        } catch (error) {
            if (cache && Date.now() - cache.time < STALE_TTL) return { ...cache, stale: true };
            throw error;
        } finally { pendentesNoticias.delete(id); }
    })();
    pendentesNoticias.set(id, trabalho);
    return trabalho;
}
app.get('/api/noticias/:fonte', async (req, res) => {
    const { fonte } = req.params;
    if (!Object.hasOwn(FONTES_NOTICIAS, fonte)) return res.status(404).json({ erro: 'Fonte desconhecida' });
    try {
        const resultado = await obterFonteNoticias(fonte);
        res.set('Cache-Control', 'public, max-age=300');
        res.json({ status: 'ok', fonte: FONTES_NOTICIAS[fonte].nome,
            items: resultado.items, stale: resultado.stale,
            fetchedAt: new Date(resultado.time).toISOString() });
    } catch {
        res.status(502).json({ status: 'error', items: [], erro: 'Fonte temporariamente indisponível.' });
    }
});

app.post("/api/chat", async (req, res) => {
  const { mensagem, historico = [] } = req.body || {};
  if (typeof mensagem !== 'string' || !mensagem.trim() || mensagem.length > 6000) {
    return res.status(400).json({ erro: 'Envie uma mensagem de até 6000 caracteres.' });
  }
  if (!Array.isArray(historico)) {
    return res.status(400).json({ erro: 'Histórico inválido.' });
  }
  const seguro = historico.slice(-10).filter(item =>
    item && ['user', 'assistant'].includes(item.role) &&
    typeof item.content === 'string' && item.content.length <= 8000
  ).map(item => ({ role: item.role, content: item.content }));
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...seguro,
    { role: 'user', content: mensagem.trim() }
  ];

  const resultado = await chamarGroq(messages);

  if (resultado.erro) {
    const status = resultado.status === 500 ? 500 : 502;
    return res.status(status).json({
      erro: "Erro na API de IA.",
      codigo: resultado.codigo || "groq_error"
    });
  }

  res.json({
    resposta: resultado.resposta,
    modelo: resultado.modelo,
    fallback: resultado.isFallback  // frontend usa isso para mostrar aviso
  });
});

app.listen(PORT, () => {
  console.log(`Servidor CRV DISC rodando na porta ${PORT}`);
});