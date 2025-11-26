// ===================================================================
// MAIN.JS — DISC DASHBOARD
// Relógio, Tema Claro/Escuro, Clima (OpenWeather), Sidebar Toggle
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
// TEMA CLARO / ESCURO
// ===============================
const botaoTema = document.getElementById("btnTema");
function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("temaDISC", tema);
    const iconeTema = botaoTema?.querySelector("i");
    if (iconeTema) {
        iconeTema.className = tema === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    atualizarIconeClimaPorHora();
}
function alternarTema() {
    const temaAtual = document.documentElement.getAttribute("data-theme") || "light";
    const novoTema = temaAtual === "light" ? "dark" : "light";
    aplicarTema(novoTema);
}
if (botaoTema) botaoTema.addEventListener("click", alternarTema);
aplicarTema(localStorage.getItem("temaDISC") || "light");

// ===============================
// BOTÃO RECOLHER SIDEBAR
// ===============================
const btnMenu = document.getElementById("btnMenu");
const sidebar = document.getElementById("sidebar");
if (btnMenu && sidebar) {
    btnMenu.addEventListener("click", () => {
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
        if (!weatherBox.contains(e.target)) {
            modalClima.classList.remove('ativo');
        }
    });
}

// ===============================
// CLIMA
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
    if (hora >= 6 && hora < 18) {
        iconeClimaImg.src = "static/imagens/ico_dia.png";
    } else {
        iconeClimaImg.src = "static/imagens/ico_noite.png";
    }
}

carregarClima();
setInterval(carregarClima, 600000);

// ===============================
// PERFIL
// ===============================
window.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('config_nome');
    const email = localStorage.getItem('config_email');
    if (nome) document.querySelectorAll('.user-name').forEach(e => e.textContent = nome);
    if (email) document.querySelectorAll('.user-role').forEach(e => e.textContent = email);

    const avatarURL = localStorage.getItem('config_avatar');
    if (avatarURL) {
        document.querySelectorAll('.user-box img, .logo-header').forEach(im => {
            im.src = avatarURL;
        });
    }
});
// ==========================================================
// BUSCA GLOBAL EM QUALQUER PÁGINA — CRV DISC DASHBOARD
// ==========================================================

// Evita erro se o campo não existir na página
document.addEventListener("DOMContentLoaded", () => {
    const campo = document.getElementById("campoBusca");
    if (!campo) return;

    let resultados = [];
    let indiceAtual = -1;

    // Remove destaques anteriores
    function limparDestaques() {
        document.querySelectorAll(".highlight-busca").forEach(el => {
            el.outerHTML = el.innerText;
        });
    }

    // Destaca resultados
    function destacar(texto) {
        limparDestaques();

        if (texto.length < 2) return;

        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

        resultados = [];
        indiceAtual = -1;

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

        // Se encontrou, vai para o primeiro
        if (resultados.length > 0) {
            indiceAtual = 0;
            scrollPara(indiceAtual);
        }
    }

    function scrollPara(index) {
        if (!resultados[index]) return;
        resultados[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }

    campo.addEventListener("input", () => {
        destacar(campo.value.trim());
    });
});

// === MENU MOBILE — FORÇAR BOTÃO APARECER EM TELAS PEQUENAS ===
function ajustarMenuMobile() {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("btnMenu");

    if (window.innerWidth <= 900) {
        sidebar.classList.add("fechado");
        toggle.style.display = "flex";
    } else {
        sidebar.classList.remove("fechado");
        toggle.style.display = "none";
    }
}

window.addEventListener("resize", ajustarMenuMobile);
window.addEventListener("DOMContentLoaded", ajustarMenuMobile);
