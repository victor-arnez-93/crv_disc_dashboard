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
const sidebar = document.getElementById("sidebar");
const btnMenuDesktop = document.getElementById("btnMenu");
const btnMenuMobile = document.getElementById("btnMenuMobile");

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
// Função para mapear clima para emoji
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

async function carregarClima() {
    const temperatura = document.getElementById("temperatura");
    if (!temperatura) return;

    try {
        const diasSemana = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

        // Calcula os 3 próximos dias (incluindo hoje)
        const hoje = new Date();
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        const depois = new Date(hoje);
        depois.setDate(depois.getDate() + 2);

        // Mock com 3 dias calculados dinamicamente
        const previsoes = [
            {
                dia: diasSemana[hoje.getDay()],
                temperatura: 24,
                min: 16,
                emoji: getWeatherEmoji('Clouds')
            },
            {
                dia: diasSemana[amanha.getDay()],
                temperatura: 33,
                min: 15,
                emoji: getWeatherEmoji('Clear')
            },
            {
                dia: diasSemana[depois.getDay()],
                temperatura: 32,
                min: 21,
                emoji: getWeatherEmoji('Clear')
            }
        ];

        // Atualiza temperatura principal
        temperatura.textContent = `${previsoes[0].temperatura}°C`;
        atualizarIconeClimaPorHora();

        // Atualiza modal se existir
        const modalClima = document.getElementById('modalClima');
        if (modalClima) {
            atualizarModalClima(previsoes);
        }

        console.log('Previsões calculadas:', previsoes.map(p => p.dia));

    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
        temperatura.textContent = '--°C';
    }
}

function atualizarModalClima(previsoes) {
    const modalClima = document.getElementById('modalClima');
    if (!modalClima) return;

    // Procura os elementos que já existem no HTML
    const diasElementos = modalClima.querySelectorAll('.clima-dia, .previsao-dia, [class*="dia"]');

    console.log(`Encontrados ${diasElementos.length} elementos de dia no modal`);

    if (diasElementos.length >= 3) {
        // Atualiza cada dia existente
        previsoes.forEach((prev, index) => {
            if (diasElementos[index]) {
                const diaEl = diasElementos[index];

                console.log(`Atualizando dia ${index}: ${prev.dia}`);

                // Atualiza o nome do dia (qui. sex. sáb.)
                const diaTexto = diaEl.querySelector('.dia-nome, .dia-semana, .nome-dia');
                if (diaTexto) diaTexto.textContent = prev.dia;

                // Atualiza temperatura
                const tempTexto = diaEl.querySelector('.temperatura, .temp');
                if (tempTexto) tempTexto.textContent = `${prev.temperatura}°/${prev.min}°`;

                // Atualiza emoji
                const emoji = diaEl.querySelector('.emoji, .icone, img');
                if (emoji) {
                    if (emoji.tagName === 'IMG') {
                        emoji.alt = prev.emoji;
                    } else {
                        emoji.textContent = prev.emoji;
                    }
                }
            }
        });
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

// ============================================================
// MENU MOBILE — CONTROLE COMPLETO (GLOBAL)
// ============================================================
// Criar overlay uma vez no carregamento
let overlay = document.getElementById("sidebar-overlay");
if (!overlay) {
  overlay = document.createElement("div");
  overlay.id = "sidebar-overlay";
  overlay.className = "sidebar-overlay";
  document.body.appendChild(overlay);
}

// Referências
const btnFechar = document.querySelector(".sidebar-fechar");

// ABRIR menu mobile (botão hambúrguer)
if (btnMenuMobile && sidebar) {
  btnMenuMobile.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.add("aberta");
    overlay.classList.add("mostrar");
    document.body.classList.add("menu-aberto");
  });
}

// FECHAR menu (botão X)
if (btnFechar && sidebar) {
  btnFechar.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.remove("aberta");
    overlay.classList.remove("mostrar");
    document.body.classList.remove("menu-aberto");
  });
}

// FECHAR ao clicar no overlay
if (overlay && sidebar) {
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("aberta");
    overlay.classList.remove("mostrar");
    document.body.classList.remove("menu-aberto");
  });
}

// FECHAR ao clicar em qualquer link do menu
document.querySelectorAll('.sidebar .menu-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("aberta");
      overlay.classList.remove("mostrar");
      document.body.classList.remove("menu-aberto");
    }
  });
});

// ============================================================
// AJUSTE AUTOMÁTICO DESKTOP/MOBILE
// ============================================================
function ajustarMenuResponsivo() {
  if (window.innerWidth <= 768) {
    // Mobile: sidebar começa fechada (fora da tela)
    sidebar.classList.remove("aberta");
    overlay.classList.remove("mostrar");
    document.body.classList.remove("menu-aberto");
  } else {
    // Desktop: remove classes mobile
    sidebar.classList.remove("aberta");
    document.body.classList.remove("menu-aberto");
  }
}
window.addEventListener("resize", ajustarMenuResponsivo);
window.addEventListener("DOMContentLoaded", ajustarMenuResponsivo);
