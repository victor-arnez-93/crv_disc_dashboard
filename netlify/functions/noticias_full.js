// ============================================================================
// CRV DISC — API NOTÍCIAS FULL (VERSÃO FINAL, LIMPA E OTIMIZADA)
// Classificação automática inteligente (títulos + resumos + conteúdos)
// Categorias padronizadas: disc, lideranca, tendencias, gestao, tecnologia, cultura
// Fontes: Você RH, Startups, MIT Sloan (Liderança + Gestão de Pessoas)
// Cache 6h
// ============================================================================

import Parser from "rss-parser";

const parser = new Parser({
  headers: { "User-Agent": "CRV-DISC-Dashboard" },
  timeout: 20000
});

// ============================================================================
// FONTES DEFINITIVAS
// ============================================================================
const FEEDS = [
  {
    url: "https://vocerh.abril.com.br/feed/",
    prioridade: 1,
    fonte: "Você RH"
  },
  {
    url: "https://startups.com.br/feed/",
    prioridade: 2,
    fonte: "Startups"
  },
  {
    url: "https://mitsloanreview.com.br/categoria/lideranca/feed/",
    prioridade: 3,
    fonte: "MIT Sloan – Liderança"
  },
  {
    url: "https://mitsloanreview.com.br/categoria/gestao-de-pessoas/feed/",
    prioridade: 3,
    fonte: "MIT Sloan – Gestão de Pessoas"
  }
];

// ============================================================================
// CACHE – 6 HORAS
// ============================================================================
let CACHE = null;
let CACHE_TIME = 0;
const TTL = 6 * 60 * 60 * 1000;

// ============================================================================
// Funções utilitárias
// ============================================================================
function limparTexto(str = "") {
  return str.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function resumoCurto(txt) {
  txt = limparTexto(txt);
  return txt.length > 200 ? txt.slice(0, 200) + "…" : txt;
}

function extrairImagem(item) {
  if (item.enclosure?.url) return item.enclosure.url;

  const regex = /<img[^>]+src="([^">]+)"/i;
  const src = (item["content:encoded"] || item.content || "").match(regex);
  return src ? src[1] : null;
}

// ============================================================================
// CLASSIFICAÇÃO AUTOMÁTICA INTELIGENTE (OPÇÃO A)
// ============================================================================
function categorizarAutomatico(titulo, resumo, fonte) {
  const txt = (titulo + " " + resumo).toLowerCase();

  // DISC
  if (txt.includes("disc") || txt.includes("comportamento") || txt.includes("perfil")) {
    return "disc";
  }

  // Liderança
  if (
    txt.includes("liderança") ||
    txt.includes("lideranca") ||
    txt.includes("líder") ||
    txt.includes("lider")
  ) {
    return "lideranca";
  }

  // Gestão
  if (txt.includes("gestão") || txt.includes("gestao") || txt.includes("processos")) {
    return "gestao";
  }

  // Tendências
  if (
    txt.includes("tendência") ||
    txt.includes("tendencias") ||
    txt.includes("tendência") ||
    txt.includes("mercado")
  ) {
    return "tendencias";
  }

  // Tecnologia
  if (
    txt.includes("ia") ||
    txt.includes("inteligência artificial") ||
    txt.includes("tecnologia") ||
    txt.includes("digital") ||
    txt.includes("inovação")
  ) {
    return "tecnologia";
  }

  // Cultura
  if (
    txt.includes("cultura") ||
    txt.includes("engajamento") ||
    txt.includes("ambiente") ||
    txt.includes("comunicação")
  ) {
    return "cultura";
  }

  // fallback por fonte
  if (fonte.includes("MIT")) return "lideranca";
  if (fonte.includes("Startups")) return "tecnologia";
  if (fonte.includes("Você RH")) return "gestao";

  return "tendencias";
}

// ============================================================================
// Coleta e processamento
// ============================================================================
async function coletarNoticias() {
  let todas = [];

  for (const feed of FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);
      const itens = (data.items || []).slice(0, 10);

      itens.forEach((item) => {
        const titulo = limparTexto(item.title);
        const resumo = resumoCurto(
          item.contentSnippet || item.content || item["content:encoded"] || ""
        );
        const textoCompleto = limparTexto(
          item["content:encoded"] || item.content || item.summary || ""
        );

        todas.push({
          titulo,
          resumo,
          textoCompleto,
          categoria: categorizarAutomatico(titulo, resumo, feed.fonte),
          fonte: feed.fonte,
          prioridade: feed.prioridade,
          link: item.link,
          imagem: extrairImagem(item),
          data: item.pubDate ? new Date(item.pubDate) : new Date(0)
        });
      });
    } catch (e) {
      console.error("Erro ao ler feed:", feed.url, e.message);
    }
  }

  // Ordenar: data DESC + prioridade
  todas.sort((a, b) => {
    if (b.data - a.data !== 0) return b.data - a.data;
    return a.prioridade - b.prioridade;
  });

  return todas.filter((n) => n.titulo && n.resumo).slice(0, 10);
}

// ============================================================================
// HANDLER FINAL
// ============================================================================
export default async function handler(req, res) {
  const agora = Date.now();

  // cache válido
  if (CACHE && agora - CACHE_TIME < TTL) {
    return res.status(200).json({
      atualizado: new Date(),
      noticias: CACHE
    });
  }

  try {
    const noticias = await coletarNoticias();

    CACHE = noticias;
    CACHE_TIME = agora;

    return res.status(200).json({
      atualizado: new Date(),
      noticias
    });
  } catch (e) {
    console.error("ERRO CRÍTICO /api/noticias_full:", e);

    return res.status(200).json({
      atualizado: new Date(),
      noticias: CACHE.slice(0, 2)
    });
  }
}
