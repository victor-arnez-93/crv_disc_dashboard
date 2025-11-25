// ============================================
// TESTE-DISC.JS — Dashboard DISC
// Lógica completa do teste comportamental
// ============================================

// ===== ESTADO GLOBAL =====
const estadoTeste = {
    telaAtual: 'intro',
    usuario: { nome: '', email: '' },
    perguntaAtual: 0,
    respostas: [],
    pontuacao: { D: 0, I: 0, S: 0, C: 0 }
};

// ===== BANCO DE PERGUNTAS (12 perguntas DISC) =====
const perguntas = [
    {
        id: 1,
        texto: "Quando estou em um novo desafio, eu costumo:",
        opcoes: [
            { texto: "Assumir a liderança e partir para ação", perfil: "D" },
            { texto: "Motivar os outros e criar entusiasmo", perfil: "I" },
            { texto: "Manter a calma e apoiar o grupo", perfil: "S" },
            { texto: "Planejar cada detalhe antes de agir", perfil: "C" }
        ]
    },
    {
        id: 2,
        texto: "Em situações de pressão, eu tendo a:",
        opcoes: [
            { texto: "Tomar decisões rápidas e assumir riscos", perfil: "D" },
            { texto: "Buscar apoio e conversar com outras pessoas", perfil: "I" },
            { texto: "Manter a estabilidade e evitar conflitos", perfil: "S" },
            { texto: "Analisar os fatos e agir com cautela", perfil: "C" }
        ]
    },
    {
        id: 3,
        texto: "No ambiente de trabalho, eu prefiro:",
        opcoes: [
            { texto: "Competir e alcançar metas ambiciosas", perfil: "D" },
            { texto: "Trabalhar em equipe e socializar", perfil: "I" },
            { texto: "Seguir rotinas previsíveis e estáveis", perfil: "S" },
            { texto: "Focar em qualidade e precisão", perfil: "C" }
        ]
    },
    {
        id: 4,
        texto: "Ao receber feedback, eu:",
        opcoes: [
            { texto: "Foco no que preciso melhorar para vencer", perfil: "D" },
            { texto: "Agradeço e valorizo o relacionamento", perfil: "I" },
            { texto: "Escuto com paciência e evito confronto", perfil: "S" },
            { texto: "Analiso criticamente e questiono os dados", perfil: "C" }
        ]
    },
    {
        id: 5,
        texto: "Minha forma de comunicação é:",
        opcoes: [
            { texto: "Direta, objetiva e assertiva", perfil: "D" },
            { texto: "Expressiva, animada e envolvente", perfil: "I" },
            { texto: "Calma, amigável e cooperativa", perfil: "S" },
            { texto: "Formal, precisa e detalhada", perfil: "C" }
        ]
    },
    {
        id: 6,
        texto: "Quando trabalho em equipe, eu:",
        opcoes: [
            { texto: "Tomo a iniciativa e lidero naturalmente", perfil: "D" },
            { texto: "Animo o grupo e crio um clima positivo", perfil: "I" },
            { texto: "Apoio os outros e mantenho harmonia", perfil: "S" },
            { texto: "Organizo tarefas e garanto qualidade", perfil: "C" }
        ]
    },
    {
        id: 7,
        texto: "Diante de mudanças inesperadas, eu:",
        opcoes: [
            { texto: "Adapto-me rapidamente e sigo em frente", perfil: "D" },
            { texto: "Vejo oportunidades e tento envolver todos", perfil: "I" },
            { texto: "Preciso de tempo para me ajustar", perfil: "S" },
            { texto: "Analiso os impactos antes de aceitar", perfil: "C" }
        ]
    },
    {
        id: 8,
        texto: "Minha maior motivação é:",
        opcoes: [
            { texto: "Conquistar resultados e superar desafios", perfil: "D" },
            { texto: "Ser reconhecido e admirado pelos outros", perfil: "I" },
            { texto: "Contribuir para o bem-estar do grupo", perfil: "S" },
            { texto: "Fazer um trabalho perfeito e preciso", perfil: "C" }
        ]
    },
    {
        id: 9,
        texto: "Ao tomar decisões importantes, eu:",
        opcoes: [
            { texto: "Decido rapidamente com base na intuição", perfil: "D" },
            { texto: "Consulto outras pessoas e busco consenso", perfil: "I" },
            { texto: "Prefiro que outros decidam ou sigo o grupo", perfil: "S" },
            { texto: "Analiso todas as informações disponíveis", perfil: "C" }
        ]
    },
    {
        id: 10,
        texto: "Meu ritmo de trabalho é:",
        opcoes: [
            { texto: "Rápido, intenso e focado em resultados", perfil: "D" },
            { texto: "Dinâmico, variado e com interações sociais", perfil: "I" },
            { texto: "Constante, estável e sem pressa", perfil: "S" },
            { texto: "Metódico, cuidadoso e detalhista", perfil: "C" }
        ]
    },
    {
        id: 11,
        texto: "Em conflitos, eu costumo:",
        opcoes: [
            { texto: "Confrontar diretamente e resolver logo", perfil: "D" },
            { texto: "Usar humor e diplomacia para amenizar", perfil: "I" },
            { texto: "Evitar confronto e buscar a paz", perfil: "S" },
            { texto: "Apresentar argumentos lógicos e racionais", perfil: "C" }
        ]
    },
    {
        id: 12,
        texto: "Meu estilo de liderança é:",
        opcoes: [
            { texto: "Autoritário e orientado a metas", perfil: "D" },
            { texto: "Inspirador e motivador", perfil: "I" },
            { texto: "Facilitador e apoiador", perfil: "S" },
            { texto: "Sistemático e baseado em procedimentos", perfil: "C" }
        ]
    }
];

// ===== DESCRIÇÕES DOS PERFIS =====
const descricoesPerfis = {
    D: {
        nome: "Dominância",
        cor: "#ef4444",
        descricao: "Decisivo, competitivo, gosta de desafios, focado em resultados, assertivo.",
        pontosFortes: [
            "Assertivo e iniciativo",
            "Liderança natural",
            "Independente e competitivo",
            "Focado em resultados",
            "Auto-gerenciável",
            "Decisões rápidas"
        ],
        pontosAtencao: [
            "Arrogância / impaciência",
            "Possível insensibilidade",
            "Tendência a autoritarismo",
            "Pode soar dominante / inflexível"
        ],
        areas: ["Liderança", "Empreendedorismo", "Gestão de Projetos", "Vendas Estratégicas"],
        cargos: ["CEO / Diretor Executivo", "Gerente de Projetos", "Consultor Estratégico", "Empreendedor", "Executivo de Vendas"]
    },
    I: {
        nome: "Influência",
        cor: "#f59e0b",
        descricao: "Extrovertido, persuasivo, sociável, criativo, gosta de trabalhar em equipe.",
        pontosFortes: [
            "Otimista e entusiasmado",
            "Comunicação fácil",
            "Trabalho em equipe",
            "Persuasivo",
            "Criativo e intuitivo",
            "Motivador / inspirador"
        ],
        pontosAtencao: [
            "Volúvel / desorganizado",
            "Procrastinação",
            "Busca exagerada por aprovação",
            "Ingenuidade",
            "Dificuldade com regras rígidas"
        ],
        areas: ["Comunicação", "Marketing", "Vendas", "Relações Públicas", "Entretenimento"],
        cargos: ["Publicitário", "Profissional de Marketing Digital", "Consultor Comercial", "Relações Públicas", "Palestrante / Coach", "RH (T&D)"]
    },
    S: {
        nome: "Estabilidade",
        cor: "#10b981",
        descricao: "Calmo, paciente, empático, cooperativo, gosta de rotinas e segurança.",
        pontosFortes: [
            "Metódico e disciplinado",
            "Paciente e tolerante",
            "Equilibrado e confiável",
            "Sensível e empático",
            "Modesto e amigável",
            "Bom ouvinte / conciliador"
        ],
        pontosAtencao: [
            "Resistência a mudanças",
            "Indecisão / procrastinação",
            "Dificuldade em impor limites",
            "Aversão a conflitos",
            "Se magoa com facilidade"
        ],
        areas: ["Recursos Humanos", "Atendimento ao Cliente", "Educação", "Assistência Social"],
        cargos: ["Psicólogo", "Assistente Social", "Professor / Instrutor", "Enfermeiro", "Atendimento ao Cliente", "RH (DP / GP)"]
    },
    C: {
        nome: "Conformidade",
        cor: "#3b82f6",
        descricao: "Detalhista, analítico, organizado, segue regras, busca excelência.",
        pontosFortes: [
            "Planejamento estratégico",
            "Análise e pensamento crítico",
            "Organização / disciplina",
            "Especialização técnica",
            "Cuidado com qualidade e precisão",
            "Observador e criterioso"
        ],
        pontosAtencao: [
            "Perfeccionismo / crítica em excesso",
            "Tendência ao isolamento",
            "Resistência a mudanças abruptas",
            "Inflexibilidade com regras",
            "Dificuldade em delegar"
        ],
        areas: ["Finanças", "Engenharia", "Tecnologia", "Pesquisa", "Jurídico"],
        cargos: ["Engenheiro", "Cientista de Dados", "Auditor / Contador", "Advogado", "Programador / Desenvolvedor de Software", "Analista Financeiro"]
    }
};

// ===== ELEMENTOS DO DOM =====
const elementos = {
    // Telas
    intro: document.getElementById('discIntro'),
    consentimento: document.getElementById('discConsentimento'),
    instrucoes: document.getElementById('discInstrucoes'),
    perguntas: document.getElementById('discPerguntas'),
    resultado: document.getElementById('discResultado'),

    // Botões navegação
    btnConcordarInicio: document.getElementById('btnConcordarInicio'),
    btnVoltarIntro: document.getElementById('btnVoltarIntro'),
    btnConcordarLGPD: document.getElementById('btnConcordarLGPD'),
    btnComecar: document.getElementById('btnComecar'),
    btnProximo: document.getElementById('btnProximo'),

    // Formulário
    inputNome: document.getElementById('inputNome'),
    inputEmail: document.getElementById('inputEmail'),
    checkLGPD: document.getElementById('checkLGPD'),

    // Perguntas
    numeroPergunta: document.getElementById('numeroPergunta'),
    progressoFill: document.getElementById('progressoFill'),
    perguntaTexto: document.getElementById('perguntaTexto'),
    opcoesLista: document.getElementById('opcoesLista')
};

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function mostrarTela(nomeTela) {
    // Esconde todas as telas
    elementos.intro.style.display = 'none';
    elementos.consentimento.style.display = 'none';
    elementos.instrucoes.style.display = 'none';
    elementos.perguntas.style.display = 'none';
    elementos.resultado.style.display = 'none';

    // Mostra a tela solicitada
    if (nomeTela === 'intro') elementos.intro.style.display = 'block';
    if (nomeTela === 'consentimento') elementos.consentimento.style.display = 'block';
    if (nomeTela === 'instrucoes') elementos.instrucoes.style.display = 'block';
    if (nomeTela === 'perguntas') elementos.perguntas.style.display = 'block';
    if (nomeTela === 'resultado') elementos.resultado.style.display = 'block';

    estadoTeste.telaAtual = nomeTela;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function validarFormulario() {
    const nomeValido = elementos.inputNome.value.trim().length >= 3;
    const emailValido = elementos.inputEmail.value.includes('@');
    const checkMarcado = elementos.checkLGPD.checked;

    elementos.btnConcordarLGPD.disabled = !(nomeValido && emailValido && checkMarcado);
}

// ===== RENDERIZAR PERGUNTA =====
function renderizarPergunta() {
    const pergunta = perguntas[estadoTeste.perguntaAtual];

    // Atualiza número da pergunta
    elementos.numeroPergunta.textContent = estadoTeste.perguntaAtual + 1;

    // Atualiza progresso
    const progresso = ((estadoTeste.perguntaAtual + 1) / perguntas.length) * 100;
    elementos.progressoFill.style.width = `${progresso}%`;

    // Atualiza texto da pergunta
    elementos.perguntaTexto.textContent = pergunta.texto;

    // Renderiza opções
    elementos.opcoesLista.innerHTML = pergunta.opcoes.map((opcao, index) => `
        <label class="opcao-item" data-index="${index}">
            <input type="radio" name="opcao" value="${opcao.perfil}" data-index="${index}">
            <span>${opcao.texto}</span>
        </label>
    `).join('');

    // Adiciona evento de seleção
    document.querySelectorAll('.opcao-item').forEach(item => {
        item.addEventListener('click', () => {
            const radio = item.querySelector('input[type="radio"]');
            radio.checked = true;

            // Remove seleção anterior
            document.querySelectorAll('.opcao-item').forEach(i => i.classList.remove('selecionada'));

            // Adiciona classe selecionada
            item.classList.add('selecionada');

            // Habilita botão próximo
            elementos.btnProximo.disabled = false;
        });
    });

    // Desabilita botão próximo
    elementos.btnProximo.disabled = true;
}

// ===== PRÓXIMA PERGUNTA =====
function proximaPergunta() {
    // Pega resposta selecionada
    const respostaSelecionada = document.querySelector('input[name="opcao"]:checked');

    if (!respostaSelecionada) return;

    // Salva resposta
    estadoTeste.respostas.push({
        pergunta: estadoTeste.perguntaAtual + 1,
        perfil: respostaSelecionada.value
    });

    // Atualiza pontuação
    estadoTeste.pontuacao[respostaSelecionada.value]++;

    // Verifica se há mais perguntas
    if (estadoTeste.perguntaAtual < perguntas.length - 1) {
        estadoTeste.perguntaAtual++;
        renderizarPergunta();
    } else {
        // Teste finalizado - mostra resultado
        mostrarResultado();
    }
}

// ===== CALCULAR PERFIL PREDOMINANTE =====
function calcularPerfilPredominante() {
    const perfis = ['D', 'I', 'S', 'C'];
    let maiorPontuacao = 0;
    let perfilPredominante = 'D';

    perfis.forEach(perfil => {
        if (estadoTeste.pontuacao[perfil] > maiorPontuacao) {
            maiorPontuacao = estadoTeste.pontuacao[perfil];
            perfilPredominante = perfil;
        }
    });

    return perfilPredominante;
}

// ===== MOSTRAR RESULTADO =====
function mostrarResultado() {
    const perfilPredominante = calcularPerfilPredominante();
    const dadosPerfil = descricoesPerfis[perfilPredominante];

    elementos.resultado.innerHTML = `
        <div class="result-card">
            <div class="result-head">
                <h2><i class="fas fa-chart-pie"></i> Resultado DISC</h2>
                <p>Seu perfil comportamental foi calculado com sucesso!</p>
            </div>

            <div class="result-user">
                <h3>${estadoTeste.usuario.nome}</h3>
                <p>${estadoTeste.usuario.email}</p>
            </div>

            <div class="result-scores">
                <div class="score-item score-d">
                    <h4>D (Dominância)</h4>
                    <div class="score-valor">${estadoTeste.pontuacao.D}</div>
                </div>
                <div class="score-item score-i">
                    <h4>I (Influência)</h4>
                    <div class="score-valor">${estadoTeste.pontuacao.I}</div>
                </div>
                <div class="score-item score-s">
                    <h4>S (Estabilidade)</h4>
                    <div class="score-valor">${estadoTeste.pontuacao.S}</div>
                </div>
                <div class="score-item score-c">
                    <h4>C (Conformidade)</h4>
                    <div class="score-valor">${estadoTeste.pontuacao.C}</div>
                </div>
            </div>

            <div class="result-perfil">
                <h3>Perfil predominante:</h3>
                <div class="perfil-badge">${perfilPredominante}</div>
            </div>
        </div>

        <div class="disc-grid-4">
            ${Object.entries(descricoesPerfis).map(([letra, dados]) => `
                <div class="card-inner">
                    <h2 style="color: ${dados.cor};">${letra} • ${dados.nome}</h2>
                    <p>${dados.descricao}</p>

                    <h3 style="color: ${dados.cor}; margin-top: 20px;">Pontos Fortes</h3>
                    <ul style="font-size: 14px; color: var(--disc-text);">
                        ${dados.pontosFortes.map(p => `<li>${p}</li>`).join('')}
                    </ul>

                    <h3 style="color: ${dados.cor}; margin-top: 20px;">Pontos de Atenção</h3>
                    <ul style="font-size: 14px; color: var(--disc-muted);">
                        ${dados.pontosAtencao.map(p => `<li>${p}</li>`).join('')}
                    </ul>

                    <h3 style="color: ${dados.cor}; margin-top: 20px;">Áreas Recomendadas</h3>
                    <ul style="font-size: 14px; color: var(--disc-text);">
                        ${dados.areas.map(a => `<li>${a}</li>`).join('')}
                    </ul>

                    <h3 style="color: ${dados.cor}; margin-top: 20px;">Cargos Indicados</h3>
                    <ul style="font-size: 14px; color: var(--disc-text);">
                        ${dados.cargos.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>

        <div class="disc-acoes">
            <button class="button primary" onclick="window.print()">
                <i class="fas fa-file-pdf"></i> Salvar em PDF
            </button>
            <button class="button primary" onclick="location.reload()">
                <i class="fas fa-redo"></i> Novo Teste
            </button>
            <button class="button" onclick="window.location.href='/index.html'">
                <i class="fas fa-home"></i> Voltar ao Dashboard
            </button>
        </div>
    `;

    mostrarTela('resultado');
    console.log('✅ Teste finalizado!', estadoTeste);
}

// ===== EVENT LISTENERS =====
function inicializarEventos() {
    // Botão: Concordo e quero iniciar (tela intro)
    elementos.btnConcordarInicio?.addEventListener('click', () => {
        mostrarTela('consentimento');
    });

    // Botão: Voltar (tela consentimento)
    elementos.btnVoltarIntro?.addEventListener('click', () => {
        mostrarTela('intro');
    });

    // Validação do formulário
    elementos.inputNome?.addEventListener('input', validarFormulario);
    elementos.inputEmail?.addEventListener('input', validarFormulario);
    elementos.checkLGPD?.addEventListener('change', validarFormulario);

    // Botão: Concordo e iniciar (tela consentimento)
    elementos.btnConcordarLGPD?.addEventListener('click', () => {
        estadoTeste.usuario.nome = elementos.inputNome.value.trim();
        estadoTeste.usuario.email = elementos.inputEmail.value.trim();
        mostrarTela('instrucoes');
    });

    // Botão: Começar (tela instruções)
    elementos.btnComecar?.addEventListener('click', () => {
        mostrarTela('perguntas');
        renderizarPergunta();
    });

    // Botão: Próxima (tela perguntas)
    elementos.btnProximo?.addEventListener('click', proximaPergunta);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Teste DISC carregado!');
    inicializarEventos();
    mostrarTela('intro');
});
