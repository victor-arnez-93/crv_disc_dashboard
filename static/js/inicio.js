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
    const cache     = localStorage.getItem("insightsDia");
    const cacheData = localStorage.getItem("insightsData");
    const hoje      = new Date().toDateString();

    if (cache && cacheData === hoje) return JSON.parse(cache);

    const copia     = [...dicas];
    const resultado = [];

    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        resultado.push(copia.splice(idx, 1)[0]);
    }

    localStorage.setItem("insightsDia",  JSON.stringify(resultado));
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
            </li>`;
    });
}

// ============================================================================
// 4) NOTÍCIAS DO DIA
// ============================================================================
function carregarNoticias() {
    const ul = document.getElementById("noticiasList");
    if (!ul) return;

    fetch('/.netlify/functions/noticias_full')
        .then(res => res.json())
        .then(data => {

            ul.innerHTML = "";

            data.slice(0, 3).forEach(n => {
                ul.innerHTML += `
                    <li>
                        <div class="noticia-texto">${n.titulo}</div>
                        <div class="noticia-fonte">
                            <a href="${n.link}" target="_blank" rel="noopener noreferrer">
                        </div>
                    </li>
                `;
            });
        })
        .catch(() => {
            ul.innerHTML = `
                <li>Erro ao carregar notícias.</li>
            `;
        });
}

// ============================================================================
// 5) FOTO DO DIA
// ============================================================================
function carregarFoto() {
    const img   = document.getElementById("fotoDia");
    const autor = document.getElementById("fotoAutor");
    const fonte = document.getElementById("fotoFonte");

    if (!img) return;

    fetch('/.netlify/functions/foto')
        .then(res => res.json())
        .then(data => {

            img.src = data.url;
            img.alt = data.titulo || "Foto corporativa";

if (autor) {
    autor.innerHTML = `Tema: <strong>${data.titulo}</strong>`;
}

if (fonte) {
    fonte.innerHTML = data.legenda;
}

        })
        .catch(() => {
            img.src = "https://picsum.photos/800/450";
        });
}

// ============================================================================
// 6) PERFIL DISC DO DIA
// ============================================================================

function obterDiscDoDia() {

    const perfis = [
        {
            tipo: "Dominância (D)",
            texto: "Foco em resultados, decisões rápidas e ação direta.",
            insight: "Use essa energia para destravar decisões importantes, mas cuide da comunicação."
        },
        {
            tipo: "Influência (I)",
            texto: "Comunicação, persuasão e conexão com pessoas.",
            insight: "Momento ideal para engajar equipe e fortalecer relacionamentos."
        },
        {
            tipo: "Estabilidade (S)",
            texto: "Consistência, colaboração e apoio ao time.",
            insight: "Bom dia para fortalecer cultura e reduzir conflitos."
        },
        {
            tipo: "Conformidade (C)",
            texto: "Análise, precisão e foco em qualidade.",
            insight: "Excelente momento para revisar processos e evitar erros."
        }
    ];

    const index = Math.floor(new Date().getTime() / 86400000);
    return perfis[index % perfis.length];
}

// ============================================================================
// 7) PERGUNTA REFLEXIVA DO DIA
// ============================================================================

function obterPerguntaDoDia() {

    const perguntas = [

        {
            pergunta: "O que na sua equipe hoje depende mais de clareza do que de esforço?",
            insight: "Falta de direção costuma ser confundida com falta de dedicação."
        },

        {
            pergunta: "Você está corrigindo comportamento ou apenas reagindo a ele?",
            insight: "Gestão eficaz atua na causa, não no sintoma."
        },

        {
            pergunta: "Sua comunicação está orientando ou apenas informando?",
            insight: "Informação sem direcionamento não gera ação."
        },

        {
            pergunta: "Qual decisão você está adiando que já tem informação suficiente?",
            insight: "Excesso de análise também é um risco de gestão."
        },

        {
            pergunta: "Você está desenvolvendo pessoas ou apenas cobrando resultados?",
            insight: "Resultados sustentáveis vêm de evolução, não pressão."
        },

        {
            pergunta: "Se sua equipe replicar seu comportamento hoje, isso seria positivo?",
            insight: "Cultura é reflexo direto da liderança."
        }

    ];

    const index = Math.floor(new Date().getTime() / 86400000);
    return perguntas[index % perguntas.length];
}

function carregarPerguntaDia() {

    const container = document.getElementById("perguntaDia");
    if (!container) return;

    const item = obterPerguntaDoDia();

    container.innerHTML = `
        <li>
            <span class="insight-texto"><strong>${item.pergunta}</strong></span>
            <span class="insight-texto" style="opacity:0.8">${item.insight}</span>
        </li>
    `;
}

function carregarDiscDia() {

    const container = document.getElementById("discDia");
    if (!container) return;

    const perfil = obterDiscDoDia();

    container.innerHTML = `
        <li>
            <span class="insight-texto"><strong>${perfil.tipo}</strong></span>
            <span class="insight-texto">${perfil.texto}</span>
            <span class="insight-texto" style="opacity:0.8">${perfil.insight}</span>
        </li>
    `;
}

// ============================================================================
// 8) AÇÕES RÁPIDAS — REDIRECIONAMENTO
// ============================================================================

function irParaSistema(tipo) {

    let url = "";

    if (tipo === "disc") {
        url = "https://www.discprofpaulorocha.com/";
    }

    if (tipo === "curriculo") {
        url = "https://www.discprofpaulorocha.com/curriculo";
    }

    const confirmar = confirm(
        "Você será redirecionado para outro sistema. Deseja continuar?"
    );

    if (confirmar) {
        window.open(url, "_blank");
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
    carregarDiscDia();
    setTimeout(() => {
    const card = document.querySelector('.card-disc');
    if (!card) return;

    const texto = card.innerText;

    if (texto.includes('(D)')) card.setAttribute('data-perfil', 'D');
    else if (texto.includes('(I)')) card.setAttribute('data-perfil', 'I');
    else if (texto.includes('(S)')) card.setAttribute('data-perfil', 'S');
    else if (texto.includes('(C)')) card.setAttribute('data-perfil', 'C');

}, 100);
    carregarPerguntaDia();

    // Rotação dos 4 cards a cada 20s
    setInterval(atualizarCardsRotativos, 20000);
});