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
    // Toggle dropdown ao clicar no clima
    weatherBox.addEventListener('click', (e) => {
        e.stopPropagation();
        modalClima.classList.toggle('ativo');
    });

    // Fechar ao clicar no X
    if (closeModalClima) {
        closeModalClima.addEventListener('click', (e) => {
            e.stopPropagation();
            modalClima.classList.remove('ativo');
        });
    }

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!weatherBox.contains(e.target)) {
            modalClima.classList.remove('ativo');
        }
    });
}

// ===============================
// CLIMA - ATUALIZAR DROPDOWN COM API
// ===============================
async function carregarClima() {
    const iconeClimaImg = document.getElementById("iconeClimaImg");
    const temperatura = document.getElementById("temperatura");
    const modalClimaBody = document.getElementById("modalClimaBody");

    if (!iconeClimaImg || !temperatura) return;

    try {
        const response = await fetch('/api/clima');
        const data = await response.json();

        // Atualiza temperatura header
        temperatura.textContent = `${data.temperatura}°C`;

        // Atualiza ícone dia/noite
        atualizarIconeClimaPorHora();

        // Atualiza previsão no modal
        if (modalClimaBody && data.previsao) {
            modalClimaBody.innerHTML = data.previsao.map(dia => `
                <div class="previsao-dia">
                    <p class="dia-nome">${dia.dia}.</p>
                    <p class="temperaturas">${dia.tempMax}° / ${dia.tempMin}°</p>
                    <p class="emoji-clima">${dia.emoji}</p>
                </div>
            `).join('');
        }

    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
        temperatura.textContent = '-- °C';
    }
}

function atualizarIconeClimaPorHora() {
    const iconeClimaImg = document.getElementById("iconeClimaImg");
    if (!iconeClimaImg) return;

    const hora = new Date().getHours();
    const tema = document.documentElement.getAttribute("data-theme") || "light";

    if (hora >= 6 && hora < 18) {
        iconeClimaImg.src = "static/imagens/ico_dia.png";
    } else {
        iconeClimaImg.src = "static/imagens/ico_noite.png";
    }
}

// Carrega clima ao iniciar
carregarClima();
setInterval(carregarClima, 600000); // Atualiza a cada 10 minutos

// ===============================
// PERFIL DINÂMICO: HEADER E MENU
// ===============================
window.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('config_nome');
    const email = localStorage.getItem('config_email');
    if (nome) {
        document.querySelectorAll('.user-name').forEach(e => e.textContent = nome);
    }
    if (email) {
        document.querySelectorAll('.user-role').forEach(e => e.textContent = email);
    }
    const avatarURL = localStorage.getItem('config_avatar');
    if (avatarURL) {
        document.querySelectorAll('.user-box img, .logo-header').forEach(im => {
            im.src = avatarURL;
        });
    }
});
