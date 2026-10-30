// ============================================
// GERADOR DE RESPOSTAS IA — OPÇÃO C (COMPLETA)
// ============================================
// ============================================
// GERADOR DE RESPOSTAS IA — VERSÃO TURBINADA
// ============================================
const TOTAL_CENARIOS = 10;
let cenarioAtual = 1;
let pontuacao = 0;

const cenariosDisc = {
  "1": {
    "icone": "fa-comments",
    "titulo": "Feedback com clareza e escuta",
    "contexto": "Um colaborador relata receio de exposição em feedbacks. Houve entregas abaixo do padrão acordado. Como abordar o problema?",
    "opcoes": {
      "A": {
        "texto": "Ser direto e objetivo, focando nos números e resultados que não foram atingidos.",
        "pontos": 1
      },
      "B": {
        "texto": "Descrever fatos e impactos em conversa reservada, ouvir a pessoa e combinar melhoria e acompanhamento.",
        "pontos": 10
      },
      "C": {
        "texto": "Enviar email detalhado com todos os dados e métricas, solicitando plano de ação por escrito.",
        "pontos": 3
      },
      "D": {
        "texto": "Adiar o feedback para evitar constrangimento e observar mais antes de agir.",
        "pontos": 2
      }
    },
    "respostaCorreta": "B",
    "feedback": {
      "B": "Boa decisão. Descreva fatos e impactos em conversa reservada, ouça a pessoa e combine apoio, melhoria e acompanhamento.",
      "A": "Reavalie os efeitos dessa alternativa. Descreva fatos e impactos em conversa reservada, ouça a pessoa e combine apoio, melhoria e acompanhamento.",
      "C": "Reavalie os efeitos dessa alternativa. Descreva fatos e impactos em conversa reservada, ouça a pessoa e combine apoio, melhoria e acompanhamento.",
      "D": "Reavalie os efeitos dessa alternativa. Descreva fatos e impactos em conversa reservada, ouça a pessoa e combine apoio, melhoria e acompanhamento."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "2": {
    "icone": "fa-rocket",
    "titulo": "Ritmos diferentes na equipe",
    "contexto": "Um integrante busca decisões rápidas e outro quer mais análise. A divergência está atrasando o projeto. Como conduzir?",
    "opcoes": {
      "A": {
        "texto": "Exigir rapidez e ignorar as preocupações com qualidade.",
        "pontos": 0
      },
      "B": {
        "texto": "Acordar critérios mínimos, riscos e prazo para decidir, ouvindo as duas necessidades.",
        "pontos": 10
      },
      "C": {
        "texto": "Adiar qualquer decisão até que não reste nenhuma dúvida.",
        "pontos": 0
      },
      "D": {
        "texto": "Deixar que o integrante mais influente decida sem critérios.",
        "pontos": 0
      }
    },
    "respostaCorreta": "B",
    "feedback": {
      "B": "Boa decisão. Traduza as diferenças em um acordo sobre critérios, riscos, responsabilidades e prazo de decisão.",
      "A": "Reavalie os efeitos dessa alternativa. Traduza as diferenças em um acordo sobre critérios, riscos, responsabilidades e prazo de decisão.",
      "C": "Reavalie os efeitos dessa alternativa. Traduza as diferenças em um acordo sobre critérios, riscos, responsabilidades e prazo de decisão.",
      "D": "Reavalie os efeitos dessa alternativa. Traduza as diferenças em um acordo sobre critérios, riscos, responsabilidades e prazo de decisão."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "3": {
    "icone": "fa-handshake",
    "titulo": "Motivação e reconhecimento",
    "contexto": "Uma colaboradora relata que valoriza interação e reconhecimento. Como conversar sobre motivação sem presumir que todos valorizam a mesma coisa?",
    "opcoes": {
      "A": {
        "texto": "Conversar sobre preferências e reconhecer contribuições concretas, combinando oportunidades de desenvolvimento.",
        "pontos": 10
      },
      "B": {
        "texto": "Oferecer o mesmo prêmio a todos sem perguntar o que valorizam.",
        "pontos": 0
      },
      "C": {
        "texto": "Presumir que a letra DISC revela tudo o que motiva a pessoa.",
        "pontos": 0
      },
      "D": {
        "texto": "Prometer reconhecimento, mas não mudar a prática de gestão.",
        "pontos": 0
      }
    },
    "respostaCorreta": "A",
    "feedback": {
      "A": "Boa decisão. Investigue preferências e condições de trabalho, oferecendo reconhecimento específico e oportunidades coerentes com o que foi acordado.",
      "B": "Reavalie os efeitos dessa alternativa. Investigue preferências e condições de trabalho, oferecendo reconhecimento específico e oportunidades coerentes com o que foi acordado.",
      "C": "Reavalie os efeitos dessa alternativa. Investigue preferências e condições de trabalho, oferecendo reconhecimento específico e oportunidades coerentes com o que foi acordado.",
      "D": "Reavalie os efeitos dessa alternativa. Investigue preferências e condições de trabalho, oferecendo reconhecimento específico e oportunidades coerentes com o que foi acordado."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "4": {
    "icone": "fa-users",
    "titulo": "Análise e prazo de decisão",
    "contexto": "Um analista solicita mais dados, mas há um prazo de decisão. Como equilibrar a qualidade da análise com a entrega?",
    "opcoes": {
      "A": {
        "texto": "Decidir imediatamente sem verificar requisitos críticos.",
        "pontos": 0
      },
      "B": {
        "texto": "Continuar coletando dados sem limite ou objetivo definido.",
        "pontos": 0
      },
      "C": {
        "texto": "Definir dados indispensáveis, prazo e riscos aceitáveis, com revisão posterior quando cabível.",
        "pontos": 10
      },
      "D": {
        "texto": "Eliminar qualquer critério técnico para acelerar a aprovação.",
        "pontos": 0
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "C": "Boa decisão. Defina informações necessárias, risco aceitável e prazo, sem dispensar requisitos críticos nem buscar certeza absoluta.",
      "B": "Reavalie os efeitos dessa alternativa. Defina informações necessárias, risco aceitável e prazo, sem dispensar requisitos críticos nem buscar certeza absoluta.",
      "A": "Reavalie os efeitos dessa alternativa. Defina informações necessárias, risco aceitável e prazo, sem dispensar requisitos críticos nem buscar certeza absoluta.",
      "D": "Reavalie os efeitos dessa alternativa. Defina informações necessárias, risco aceitável e prazo, sem dispensar requisitos críticos nem buscar certeza absoluta."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "5": {
    "icone": "fa-chart-line",
    "titulo": "Comunicar uma mudança",
    "contexto": "A equipe manifesta preocupação com uma reestruturação. Como comunicar e apoiar a transição?",
    "opcoes": {
      "A": {
        "texto": "Anunciar mudança de forma rápida e objetiva, focando nos benefícios futuros.",
        "pontos": 2
      },
      "B": {
        "texto": "Comunicar com antecedência, explicar razões, ouvir preocupações e dar suporte na transição.",
        "pontos": 10
      },
      "C": {
        "texto": "Enviar comunicado oficial detalhado por email para que leiam com calma.",
        "pontos": 5
      },
      "D": {
        "texto": "Implementar mudança gradualmente sem comunicar muito para evitar ansiedade.",
        "pontos": 1
      }
    },
    "respostaCorreta": "B",
    "feedback": {
      "B": "Boa decisão. Antecipe razões e impactos conhecidos, ouça preocupações e combine apoio. Não atribua a reação somente ao perfil DISC.",
      "A": "Reavalie os efeitos dessa alternativa. Antecipe razões e impactos conhecidos, ouça preocupações e combine apoio. Não atribua a reação somente ao perfil DISC.",
      "C": "Reavalie os efeitos dessa alternativa. Antecipe razões e impactos conhecidos, ouça preocupações e combine apoio. Não atribua a reação somente ao perfil DISC.",
      "D": "Reavalie os efeitos dessa alternativa. Antecipe razões e impactos conhecidos, ouça preocupações e combine apoio. Não atribua a reação somente ao perfil DISC."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "6": {
    "icone": "fa-laptop-house",
    "titulo": "Coordenação no trabalho híbrido",
    "contexto": "Parte da equipe sente falta de interação; outra relata excesso de reuniões. Como equilibrar coordenação e tempo de foco?",
    "opcoes": {
      "A": {
        "texto": "Manter todas as reuniões diárias longas para garantir alinhamento máximo.",
        "pontos": 2
      },
      "B": {
        "texto": "Reduzir ao mínimo as reuniões e resolver tudo por e-mail.",
        "pontos": 1
      },
      "C": {
        "texto": "Combinar rituais curtos de conexão e canais assíncronos estruturados, verificando o resultado com a equipe.",
        "pontos": 10
      },
      "D": {
        "texto": "Deixar cada um trabalhar como quiser, sem regras definidas.",
        "pontos": 3
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "C": "Boa decisão. Combine rituais curtos e canais assíncronos acessíveis, verificando o que funciona com os envolvidos.",
      "A": "Reavalie os efeitos dessa alternativa. Combine rituais curtos e canais assíncronos acessíveis, verificando o que funciona com os envolvidos.",
      "B": "Reavalie os efeitos dessa alternativa. Combine rituais curtos e canais assíncronos acessíveis, verificando o que funciona com os envolvidos.",
      "D": "Reavalie os efeitos dessa alternativa. Combine rituais curtos e canais assíncronos acessíveis, verificando o que funciona com os envolvidos."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "7": {
    "icone": "fa-exclamation-triangle",
    "titulo": "Prazo e qualidade",
    "contexto": "Um líder quer lançar rapidamente; a equipe técnica alerta para riscos. Como definir uma entrega responsável?",
    "opcoes": {
      "A": {
        "texto": "Apoiar totalmente o D e exigir entrega rápida, mesmo com risco de bugs.",
        "pontos": 1
      },
      "B": {
        "texto": "Apoiar totalmente o C e adiar o projeto até eliminar todos os riscos.",
        "pontos": 3
      },
      "C": {
        "texto": "Definir escopo viável com requisitos mínimos de qualidade e segurança, avaliar riscos e planejar evolução.",
        "pontos": 10
      },
      "D": {
        "texto": "Pedir que resolvam sozinhos para estimular autonomia.",
        "pontos": 2
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "C": "Boa decisão. Acorde escopo e requisitos mínimos de qualidade, avaliando riscos. Não aceite falhas críticas só para manter o prazo.",
      "A": "Reavalie os efeitos dessa alternativa. Acorde escopo e requisitos mínimos de qualidade, avaliando riscos. Não aceite falhas críticas só para manter o prazo.",
      "B": "Reavalie os efeitos dessa alternativa. Acorde escopo e requisitos mínimos de qualidade, avaliando riscos. Não aceite falhas críticas só para manter o prazo.",
      "D": "Reavalie os efeitos dessa alternativa. Acorde escopo e requisitos mínimos de qualidade, avaliando riscos. Não aceite falhas críticas só para manter o prazo."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "8": {
    "icone": "fa-heart-circle-bolt",
    "titulo": "Carga de trabalho e esgotamento",
    "contexto": "Uma pessoa com alta entrega relata exaustão e excesso de demandas. Qual abordagem gerencial é mais adequada?",
    "opcoes": {
      "A": {
        "texto": "Elogiar a alta performance e oferecer ainda mais responsabilidades.",
        "pontos": 1
      },
      "B": {
        "texto": "Ignorar sinais emocionais e focar apenas em metas e indicadores.",
        "pontos": 0
      },
      "C": {
        "texto": "Reconhecer resultados, alinhar limites de carga e negociar redistribuição de demandas.",
        "pontos": 10
      },
      "D": {
        "texto": "Sugerir que ele tire férias por conta própria se achar necessário.",
        "pontos": 4
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "C": "Boa decisão. Ouça, revise prioridades e carga, redistribua demandas e facilite acesso ao suporte apropriado. A situação não é explicada por uma letra DISC.",
      "A": "Reavalie os efeitos dessa alternativa. Ouça, revise prioridades e carga, redistribua demandas e facilite acesso ao suporte apropriado. A situação não é explicada por uma letra DISC.",
      "B": "Reavalie os efeitos dessa alternativa. Ouça, revise prioridades e carga, redistribua demandas e facilite acesso ao suporte apropriado. A situação não é explicada por uma letra DISC.",
      "D": "Reavalie os efeitos dessa alternativa. Ouça, revise prioridades e carga, redistribua demandas e facilite acesso ao suporte apropriado. A situação não é explicada por uma letra DISC."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  },
  "9": {
    "icone": "fa-user-plus",
    "titulo": "Seleção baseada em evidências",
    "contexto": "A equipe precisa melhorar escuta e cooperação. Há uma vaga aberta. Como selecionar sem reduzir candidatos a letras DISC?",
    "opcoes": {
      "A": {
        "texto": "Buscar exclusivamente o estilo S no questionário.",
        "pontos": 1
      },
      "B": {
        "texto": "Escolher quem tiver o mesmo estilo do gestor.",
        "pontos": 0
      },
      "C": {
        "texto": "Definir competências da vaga, usar entrevistas estruturadas e atividades práticas com critérios comuns.",
        "pontos": 10
      },
      "D": {
        "texto": "Desconsiderar os requisitos técnicos para equilibrar as letras do time.",
        "pontos": 0
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "A": "Preferência comportamental não comprova competência. Não use o estilo como filtro de contratação.",
      "B": "Semelhança com o gestor favorece viés e não demonstra adequação à função.",
      "C": "Critérios relacionados ao trabalho e evidências comparáveis sustentam a decisão. DISC pode apoiar desenvolvimento, não substituir seleção.",
      "D": "A função exige competências demonstradas, além de boas relações de trabalho."
    }
  },
  "10": {
    "icone": "fa-chalkboard-teacher",
    "titulo": "Participação em reuniões",
    "contexto": "Alguns integrantes dominam a conversa, enquanto outros quase não conseguem contribuir. Como ampliar a participação?",
    "opcoes": {
      "A": {
        "texto": "Deixar a reunião totalmente livre para que cada um se manifeste quando quiser.",
        "pontos": 2
      },
      "B": {
        "texto": "Dar a palavra apenas para quem se posicionar espontaneamente.",
        "pontos": 1
      },
      "C": {
        "texto": "Definir pauta, rodadas de fala e alternativas de contribuição para quem não conseguiu participar.",
        "pontos": 10
      },
      "D": {
        "texto": "Fazer reunião só com D e I e depois informar S e C das decisões.",
        "pontos": 0
      }
    },
    "respostaCorreta": "C",
    "feedback": {
      "C": "Boa decisão. Use pauta, rodadas de fala e alternativas de contribuição para que todos tenham oportunidade real de participar.",
      "A": "Reavalie os efeitos dessa alternativa. Use pauta, rodadas de fala e alternativas de contribuição para que todos tenham oportunidade real de participar.",
      "B": "Reavalie os efeitos dessa alternativa. Use pauta, rodadas de fala e alternativas de contribuição para que todos tenham oportunidade real de participar.",
      "D": "Reavalie os efeitos dessa alternativa. Use pauta, rodadas de fala e alternativas de contribuição para que todos tenham oportunidade real de participar."
    },
    "fonte": "OpenStax, Organizational Behavior: comunicação, liderança, motivação e conflitos. Situação fictícia para aprendizagem."
  }
};

// ============================================
// FUNÇÕES DO SIMULADOR
// ============================================
let cenarios = cenariosDisc;
let cenarioRespondido = false;
let resultadoTimer;
function alterarTrilha(trilha) {
    cenarios = trilha === 'disc' ? cenariosDisc : window.DISC_TRILHAS[trilha];
    reiniciarSimulador();
}
function carregarCenario(numero) {
    clearTimeout(resultadoTimer);
    cenarioRespondido = false;
    const cenario = cenarios[numero];
    if (!cenario) return;

    document.querySelector('.cenario-badge').textContent =
        `Cenário ${numero} de ${TOTAL_CENARIOS}`;

    document.querySelector('.cenario-icone i').className = `fas ${cenario.icone}`;
    document.getElementById('cenarioTitulo').textContent = cenario.titulo;
    document.getElementById('cenarioContexto').textContent = cenario.contexto;

    const opcoesDiv = document.getElementById('cenarioOpcoes');
    opcoesDiv.innerHTML = '';

    Object.keys(cenario.opcoes).forEach(letra => {
        const opcao = cenario.opcoes[letra];
        const btn = document.createElement('button');
        btn.className = 'opcao-btn';
        btn.onclick = (event) => responderCenario(letra, numero, event);
        btn.innerHTML = `
            <span class="opcao-letra">${letra}</span>
            <span class="opcao-texto">${opcao.texto}</span>
        `;
        opcoesDiv.appendChild(btn);
    });

    const feedbackDiv = document.getElementById('feedbackCenario');
    feedbackDiv.classList.remove('show');
    feedbackDiv.innerHTML = '';
    document.getElementById('btnProximoCenario').style.display = 'none';
}

function responderCenario(opcao, cenarioNum, event) {
    if (cenarioRespondido || cenarioNum !== cenarioAtual) return;
    cenarioRespondido = true;
    const cenario = cenarios[cenarioNum];
    const opcaoSelecionada = cenario.opcoes[opcao];

    // Desabilita todos os botões
    document.querySelectorAll('.opcao-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });

    // Marca opção selecionada
    event.target.closest('.opcao-btn').classList.add('selecionada');

    // Adiciona pontos
    pontuacao += opcaoSelecionada.pontos;
    document.getElementById('pontuacaoTotal').textContent = pontuacao;

    // Mostra feedback
    const feedbackDiv = document.getElementById('feedbackCenario');
    const isCorreta = opcao === cenario.respostaCorreta;

    feedbackDiv.innerHTML = `
        <h4>${isCorreta ? '✅ Excelente escolha!' : '⚠️ Boa tentativa!'} (+${opcaoSelecionada.pontos} pontos)</h4>
        <p>${cenario.feedback[opcao]}</p>${cenario.fonte ? `<p class="nota-didatica">Base conceitual: ${cenario.fonte}</p>` : ''}
        <div style="margin-top: 12px; padding: 10px; background: rgba(249,137,72,0.15); border-radius: 8px; border: 1px solid var(--cor-primaria);">
            <strong style="color: var(--cor-primaria);">✓ Alternativa recomendada no contexto: ${cenario.respostaCorreta}</strong>
        </div>
    `;
    feedbackDiv.classList.add('show');

    // Mostra botão próximo cenário ou resultado final
    if (cenarioAtual < TOTAL_CENARIOS) {
        document.getElementById('btnProximoCenario').style.display = 'flex';
    } else {
        resultadoTimer = setTimeout(() => {
            feedbackDiv.innerHTML += `
                <hr style="margin: 16px 0; border: 1px solid rgba(249,137,72,0.2);">
                <h4 style="color: var(--cor-primaria);">🎉 Simulação Concluída!</h4>
                <p><strong>Pontuação Final: ${pontuacao}/${TOTAL_CENARIOS * 10} pontos</strong></p>
                <p>${avaliarDesempenho(pontuacao)}</p>
            `;
        }, 1000);
    }
}

function avaliarDesempenho(pontos) {
    if (pontos >= 90) return '🏆 Excelente! Você domina os princípios DISC e sabe aplicá-los em situações reais.';
    if (pontos >= 70) return '👏 Muito bom! Você tem boa compreensão do DISC e está no caminho certo.';
    if (pontos >= 50) return '📚 Bom esforço! Continue estudando os perfis para melhorar suas decisões.';
    return '💪 Continue praticando! Revise os perfis DISC e tente novamente.';
}

function proximoCenario() {
    if (cenarioAtual >= TOTAL_CENARIOS) return;
    cenarioAtual++;
    carregarCenario(cenarioAtual);
}

function reiniciarSimulador() {
    cenarioAtual = 1;
    pontuacao = 0;
    document.getElementById('pontuacaoTotal').textContent = '0';
    carregarCenario(cenarioAtual);
}

// Chamar uma vez no onload da página:
// carregarCenario(cenarioAtual);

// ============================================
// BIBLIOTECA DE CASOS DE USO
// ============================================
// DISC DASHBOARD — Assistente IA (Groq via Backend)
// ============================================================

const BACKEND_URL = window.DISC_CONFIG.apiBase;

let historicoConversa = [];

const mensagensLoading = [
  "Consultando base DISC...",
  "Analisando perfil comportamental...",
  "Processando com inteligência...",
  "Quase lá..."
];

// ============================================================
// ADICIONAR MENSAGEM NO CHAT
// ============================================================
function adicionarMensagemChat(tipo, texto) {
  const chat = document.getElementById("chatMessages");
  if (!chat) return;

  const agora = new Date();
  const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const div = document.createElement("div");
  div.className = `chat-message ${tipo}`;
  div.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-${tipo === "bot" ? "robot" : "user"}"></i>
    </div>
    <div class="message-content">
      <p>${tipo === "user" ? window.DISC_UI.escape(texto) : texto}</p>
      <span class="message-time">${hora}</span>
    </div>
  `;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

// ============================================================
// AVISO DE FALLBACK (modelo secundário em uso)
// ============================================================
function adicionarAvisoFallback() {
  const chat = document.getElementById("chatMessages");
  if (!chat) return;

  const div = document.createElement("div");
  div.className = "chat-message bot fallback-aviso";
  div.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <p>⚡ <em>Foi usado um modelo alternativo disponível para responder a esta consulta.</em></p>
    </div>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ============================================================
// LOADING ANIMADO
// ============================================================
function adicionarLoading() {
  const chat = document.getElementById("chatMessages");
  if (!chat) return null;

  const div = document.createElement("div");
  div.className = "chat-message bot loading-msg";
  div.id = "loadingMsg";
  div.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <p class="loading-texto">
        <span class="loading-dots">
          <span></span><span></span><span></span>
        </span>
        <span class="loading-label">Consultando base DISC...</span>
      </p>
    </div>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  let idx = 0;
  const interval = setInterval(() => {
    idx++;
    if (idx >= mensagensLoading.length) { clearInterval(interval); return; }
    const label = div.querySelector(".loading-label");
    if (label) label.textContent = mensagensLoading[idx];
  }, 4000);

  div._loadingInterval = interval;
  return div;
}

function removerLoading() {
  const el = document.getElementById("loadingMsg");
  if (!el) return;
  if (el._loadingInterval) clearInterval(el._loadingInterval);
  el.remove();
}

// ============================================================
// ENVIAR MENSAGEM
// ============================================================
async function enviarMensagem() {
  const input = document.getElementById("chatInput");
  const chat  = document.getElementById("chatMessages");
  if (!input || !chat) return;

  const texto = input.value.trim();
  if (!texto || input.disabled) return;

  adicionarMensagemChat("user", texto);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;


  adicionarLoading();

  input.disabled = true;
  const btnEnviar = document.querySelector(".chat-send-btn, [onclick='enviarMensagem()']");
  if (btnEnviar) btnEnviar.disabled = true;

  try {
    const resp = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(110000),
      body: JSON.stringify({
        mensagem: texto,
        historico: historicoConversa.slice(-10)
      })
    });

    removerLoading();

    if (!resp.ok) throw new Error("Erro na resposta do servidor");

    const data = await resp.json();
    const resposta = data.resposta || "Não consegui processar sua pergunta. Tente novamente.";

    // Avisa se usou modelo de fallback (só uma vez por sessão)
    if (data.fallback && !window._fallbackAvisado) {
      adicionarAvisoFallback();
      window._fallbackAvisado = true;
    }

    const respostaFormatada = window.DISC_UI.escape(resposta)
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    adicionarMensagemChat("bot", respostaFormatada);

    historicoConversa.push({ role: "user", content: texto }, { role: "assistant", content: resposta });
    if (historicoConversa.length > 20) historicoConversa = historicoConversa.slice(-20);

  } catch (err) {
    removerLoading();
    console.error("Erro ao chamar backend:", err);
    adicionarMensagemChat("bot",
      "⚠️ Não consegui me conectar agora. O servidor pode estar acordando — aguarde alguns segundos e tente novamente."
    );
  } finally {
    input.disabled = false;
    if (btnEnviar) btnEnviar.disabled = false;
    input.focus();
  }
}

// ============================================================
// SUGESTÕES E ENTER
// ============================================================
function enviarSugestao(texto) {
  const input = document.getElementById("chatInput");
  if (input) { input.value = texto; enviarMensagem(); }
}

document.getElementById("chatInput")?.addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensagem(); }
});

// ============================================================
// CSS DO LOADING
// ============================================================
(function injetarCSSLoading() {
  if (document.getElementById("disc-loading-style")) return;
  const style = document.createElement("style");
  style.id = "disc-loading-style";
  style.textContent = `
    .loading-dots { display:inline-flex;align-items:center;gap:4px;margin-right:8px;vertical-align:middle; }
    .loading-dots span { width:7px;height:7px;border-radius:50%;background:var(--cor-primaria,#F98948);animation:discPulse 1.2s ease-in-out infinite;display:inline-block; }
    .loading-dots span:nth-child(2){animation-delay:.2s}
    .loading-dots span:nth-child(3){animation-delay:.4s}
    @keyframes discPulse{0%,80%,100%{transform:scale(.7);opacity:.4}40%{transform:scale(1);opacity:1}}
    .loading-label{font-style:italic;opacity:.75;font-size:.9em;transition:opacity .3s}
    .fallback-aviso .message-content p{font-size:.85em;opacity:.8;font-style:italic}
  `;
  document.head.appendChild(style);
})();

// Inicializa o primeiro cenário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarCenario(1);
});

async function verificarIA() {
    const status = document.getElementById('statusIA');
    try {
        const resposta = await fetch(`${BACKEND_URL}/ping`, { signal: AbortSignal.timeout(45000) });
        if (!resposta.ok) throw new Error('Serviço indisponível');
        status.title = 'Servidor disponível; a resposta depende da disponibilidade do provedor de IA';
        status.setAttribute('aria-label', status.title);
        status.dataset.estado = 'disponivel';
    } catch {
        status.title = 'Não foi possível confirmar a conexão; tente enviar sua pergunta';
        status.setAttribute('aria-label', status.title);
        status.dataset.estado = 'indisponivel';
    }
}
document.addEventListener('DOMContentLoaded', verificarIA);
