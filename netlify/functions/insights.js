// ============================================================================
// CRV DISC — INSIGHTS (Netlify Functions / CommonJS)
// Compatível sem alterações na lógica original
// ============================================================================

const Parser = require("rss-parser");

const parser = new Parser({
  timeout: 12000,
  headers: { "User-Agent": "CRV_DISC_Insights" }
});

// FEEDS BR
const FEEDS = [
  { nome: "MIT Sloan Review Brasil", url: "https://www.mitsloanreview.com.br/feed/" },
  { nome: "Exame – Gestão de Pessoas", url: "https://exame.com/noticias-sobre/gestao-de-pessoas/feed/" },
  { nome: "Você RH", url: "https://vocerh.abril.com.br/feed/" },
  { nome: "Endeavor Brasil", url: "https://endeavor.org.br/feed/" },
  { nome: "Sebrae – Liderança", url: "https://sebrae.com.br/sites/PortalSebrae/busca?q=lideranca&format=rss" }
];

// CACHE
let CACHE = null;
let CACHE_TIME = 0;
const TTL = 2 * 60 * 60 * 1000;

// ============================================================================
// Utilidades
// ============================================================================
function limpar(str) {
  return (
    str?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || ""
  );
}

async function coletarInsight(feed) {
  try {
    const rss = await parser.parseURL(feed.url);
    if (!rss.items?.length) return null;

    const item = rss.items[0];

    let texto =
      limpar(item.contentSnippet) ||
      limpar(item.content) ||
      limpar(item["content:encoded"]) ||
      item.title ||
      "";

    if (!texto || texto.length < 40) return null;

    texto = texto.slice(0, 160);

    return {
      texto,
      fonte: feed.nome,
      link: item.link || feed.url
    };
  } catch {
    return null;
  }
}

function fallbackIA() {
  const frases = [
    "Pequenos alinhamentos frequentes evitam grandes desalinhamentos futuros.",
    "A ausência de feedback cria interpretações — e interpretações criam conflitos.",
    "Uma decisão adiada custa mais caro do que uma decisão imperfeita.",
    "Equipes estáveis produzem mais porque gastam menos energia emocional.",
    "O que o líder tolera molda mais a cultura do que o que ele comunica.",
    "Clareza reduz retrabalho mais que qualquer ferramenta de produtividade.",
    "Foco não é fazer mais rápido — é fazer o que realmente importa.",
    "Times crescem quando líderes oferecem direção antes de cobrar velocidade.",
    "Ambientes previsíveis reduzem conflitos e aumentam a qualidade das conversas.",
    "A forma como o dia começa influencia a qualidade das decisões.",
    "Equipes progridem quando expectativas são alinhadas antes da execução.",
    "Gente desmotiva menos por falta de habilidade e mais por falta de direção."
  ];

  return frases.map((f) => ({
    texto: f,
    fonte: "Insight Automático",
    link: "#"
  }));
}

// ============================================================================
// HANDLER
// ============================================================================
exports.handler = async () => {
  // cache
  if (CACHE && Date.now() - CACHE_TIME < TTL) {
    return {
      statusCode: 200,
      body: JSON.stringify(CACHE)
    };
  }

  const insights = [];

  for (const feed of FEEDS) {
    if (insights.length >= 2) break;

    const ins = await coletarInsight(feed);
    if (ins) insights.push(ins);
  }

  if (insights.length < 2) {
    const faltam = 2 - insights.length;
    const ia = fallbackIA();
    insights.push(...ia.slice(0, faltam));
  }

  CACHE = insights;
  CACHE_TIME = Date.now();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(insights)
  };
};
