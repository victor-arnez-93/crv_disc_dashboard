// ============================================================================
// inicio.js — DISC Dashboard
// ============================================================================

import { dicas, estatisticas, indicadores, heroFrases } from "./banco_interno.js";

// ============================================================================
// 1) FRASE PRINCIPAL ROTATIVA
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
    const el = document.getElementById("fraseRotativa");
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = "translateY(-10px)";
    setTimeout(() => {
        el.textContent = frasesPrincipais[fraseIndex];
        el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    }, 200);
}

function criarSetasFrase() {
    const container = document.getElementById("wrapperSetasFrase");
    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "setas-frase-wrapper";

    const btnEsq = document.createElement("button");
    btnEsq.className = "seta-frase";
    btnEsq.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    btnEsq.onclick = () => {
        fraseIndex = (fraseIndex - 1 + frasesPrincipais.length) % frasesPrincipais.length;
        atualizarFrasePrincipal();
    };

    const btnDir = document.createElement("button");
    btnDir.className = "seta-frase";
    btnDir.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    btnDir.onclick = () => {
        fraseIndex = (fraseIndex + 1) % frasesPrincipais.length;
        atualizarFrasePrincipal();
    };

    wrapper.append(btnEsq, btnDir);
    container.appendChild(wrapper);
}

// ============================================================================
// 2) CARDS ROTATIVOS (a cada 20s)
// ============================================================================

let rotacaoIndex = 0;

function animarTroca(el) {
    if (!el) return;
    el.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    el.style.opacity = 0;
    el.style.transform = "translateY(-8px)";
    setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    }, 200);
}

function atualizarCardsRotativos() {
    const ids = ["textoDica", "textoEst1", "textoEst2", "textoHero"];
    const bancos = [dicas, estatisticas, indicadores, heroFrases];

    ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        animarTroca(el);
        setTimeout(() => {
            el.textContent = bancos[i][rotacaoIndex % bancos[i].length];
        }, 200);
    });

    rotacaoIndex++;
}

// ============================================================================
// 3) INSIGHTS DO DIA (2 por sessão — sem localStorage)
// ============================================================================

function carregarInsights() {
    const ul = document.getElementById("insightsList");
    if (!ul) return;

    const copia = [...dicas];
    const resultado = [];
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        resultado.push(copia.splice(idx, 1)[0]);
    }

    ul.innerHTML = resultado.map(txt => `
        <li class="insight-item">
            <span class="insight-texto">${txt}</span>
        </li>
    `).join("");
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
            ul.innerHTML = data.slice(0, 3).map(n => `
                <li>
                    <div class="noticia-texto">${n.titulo}</div>
                    <div class="noticia-fonte">
                        <a href="${n.link}" target="_blank" rel="noopener noreferrer">${n.fonte || "Ver fonte"}</a>
                    </div>
                </li>
            `).join("");
        })
        .catch(() => {
            ul.innerHTML = `<li><span class="insight-texto">Erro ao carregar notícias.</span></li>`;
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
            if (autor) autor.innerHTML = `Tema: <strong>${data.titulo}</strong>`;
            if (fonte) fonte.innerHTML = data.legenda || "";
        })
        .catch(() => {
            img.src = "https://picsum.photos/seed/gestao/800/450";
        });
}

// ============================================================================
// 6) PERFIL DISC DO DIA
// ============================================================================

const perfisDisc = [
    { tipo: "Dominância (D)",   letra: "D", texto: "Foco em resultados, decisões rápidas e ação direta.",       insight: "Use essa energia para destravar decisões importantes, mas cuide da comunicação." },
    { tipo: "Influência (I)",   letra: "I", texto: "Comunicação, persuasão e conexão com pessoas.",              insight: "Momento ideal para engajar equipe e fortalecer relacionamentos." },
    { tipo: "Estabilidade (S)", letra: "S", texto: "Consistência, colaboração e apoio ao time.",                 insight: "Bom dia para fortalecer cultura e reduzir conflitos." },
    { tipo: "Conformidade (C)", letra: "C", texto: "Análise, precisão e foco em qualidade.",                    insight: "Excelente momento para revisar processos e evitar erros." }
];

function carregarDiscDia() {
    const container = document.getElementById("discDia");
    const card      = document.getElementById("cardDiscDia");
    const badge     = document.getElementById("discBadge");
    if (!container) return;

    const perfil = perfisDisc[Math.floor(Date.now() / 86400000) % perfisDisc.length];

    if (card)  card.setAttribute("data-perfil", perfil.letra);
    if (badge) badge.textContent = perfil.letra + " · " + perfil.tipo.split(" ")[0];

    container.innerHTML = `
        <li>
            <span class="insight-texto"><strong>${perfil.tipo}</strong></span>
            <span class="insight-texto">${perfil.texto}</span>
            <span class="insight-texto" style="opacity:0.8">${perfil.insight}</span>
        </li>
    `;
}

// ============================================================================
// 7) PERGUNTA REFLEXIVA DO DIA
// ============================================================================

const perguntasDia = [
    { pergunta: "O que na sua equipe hoje depende mais de clareza do que de esforço?",      insight: "Falta de direção costuma ser confundida com falta de dedicação." },
    { pergunta: "Você está corrigindo comportamento ou apenas reagindo a ele?",             insight: "Gestão eficaz atua na causa, não no sintoma." },
    { pergunta: "Sua comunicação está orientando ou apenas informando?",                    insight: "Informação sem direcionamento não gera ação." },
    { pergunta: "Qual decisão você está adiando que já tem informação suficiente?",         insight: "Excesso de análise também é um risco de gestão." },
    { pergunta: "Você está desenvolvendo pessoas ou apenas cobrando resultados?",           insight: "Resultados sustentáveis vêm de evolução, não pressão." },
    { pergunta: "Se sua equipe replicar seu comportamento hoje, isso seria positivo?",      insight: "Cultura é reflexo direto da liderança." }
];

function carregarPerguntaDia() {
    const container = document.getElementById("perguntaDia");
    if (!container) return;

    const item = perguntasDia[Math.floor(Date.now() / 86400000) % perguntasDia.length];

    container.innerHTML = `
        <li>
            <span class="insight-texto"><strong>${item.pergunta}</strong></span>
            <span class="insight-texto" style="opacity:0.8">${item.insight}</span>
        </li>
    `;
}

// ============================================
// SIMULADOR DE COMPATIBILIDADE (movido para home)
// ============================================
window.analisarCompatibilidade = function() {
    const perfil1 = document.getElementById('perfil1').value;
    const perfil2 = document.getElementById('perfil2').value;
    const resultado = document.getElementById('resultadoCompatibilidade');
    if (!resultado) return;

    if (!perfil1 || !perfil2) return;

    const compatibilidades = {
        'DI': { nivel: '85%', titulo: 'Alta Compatibilidade', descricao: 'D e I trabalham bem juntos — D traz foco em resultados e I garante engajamento da equipe.', dicas: ['D define metas; I motiva o time', 'Cuidado: D pode ser impaciente com a sociabilidade de I', 'Combinar velocidade de D com entusiasmo de I é poderoso'] },
        'DS': { nivel: '60%', titulo: 'Compatibilidade Moderada', descricao: 'Opostos em ritmo. D prefere velocidade, S valoriza estabilidade.', dicas: ['D precisa reduzir urgência desnecessária', 'S precisa comunicar discordâncias antes de acumular', 'Juntos equilibram pressa com cuidado'] },
        'DC': { nivel: '70%', titulo: 'Boa Compatibilidade', descricao: 'Ambos orientados a objetivos, mas D quer velocidade e C quer qualidade.', dicas: ['Definir critérios de "bom o suficiente"', 'C valida tecnicamente; D decide e executa', 'Conflito de prazos é o maior risco'] },
        'IS': { nivel: '90%', titulo: 'Excelente Compatibilidade', descricao: 'I e S são perfis complementares em clima e relacionamento.', dicas: ['I anima; S estabiliza', 'Cuidado com evitar conflitos necessários', 'Ótima dupla para cultura e bem-estar'] },
        'IC': { nivel: '55%', titulo: 'Compatibilidade com Desafios', descricao: 'I é espontâneo; C é metódico. Podem gerar atritos mas também inovação com qualidade.', dicas: ['Criar processo estruturado com espaço criativo', 'I apresenta ideias; C valida viabilidade', 'Respeitar ritmos diferentes'] },
        'SC': { nivel: '80%', titulo: 'Alta Compatibilidade', descricao: 'S e C valorizam qualidade, processo e colaboração.', dicas: ['Ambos evitam conflito — precisam ser encorajados a discordar', 'Ótimos para manutenção e qualidade', 'Podem ser lentos em decisões — precisa de D ou I para impulsionar'] },
        'DD': { nivel: '65%', titulo: 'Compatibilidade com Alerta', descricao: 'Dois perfis D competem por liderança. Pode ser produtivo ou gerar atrito.', dicas: ['Dividir claramente áreas de responsabilidade', 'Criar regras de tomada de decisão', 'Canalizar competitividade para desafios externos'] },
        'II': { nivel: '75%', titulo: 'Boa Compatibilidade', descricao: 'Dois I criam ambiente animado, mas podem perder foco.', dicas: ['Precisa de D ou C para manter resultados e qualidade', 'Excelente para criatividade e relacionamento', 'Risco: falar mais do que entregar'] },
        'SS': { nivel: '80%', titulo: 'Alta Compatibilidade', descricao: 'Dois S criam ambiente harmonioso e colaborativo.', dicas: ['Excelente clima, mas podem evitar decisões difíceis', 'Precisam de D para dar direção', 'Ótimos para suporte e atendimento'] },
        'CC': { nivel: '70%', titulo: 'Boa Compatibilidade', descricao: 'Dois C entregam qualidade, mas podem se perder em detalhes.', dicas: ['Precisam de D ou I para executar com velocidade', 'Excelentes em análise e processos', 'Risco: paralisação por excesso de análise'] }
    };

    const chave = [perfil1, perfil2].sort().join('');
    const dados = compatibilidades[chave] || compatibilidades['DD'];

    resultado.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
            <div style="font-size:48px; font-weight:700; color:var(--cor-primaria);">${dados.nivel}</div>
            <h3 style="margin:0;">${dados.titulo}</h3>
        </div>
        <p><strong>Análise:</strong> ${dados.descricao}</p>
        <h4 style="color:var(--cor-primaria); margin-top:16px; margin-bottom:8px;">💡 Dicas para Melhorar a Colaboração:</h4>
        <ul style="margin:0; padding-left:20px;">
            ${dados.dicas.map(d => `<li style="margin-bottom:6px;">${d}</li>`).join('')}
        </ul>
    `;
    resultado.classList.add('show');
};

// ============================================================================
// 8) AÇÕES RÁPIDAS — exposto globalmente
// ============================================================================
window.irParaSistema = function(tipo) {
    const urls = {
        disc:      "https://www.discprofpaulorocha.com/",
        curriculo: "https://www.discprofpaulorocha.com/curriculo"
    };
    const url = urls[tipo];
    if (!url) return;

    const modal   = document.getElementById("modalRedir");
    const confirm = document.getElementById("modalRedirConfirm");
    const cancel  = document.getElementById("modalRedirCancel");

    modal.classList.add("ativo");

    confirm.onclick = () => {
        modal.classList.remove("ativo");
        window.open(url, "_blank");
    };

    cancel.onclick = () => modal.classList.remove("ativo");

    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove("ativo");
    };
};

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
    carregarPerguntaDia();

    setInterval(atualizarCardsRotativos, 20000);
});