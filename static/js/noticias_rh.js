// ============================================================================
// CRV DISC – Notícias RH (Curadoria + Modal compatível com noticias_rh.html)
// ============================================================================

const RSS_FEEDS = [
    { nome: "Você RH", rss: "https://api.rss2json.com/v1/api.json?rss_url=https://vocerh.abril.com.br/feed/", limite: 5, categoria: "Você RH" },
    { nome: "Startups", rss: "https://api.rss2json.com/v1/api.json?rss_url=https://startups.com.br/feed/", limite: 3, categoria: "Startups" }
];

// Imagens fallback
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

// ============================================================================
// Funções de data
// ============================================================================
function toBrazilDate(d) {
    const date = new Date(d);
    return new Date(date.getTime() - 3 * 3600000);
}

function formatarDataRelativa(data) {
    const agora = toBrazilDate(new Date());
    const pub = toBrazilDate(data);
    const diffMin = Math.floor((agora - pub) / 60000);
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffMin < 60) return `Há ${diffMin} min`;
    if (diffHoras < 24) return `Há ${diffHoras}h`;
    if (diffDias === 1) return "Ontem";
    if (diffDias < 7) return `Há ${diffDias} dias`;

    return pub.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

// ============================================================================
// Captura de imagem
// ============================================================================
function obterImagemNoticia(item) {
    if (item.thumbnail && item.thumbnail.length > 10) return item.thumbnail;
    if (item.enclosure && item.enclosure.link) return item.enclosure.link;

    const conteudo = item.description || item["content:encoded"] || "";
    const match = conteudo.match(/<img.*?src=["'](.*?)["']/i);
    if (match && match[1]) return match[1];

    return imagemTematicaAleatoria();
}

// ============================================================================
// MODAL (Compatível com noticias_rh.html)
// ============================================================================

function abrirModalNoticia(idx) {
    const n = noticias[idx];
    if (!n) return;

    // =======================
    // Limpeza do conteúdo
    // =======================
    let conteudo = n.conteudo || n.resumo || "";

    if (conteudo.includes("</p>")) {
        let partes = conteudo.split(/<\/p>/i);

        partes = partes.filter(p => {
            const x = p.toLowerCase();
            return !x.includes("relacionad") &&
                   !x.includes("<ul") &&
                   !x.includes("<li") &&
                   !x.includes("<h1") &&
                   !x.includes("<h2") &&
                   !x.includes("<h3") &&
                   !x.includes("href=") &&
                   p.trim() !== "";
        });

        conteudo = partes.slice(0, 3).join("</p>") + "</p>";
    } else {
        conteudo = conteudo.substring(0, 800) + "...";
    }

    conteudo = conteudo.replace(/<img[^>]*>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "");

    // =======================
    // Preenche modal
    // =======================
    document.getElementById("modalNoticiaTitulo").innerText = n.titulo;
    document.getElementById("modalNoticiaFonte").innerText =
        `${n.categoria} • ${formatarDataRelativa(n.data)}`;

    document.getElementById("modalNoticiaConteudo").innerHTML = `
        <div class="modal-imagem" style="background-image:url('${n.imagem}')"></div>
        ${conteudo}
    `;

    document.getElementById("modalNoticiaLink").href = n.link;

    // Exibe modal
    document.getElementById("modalNoticia").classList.add("ativo");
}

// Fechar modal
document.getElementById("modalNoticiaFechar").onclick = () => {
    document.getElementById("modalNoticia").classList.remove("ativo");
};

// ============================================================================
// Criar card
// ============================================================================
function criarCardNoticia(n, idx) {
    const card = document.createElement("article");
    card.className = "noticia-card";

    card.innerHTML = `
        <div class="noticia-imagem" style="background-image:url('${n.imagem}')"></div>

        <h3 class="noticia-titulo">${n.titulo}</h3>
        <p class="noticia-resumo">${n.resumo}</p>

        <div class="noticia-meta">
            <span><i class="fas fa-globe"></i> ${n.categoria}</span>
            <span>•</span>
            <span><i class="far fa-clock"></i> ${formatarDataRelativa(n.data)}</span>
        </div>

        <button class="btn-ler" onclick="abrirModalNoticia(${idx})">
            Ler mais <i class="fas fa-arrow-right"></i>
        </button>
    `;

    return card;
}

// ============================================================================
// Renderizar
// ============================================================================
function renderizarNoticias() {
    const container = document.getElementById("noticias-rh-cards");
    container.innerHTML = "";

    noticias.forEach((n, idx) => {
        container.appendChild(criarCardNoticia(n, idx));
    });
}

// ============================================================================
// Buscar RSS
// ============================================================================
async function buscarNoticiasMultiRSS() {
    let bloco = [];

    for (const feed of RSS_FEEDS) {
        try {
            const resp = await fetch(feed.rss + "&cachebust=" + Date.now());
            const data = await resp.json();
            if (!data.items) continue;

            bloco = bloco.concat(
                data.items.slice(0, feed.limite).map(item => ({
                    titulo: item.title,
                    resumo: (item.description || "").replace(/<[^>]*>/g, "").substring(0, 200) + "...",
                    conteudo: item["content:encoded"] || item.content || item.description,
                    categoria: feed.nome,
                    data: item.pubDate,
                    imagem: obterImagemNoticia(item),
                    link: item.link,
                }))
            );

        } catch (e) {
            console.warn("Erro ao buscar feed:", feed.nome, e);
        }
    }

    return bloco;
}

// ============================================================================
// Inicialização
// ============================================================================
async function carregarNoticias() {
    noticias = await buscarNoticiasMultiRSS();
    renderizarNoticias();
}

document.addEventListener("DOMContentLoaded", carregarNoticias);
