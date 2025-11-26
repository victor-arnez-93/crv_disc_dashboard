// ============================================================================
// CRV DISC – Notícias RH (Curadoria, Modal de Detalhe, Layout Original)
// ============================================================================

const RSS_FEEDS = [
  { nome: "Você RH",   rss: "https://api.rss2json.com/v1/api.json?rss_url=https://vocerh.abril.com.br/feed/", limite: 5, categoria: "vocerh" },
  { nome: "Startups",  rss: "https://api.rss2json.com/v1/api.json?rss_url=https://startups.com.br/feed/", limite: 3, categoria: "startups" }
];

const IMG_TEMA = [
  "/static/imagens/rh_ia1.jpg",
  "/static/imagens/rh_ia2.jpg",
  "/static/imagens/startups1.jpg",
  "/static/imagens/noticia_placeholder.jpg"
];

function imagemTematicaAleatoria() {
  const idx = Math.floor(Math.random() * IMG_TEMA.length);
  return IMG_TEMA[idx];
}

let noticias = [];
let horaUltimaAtualizacao = null;

// UTC−3 para data
function toBrazilDate(d) {
  const date = new Date(d);
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const br = new Date(utc - 3 * 3600000);
  return br;
}

// Data relativa
function formatarDataRelativa(data) {
  const agora = toBrazilDate(new Date());
  const pub = toBrazilDate(data);
  const diffMs = agora - pub;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffHoras < 24) return `Há ${diffHoras}h`;
  if (diffDias === 1) return "Ontem";
  if (diffDias < 7) return `Há ${diffDias} dias`;
  return pub.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

// Buscar imagem do RSS item (thumbnail, enclosure, img, fallback)
function obterImagemNoticia(item) {
  if (item.thumbnail && item.thumbnail.length > 10) return item.thumbnail;
  if (item.enclosure && item.enclosure.link) return item.enclosure.link;
  let conteudo = item.description || item["content:encoded"] || "";
  let imgMatch = conteudo.match(/<img.*?src=["'](.*?)["']/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1];
  return imagemTematicaAleatoria();
}

// ==== Modal
function abrirModalNoticia(idx) {
  const n = noticias[idx];
  if (!n) return;

  const img = n.imagem
    ? `<div class="noticia-imagem-modal" style="background-image:url('${n.imagem}')"></div>`
    : "";

  let conteudo = n.conteudo || n.resumo || '';

  // ================================
  // LIMPEZA DO CONTEÚDO DO MODAL
  // ================================
  if (conteudo.includes('</p>')) {

    // Quebra por parágrafos
    let partes = conteudo.split(/<\/p>/i);

    // Remove "Relacionadas", listas, links, headings e sujeiras do RSS
    partes = partes.filter(p => {
        const clean = p.toLowerCase();
        return !clean.includes("relacionad")   // remove "Relacionadas"
            && !clean.includes("<ul")          // remove listas
            && !clean.includes("<li")
            && !clean.includes("<h1")          // remove headings
            && !clean.includes("<h2")
            && !clean.includes("<h3")
            && !clean.includes("href=")        // remove links embutidos
            && p.trim() !== "";                // remove parágrafos vazios
    });

    // Mantém no máximo 3 parágrafos limpos
    conteudo = partes.slice(0, 3).join("</p>") + "</p>";

    // Remove scripts
    conteudo = conteudo.replace(/<script[\s\S]*?<\/script>/ig, '');

  } else {
    conteudo = conteudo.substring(0, 850) + "...";
  }

  // Remove imagens internas duplicadas (caso do item 6,7,8)
  conteudo = conteudo.replace(/<img[^>]*>/gi, '');

  // Monta o HTML no modal
  document.getElementById("modalNoticiaTitulo").innerHTML = n.titulo;
  document.getElementById("modalNoticiaFonte").innerHTML = `${n.categoria} • ${n.tempo}`;
  document.getElementById("modalNoticiaConteudo").innerHTML = img + conteudo;

  document.getElementById("modalNoticia").classList.add("ativo");
}
  // Monta o título, data, resumo, conteudo, botão
  document.getElementById('modal-noticia-conteudo').innerHTML = `
    ${img}
    <h2 class="modal-titulo">${n.titulo}</h2>
    <div class="modal-subtitulo" style="color:var(--cor-texto-fraca);font-size:14.5px;margin-bottom:10px;">${n.fonte || ""} • ${formatarDataRelativa(n.data)}</div>
    <div class="modal-materia">${conteudo}</div>
  `;
  document.getElementById('modal-noticia-footer').innerHTML = `
    <a href="${n.link}" target="_blank" class="menu-item" style="min-width:180px;margin-top:18px;">
      <i class="fas fa-arrow-right"></i> Ver matéria completa
    </a>
  `;
  document.getElementById('modal-noticia-bg').style.display = 'flex';
}
// Fechar Modal
document.getElementById('fechar-modal-noticia').onclick = function() {
  document.getElementById('modal-noticia-bg').style.display = 'none';
};
document.getElementById('modal-noticia-bg').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Criar card de notícia
function criarCardNoticia(n, idx) {
  const card = document.createElement("article");
  card.className = "noticia-card";
  card.setAttribute("data-categoria", n.categoria);

  card.innerHTML = `
    <div class="noticia-imagem" style="background-image: url('${n.imagem}')"></div>
    <span class="noticia-categoria ${n.categoria}">${n.fonte || n.categoria}</span>
    <div class="noticia-conteudo">
      <h3>${n.titulo}</h3>
      <p>${n.resumo}</p>
      <div class="noticia-meta">
        <span class="noticia-fonte">
          <i class="fas fa-globe"></i>
          ${n.fonte || 'Fonte desconhecida'}
        </span>
        <span class="noticia-separador">•</span>
        <span class="noticia-data">
          <i class="far fa-clock"></i>
          ${formatarDataRelativa(n.data)}
        </span>
      </div>
    </div>
    <button class="btn-ler-noticia" onclick="abrirModalNoticia(${idx})">
      Ler mais <i class="fas fa-arrow-right"></i>
    </button>
  `;
  return card;
}

// Renderização
function renderizarNoticias() {
  const container = document.getElementById("noticias-rh-cards");
  if (!container) return;
  container.innerHTML = "";
  if (!noticias.length) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-inbox" style="font-size: 64px; color: var(--cor-primaria); opacity: 0.3; margin-bottom: 16px;"></i>
        <p style="font-size: 18px; color: var(--cor-texto); opacity: 0.6;">Nenhuma notícia encontrada</p>
      </div>
    `;
    return;
  }
  noticias.forEach((n, idx) => {
    container.appendChild(criarCardNoticia(n, idx));
  });
}

// Buscar notícias e garantir 'conteudo'
async function buscarNoticiasMultiRSS() {
  let blocoNoticias = [];
  for (const feed of RSS_FEEDS) {
    try {
      const resp = await fetch(feed.rss + "&cachebust=" + Date.now());
      const data = await resp.json();
      if (!data.items) continue;
      const noticiasTransformadas = data.items.slice(0, feed.limite).map(item => ({
        titulo: item.title,
        resumo: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        conteudo: item.content || item["content:encoded"] || item.description || '',
        categoria: feed.categoria,
        data: item.pubDate,
        imagem: obterImagemNoticia(item),
        link: item.link,
        fonte: feed.nome
      }));
      blocoNoticias = blocoNoticias.concat(noticiasTransformadas);
    } catch (err) {
      console.warn("Erro ao buscar feed:", feed.nome, err);
    }
  }
  return blocoNoticias;
}

// Inicialização e controle
async function carregarNoticias() {
  const btn = document.getElementById("btn-carregar-novidades");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-sync fa-spin"></i> Carregando...`;
  }
  noticias = await buscarNoticiasMultiRSS();
  horaUltimaAtualizacao = new Date();
  renderizarNoticias();
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-sync-alt"></i> Carregar novidades`;
  }
}
if (document.getElementById("btn-carregar-novidades")) {
  document.getElementById("btn-carregar-novidades").addEventListener("click", carregarNoticias);
}

document.addEventListener("DOMContentLoaded", carregarNoticias);

