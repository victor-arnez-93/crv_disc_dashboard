// ===================================================================
// MAIN.JS — DISC DASHBOARD
// Relógio, Tema Claro/Escuro, Clima, Sidebar Desktop + Mobile
// ===================================================================

// ===============================
// RELÓGIO DIGITAL
// ===============================
function iniciarRelogio() {
    const relogio = document.getElementById("relogio");
    function atualizar() {
        const agora = new Date();
        const h = String(agora.getHours()).padStart(2, "0");
        const m = String(agora.getMinutes()).padStart(2, "0");
        const s = String(agora.getSeconds()).padStart(2, "0");
        if (relogio) relogio.textContent = `${h}:${m}:${s}`;
    }
    atualizar();
    setInterval(atualizar, 1000);
}
iniciarRelogio();

// ===============================
// REFERÊNCIAS GLOBAIS
// ===============================
let sidebar = document.getElementById("sidebar");
let btnMenuDesktop = document.getElementById("btnMenu");
let btnMenuMobile = document.getElementById("btnMenuMobile");

// ===============================
// TEMA CLARO / ESCURO
// ===============================
const botaoTema = document.getElementById("btnTema");

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("temaDISC", tema);

    const iconeTema = botaoTema?.querySelector("i");
    if (iconeTema) iconeTema.className = tema === "dark" ? "fas fa-sun" : "fas fa-moon";

    atualizarIconeClimaPorHora();
}

function alternarTema() {
    const temaAtual = document.documentElement.getAttribute("data-theme") || "light";
    aplicarTema(temaAtual === "light" ? "dark" : "light");
}

if (botaoTema) botaoTema.addEventListener("click", alternarTema);

aplicarTema(localStorage.getItem("temaDISC") || "light");

// ===============================
// SIDEBAR — BOTÃO DESKTOP
// ===============================
if (btnMenuDesktop && sidebar) {
    btnMenuDesktop.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
    });
}

// ===============================
// MODAL CLIMA DROPDOWN
// ===============================
const weatherBox = document.getElementById('weatherBox');
const modalClima = document.getElementById('modalClima');
const closeModalClima = document.getElementById('closeModalClima');

if (weatherBox && modalClima) {
    weatherBox.addEventListener('click', (e) => {
        e.stopPropagation();
        modalClima.classList.toggle('ativo');
    });

    if (closeModalClima) {
        closeModalClima.addEventListener('click', (e) => {
            e.stopPropagation();
            modalClima.classList.remove('ativo');
        });
    }

    document.addEventListener('click', (e) => {
        if (!weatherBox.contains(e.target)) modalClima.classList.remove('ativo');
    });
}

// ===============================
// CLIMA + ÍCONE DIA/NOITE
// ===============================
async function carregarClima() {
    const iconeClimaImg = document.getElementById("iconeClimaImg");
    const temperatura = document.getElementById("temperatura");

    if (!iconeClimaImg || !temperatura) return;

    try {
        const response = await fetch('/api/clima');
        const data = await response.json();

        temperatura.textContent = `${data.temperatura}°C`;
        atualizarIconeClimaPorHora();
    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
        temperatura.textContent = '-- °C';
    }
}

function atualizarIconeClimaPorHora() {
    const iconeClimaImg = document.getElementById("iconeClimaImg");
    if (!iconeClimaImg) return;

    const hora = new Date().getHours();
    iconeClimaImg.src = hora >= 6 && hora < 18
        ? "static/imagens/ico_dia.png"
        : "static/imagens/ico_noite.png";
}

carregarClima();
setInterval(carregarClima, 600000);

// ===============================
// PERFIL
// ===============================
window.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('config_nome');
    const email = localStorage.getItem('config_email');
    const avatarURL = localStorage.getItem('config_avatar');

    if (nome) document.querySelectorAll('.user-name').forEach(e => e.textContent = nome);
    if (email) document.querySelectorAll('.user-role').forEach(e => e.textContent = email);

    if (avatarURL) {
        document.querySelectorAll('.user-box img, .logo-header').forEach(im => {
            im.src = avatarURL;
        });
    }
});

// ==========================================================
// BUSCA GLOBAL
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    const campo = document.getElementById("campoBusca");
    if (!campo) return;

    let resultados = [];
    let indiceAtual = -1;

    function limparDestaques() {
        document.querySelectorAll(".highlight-busca").forEach(el => {
            el.outerHTML = el.innerText;
        });
    }

    function destacar(texto) {
        limparDestaques();
        if (texto.length < 2) return;

        resultados = [];
        indiceAtual = -1;

        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walk.nextNode()) {
            const node = walk.currentNode;
            const valor = node.nodeValue.toLowerCase();

            if (valor.includes(texto.toLowerCase())) {
                const span = document.createElement("span");
                span.className = "highlight-busca";

                const idx = valor.indexOf(texto.toLowerCase());
                const antes = node.nodeValue.slice(0, idx);
                const match = node.nodeValue.slice(idx, idx + texto.length);
                const depois = node.nodeValue.slice(idx + texto.length);

                span.textContent = match;

                const parent = node.parentNode;
                parent.insertBefore(document.createTextNode(antes), node);
                parent.insertBefore(span, node);
                parent.insertBefore(document.createTextNode(depois), node);
                parent.removeChild(node);

                resultados.push(span);
            }
        }

        if (resultados.length > 0) {
            indiceAtual = 0;
            resultados[indiceAtual].scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    campo.addEventListener("input", () => destacar(campo.value.trim()));
});

// ==========================================================
// AJUSTE AUTOMÁTICO DO MENU EM TELAS PEQUENAS
// ==========================================================
function ajustarMenuMobile() {
    if (window.innerWidth <= 900) {
        sidebar.classList.add("fechado");
        if (btnMenuDesktop) btnMenuDesktop.style.display = "flex";
    } else {
        sidebar.classList.remove("fechado");
        if (btnMenuDesktop) btnMenuDesktop.style.display = "none";
    }
}

window.addEventListener("resize", ajustarMenuMobile);
window.addEventListener("DOMContentLoaded", ajustarMenuMobile);

// ============================================================
// MENU MOBILE — ABRIR E FECHAR SIDEBAR
// ============================================================

// Criar overlay 1 vez
let overlay = document.getElementById("sidebar-overlay");
if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "sidebar-overlay";
    document.body.appendChild(overlay);
}

// Abrir
if (btnMenuMobile) {
    btnMenuMobile.addEventListener("click", () => {
        sidebar.classList.add("aberta");
        overlay.classList.add("mostrar");
    });
}

// Fechar ao clicar fora
overlay.addEventListener("click", () => {
    sidebar.classList.remove("aberta");
    overlay.classList.remove("mostrar");
});
