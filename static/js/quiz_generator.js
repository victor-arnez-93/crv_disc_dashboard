// ============================================================================
// QUIZ_GENERATOR.JS — DISC DASHBOARD
// Gerador de Quiz para Aulas — banco referenciado de 324 questões
// ============================================================================

// ============================================================================
// BANCO DE PERGUNTAS (50 QUESTÕES)
// ============================================================================

const bancoPerguntas = window.DISC_QUIZ_BANK;

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
document.getElementById('modalAvisoFechar').addEventListener('click', fecharAviso);

// ============================================================================
// FUNÇÃO: AVISO CUSTOMIZADO (substitui alert())
// ============================================================================

let _avisoCallback = null;

function mostrarAviso(mensagem, callback) {
    _avisoCallback = callback || null;
    document.getElementById('modalAvisoTexto').textContent = mensagem;
    document.getElementById('modalAviso').style.display = 'flex';
}

function fecharAviso() {
    document.getElementById('modalAviso').style.display = 'none';
    if (typeof _avisoCallback === 'function') {
        const cb = _avisoCallback;
        _avisoCallback = null;
        cb();
    }
}

// ============================================================================
// FUNÇÃO: GERAR QUIZ
// ============================================================================

function gerarQuiz() {
    let tema = filtroTema.value;
    let dificuldade = filtroDificuldade.value;
    let quantidade = parseInt(numPerguntas.value, 10);

    // Garantir que a quantidade está entre as opções 6, 10 e 12
    const quantidadesPermitidas = [6, 10, 12];
    if (!quantidadesPermitidas.includes(quantidade)) {
        quantidade = 10;
        numPerguntas.value = "10";
    }

    // Filtrar perguntas por tema e dificuldade
    let perguntasFiltradas = [...bancoPerguntas];

    if (tema !== "todos") {
        perguntasFiltradas = perguntasFiltradas.filter(p => p.tema === tema);
    }

    if (dificuldade !== "todas") {
        perguntasFiltradas = perguntasFiltradas.filter(p => p.dificuldade === dificuldade);
    }

    if (perguntasFiltradas.length === 0) {
        mostrarAviso("Nenhuma pergunta encontrada com esses filtros. Tente outras opções.");
        return;
    }

    // Embaralhar e aplicar quantidade final (sem passar do que existe)
    perguntasFiltradas = embaralhar(perguntasFiltradas);

    const disponiveis = perguntasFiltradas.length;
    const qtdFinal = Math.min(quantidade, disponiveis);

    if (qtdFinal < quantidade) {
        // Prepara o quiz mas exibe aviso antes de renderizar
        quizAtual = selecionarSemRepetirConceito(perguntasFiltradas, qtdFinal);
        mostrarAviso(
            `Foram encontradas apenas ${qtdFinal} perguntas para esses filtros. O quiz será gerado com ${qtdFinal} questões.`,
            () => _iniciarQuiz(tema, dificuldade, qtdFinal)
        );
        return;
    }

    quizAtual = selecionarSemRepetirConceito(perguntasFiltradas, qtdFinal);
    _iniciarQuiz(tema, dificuldade, qtdFinal);
}

// ============================================================================
// FUNÇÃO AUXILIAR: INICIAR QUIZ (chamada após aviso ou diretamente)
// ============================================================================

function _iniciarQuiz(tema, dificuldade, qtdFinal) {
    const temaTexto = {
        todos: "Conteúdos Gerais",
        disc: "Perfis DISC",
        lideranca: "Liderança",
        comunicacao: "Comunicação",
        conflitos: "Gestão de Conflitos",
        motivacao: "Motivação",
        swot: "Análise SWOT",
        porter: "Cinco Forças de Porter",
        bcg: "Matriz BCG",
        ansoff: "Matriz Ansoff"
    };

    const dificuldadeTexto = {
        todas: "todos os níveis",
        basico: "nível básico",
        intermediario: "nível intermediário",
        avancado: "nível avançado"
    };

    respostas = {};
    tempoDecorrido = 0;

    mensagemInicial.style.display = "none";
    areaQuiz.style.display = "block";
    resultadoFinal.style.display = "none";

    tituloQuiz.textContent =
        `Quiz de ${temaTexto[tema]} — ${qtdFinal} questões (${dificuldadeTexto[dificuldade]})`;

    renderizarPerguntas();
    iniciarCronometro();
    areaQuiz.scrollIntoView({ behavior: "smooth", block: "start" });
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

    const alternativasEmbaralhadas = embaralhar([...pergunta.alternativas]);

    card.innerHTML = `
        <span class="pergunta-numero">Questão ${index + 1}</span>
        <p class="pergunta-texto">${pergunta.pergunta}</p>
        <div class="alternativas">
            ${alternativasEmbaralhadas.map((alt) => `
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

    document.querySelectorAll('.alternativa input').forEach(input => {
        input.addEventListener('change', registrarResposta);
    });

    atualizarProgresso();
}

// ============================================================================
// FUNÇÃO: REGISTRAR RESPOSTA
// ============================================================================

function registrarResposta(e) {
    const perguntaId = parseInt(e.target.getAttribute('data-pergunta-id'));
    const correta = e.target.value === 'true';

    respostas[perguntaId] = correta;

    const alternativa = e.target.closest('.alternativa');
    document.querySelectorAll(`input[name="pergunta_${perguntaId}"]`).forEach(inp => {
        inp.closest('.alternativa').classList.remove('selecionada');
    });
    alternativa.classList.add('selecionada');

    atualizarProgresso();

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
    if (resultadoFinal.style.display === 'block') return;
    pararCronometro();

    const acertos = Object.values(respostas).filter(r => r === true).length;
    const total = quizAtual.length;
    const percentual = Math.round((acertos / total) * 100);

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

            input.disabled = true;
        });
        if (!card.querySelector('.gabarito-explicacao')) {
            const nota = document.createElement('div');
            nota.className = 'gabarito-explicacao';
            nota.innerHTML = `<p><strong>Comentário:</strong> ${pergunta.explicacao}</p>
              <p class="quiz-fonte"><strong>Base conceitual:</strong> ${pergunta.fonte.autor}. ${pergunta.fonte.obra}.
              <a href="${pergunta.fonte.url}" target="_blank" rel="noopener noreferrer">Consultar fonte <i class="fas fa-external-link-alt"></i></a></p>`;
            card.appendChild(nota);
        }
    });

    document.getElementById('acertosTotal').textContent = acertos;
    document.getElementById('totalPerguntas').textContent = total;
    document.getElementById('percentualAcertos').textContent = `${percentual}%`;

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
        mostrarAviso('✅ Resultado copiado! Cole onde quiser compartilhar.');
    });
}

// ============================================================================
// FUNÇÃO: IMPRIMIR QUIZ
// ============================================================================

function imprimirQuiz() {
    window.print();
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
// No sorteio misto, prioriza núcleos diferentes antes de repetir um conceito.
function selecionarSemRepetirConceito(perguntas, quantidade) {
    const escolhidas = [];
    const usados = new Set();
    for (const pergunta of perguntas) {
        if (usados.has(pergunta.conceito)) continue;
        usadasAdicionar(pergunta);
        if (escolhidas.length === quantidade) return escolhidas;
    }
    return escolhidas.concat(perguntas.filter(p => !escolhidas.includes(p))).slice(0, quantidade);
    function usadasAdicionar(pergunta) {
        usados.add(pergunta.conceito);
        escolhidas.push(pergunta);
    }
}

const temaSolicitado = new URLSearchParams(location.search).get('tema');
if ([...filtroTema.options].some(option => option.value === temaSolicitado)) filtroTema.value = temaSolicitado;
