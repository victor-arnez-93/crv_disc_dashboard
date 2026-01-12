// ============================================================================
// QUIZ_GENERATOR.JS — DISC DASHBOARD
// Gerador de Quiz para Aulas (50 Perguntas + Lógica Completa)
// ============================================================================

// ============================================================================
// BANCO DE PERGUNTAS (50 QUESTÕES)
// ============================================================================

const bancoPerguntas = [
    // ===== PERFIS DISC (15 perguntas) =====
    {
        id: 1,
        tema: "disc",
        dificuldade: "basico",
        pergunta: "Qual perfil DISC é caracterizado por ser direto, orientado para resultados e gostar de desafios?",
        alternativas: [
            { texto: "Dominância (D)", correta: true },
            { texto: "Influência (I)", correta: false },
            { texto: "Estabilidade (S)", correta: false },
            { texto: "Conformidade (C)", correta: false }
        ]
    },
    {
        id: 2,
        tema: "disc",
        dificuldade: "basico",
        pergunta: "Qual perfil valoriza mais relacionamentos sociais, comunicação expressiva e ambientes colaborativos?",
        alternativas: [
            { texto: "Dominância (D)", correta: false },
            { texto: "Influência (I)", correta: true },
            { texto: "Estabilidade (S)", correta: false },
            { texto: "Conformidade (C)", correta: false }
        ]
    },
    {
        id: 3,
        tema: "disc",
        dificuldade: "basico",
        pergunta: "O perfil S (Estabilidade) é conhecido por qual característica principal?",
        alternativas: [
            { texto: "Agressividade e competitividade", correta: false },
            { texto: "Paciência, cooperação e busca por harmonia", correta: true },
            { texto: "Análise detalhada e perfeccionismo", correta: false },
            { texto: "Comunicação persuasiva e entusiasmo", correta: false }
        ]
    },
    {
        id: 4,
        tema: "disc",
        dificuldade: "intermediario",
        pergunta: "Qual perfil DISC tende a evitar conflitos e prefere ambientes previsíveis?",
        alternativas: [
            { texto: "D - Dominância", correta: false },
            { texto: "I - Influência", correta: false },
            { texto: "S - Estabilidade", correta: true },
            { texto: "C - Conformidade", correta: false }
        ]
    },
    {
        id: 5,
        tema: "disc",
        dificuldade: "intermediario",
        pergunta: "O perfil C (Conformidade) valoriza principalmente:",
        alternativas: [
            { texto: "Rapidez na tomada de decisões", correta: false },
            { texto: "Precisão, qualidade e análise detalhada", correta: true },
            { texto: "Reconhecimento público e visibilidade", correta: false },
            { texto: "Trabalho em equipe acima de tudo", correta: false }
        ]
    },
    {
        id: 6,
        tema: "disc",
        dificuldade: "avancado",
        pergunta: "Em situações de pressão, qual comportamento é mais comum no perfil D?",
        alternativas: [
            { texto: "Buscar consenso antes de agir", correta: false },
            { texto: "Tomar decisões rápidas e assertivas, mesmo com riscos", correta: true },
            { texto: "Analisar exaustivamente todos os dados disponíveis", correta: false },
            { texto: "Evitar conflitos e aguardar orientação", correta: false }
        ]
    },
    {
        id: 7,
        tema: "disc",
        dificuldade: "avancado",
        pergunta: "Qual combinação de perfis DISC tende a ter maior dificuldade inicial de comunicação?",
        alternativas: [
            { texto: "D (Dominância) e C (Conformidade)", correta: true },
            { texto: "I (Influência) e S (Estabilidade)", correta: false },
            { texto: "D (Dominância) e I (Influência)", correta: false },
            { texto: "S (Estabilidade) e C (Conformidade)", correta: false }
        ]
    },
    {
        id: 8,
        tema: "disc",
        dificuldade: "basico",
        pergunta: "Qual perfil tende a ser mais entusiasta, otimista e motivador em equipes?",
        alternativas: [
            { texto: "D - Dominância", correta: false },
            { texto: "I - Influência", correta: true },
            { texto: "S - Estabilidade", correta: false },
            { texto: "C - Conformidade", correta: false }
        ]
    },
    {
        id: 9,
        tema: "disc",
        dificuldade: "intermediario",
        pergunta: "Para motivar um colaborador com perfil C, o líder deve:",
        alternativas: [
            { texto: "Dar desafios ousados e metas agressivas", correta: false },
            { texto: "Fornecer dados precisos, tempo para análise e reconhecer qualidade", correta: true },
            { texto: "Criar eventos sociais e momentos de interação", correta: false },
            { texto: "Garantir estabilidade e evitar mudanças bruscas", correta: false }
        ]
    },
    {
        id: 10,
        tema: "disc",
        dificuldade: "avancado",
        pergunta: "Qual é o principal medo (fator de estresse) do perfil S?",
        alternativas: [
            { texto: "Perder controle ou status", correta: false },
            { texto: "Ser rejeitado socialmente", correta: false },
            { texto: "Mudanças súbitas e perda de estabilidade", correta: true },
            { texto: "Cometer erros ou ter trabalho criticado", correta: false }
        ]
    },
    {
        id: 11,
        tema: "disc",
        dificuldade: "basico",
        pergunta: "Qual perfil costuma fazer muitas perguntas técnicas e buscar precisão nos processos?",
        alternativas: [
            { texto: "D - Dominância", correta: false },
            { texto: "I - Influência", correta: false },
            { texto: "S - Estabilidade", correta: false },
            { texto: "C - Conformidade", correta: true }
        ]
    },
    {
        id: 12,
        tema: "disc",
        dificuldade: "intermediario",
        pergunta: "Em reuniões, qual comportamento é típico do perfil I?",
        alternativas: [
            { texto: "Falar bastante, trazer energia e ideias criativas", correta: true },
            { texto: "Observar em silêncio e fazer anotações detalhadas", correta: false },
            { texto: "Questionar riscos e pedir mais dados", correta: false },
            { texto: "Buscar consenso antes de se posicionar", correta: false }
        ]
    },
    {
        id: 13,
        tema: "disc",
        dificuldade: "avancado",
        pergunta: "Qual estratégia é mais eficaz para dar feedback negativo a um perfil D?",
        alternativas: [
            { texto: "Ser direto, focado em resultados e propor soluções rápidas", correta: true },
            { texto: "Fazer elogios prolongados antes de mencionar o problema", correta: false },
            { texto: "Enviar e-mail detalhado com dados estatísticos", correta: false },
            { texto: "Evitar confronto e sugerir mudanças sutis", correta: false }
        ]
    },
    {
        id: 14,
        tema: "disc",
        dificuldade: "intermediario",
        pergunta: "Qual perfil tende a ter maior dificuldade em dizer 'não' e estabelecer limites?",
        alternativas: [
            { texto: "D - Dominância", correta: false },
            { texto: "I - Influência", correta: false },
            { texto: "S - Estabilidade", correta: true },
            { texto: "C - Conformidade", correta: false }
        ]
    },
    {
        id: 15,
        tema: "disc",
        dificuldade: "avancado",
        pergunta: "Em uma equipe multidisciplinar, qual combinação de perfis tende a gerar mais inovação?",
        alternativas: [
            { texto: "D + I (Dominância + Influência)", correta: true },
            { texto: "S + C (Estabilidade + Conformidade)", correta: false },
            { texto: "D + C (Dominância + Conformidade)", correta: false },
            { texto: "Apenas perfis I (Influência)", correta: false }
        ]
    },

    // ===== LIDERANÇA (15 perguntas) =====
    {
        id: 16,
        tema: "lideranca",
        dificuldade: "basico",
        pergunta: "Qual é a principal diferença entre chefe e líder?",
        alternativas: [
            { texto: "Chefe manda, líder inspira e desenvolve pessoas", correta: true },
            { texto: "Não há diferença, são sinônimos", correta: false },
            { texto: "Chefe tem mais experiência técnica", correta: false },
            { texto: "Líder trabalha mais horas que chefe", correta: false }
        ]
    },
    {
        id: 17,
        tema: "lideranca",
        dificuldade: "basico",
        pergunta: "O que caracteriza uma liderança situacional?",
        alternativas: [
            { texto: "Usar sempre o mesmo estilo de liderança", correta: false },
            { texto: "Adaptar o estilo de liderança conforme maturidade da equipe", correta: true },
            { texto: "Liderar apenas em situações de crise", correta: false },
            { texto: "Delegar todas as decisões para a equipe", correta: false }
        ]
    },
    {
        id: 18,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "Segundo estudos, qual fator mais impacta a retenção de talentos?",
        alternativas: [
            { texto: "Salário acima da média do mercado", correta: false },
            { texto: "Qualidade da liderança direta", correta: true },
            { texto: "Benefícios corporativos", correta: false },
            { texto: "Estrutura física do escritório", correta: false }
        ]
    },
    {
        id: 19,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "O que significa 'empoderamento' (empowerment) em liderança?",
        alternativas: [
            { texto: "Dar mais trabalho para equipe", correta: false },
            { texto: "Delegar autoridade, autonomia e recursos para decisões", correta: true },
            { texto: "Promover todos os colaboradores", correta: false },
            { texto: "Aumentar salários de forma igualitária", correta: false }
        ]
    },
    {
        id: 20,
        tema: "lideranca",
        dificuldade: "avancado",
        pergunta: "Qual conceito do Google define ambientes onde pessoas se sentem seguras para assumir riscos?",
        alternativas: [
            { texto: "Zona de conforto", correta: false },
            { texto: "Segurança psicológica", correta: true },
            { texto: "Liderança liberal", correta: false },
            { texto: "Gestão por objetivos", correta: false }
        ]
    },
    {
        id: 21,
        tema: "lideranca",
        dificuldade: "basico",
        pergunta: "Qual comportamento NÃO é recomendado para líderes eficazes?",
        alternativas: [
            { texto: "Dar feedback construtivo regularmente", correta: false },
            { texto: "Microgerenciar cada tarefa da equipe", correta: true },
            { texto: "Reconhecer conquistas da equipe", correta: false },
            { texto: "Desenvolver habilidades dos colaboradores", correta: false }
        ]
    },
    {
        id: 22,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "O modelo de liderança servant leadership (liderança servidora) prioriza:",
        alternativas: [
            { texto: "Autoridade e hierarquia rígida", correta: false },
            { texto: "Servir e desenvolver a equipe em primeiro lugar", correta: true },
            { texto: "Resultados financeiros acima de tudo", correta: false },
            { texto: "Processos burocráticos e controle", correta: false }
        ]
    },
    {
        id: 23,
        tema: "lideranca",
        dificuldade: "avancado",
        pergunta: "Segundo pesquisas da Gallup, qual percentual de colaboradores deixam empresas por causa de gestores ruins?",
        alternativas: [
            { texto: "20-30%", correta: false },
            { texto: "40-50%", correta: false },
            { texto: "60-70%", correta: true },
            { texto: "80-90%", correta: false }
        ]
    },
    {
        id: 24,
        tema: "lideranca",
        dificuldade: "basico",
        pergunta: "O que é 'feedback sanduíche'?",
        alternativas: [
            { texto: "Dar feedback durante o almoço", correta: false },
            { texto: "Elogio + crítica construtiva + elogio", correta: true },
            { texto: "Feedback escrito em três partes", correta: false },
            { texto: "Reunião de feedback com três pessoas", correta: false }
        ]
    },
    {
        id: 25,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "Qual é a frequência ideal para reuniões individuais (one-on-ones) com colaboradores?",
        alternativas: [
            { texto: "Uma vez por ano", correta: false },
            { texto: "Semanal ou quinzenal", correta: true },
            { texto: "Apenas quando há problemas", correta: false },
            { texto: "Mensalmente, no máximo", correta: false }
        ]
    },
    {
        id: 26,
        tema: "lideranca",
        dificuldade: "avancado",
        pergunta: "O que diferencia liderança transacional de liderança transformacional?",
        alternativas: [
            { texto: "Transacional foca em recompensas/punições; Transformacional inspira mudança", correta: true },
            { texto: "São sinônimos, não há diferença", correta: false },
            { texto: "Transacional é mais eficaz em todos os contextos", correta: false },
            { texto: "Transformacional é exclusiva para startups", correta: false }
        ]
    },
    {
        id: 27,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "Qual atitude demonstra vulnerabilidade positiva em líderes?",
        alternativas: [
            { texto: "Nunca admitir erros para manter autoridade", correta: false },
            { texto: "Compartilhar desafios e pedir ajuda quando necessário", correta: true },
            { texto: "Culpar a equipe por falhas", correta: false },
            { texto: "Esconder informações estratégicas", correta: false }
        ]
    },
    {
        id: 28,
        tema: "lideranca",
        dificuldade: "basico",
        pergunta: "O que significa 'dar autonomia' para a equipe?",
        alternativas: [
            { texto: "Abandonar a equipe sem suporte", correta: false },
            { texto: "Permitir que decidam como executar tarefas dentro de limites claros", correta: true },
            { texto: "Fazer tudo sozinho como líder", correta: false },
            { texto: "Nunca dar orientações", correta: false }
        ]
    },
    {
        id: 29,
        tema: "lideranca",
        dificuldade: "avancado",
        pergunta: "Segundo Daniel Goleman, qual é o componente MAIS importante da inteligência emocional para líderes?",
        alternativas: [
            { texto: "Autoconsciência (self-awareness)", correta: true },
            { texto: "QI técnico elevado", correta: false },
            { texto: "Carisma natural", correta: false },
            { texto: "Experiência de mercado", correta: false }
        ]
    },
    {
        id: 30,
        tema: "lideranca",
        dificuldade: "intermediario",
        pergunta: "Qual comportamento caracteriza microgerenciamento?",
        alternativas: [
            { texto: "Dar feedback constante e construtivo", correta: false },
            { texto: "Controlar cada detalhe e não confiar na equipe", correta: true },
            { texto: "Estabelecer metas claras", correta: false },
            { texto: "Desenvolver planos de carreira", correta: false }
        ]
    },

    // ===== COMUNICAÇÃO (10 perguntas) =====
    {
        id: 31,
        tema: "comunicacao",
        dificuldade: "basico",
        pergunta: "O que é escuta ativa?",
        alternativas: [
            { texto: "Ouvir enquanto prepara sua resposta", correta: false },
            { texto: "Prestar atenção total, sem interrupções, e confirmar entendimento", correta: true },
            { texto: "Ouvir música enquanto trabalha", correta: false },
            { texto: "Apenas concordar com tudo que é dito", correta: false }
        ]
    },
    {
        id: 32,
        tema: "comunicacao",
        dificuldade: "intermediario",
        pergunta: "Segundo estudos, qual percentual da comunicação é não-verbal (linguagem corporal, tom)?",
        alternativas: [
            { texto: "20-30%", correta: false },
            { texto: "40-50%", correta: false },
            { texto: "70-93%", correta: true },
            { texto: "10-15%", correta: false }
        ]
    },
    {
        id: 33,
        tema: "comunicacao",
        dificuldade: "basico",
        pergunta: "Qual é a melhor forma de dar feedback negativo?",
        alternativas: [
            { texto: "Em público para servir de exemplo", correta: false },
            { texto: "Em particular, focando em comportamentos específicos", correta: true },
            { texto: "Por e-mail coletivo", correta: false },
            { texto: "Nunca dar feedback negativo", correta: false }
        ]
    },
    {
        id: 34,
        tema: "comunicacao",
        dificuldade: "intermediario",
        pergunta: "O que é comunicação assertiva?",
        alternativas: [
            { texto: "Ser agressivo para impor sua opinião", correta: false },
            { texto: "Expressar necessidades com clareza e respeito", correta: true },
            { texto: "Evitar conflitos a todo custo", correta: false },
            { texto: "Concordar sempre com superiores", correta: false }
        ]
    },
    {
        id: 35,
        tema: "comunicacao",
        dificuldade: "avancado",
        pergunta: "Qual técnica de comunicação usa 'Eu sinto... quando... porque...'?",
        alternativas: [
            { texto: "Comunicação passiva", correta: false },
            { texto: "Comunicação Não-Violenta (CNV)", correta: true },
            { texto: "Comunicação agressiva", correta: false },
            { texto: "Comunicação corporativa", correta: false }
        ]
    },
    {
        id: 36,
        tema: "comunicacao",
        dificuldade: "basico",
        pergunta: "Qual atitude prejudica a escuta ativa?",
        alternativas: [
            { texto: "Manter contato visual", correta: false },
            { texto: "Interromper constantemente o interlocutor", correta: true },
            { texto: "Fazer perguntas de esclarecimento", correta: false },
            { texto: "Parafrasear para confirmar entendimento", correta: false }
        ]
    },
    {
        id: 37,
        tema: "comunicacao",
        dificuldade: "intermediario",
        pergunta: "Em comunicação corporativa, o que significa 'ruído'?",
        alternativas: [
            { texto: "Som alto no ambiente", correta: false },
            { texto: "Barreiras que distorcem ou impedem a mensagem", correta: true },
            { texto: "Feedback positivo", correta: false },
            { texto: "Comunicação escrita", correta: false }
        ]
    },
    {
        id: 38,
        tema: "comunicacao",
        dificuldade: "avancado",
        pergunta: "Qual é o principal objetivo da comunicação empática?",
        alternativas: [
            { texto: "Convencer o outro do seu ponto de vista", correta: false },
            { texto: "Compreender emoções e perspectivas do interlocutor", correta: true },
            { texto: "Demonstrar superioridade intelectual", correta: false },
            { texto: "Encerrar conversas rapidamente", correta: false }
        ]
    },
    {
        id: 39,
        tema: "comunicacao",
        dificuldade: "intermediario",
        pergunta: "Qual canal de comunicação é mais eficaz para mensagens complexas e estratégicas?",
        alternativas: [
            { texto: "Mensagem de WhatsApp", correta: false },
            { texto: "Reunião presencial ou videoconferência", correta: true },
            { texto: "E-mail genérico", correta: false },
            { texto: "Post em rede social corporativa", correta: false }
        ]
    },
    {
        id: 40,
        tema: "comunicacao",
        dificuldade: "basico",
        pergunta: "O que é 'feedback 360 graus'?",
        alternativas: [
            { texto: "Feedback dado em círculo físico", correta: false },
            { texto: "Avaliação de múltiplas fontes (pares, superiores, subordinados)", correta: true },
            { texto: "Feedback dado uma vez por ano", correta: false },
            { texto: "Feedback apenas do gestor direto", correta: false }
        ]
    },

    // ===== GESTÃO DE CONFLITOS (5 perguntas) =====
    {
        id: 41,
        tema: "conflitos",
        dificuldade: "basico",
        pergunta: "Qual é a primeira etapa para resolver conflitos em equipes?",
        alternativas: [
            { texto: "Punir os envolvidos", correta: false },
            { texto: "Ouvir todas as partes sem julgamento", correta: true },
            { texto: "Ignorar até passar sozinho", correta: false },
            { texto: "Escolher um lado e defender", correta: false }
        ]
    },
    {
        id: 42,
        tema: "conflitos",
        dificuldade: "intermediario",
        pergunta: "O que é mediação de conflitos?",
        alternativas: [
            { texto: "Impor uma solução autoritária", correta: false },
            { texto: "Facilitar diálogo para partes encontrarem solução conjunta", correta: true },
            { texto: "Demitir os envolvidos", correta: false },
            { texto: "Transferir pessoas para outras equipes", correta: false }
        ]
    },
    {
        id: 43,
        tema: "conflitos",
        dificuldade: "avancado",
        pergunta: "Segundo o modelo Thomas-Kilmann, qual estilo de gestão de conflitos busca solução que satisfaça ambas as partes?",
        alternativas: [
            { texto: "Evitação", correta: false },
            { texto: "Competição", correta: false },
            { texto: "Colaboração", correta: true },
            { texto: "Acomodação", correta: false }
        ]
    },
    {
        id: 44,
        tema: "conflitos",
        dificuldade: "intermediario",
        pergunta: "Qual comportamento AGRAVA conflitos em equipes?",
        alternativas: [
            { texto: "Buscar entender perspectivas diferentes", correta: false },
            { texto: "Usar linguagem acusatória e generalizar ('você sempre...')", correta: true },
            { texto: "Focar em soluções futuras", correta: false },
            { texto: "Estabelecer regras claras de convivência", correta: false }
        ]
    },
    {
        id: 45,
        tema: "conflitos",
        dificuldade: "basico",
        pergunta: "Conflitos em equipes são sempre negativos?",
        alternativas: [
            { texto: "Sim, devem ser evitados a qualquer custo", correta: false },
            { texto: "Não, podem gerar inovação se bem gerenciados", correta: true },
            { texto: "Sim, sempre reduzem produtividade", correta: false },
            { texto: "Apenas em empresas pequenas são negativos", correta: false }
        ]
    },

    // ===== MOTIVAÇÃO (5 perguntas) =====
    {
        id: 46,
        tema: "motivacao",
        dificuldade: "basico",
        pergunta: "Segundo a Teoria de Maslow, após necessidades básicas, o que vem a seguir?",
        alternativas: [
            { texto: "Autorrealização", correta: false },
            { texto: "Segurança", correta: true },
            { texto: "Estima", correta: false },
            { texto: "Sociais", correta: false }
        ]
    },
    {
        id: 47,
        tema: "motivacao",
        dificuldade: "intermediario",
        pergunta: "O que a Teoria dos Dois Fatores de Herzberg chama de 'fatores higiênicos'?",
        alternativas: [
            { texto: "Fatores que motivam (reconhecimento, crescimento)", correta: false },
            { texto: "Fatores que previnem insatisfação (salário, ambiente)", correta: true },
            { texto: "Limpeza do ambiente de trabalho", correta: false },
            { texto: "Políticas de saúde corporativa", correta: false }
        ]
    },
    {
        id: 48,
        tema: "motivacao",
        dificuldade: "avancado",
        pergunta: "Segundo Daniel Pink (Drive), quais são os 3 pilares da motivação intrínseca?",
        alternativas: [
            { texto: "Salário, benefícios e férias", correta: false },
            { texto: "Autonomia, maestria e propósito", correta: true },
            { texto: "Controle, hierarquia e poder", correta: false },
            { texto: "Status, reconhecimento e competição", correta: false }
        ]
    },
    {
        id: 49,
        tema: "motivacao",
        dificuldade: "intermediario",
        pergunta: "Qual prática NÃO aumenta motivação da equipe?",
        alternativas: [
            { texto: "Reconhecimento público de conquistas", correta: false },
            { texto: "Microgerenciamento constante", correta: true },
            { texto: "Oportunidades de desenvolvimento", correta: false },
            { texto: "Feedback construtivo regular", correta: false }
        ]
    },
    {
        id: 50,
        tema: "motivacao",
        dificuldade: "basico",
        pergunta: "O que é motivação intrínseca?",
        alternativas: [
            { texto: "Motivação por recompensas externas (dinheiro, prêmios)", correta: false },
            { texto: "Motivação interna, por satisfação pessoal e propósito", correta: true },
            { texto: "Motivação por medo de punição", correta: false },
            { texto: "Motivação apenas para funcionários seniores", correta: false }
        ]
    }
];

// ============================================================================
// VARIÁVEIS GLOBAIS
// ============================================================================

let quizAtual = [];
let respostas = {};
let cronometroInterval = null;
let tempoDecorrido = 0;

// ============================================================================
// ELEMENTOS DOM
// ============================================================================

const btnGerarQuiz = document.getElementById('btnGerarQuiz');
const filtroTema = document.getElementById('filtroTema');
const filtroDificuldade = document.getElementById('filtroDificuldade');
const numPerguntas = document.getElementById('numPerguntas');
const areaQuiz = document.getElementById('areaQuiz');
const mensagemInicial = document.getElementById('mensagemInicial');
const corpoQuiz = document.getElementById('corpoQuiz');
const tituloQuiz = document.getElementById('tituloQuiz');
const cronometroDisplay = document.getElementById('cronometro');
const progressoQuiz = document.getElementById('progressoQuiz');
const resultadoFinal = document.getElementById('resultadoFinal');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnCompartilhar = document.getElementById('btnCompartilhar');
const btnImprimir = document.getElementById('btnImprimir');

// ============================================================================
// EVENT LISTENERS
// ============================================================================

btnGerarQuiz.addEventListener('click', gerarQuiz);
btnReiniciar.addEventListener('click', reiniciarQuiz);
btnCompartilhar.addEventListener('click', compartilharQuiz);
btnImprimir.addEventListener('click', imprimirQuiz);

// ============================================================================
// FUNÇÃO: GERAR QUIZ
// ============================================================================

function gerarQuiz() {
    const tema = filtroTema.value;
    const dificuldade = filtroDificuldade.value;
    const quantidade = parseInt(numPerguntas.value);

    // Filtrar perguntas
    let perguntasFiltradas = [...bancoPerguntas];

    if (tema !== 'todos') {
        perguntasFiltradas = perguntasFiltradas.filter(p => p.tema === tema);
    }

    if (dificuldade !== 'todas') {
        perguntasFiltradas = perguntasFiltradas.filter(p => p.dificuldade === dificuldade);
    }

    // Embaralhar e selecionar quantidade
    perguntasFiltradas = embaralhar(perguntasFiltradas);
    quizAtual = perguntasFiltradas.slice(0, quantidade);

    if (quizAtual.length === 0) {
        alert('Nenhuma pergunta encontrada com esses filtros. Tente outras opções.');
        return;
    }

    // Resetar estado
    respostas = {};
    tempoDecorrido = 0;

    // Atualizar interface
    mensagemInicial.style.display = 'none';
    areaQuiz.style.display = 'block';
    resultadoFinal.style.display = 'none';

    // Atualizar título
    const temaTexto = {
        'todos': 'Geral',
        'disc': 'Perfis DISC',
        'lideranca': 'Liderança',
        'comunicacao': 'Comunicação',
        'conflitos': 'Gestão de Conflitos',
        'motivacao': 'Motivação'
    };
    tituloQuiz.textContent = `Quiz de ${temaTexto[tema]}`;

    // Renderizar perguntas
    renderizarPerguntas();

    // Iniciar cronômetro
    iniciarCronometro();

    // Scroll para o quiz
    areaQuiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// FUNÇÃO: RENDERIZAR PERGUNTAS
// ============================================================================

function renderizarPerguntas() {
    corpoQuiz.innerHTML = '';

    quizAtual.forEach((pergunta, index) => {
        const card = document.createElement('div');
        card.className = 'pergunta-card';
        card.setAttribute('data-pergunta-id', pergunta.id);

        // Embaralhar alternativas
        const alternativasEmbaralhadas = embaralhar([...pergunta.alternativas]);

        card.innerHTML = `
            <span class="pergunta-numero">Questão ${index + 1}</span>
            <p class="pergunta-texto">${pergunta.pergunta}</p>
            <div class="alternativas">
                ${alternativasEmbaralhadas.map((alt, i) => `
                    <label class="alternativa">
                        <input
                            type="radio"
                            name="pergunta_${pergunta.id}"
                            value="${alt.correta}"
                            data-pergunta-id="${pergunta.id}"
                        >
                        <span>${alt.texto}</span>
                    </label>
                `).join('')}
            </div>
        `;

        corpoQuiz.appendChild(card);
    });

    // Adicionar listeners para respostas
    document.querySelectorAll('.alternativa input').forEach(input => {
        input.addEventListener('change', registrarResposta);
    });

    // Atualizar progresso
    atualizarProgresso();
}

// ============================================================================
// FUNÇÃO: REGISTRAR RESPOSTA
// ============================================================================

function registrarResposta(e) {
    const perguntaId = parseInt(e.target.getAttribute('data-pergunta-id'));
    const correta = e.target.value === 'true';

    respostas[perguntaId] = correta;

    // Adicionar classe visual
    const alternativa = e.target.closest('.alternativa');
    document.querySelectorAll(`input[name="pergunta_${perguntaId}"]`).forEach(inp => {
        inp.closest('.alternativa').classList.remove('selecionada');
    });
    alternativa.classList.add('selecionada');

    // Atualizar progresso
    atualizarProgresso();

    // Verificar se finalizou
    if (Object.keys(respostas).length === quizAtual.length) {
        setTimeout(() => finalizarQuiz(), 500);
    }
}

// ============================================================================
// FUNÇÃO: ATUALIZAR PROGRESSO
// ============================================================================

function atualizarProgresso() {
    const total = quizAtual.length;
    const respondidas = Object.keys(respostas).length;
    progressoQuiz.textContent = `${respondidas}/${total}`;
}

// ============================================================================
// FUNÇÃO: FINALIZAR QUIZ
// ============================================================================

function finalizarQuiz() {
    pararCronometro();

    // Calcular acertos
    const acertos = Object.values(respostas).filter(r => r === true).length;
    const total = quizAtual.length;
    const percentual = Math.round((acertos / total) * 100);

    // Mostrar respostas corretas/erradas
    quizAtual.forEach(pergunta => {
        const card = document.querySelector(`[data-pergunta-id="${pergunta.id}"]`);
        const inputs = card.querySelectorAll('input[type="radio"]');

        inputs.forEach(input => {
            const alternativa = input.closest('.alternativa');
            const eCorreta = input.value === 'true';

            if (eCorreta) {
                alternativa.classList.add('correta');
            } else if (input.checked && !eCorreta) {
                alternativa.classList.add('errada');
            }

            // Desabilitar inputs
            input.disabled = true;
        });
    });

    // Mostrar resultado
    document.getElementById('acertosTotal').textContent = acertos;
    document.getElementById('totalPerguntas').textContent = total;
    document.getElementById('percentualAcertos').textContent = `${percentual}%`;

    // Feedback personalizado
    let feedback = '';
    if (percentual >= 90) feedback = '🏆 Excelente! Você domina o assunto!';
    else if (percentual >= 70) feedback = '👏 Muito bom! Continue estudando!';
    else if (percentual >= 50) feedback = '📚 Bom trabalho, mas há espaço para melhoria.';
    else feedback = '💪 Continue praticando, você vai melhorar!';

    document.getElementById('feedbackDesempenho').textContent = feedback;

    resultadoFinal.style.display = 'block';
    resultadoFinal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================================================
// FUNÇÃO: CRONÔMETRO
// ============================================================================

function iniciarCronometro() {
    tempoDecorrido = 0;
    cronometroInterval = setInterval(() => {
        tempoDecorrido++;
        const minutos = Math.floor(tempoDecorrido / 60).toString().padStart(2, '0');
        const segundos = (tempoDecorrido % 60).toString().padStart(2, '0');
        cronometroDisplay.textContent = `${minutos}:${segundos}`;
    }, 1000);
}

function pararCronometro() {
    if (cronometroInterval) {
        clearInterval(cronometroInterval);
        cronometroInterval = null;
    }
}

// ============================================================================
// FUNÇÃO: REINICIAR QUIZ
// ============================================================================

function reiniciarQuiz() {
    pararCronometro();
    mensagemInicial.style.display = 'flex';
    areaQuiz.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// FUNÇÃO: COMPARTILHAR QUIZ
// ============================================================================

function compartilharQuiz() {
    const acertos = Object.values(respostas).filter(r => r === true).length;
    const total = quizAtual.length;
    const percentual = Math.round((acertos / total) * 100);

    const texto = `🎯 Acabei de completar um quiz no DISC Dashboard!\n\n✅ Acertei ${acertos}/${total} questões (${percentual}%)\n⏱️ Tempo: ${cronometroDisplay.textContent}\n\nQue tal tentar também?`;

    if (navigator.share) {
        navigator.share({
            title: 'Quiz DISC Dashboard',
            text: texto
        }).catch(() => copiarTexto(texto));
    } else {
        copiarTexto(texto);
    }
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert('✅ Resultado copiado! Cole onde quiser compartilhar.');
    });
}

// ============================================================================
// FUNÇÃO: IMPRIMIR QUIZ
// ============================================================================

// ============================================================================
// FUNÇÃO: IMPRIMIR QUIZ (VERSÃO LIMPA)
// ============================================================================
function imprimirQuiz() {
    // Criar janela de impressão limpa
    const conteudoOriginal = document.body.innerHTML;
    const areaQuizHTML = document.getElementById('areaQuiz').outerHTML;

    // Template limpo para impressão
    const impressaoHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Quiz para Aulas | DISC Dashboard</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; padding: 30px; background: white; color: black; }
                .cabecalho-impressao { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #F98948; }
                .cabecalho-impressao img { width: 80px; margin-bottom: 10px; }
                .cabecalho-impressao h1 { font-size: 24px; color: #F98948; margin-bottom: 8px; }
                .cabecalho-impressao p { font-size: 14px; color: #666; }
                .pergunta-card { margin-bottom: 30px; page-break-inside: avoid; padding: 20px; border: 2px solid #ddd; border-radius: 10px; }
                .pergunta-numero { background: #F98948; color: white; padding: 5px 12px; border-radius: 5px; font-weight: bold; font-size: 12px; }
                .pergunta-texto { font-size: 16px; font-weight: 600; margin: 15px 0; line-height: 1.5; }
                .alternativas { margin-top: 12px; }
                .alternativa { padding: 12px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 8px; }
                .rodape-impressao { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
                @media print { .cabecalho-impressao { page-break-after: avoid; } .pergunta-card { page-break-inside: avoid; } }
            </style>
        </head>
        <body>
            <div class="cabecalho-impressao">
                <h1>📋 DISC Dashboard - Quiz para Aulas</h1>
                <p><strong>Prof. Paulo Rubens</strong> | Gestão de Pessoas</p>
                <p>Data: ${new Date().toLocaleDateString('pt-BR')} | Total de Questões: ${quizAtual.length}</p>
            </div>

            ${document.getElementById('corpoQuiz').innerHTML}

            <div class="rodape-impressao">
                <p>DISC Dashboard © ${new Date().getFullYear()} | Desenvolvido por CRV Soluções em TI</p>
            </div>
        </body>
        </html>
    `;

    // Abrir janela de impressão
    const janelaImpressao = window.open('', '_blank', 'width=800,height=600');
    janelaImpressao.document.write(impressaoHTML);
    janelaImpressao.document.close();
    janelaImpressao.focus();

    // Aguardar carregamento e imprimir
    setTimeout(() => {
        janelaImpressao.print();
    }, 250);
}


// ============================================================================
// FUNÇÃO: EMBARALHAR ARRAY
// ============================================================================

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// ============================================================================
// FIM DO ARQUIVO
// ============================================================================
