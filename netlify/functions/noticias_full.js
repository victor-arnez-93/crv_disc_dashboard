// ============================================================================
// CRV DISC — NOTÍCIAS RH (Netlify Functions / CommonJS)
// ============================================================================
const Parser = require("rss-parser");

const parser = new Parser({
  headers: { "User-Agent": "CRV-DISC-Dashboard" },
  timeout: 20000
});

const FEEDS = [
  { url: "https://vocerh.abril.com.br/feed/", prioridade: 1, fonte: "Você RH" },
  { url: "https://startups.com.br/feed/", prioridade: 2, fonte: "Startups" },
  { url: "https://mitsloanreview.com.br/categoria/lideranca/feed/", prioridade: 3, fonte: "MIT Sloan – Liderança" },
  { url: "https://mitsloanreview.com.br/categoria/gestao-de-pessoas/feed/", prioridade: 3, fonte: "MIT Sloan – Gestão de Pessoas" }
];

// CACHE
let CACHE = null;
let CACHE_TIME = 0;
const TTL = 6 * 60 * 60 * 1000;

// ============================================================================
// Utilidades
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

function categorizarAutomatico(titulo, resumo, fonte) {
  const txt = (titulo + " " + resumo).toLowerCase();

  if (txt.includes("disc") || txt.includes("comportamento") || txt.includes("perfil")) return "disc";
  if (txt.includes("liderança") || txt.includes("líder")) return "lideranca";
  if (txt.includes("gestão") || txt.includes("gestao") || txt.includes("processos")) return "gestao";
  if (txt.includes("tendência") || txt.includes("mercado")) return "tendencias";
  if (txt.includes("ia") || txt.includes("inteligência artificial") || txt.includes("tecnologia")) return "tecnologia";
  if (txt.includes("cultura") || txt.includes("engajamento") || txt.includes("comunicação")) return "cultura";

  if (fonte.includes("MIT")) return "lideranca";
  if (fonte.includes("Startups")) return "tecnologia";
  if (fonte.includes("Você RH")) return "gestao";

  return "tendencias";
}

// ============================================================================
// COLETA
// ============================================================================
async function coletarNoticias() {
  let todas = [];

  for (const feed of FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);
      const itens = (data.items || []).slice(0, 10);

      itens.forEach((item) => {
        const titulo = limparTexto(item.title);
        const resumo = resumoCurto(item.contentSnippet || item.content || item["content:encoded"] || "");
        const textoCompleto = limparTexto(item["content:encoded"] || item.content || item.summary || "");

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
    } catch {}
  }

  todas.sort((a, b) => {
    if (b.data - a.data !== 0) return b.data - a.data;
    return a.prioridade - b.prioridade;
  });

  return todas.filter((n) => n.titulo && n.resumo).slice(0, 10);
}

// ============================================================================
// HANDLER
// ============================================================================
exports.handler = async () => {
  const agora = Date.now();

  if (CACHE && agora - CACHE_TIME < TTL) {
    return {
      statusCode: 200,
      body: JSON.stringify({ atualizado: new Date(), noticias: CACHE })
    };
  }

  try {
    const noticias = await coletarNoticias();

    CACHE = noticias;
    CACHE_TIME = agora;

    return {
      statusCode: 200,
      body: JSON.stringify({ atualizado: new Date(), noticias })
    };
  } catch {
    return {
      statusCode: 200,
      body: JSON.stringify({ atualizado: new Date(), noticias: CACHE?.slice(0, 2) || [] })
    };
  }
};
