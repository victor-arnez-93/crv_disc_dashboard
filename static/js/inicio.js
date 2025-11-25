// ============================================================================
// INICIO.JS — VERSÃO FINAL CORRIGIDA (ENDPOINTS NETLIFY OK)
// ============================================================================

import {
    dicas,
    estatisticas,
    indicadores,
    heroFrases
} from "./banco_interno.js";

// ============================================================================
// 1) FRASE PRINCIPAL
// ============================================================================

const frasesPrincipais = [
    "Processos eficientes não substituem pessoas competentes — eles potencializam.",
    "Gestores comuns administram tarefas; gestores excepcionais desenvolvem pessoas.",
    "Em gestão, pequenas melhorias diárias constroem grandes resultados anuais.",
    "Liderar é servir: primeiro o propósito, depois as pessoas, por fim os resultados.",
    "Autoridade se impõe, liderança se conquista.",
    "Um líder forte não cria seguidores — cria novos líderes.",
    "O equilíbrio entre perfis diferentes cria equipes extraordinárias.",
    "Quando o comportamento é compreendido, o conflito vira colaboração.",
    "Não existe perfil certo — existe o perfil certo para cada situação.",
    "No RH moderno, dados mostram o caminho e a experiência humana faz a jornada.",
    "Tecnologia não substitui empatia — apenas amplifica a precisão da gestão.",
    "A revolução do RH começa ao unir dados, pessoas e propósito.",
    "Alta performance é constância, não intensidade.",
    "Produtividade nasce da clareza, não do excesso de esforço.",
    "Resultados extraordinários vêm de hábitos simples bem aplicados."
];

let fraseIndex = 0;

function atualizarFrasePrincipal() {
    const elemento = document.getElementById("fraseRotativa");
    if (!elemento) return;

    elemento.style.opacity = 0;
    elemento.style.transform = "translateY(-12px)";

    setTimeout(() => {
        elemento.textContent = frasesPrincipais[fraseIndex];

        elemento.style.transform = "translateY(12px)";

        setTimeout(() => {
            elemento.style.opacity = 1;
            elemento.style.transform = "translateY(0)";
        }, 80);
    }, 220);
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
    const fraseEl = document.getElementById("fraseRotativa");
    const card = fraseEl.parentElement;

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

    card.appendChild(wrapper);
}

// ============================================================================
// 2) ROTATIVOS
// ============================================================================

let rotacaoIndex = 0;

function animarTroca(element) {
    element.style.opacity = 0;
    element.style.transform = "translateY(-10px)";

    setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    }, 180);
}

function atualizarCardsRotativos() {
    document.getElementById("textoDica").textContent = dicas[rotacaoIndex];
    document.getElementById("textoEst1").textContent = estatisticas[rotacaoIndex];
    document.getElementById("textoEst2").textContent = indicadores[rotacaoIndex];
    document.getElementById("textoHero").textContent = heroFrases[rotacaoIndex];

    animarTroca(document.getElementById("textoDica"));
    animarTroca(document.getElementById("textoEst1"));
    animarTroca(document.getElementById("textoEst2"));
    animarTroca(document.getElementById("textoHero"));

    rotacaoIndex = (rotacaoIndex + 1) % dicas.length;
}

// ============================================================================
// 3) INSIGHTS DO DIA  (CORRIGIDO)
// ============================================================================

async function carregarInsights() {
    const ul = document.getElementById("insightsList");
    if (!ul) return;

    try {
        const res = await fetch("/api/insights");   // ✔ CORRIGIDO
        const dados = await res.json();

        ul.innerHTML = "";

        dados.slice(0, 2).forEach((ins) => {
            ul.innerHTML += `
                <li>
                    <div class="insight-texto">
                        <i class="fas fa-lightbulb" style="margin-right:6px; color:#F98948;"></i>
                        ${ins.texto}
                    </div>
                    <div class="insight-fonte">
                        <a href="${ins.link}" target="_blank">${ins.fonte}</a>
                    </div>
                </li>`;
        });

    } catch {
        ul.innerHTML = `<li style="opacity:.7">Não foi possível carregar insights.</li>`;
    }
}

// ============================================================================
// 4) NOTÍCIAS DO DIA (CORRIGIDO)
// ============================================================================

async function carregarNoticias() {
    const ul = document.getElementById("noticiasList");
    if (!ul) return;

    try {
        const res = await fetch("/api/noticias_rh");   // ✔ CORRIGIDO
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
// 5) FOTO DO DIA (CORRIGIDO)
// ============================================================================

async function carregarFoto() {
    const img = document.getElementById("fotoDia");
    const autor = document.getElementById("fotoAutor");
    const fonte = document.getElementById("fotoFonte");

    try {
        const res = await fetch("/api/foto");   // ✔ CORRIGIDO
        const foto = await res.json();

        img.src = foto.url;
        autor.innerHTML = `Foto: <a href="${foto.link}" target="_blank">${foto.autor}</a>`;
        fonte.textContent = `Fonte: ${foto.fonte}`;

    } catch {
        img.src = "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200";
        autor.innerHTML = "Autor desconhecido";
        fonte.textContent = "Fallback";
    }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    atualizarFrasePrincipal();
    criarSetasFrase();
    atualizarCardsRotativos();
    carregarInsights();
    carregarNoticias();
    carregarFoto();
});
