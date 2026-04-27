// ============================================
// TESTE-DISC.JS — Dashboard DISC
// ============================================

// ===== ESTADO GLOBAL =====
const estadoTeste = {
    telaAtual: 'intro',
    usuario: { nome: '', email: '' },
    perguntaAtual: 0,
    respostas: [],
    pontuacao: { D: 0, I: 0, S: 0, C: 0 }
};

// ===== ELEMENTOS DO DOM (SEGURO) =====
const elementos = {
    intro: document.getElementById('discIntro'),
    consentimento: document.getElementById('discConsentimento'),
    instrucoes: document.getElementById('discInstrucoes'),
    perguntas: document.getElementById('discPerguntas'),
    resultado: document.getElementById('discResultado'),

    btnConcordarInicio: document.getElementById('btnConcordarInicio'),
    btnVoltarIntro: document.getElementById('btnVoltarIntro'),
    btnConcordarLGPD: document.getElementById('btnConcordarLGPD'),
    btnComecar: document.getElementById('btnComecar'),
    btnProximo: document.getElementById('btnProximo'),

    inputNome: document.getElementById('inputNome'),
    inputEmail: document.getElementById('inputEmail'),
    checkLGPD: document.getElementById('checkLGPD'),

    numeroPergunta: document.getElementById('numeroPergunta'),
    progressoFill: document.getElementById('progressoFill'),
    perguntaTexto: document.getElementById('perguntaTexto'),
    opcoesLista: document.getElementById('opcoesLista')
};

// ===== MOSTRAR TELA (CORRIGIDO) =====
function mostrarTela(nomeTela) {

    Object.values(elementos).forEach(el => {
        if (el && el.style) {
            el.style.display = 'none';
        }
    });

    if (elementos[nomeTela]) {
        elementos[nomeTela].style.display = 'block';
    }

    estadoTeste.telaAtual = nomeTela;
}

// ===== VALIDAÇÃO =====
function validarFormulario() {
    if (!elementos.inputNome || !elementos.inputEmail || !elementos.checkLGPD) return;

    const nomeValido = elementos.inputNome.value.trim().length >= 3;
    const emailValido = elementos.inputEmail.value.includes('@');
    const checkMarcado = elementos.checkLGPD.checked;

    if (elementos.btnConcordarLGPD) {
        elementos.btnConcordarLGPD.disabled = !(nomeValido && emailValido && checkMarcado);
    }
}

// ===== EVENTOS (SEGURO) =====
function inicializarEventos() {

    elementos.btnConcordarInicio?.addEventListener('click', () => {
        mostrarTela('consentimento');
    });

    elementos.btnVoltarIntro?.addEventListener('click', () => {
        mostrarTela('intro');
    });

    elementos.inputNome?.addEventListener('input', validarFormulario);
    elementos.inputEmail?.addEventListener('input', validarFormulario);
    elementos.checkLGPD?.addEventListener('change', validarFormulario);

    elementos.btnConcordarLGPD?.addEventListener('click', () => {
        estadoTeste.usuario.nome = elementos.inputNome.value.trim();
        estadoTeste.usuario.email = elementos.inputEmail.value.trim();
        mostrarTela('instrucoes');
    });

    elementos.btnComecar?.addEventListener('click', () => {
        mostrarTela('perguntas');
    });
}

// ===== INICIALIZAÇÃO (CORRIGIDA) =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Teste DISC carregado!');
    inicializarEventos();

    // 🔥 IMPORTANTE: só tenta mostrar se existir
    if (elementos.intro) {
        mostrarTela('intro');
    }
});

// ===== REDIRECIONAMENTO SITE DISC =====
window.irParaSistema = function(tipo) {

    const urls = {
        disc: "https://www.discprofpaulorocha.com/"
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