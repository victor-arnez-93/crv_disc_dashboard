// ============================================================================
// inicio.js — VERSÃO FINAL CORRIGIDA
// ============================================================================

import {
    dicas,
    estatisticas,
    indicadores,
    heroFrases
} from "./banco_interno.js";

// ============================================================================
// 1) FRASE PRINCIPAL — ROTATIVA
// ============================================================================

const frasesPrincipais = [
    "Processos eficientes não substituem pessoas competentes — eles potencializam.",
    "Gestores comuns administram tarefas; gestores excepcionais desenvolvem pessoas.",
    "Em gestão, pequenas melhorias diárias constroem grandes resultados anuais.",
    "Autoridade se impõe, liderança se conquista.",
    "Quando o comportamento é compreendido, o conflito vira colaboração."
];

let fraseIndex = 0;

function atualizarFrasePrincipal() {
    const elemento = document.getElementById("fraseRotativa");
    if (!elemento) return;

    elemento.style.opacity = 0;
    elemento.style.transform = "translateY(-10px)";

    setTimeout(() => {
        elemento.textContent = frasesPrincipais[fraseIndex];

        elemento.style.opacity = 1;
        elemento.style.transform = "translateY(0)";
    }, 200);
}

function fraseAnterior() {
    fraseIndex = (fraseIndex - 1 + frasesPrincipais.length) % frasesPrincipais.length;
    atualizarFrasePrincipal();
}

function proximaFrase() {
    fraseIndex = (fraseIndex + 1) % frasesPrincipais.length;
    atualizarFrasePrincipal();
}

function criarSetasFrase() {
    const container = document.getElementById("wrapperSetasFrase");
    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "setas-frase-wrapper";

    const btnEsq = document.createElement("button");
    btnEsq.className = "seta-frase";
    btnEsq.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    btnEsq.onclick = fraseAnterior;

    const btnDir = document.createElement("button");
    btnDir.className = "seta-frase";
    btnDir.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    btnDir.onclick = proximaFrase;

    wrapper.appendChild(btnEsq);
    wrapper.appendChild(btnDir);
    container.appendChild(wrapper);
}

// ============================================================================
// 2) ROTATIVOS DOS 4 CARDS — A CADA 20s
// ============================================================================

let rotacaoIndex = 0;

function animarTroca(element) {
    element.style.opacity = 0;
    element.style.transform = "translateY(-10px)";

    setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    }, 200);
}

function atualizarCardsRotativos() {
    const dica = document.getElementById("textoDica");
    const est1 = document.getElementById("textoEst1");
    const est2 = document.getElementById("textoEst2");
    const hero = document.getElementById("textoHero");

    if (!dica || !est1 || !est2 || !hero) return;

    dica.textContent = dicas[rotacaoIndex];
    est1.textContent = estatisticas[rotacaoIndex];
    est2.textContent = indicadores[rotacaoIndex];
    hero.textContent = heroFrases[rotacaoIndex];

    animarTroca(dica);
    animarTroca(est1);
    animarTroca(est2);
    animarTroca(hero);

    rotacaoIndex = (rotacaoIndex + 1) % dicas.length;
}

// ============================================================================
// 3) INSIGHTS DO DIA (BANCO INTERNO) — 2 POR DIA
// ============================================================================

function obterInsightsDoDia() {
    const cache = localStorage.getItem("insightsDia");
    const cacheData = localStorage.getItem("insightsData");
    const hoje = new Date().toDateString();

    if (cache && cacheData === hoje) {
        return JSON.parse(cache);
    }

    const copia = [...dicas];
    const resultado = [];

    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        resultado.push(copia.splice(idx, 1)[0]);
    }

    localStorage.setItem("insightsDia", JSON.stringify(resultado));
    localStorage.setItem("insightsData", hoje);

    return resultado;
}

function carregarInsights() {
    const ul = document.getElementById("insightsList");
    if (!ul) return;

    const lista = obterInsightsDoDia();
    ul.innerHTML = "";

    lista.forEach((txt) => {
        ul.innerHTML += `
            <li class="insight-item">
                <span class="insight-texto">${txt}</span>
            </li>
        `;
    });
}

// ============================================================================
// 4) NOTÍCIAS DO DIA — VIA API
// ============================================================================

async function carregarNoticias() {
    const ul = document.getElementById("noticiasList");
    if (!ul) return;

    try {
        const res = await fetch("/api/noticias");
        const json = await res.json();
        const dados = json.noticias || [];

        ul.innerHTML = "";

        dados.slice(0, 2).forEach((n) => {
            ul.innerHTML += `
                <li>
                    <div class="noticia-texto">${n.titulo}</div>
                    <div class="noticia-fonte">
                        <a href="${n.link}" target="_blank">${n.fonte}</a>
                    </div>
                </li>`;
        });

    } catch {
        ul.innerHTML = `<li style="opacity:.7">Não foi possível carregar notícias.</li>`;
    }
}

// ============================================================================
// 5) FOTO DO DIA — VIA API
// ============================================================================

async function carregarFoto() {
    const img = document.getElementById("fotoDia");
    const autor = document.getElementById("fotoAutor");
    const fonte = document.getElementById("fotoFonte");

    try {
        const res = await fetch("/api/foto");
        const foto = await res.json();

        img.src = foto.url;
        autor.innerHTML = `Foto: <a href="${foto.link}" target="_blank">${foto.autor}</a>`;
        fonte.textContent = `Fonte: ${foto.fonte}`;

    } catch {
        img.src = "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200";
        autor.innerHTML = "Autor: Desconhecido";
        fonte.textContent = "Fonte: Fallback";
    }
}

// ============================================================================
// INICIALIZAR
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    atualizarFrasePrincipal();
    criarSetasFrase();
    atualizarCardsRotativos();
    carregarInsights();
    carregarNoticias();
    carregarFoto();

    // Rotação dos 4 cards a cada 20s
    setInterval(atualizarCardsRotativos, 20000);
});
