// ============================================================================
// CRV DISC – Notícias RH (Curadoria, Modal, Fallbacks e Compatibilidade Total)
// ============================================================================

// FEEDS
const RSS_FEEDS = [
  { nome: "Você RH", rss: "https://api.rss2json.com/v1/api.json?rss_url=https://vocerh.abril.com.br/feed/", limite: 5, categoria: "vocerh" },
  { nome: "Startups", rss: "https://api.rss2json.com/v1/api.json?rss_url=https://startups.com.br/feed/", limite: 3, categoria: "startups" }
];

// IMAGENS PADRÃO
const IMG_TEMA = [
  "/static/imagens/rh_ia1.jpg",
  "/static/imagens/rh_ia2.jpg",
  "/static/imagens/startups1.jpg",
  "/static/imagens/noticia_placeholder.jpg"
];

function imagemTematicaAleatoria() {
  return IMG_TEMA[Math.floor(Math.random() * IMG_TEMA.length)];
}

let noticias = [];

// FUSO HORÁRIO
function toBrazilDate(d) {
  const date = new Date(d);
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc - 3 * 3600000);
}

// DATA RELATIVA
function formatarDataRelativa(data) {
  const agora = toBrazilDate(new Date());
  const pub = toBrazilDate(data);
  const diffMs = agora - pub;
  const min = Math.floor(diffMs / 60000);
  const hrs = Math.floor(min / 60);
  const dias = Math.floor(hrs / 24);

  if (min < 60) return `Há ${min} min`;
  if (hrs < 24) return `Há ${hrs}h`;
  if (dias === 1) return "Ontem";
  if (dias < 7) return `Há ${dias} dias`;

  return pub.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

// OBTER IMAGEM
function obterImagemNoticia(item) {
  if (item.thumbnail && item.thumbnail.length > 10) return item.thumbnail;
  if (item.enclosure && item.enclosure.link) return item.enclosure.link;

  const conteudo = item.description || item["content:encoded"] || "";
  const imgMatch = conteudo.match(/<img.*?src=["'](.*?)["']/i);

  return imgMatch ? imgMatch[1] : imagemTematicaAleatoria();
}


// ============================================================================
// MODAL — FUNÇÃO COM SUPORTE AUTOMÁTICO A QUALQUER ID EXISTENTE
// ============================================================================

function abrirModalNoticia(idx) {
  const n = noticias[idx];
  if (!n) return;

  // Identifica dinamicamente os elementos reais existentes no HTML
  const modalBG = document.getElementById("modal-noticia-bg") || document.getElementById("modalNoticia");
  const modalConteudo = document.getElementById("modal-noticia-conteudo") || document.getElementById("modalNoticiaConteudo");
  const modalTitulo = document.getElementById("modal-noticia-titulo") || document.getElementById("modalNoticiaTitulo");
  const modalFonte = document.getElementById("modal-noticia-fonte") || document.getElementById("modalNoticiaFonte");
  const modalFooter = document.getElementById("modal-noticia-footer");

  const imagemHTML = n.imagem
    ? `<div class="noticia-imagem-modal" style="background-image:url('${n.imagem}')"></div>`
    : "";

  // --------------------------------------------------------------------
  // LIMPEZA DO CONTEÚDO (VERSÃO ROBUSTA PARA FEED REAL)
  // --------------------------------------------------------------------
  let conteudo = n.conteudo || n.resumo || "";

  if (conteudo.includes("</p>")) {

      let partes = conteudo.split(/<\/p>/i).map(p => p + "</p>");

      partes = partes.filter(p => {
          const clean = p.toLowerCase();
          return !clean.includes("relacionad")
              && !clean.includes("<ul")
              && !clean.includes("<li")
              && !clean.includes("<h1")
              && !clean.includes("<h2")
              && !clean.includes("<h3")
              && !clean.includes("href=")
              && p.replace(/<[^>]+>/g, "").trim() !== "";
      });

      partes = partes.map(p => p.replace(/<img[^>]*>/gi, ""));

      if (partes.length === 0) {
          conteudo = `<p>${n.resumo}</p>`;
      }
      else if (partes.length === 1) {
          let extra = (n.conteudo || "").replace(/<[^>]+>/g, "");
          extra = extra.substring(0, 500);
          conteudo = partes[0] + `<p>${extra}</p>`;
      }
      else {
          conteudo = partes.slice(0, 3).join("");
      }

  } else {

      let textoCru = conteudo.replace(/<[^>]*>/g, "").trim();
      conteudo = `
          <p>${n.resumo}</p>
          <p>${textoCru.substring(0, 500)}...</p>
      `;
  }

  conteudo = conteudo.replace(/<img[^>]*>/gi, "");

  // --------------------------------------------------------------------
  // APLICAÇÃO NO MODAL (somente se o elemento existir → sem erros)
  // --------------------------------------------------------------------

  if (modalTitulo) modalTitulo.innerHTML = n.titulo;
  if (modalFonte) modalFonte.innerHTML = `${n.fonte || n.categoria} • ${formatarDataRelativa(n.data)}`;
  if (modalConteudo) modalConteudo.innerHTML = imagemHTML + conteudo;

  if (modalFooter) {
    modalFooter.innerHTML = `
      <a href="${n.link}" target="_blank" class="menu-item" style="min-width:180px;margin-top:18px;">
        <i class="fas fa-arrow-right"></i> Ver matéria completa
      </a>
    `;
  }

  if (modalBG) modalBG.style.display = "flex";
}


// FECHAR MODAL (compatível com ambas versões)
document.addEventListener("click", e => {
  if (e.target.id === "modal-noticia-bg") {
    e.target.style.display = "none";
  }
  if (e.target.id === "fechar-modal-noticia") {
    const bg = document.getElementById("modal-noticia-bg");
    if (bg) bg.style.display = "none";
  }
});


// ============================================================================
// CARDS
// ============================================================================
function criarCardNoticia(n, idx) {
  const card = document.createElement("article");
  card.className = "noticia-card";

  card.innerHTML = `
    <div class="noticia-imagem" style="background-image:url('${n.imagem}')"></div>
    <span class="noticia-categoria ${n.categoria}">${n.fonte || n.categoria}</span>

    <div class="noticia-conteudo">
      <h3>${n.titulo}</h3>
      <p>${n.resumo}</p>

      <div class="noticia-meta">
        <span class="noticia-fonte"><i class="fas fa-globe"></i> ${n.fonte}</span>
        <span class="noticia-separador">•</span>
        <span class="noticia-data"><i class="far fa-clock"></i> ${formatarDataRelativa(n.data)}</span>
      </div>
    </div>

    <button class="btn-ler-noticia" onclick="abrirModalNoticia(${idx})">
      Ler mais <i class="fas fa-arrow-right"></i>
    </button>
  `;

  return card;
}


// ============================================================================
// RENDERIZAÇÃO
// ============================================================================
function renderizarNoticias() {
  const container = document.getElementById("noticias-rh-cards");
  if (!container) return;

  container.innerHTML = "";

  noticias.forEach((n, idx) => {
    container.appendChild(criarCardNoticia(n, idx));
  });
}


// ============================================================================
// BUSCA RSS
// ============================================================================
async function buscarNoticiasMultiRSS() {
  let blocoNoticias = [];

  for (const feed of RSS_FEEDS) {
    try {
      const resp = await fetch(feed.rss + "&cache=" + Date.now());
      const data = await resp.json();
      if (!data.items) continue;

      const convertidas = data.items.slice(0, feed.limite).map(item => ({
        titulo: item.title,
        resumo: (item.description || "").replace(/<[^>]*>/g, "").substring(0, 200) + "...",
        conteudo: item.content || item["content:encoded"] || item.description || "",
        categoria: feed.categoria,
        fonte: feed.nome,
        data: item.pubDate,
        imagem: obterImagemNoticia(item),
        link: item.link
      }));

      blocoNoticias = blocoNoticias.concat(convertidas);

    } catch (e) {
      console.warn("Erro no feed:", feed.nome, e);
    }
  }

  return blocoNoticias;
}


// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
async function carregarNoticias() {
  const btn = document.getElementById("btn-carregar-novidades");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-sync fa-spin"></i> Carregando...`;
  }

  noticias = await buscarNoticiasMultiRSS();
  renderizarNoticias();

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-sync-alt"></i> Carregar novidades`;
  }
}

document.addEventListener("DOMContentLoaded", carregarNoticias);
