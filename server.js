// =======================================================
// CRV DISC — BACKEND EXPRESS PARA RODAR NO RENDER
// =======================================================

import express from "express";
import fetch from "node-fetch";
import Parser from "rss-parser";
import path from "path";
import { fileURLToPath } from "url";

// -------------------------------------------------------
// EXPRESS + PATH
// -------------------------------------------------------
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir o front-end normalmente
app.use(express.static(path.join(__dirname)));

// =======================================================
// ===================== CLIMA ===========================
// (clima.js convertido de Netlify para Express)
// =======================================================

app.get("/api/clima", async (req, res) => {
  try {
    const API_KEY = process.env.OPENWEATHER_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "API key ausente no servidor." });
    }

    const city = "Tatuí";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

    const resp = await fetch(url);
    if (!resp.ok) return res.status(resp.status).json({ error: "Falha ao buscar clima." });

    const data = await resp.json();

    const getWeatherEmoji = (weather) => ({
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌫️"
    }[weather] || "🌡️");

    const weather = data.weather?.[0];
    const main = data.main;
    const temperatura = main?.temp !== undefined ? Math.round(main.temp) : "--";

    res.json({
      emoji: getWeatherEmoji(weather?.main),
      descricao: weather?.description || "",
      temperatura
    });

  } catch {
    res.status(500).json({ error: "Erro interno ao processar clima." });
  }
});


// =======================================================
// ==================== NOTÍCIAS =========================
// (noticias_full.js convertido)
// =======================================================

const parserNoticias = new Parser({ headers: { "User-Agent": "CRV-DISC-Dashboard" }, timeout: 20000 });

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
  if (txt.includes("disc") || txt.includes("comportamento")) return "disc";
  if (txt.includes("liderança") || txt.includes("líder")) return "lideranca";
  if (txt.includes("gestão") || txt.includes("processos")) return "gestao";
  if (txt.includes("tendência") || txt.includes("mercado")) return "tendencias";
  if (txt.includes("ia") || txt.includes("tecnologia")) return "tecnologia";
  if (txt.includes("cultura") || txt.includes("engajamento")) return "cultura";
  if (fonte.includes("MIT")) return "lideranca";
  if (fonte.includes("Startups")) return "tecnologia";
  if (fonte.includes("Você RH")) return "gestao";
  return "tendencias";
}

const FEEDS_NOTICIAS = [
  { url: "https://vocerh.abril.com.br/feed/", prioridade: 1, fonte: "Você RH" },
  { url: "https://startups.com.br/feed/", prioridade: 2, fonte: "Startups" },
  { url: "https://mitsloanreview.com.br/categoria/lideranca/feed/", prioridade: 3, fonte: "MIT Sloan – Liderança" },
  { url: "https://mitsloanreview.com.br/categoria/gestao-de-pessoas/feed/", prioridade: 3, fonte: "MIT Sloan – Gestão de Pessoas" }
];

async function coletarNoticias() {
  let todas = [];
  for (const feed of FEEDS_NOTICIAS) {
    try {
      const data = await parserNoticias.parseURL(feed.url);
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

app.get("/api/noticias", async (req, res) => {
  try {
    const noticias = await coletarNoticias();
    res.json({ atualizado: new Date(), noticias });
  } catch {
    res.json({ atualizado: new Date(), noticias: [] });
  }
});


// =======================================================
// ==================== INSIGHTS =========================
// =======================================================

const parserInsights = new Parser({ timeout: 12000, headers: { "User-Agent": "CRV_DISC_Insights" } });

const FEEDS_INSIGHTS = [
  { nome: "MIT Sloan Review Brasil", url: "https://www.mitsloanreview.com.br/feed/" },
  { nome: "Exame – Gestão de Pessoas", url: "https://exame.com/noticias-sobre/gestao-de-pessoas/feed/" },
  { nome: "Você RH", url: "https://vocerh.abril.com.br/feed/" },
  { nome: "Endeavor Brasil", url: "https://endeavor.org.br/feed/" },
  { nome: "Sebrae – Liderança", url: "https://sebrae.com.br/sites/PortalSebrae/busca?q=lideranca&format=rss" }
];

function limpar(str) {
  return str?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";
}

async function coletarInsight(feed) {
  try {
    const rss = await parserInsights.parseURL(feed.url);
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

    return { texto, fonte: feed.nome, link: item.link || feed.url };
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
  return frases.map((f) => ({ texto: f, fonte: "Insight Automático", link: "#" }));
}

app.get("/api/insights", async (req, res) => {
  try {
    const insights = [];

    for (const feed of FEEDS_INSIGHTS) {
      if (insights.length >= 2) break;
      const ins = await coletarInsight(feed);
      if (ins) insights.push(ins);
    }

    if (insights.length < 2) {
      const faltam = 2 - insights.length;
      insights.push(...fallbackIA().slice(0, faltam));
    }

    res.json(insights);
  } catch {
    res.json(fallbackIA().slice(0, 2));
  }
});


// =======================================================
// ====================== FOTO DO DIA =====================
// =======================================================

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

const temasFoto = [
  "business teamwork office",
  "leadership people meeting",
  "corporate communication team",
  "diversity inclusion office",
  "career development workplace",
  "technology innovation office",
  "strategy leadership meeting"
];

function temaDoDia() {
  const index = new Date().getDay();
  return temasFoto[index % temasFoto.length];
}

let CACHE_FOTO = null;
let CACHE_DATA_FOTO = null;

function cacheFotoValido() {
  return CACHE_FOTO && CACHE_DATA_FOTO === new Date().toDateString();
}

async function buscarPexels(query) {
  try {
    if (!PEXELS_API_KEY) return null;

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.photos?.length) return null;

    const foto = data.photos[0];

    return {
      url: foto.src.large2x || foto.src.large,
      autor: foto.photographer,
      fonte: "Pexels",
      link: foto.url
    };
  } catch {
    return null;
  }
}

async function buscarUnsplash(query) {
  try {
    if (!UNSPLASH_KEY) return null;

    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_KEY}`
    );

    if (!res.ok) return null;
    const foto = await res.json();
    if (!foto?.urls) return null;

    return {
      url: foto.urls.regular,
      autor: foto.user?.name || "Autor desconhecido",
      fonte: "Unsplash",
      link: foto.links?.html || "#"
    };
  } catch {
    return null;
  }
}

function fallbackFoto() {
  return {
    url: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200",
    autor: "Banco de Imagens",
    fonte: "Fallback",
    link: "https://unsplash.com"
  };
}

app.get("/api/foto", async (req, res) => {
  try {
    if (cacheFotoValido()) return res.json(CACHE_FOTO);

    const query = temaDoDia();

    const foto =
      (await buscarPexels(query)) ||
      (await buscarUnsplash(query)) ||
      fallbackFoto();

    CACHE_FOTO = foto;
    CACHE_DATA_FOTO = new Date().toDateString();

    res.json(foto);

  } catch {
    res.json(fallbackFoto());
  }
});

// =======================================================
// SPA fallback (abre index.html)
// =======================================================

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("CRV DISC API rodando na porta " + PORT));
