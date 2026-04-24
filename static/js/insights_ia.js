// ============================================
// GERADOR DE RESPOSTAS IA — OPÇÃO C (COMPLETA)
// ============================================
// ============================================
// GERADOR DE RESPOSTAS IA — VERSÃO TURBINADA
// ============================================
function gerarRespostaIA(pergunta) {
    const msg = pergunta.toLowerCase().trim();

    // --------------------------------------------
    // 0) SAUDAÇÕES / INTERAÇÃO HUMANA GENÉRICA
    // --------------------------------------------
    const saudacoes = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"];
    if (saudacoes.some(s => msg.startsWith(s))) {
        return `
            Olá! 👋<br><br>
            Sou o <strong>Assistente DISC IA</strong>, treinado exclusivamente nos conteúdos deste painel:
            perfis DISC, liderança, clima organizacional, conflitos, motivação e gestão de pessoas.<br><br>
            Me conte: em qual situação ou perfil você quer ajuda agora?
        `;
    }

    if (msg.includes("obrigado") || msg.includes("valeu") || msg.includes("agradeço")) {
        return `
            Eu que agradeço! 🙌<br>
            Se quiser, posso te ajudar com outro ponto: feedback por perfil, motivação da equipe,
            conflitos entre perfis ou estratégias de liderança usando DISC.
        `;
    }

    // --------------------------------------------
    // 1) DETECÇÃO DE ASSUNTOS FORA DO TEMA
    // --------------------------------------------
    const temasPermitidos = [
        "disc", "perfil", "comportamento", "dominancia", "dominância",
        "influencia", "influência", "estabilidade", "conformidade",
        "lider", "liderança", "gestão", "gestor", "equipe",
        "clima", "organizacional", "saúde mental", "motivação",
        "colaborador", "conflito", "feedback", "recrutamento",
        "rh", "humanos", "pessoas", "cultura"
    ];

    const foraDoTema = !temasPermitidos.some(t => msg.includes(t));

    if (foraDoTema && msg.length > 4) {
        return `
            Entendi sua mensagem! 😊<br><br>
            Aqui eu sou um assistente <strong>treinado apenas nos conteúdos deste projeto</strong>,
            focado em temas como:<br>
            • Análise DISC e perfis comportamentais<br>
            • Liderança e gestão de pessoas<br>
            • Clima organizacional e cultura<br>
            • Recrutamento, RH e desenvolvimento de talentos<br>
            • Comunicação, conflitos e saúde mental no trabalho<br><br>
            Se quiser, me conte uma situação ou dúvida relacionada a esses temas
            e eu te ajudo a aplicar o DISC na prática.
        `;
    }

    // --------------------------------------------
    // 2) BASE DE RESPOSTAS POR PERFIL (DISC)
    // --------------------------------------------
    const respostasPerfis = [
        {
            keys: ["perfil d", "dominancia", "dominância", "perfil dominante", " d "],
            resp: `
                <strong>Perfil D (Dominância)</strong><br><br>
                Características principais:<br>
                • Rápido, direto e orientado a resultados<br>
                • Gosta de desafios, metas claras e autonomia<br>
                • Impaciente com detalhes, burocracia e lentidão<br><br>
                Para lidar bem com esse perfil:<br>
                • Vá direto ao ponto e mostre impacto em resultados<br>
                • Negocie metas e indicadores claros<br>
                • Evite rodeios, mas mantenha respeito e objetividade<br><br>
                Posso te ajudar com:<br>
                • Um roteiro de feedback para um colaborador D<br>
                • Como reduzir conflitos entre D e S ou D e C<br>
                • Como usar um D como líder de projetos de alta pressão
            `
        },
        {
            keys: ["perfil i", "influencia", "influência", "influente", " i "],
            resp: `
                <strong>Perfil I (Influência)</strong><br><br>
                Características:<br>
                • Comunicativo, sociável e otimista<br>
                • Gosta de reconhecimento, liberdade e interação<br>
                • Foge de rotinas muito rígidas e ambientes frios<br><br>
                Para se relacionar melhor com esse perfil:<br>
                • Use entusiasmo e exemplos práticos<br>
                • Reconheça publicamente conquistas e ideias<br>
                • Dê espaço para participação em decisões e apresentações<br><br>
                Posso sugerir:<br>
                • Estratégias para engajar um time com muitos perfis I<br>
                • Como dar feedback sem desmotivar esse perfil
            `
        },
        {
            keys: ["perfil s", "estabilidade", "estável", " s "],
            resp: `
                <strong>Perfil S (Estabilidade)</strong><br><br>
                Características:<br>
                • Calmo, prestativo, paciente e colaborativo<br>
                • Evita conflitos diretos e mudanças bruscas<br>
                • Valoriza segurança, rotina e ambiente harmonioso<br><br>
                Para trabalhar melhor com esse perfil:<br>
                • Explique mudanças com antecedência e clareza<br>
                • Use tom acolhedor, sem pressão exagerada<br>
                • Dê tempo para que ele processe informações e decisões<br><br>
                Posso te ajudar com:<br>
                • Roteiros de feedback cuidadosos para perfil S<br>
                • Estratégias para reduzir ansiedade em mudanças de estrutura
            `
        },
        {
            keys: ["perfil c", "conformidade", "analítico", "analitico", " c "],
            resp: `
                <strong>Perfil C (Conformidade)</strong><br><br>
                Características:<br>
                • Detalhista, técnico e organizado<br>
                • Gosta de precisão, lógica e padrões de qualidade<br>
                • Evita erros, improvisos e decisões sem dados<br><br>
                Para lidar melhor com esse perfil:<br>
                • Forneça dados, critérios e processos claros<br>
                • Explique a lógica das decisões e dos prazos<br>
                • Evite pressionar por respostas rápidas sem informações<br><br>
                Posso apoiar com:<br>
                • Como estruturar uma reunião com perfil C<br>
                • Como equilibrar velocidade (D) e qualidade (C) na mesma equipe
            `
        }
    ];

    for (const item of respostasPerfis) {
        if (item.keys.some(k => msg.includes(k))) {
            return item.resp;
        }
    }

    // --------------------------------------------
    // 3) INTENÇÕES ESPECÍFICAS (feedback, motivação etc.)
    // --------------------------------------------

    // Feedback por perfil
    if (msg.includes("feedback") && msg.includes("perfil d")) {
        return `
            Para dar <strong>feedback para perfil D</strong>:<br><br>
            • Seja direto, objetivo e focado em resultados<br>
            • Comece pela meta/indicador, depois traga o comportamento<br>
            • Mostre impacto no negócio e proponha um desafio de melhoria<br>
            • Combine prazos claros e indicadores de sucesso<br><br>
            Evite:<br>
            • Conversas muito longas sem ponto central<br>
            • Focar apenas em emoções sem falar de resultados
        `;
    }

    if (msg.includes("feedback") && msg.includes("perfil s")) {
        return `
            Para dar <strong>feedback para perfil S</strong>:<br><br>
            • Escolha ambiente reservado e acolhedor<br>
            • Comece reforçando contribuições e qualidades da pessoa<br>
            • Explique o ponto de melhoria com exemplos específicos, sem rótulos<br>
            • Mostre que você está junto para apoiar o plano de ação<br><br>
            Evite:<br>
            • Tom agressivo ou pressões públicas<br>
            • Surpresas de última hora sem contexto
        `;
    }

    if (msg.includes("feedback") && msg.includes("perfil i")) {
        return `
            Para dar <strong>feedback para perfil I</strong>:<br><br>
            • Use tom positivo e encorajador<br>
            • Mostre impacto do comportamento nas relações e na imagem do time<br>
            • Combine ajustes de forma colaborativa, ouvindo ideias da pessoa<br>
            • Reforce que ela continua sendo importante para o grupo<br><br>
            Evite:<br>
            • Cortar totalmente espaço de expressão e criatividade<br>
            • Conversas muito frias e distantes
        `;
    }

    if (msg.includes("feedback") && msg.includes("perfil c")) {
        return `
            Para dar <strong>feedback para perfil C</strong>:<br><br>
            • Leve dados, fatos e exemplos objetivos<br>
            • Mostre exatamente onde está o desvio de padrão/processo<br>
            • Pergunte a opinião técnica da pessoa sobre como melhorar<br>
            • Combine critérios claros de qualidade e prazos realistas<br><br>
            Evite:<br>
            • Críticas vagas, sem exemplos<br>
            • Pressão por velocidade sem discutir riscos
        `;
    }

    // Motivação
    if (msg.includes("motivar") || msg.includes("motivação") || msg.includes("engajar")) {
        return `
            Motivação na ótica DISC muda de perfil para perfil:<br><br>
            • <strong>D</strong> → desafios, metas ambiciosas, autonomia e poder de decisão<br>
            • <strong>I</strong> → reconhecimento público, interação e espaço para criar<br>
            • <strong>S</strong> → ambiente estável, apoio, segurança e pertencimento<br>
            • <strong>C</strong> → qualidade, especialização técnica e tempo para fazer bem feito<br><br>
            Me diga qual perfil (ou combinação) você quer motivar e eu detalho estratégias específicas.
        `;
    }

    // Conflitos
    if (msg.includes("conflito") || msg.includes("briga") || msg.includes("desentendimento")) {
        return `
            Conflitos entre perfis DISC geralmente são choques de ritmo e prioridade, não de caráter.<br><br>
            Exemplos clássicos:<br>
            • <strong>D x S</strong> → pressa vs segurança<br>
            • <strong>I x C</strong> → espontaneidade vs precisão<br>
            • <strong>D x C</strong> → velocidade vs análise detalhada<br><br>
            Uma boa mediação:<br>
            • Nomeia as diferenças de perfil<br>
            • Negocia um \"meio-termo\" de ritmo, comunicação e nível de detalhe<br>
            • Define acordos concretos de como cada um vai ajustar o comportamento.
        `;
    }

    // Liderança / gestor
    if (msg.includes("lider") || msg.includes("liderança") || msg.includes("gestor")) {
        return `
            Liderança eficaz com DISC significa adaptar seu estilo aos perfis da equipe:<br><br>
            • Com <strong>D</strong> → seja desafiador, objetivo e dê autonomia<br>
            • Com <strong>I</strong> → seja inspirador, comunicativo e reconheça em público<br>
            • Com <strong>S</strong> → seja paciente, presente e previsível<br>
            • Com <strong>C</strong> → seja estruturado, técnico e transparente nos critérios<br><br>
            Se quiser, me descreva um caso (perfil do líder + perfil do time) e eu te ajudo a desenhar uma abordagem.
        `;
    }

    // Saúde mental / clima / cultura
    if (msg.includes("saude mental") || msg.includes("saúde mental") || msg.includes("ansiedade") || msg.includes("estresse")) {
        return `
            A saúde mental no trabalho é fortemente impactada pelo ajuste entre perfil DISC e ambiente:<br><br>
            • <strong>S e C</strong> sofrem mais em ambientes caóticos e imprevisíveis<br>
            • <strong>D</strong> acumula stress em contextos de cobrança extrema e pouco apoio<br>
            • <strong>I</strong> se desgasta com isolamento e falta de reconhecimento<br><br>
            Podemos olhar um caso específico da sua equipe e pensar adaptações práticas.
        `;
    }

    if (msg.includes("clima") || msg.includes("organizacional") || msg.includes("cultura")) {
        return `
            Melhorar o clima organizacional com DISC passa por:<br><br>
            • Garantir segurança psicológica (pessoas podem falar sem medo)<br>
            • Ajustar líderes ao perfil das equipes<br>
            • Equilibrar velocidade (D/I) com estabilidade (S/C)<br>
            • Ter rituais que atendam todos os perfis (reuniões rápidas, espaços de escuta, documentação clara)<br><br>
            Me diga qual problema de clima você está percebendo que eu te ajudo a mapear os perfis envolvidos.
        `;
    }

    // --------------------------------------------
    // 4) RESPOSTA PADRÃO INTELIGENTE
    // --------------------------------------------
    return `
        Entendi! Para te ajudar melhor, posso falar sobre:<br><br>
        • Perfis D, I, S e C<br>
        • Liderança e gestão de pessoas<br>
        • Clima organizacional e cultura<br>
        • Saúde mental no trabalho<br>
        • Conflitos e comunicação<br>
        • Recrutamento e análise comportamental<br><br>
        Me conta rapidamente: qual é a situação ou dúvida que você quer resolver agora? 😊
    `;
}

// ============================================
// SIMULADOR DE CENÁRIOS
// ============================================
const TOTAL_CENARIOS = 10;

let cenarioAtual = 1;
let pontuacao = 0;

// ============================================
// SIMULADOR DE CENÁRIOS DE GESTÃO
// ============================================

const TOTAL_CENARIOS = 10;

const cenarios = {
    1: {
        icone: 'fa-comments',
        titulo: 'Feedback Difícil para Colaborador Perfil S',
        contexto: 'Você precisa dar um feedback sobre baixa performance a um colaborador com perfil S (Estabilidade), que é muito sensível e evita conflitos. Como você abordaria?',
        opcoes: {
            A: { texto: 'Ser direto e objetivo, focando nos números e resultados que não foram atingidos.', pontos: 1 },
            B: { texto: 'Iniciar com reconhecimento dos pontos positivos, criar ambiente seguro e propor melhorias de forma colaborativa.', pontos: 10 },
            C: { texto: 'Enviar email detalhado com todos os dados e métricas, solicitando plano de ação por escrito.', pontos: 3 },
            D: { texto: 'Adiar o feedback para evitar constrangimento e observar mais antes de agir.', pontos: 2 }
        },
        respostaCorreta: 'B',
        feedback: {
            B: 'Excelente! Perfis S precisam de segurança emocional. Começar com pontos positivos e usar abordagem colaborativa é ideal.',
            A: 'Abordagem muito direta pode intimidar perfil S. Eles precisam de contexto emocional e suporte.',
            C: 'Email pode ser muito frio para S. Prefira conversas pessoais e empáticas.',
            D: 'Adiar não resolve. S precisa de clareza, mas com empatia e tempo para processar.'
        }
    },
    2: {
        icone: 'fa-rocket',
        titulo: 'Motivando Equipe com Perfil D Predominante',
        contexto: 'Sua equipe tem maioria de perfis D (Dominância) e está desmotivada após perda de projeto. Como reativar o engajamento?',
        opcoes: {
            A: { texto: 'Organizar encontro social descontraído para fortalecer vínculos emocionais.', pontos: 3 },
            B: { texto: 'Apresentar novo desafio ambicioso com prazos apertados e metas ousadas.', pontos: 10 },
            C: { texto: 'Dar tempo para que processem o luto da derrota e se recuperem naturalmente.', pontos: 2 },
            D: { texto: 'Fazer análise detalhada do que deu errado para evitar erros futuros.', pontos: 5 }
        },
        respostaCorreta: 'B',
        feedback: {
            B: 'Perfeito! Perfis D se energizam com desafios. Novo objetivo audacioso os reativa imediatamente.',
            A: 'Perfis D não priorizam socialização. Eles querem ação e resultados.',
            C: 'D não gosta de "tempo para processar". Eles querem avançar rapidamente.',
            D: 'Análise é útil, mas D quer ação. Combine análise rápida com novo desafio.'
        }
    },
    3: {
        icone: 'fa-handshake',
        titulo: 'Negociação com Cliente Perfil C',
        contexto: 'Cliente com perfil C (Conformidade) está indeciso sobre proposta. Reunião decisiva amanhã. Qual estratégia?',
        opcoes: {
            A: { texto: 'Preparar apresentação com todos os dados, estudos de caso, ROI detalhado e comparativos.', pontos: 10 },
            B: { texto: 'Focar no relacionamento pessoal e confiança construída ao longo do processo.', pontos: 3 },
            C: { texto: 'Criar senso de urgência com prazo limitado e bônus para decisão rápida.', pontos: 2 },
            D: { texto: 'Apresentação curta e objetiva focando apenas nos benefícios principais.', pontos: 4 }
        },
        respostaCorreta: 'A',
        feedback: {
            A: 'Excelente! Perfil C precisa de dados concretos, provas e análise detalhada antes de decidir.',
            B: 'Relacionamento ajuda, mas C decide por lógica e dados, não emoção.',
            C: 'Urgência artificial pode afastar C. Eles não gostam de pressão para decisões rápidas.',
            D: 'C quer detalhes! Apresentação superficial pode gerar desconfiança.'
        }
    },
    4: {
        icone: 'fa-users',
        titulo: 'Integrando Perfis I e C na Equipe',
        contexto: 'Conflito entre designer (perfil I - criativo e espontâneo) e desenvolvedor (perfil C - metódico e detalhista). Como mediar?',
        opcoes: {
            A: { texto: 'Separar as responsabilidades para que não precisem trabalhar juntos diretamente.', pontos: 2 },
            B: { texto: 'Pedir que I seja mais organizado e C seja mais flexível, encontrando meio termo.', pontos: 5 },
            C: { texto: 'Criar processo estruturado onde criatividade de I tem espaço definido e C valida tecnicamente.', pontos: 10 },
            D: { texto: 'Fazer dinâmica de integração para que se conheçam melhor pessoalmente.', pontos: 4 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Perfeito! Estruturar processo que valida ambas as forças (criatividade + qualidade) é ideal.',
            B: 'Pedir mudança de essência gera frustração. Melhor criar sistema que aproveite diferenças.',
            A: 'Separar perde sinergia. Combinação I+C pode gerar inovação com qualidade.',
            D: 'Dinâmica ajuda, mas não resolve problema estrutural de processo.'
        }
    },
    5: {
        icone: 'fa-chart-line',
        titulo: 'Comunicando Mudança para Perfil S',
        contexto: 'Empresa vai reestruturar departamento. Equipe tem maioria perfil S que valoriza estabilidade. Como comunicar?',
        opcoes: {
            A: { texto: 'Anunciar mudança de forma rápida e objetiva, focando nos benefícios futuros.', pontos: 2 },
            B: { texto: 'Comunicar com antecedência, explicar razões, ouvir preocupações e dar suporte na transição.', pontos: 10 },
            C: { texto: 'Enviar comunicado oficial detalhado por email para que leiam com calma.', pontos: 5 },
            D: { texto: 'Implementar mudança gradualmente sem comunicar muito para evitar ansiedade.', pontos: 1 }
        },
        respostaCorreta: 'B',
        feedback: {
            B: 'Excelente! S precisa de tempo, clareza e suporte emocional em mudanças. Comunicação empática é essencial.',
            A: 'Mudança rápida assusta S. Eles precisam de tempo para processar e se adaptar.',
            C: 'Email ajuda, mas S precisa de diálogo pessoal para expressar preocupações e receber suporte.',
            D: 'Pior opção! S detesta surpresas. Falta de comunicação gera insegurança e resistência.'
        }
    },
    6: {
        icone: 'fa-laptop-house',
        titulo: 'Gerindo Trabalho Remoto com Perfis Mistos',
        contexto: 'Seu time passou para modelo híbrido. Perfis I sentem falta de interação e perfis C reclamam de reuniões demais. Como equilibrar?',
        opcoes: {
            A: { texto: 'Manter todas as reuniões diárias longas para garantir alinhamento máximo.', pontos: 2 },
            B: { texto: 'Reduzir ao mínimo as reuniões e resolver tudo por e-mail.', pontos: 1 },
            C: { texto: 'Criar rituais curtos de conexão para I e canais assíncronos estruturados para C.', pontos: 10 },
            D: { texto: 'Deixar cada um trabalhar como quiser, sem regras definidas.', pontos: 3 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Ótimo! I precisa de conexão social, C precisa de estrutura assíncrona. Combinar os dois equilibra engajamento e foco.',
            A: 'Reuniões longas cansam todos os perfis, especialmente C e D.',
            B: 'Só e-mail isola perfis I e S e pode gerar ruídos.',
            D: 'Ausência de regras aumenta conflitos de estilo e expectativas.'
        }
    },
    7: {
        icone: 'fa-exclamation-triangle',
        titulo: 'Conflito de Prazos entre D e C',
        contexto: 'Líder perfil D quer lançar funcionalidade rapidamente. Analista perfil C alerta para riscos de qualidade. Como conduzir?',
        opcoes: {
            A: { texto: 'Apoiar totalmente o D e exigir entrega rápida, mesmo com risco de bugs.', pontos: 1 },
            B: { texto: 'Apoiar totalmente o C e adiar o projeto até eliminar todos os riscos.', pontos: 3 },
            C: { texto: 'Facilitar acordo definindo MVP com critérios mínimos de qualidade e plano de correções posteriores.', pontos: 10 },
            D: { texto: 'Pedir que resolvam sozinhos para estimular autonomia.', pontos: 2 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Excelente! A combinação D+C é poderosa quando há acordo entre velocidade e qualidade por meio de um MVP bem definido.',
            A: 'Ignorar qualidade mina confiança do C e pode afetar cliente.',
            B: 'Perfeccionismo extremo pode matar o prazo e frustrar o D.',
            D: 'Conflitos estruturais precisam de facilitação, não abandono.'
        }
    },
    8: {
        icone: 'fa-heart-circle-bolt',
        titulo: 'Prevenindo Burnout em Perfis de Alta Entrega',
        contexto: 'Colaborador com combinação D/C entrega muito, mas demonstra sinais de esgotamento. Qual abordagem é mais adequada?',
        opcoes: {
            A: { texto: 'Elogiar a alta performance e oferecer ainda mais responsabilidades.', pontos: 1 },
            B: { texto: 'Ignorar sinais emocionais e focar apenas em metas e indicadores.', pontos: 0 },
            C: { texto: 'Reconhecer resultados, alinhar limites de carga e negociar redistribuição de demandas.', pontos: 10 },
            D: { texto: 'Sugerir que ele tire férias por conta própria se achar necessário.', pontos: 4 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Perfeito! D/C tende a não colocar limites. Liderança precisa reconhecer, ajustar carga e proteger saúde mental.',
            A: 'Mais responsabilidade sem limites acelera o burnout.',
            B: 'Ignorar sinais emocionais é risco alto de adoecimento.',
            D: 'Férias ajudam, mas sem ajuste estrutural o problema volta.'
        }
    },
    9: {
        icone: 'fa-user-plus',
        titulo: 'Recrutando para Equipe com Déficit de Perfil S',
        contexto: 'Time atual tem muitos perfis D e I, com clima de pressão e poucas escutas. Nova vaga aberta: qual foco de perfil é mais estratégico?',
        opcoes: {
            A: { texto: 'Buscar outro perfil D para aumentar foco em resultados.', pontos: 1 },
            B: { texto: 'Contratar perfil I para deixar o ambiente mais animado.', pontos: 3 },
            C: { texto: 'Priorizar candidato com perfil S forte para trazer estabilidade e suporte.', pontos: 10 },
            D: { texto: 'Escolher perfil C extremo para controlar tudo via processos.', pontos: 4 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Ótima escolha! Perfil S traz escuta, estabilidade e cuidado, equilibrando o excesso de D e I na equipe.',
            A: 'Mais D pode aumentar a pressão e conflitos.',
            B: 'Mais I aumenta energia, mas não resolve falta de estabilidade.',
            D: 'C ajuda em processos, mas não supre necessidade de acolhimento.'
        }
    },
    10: {
        icone: 'fa-chalkboard-teacher',
        titulo: 'Conduzindo Reunião com Multiperfis',
        contexto: 'Reunião estratégica reúne D, I, S e C. Nas últimas, D dominou a fala e C ficou em silêncio. Como melhorar a próxima?',
        opcoes: {
            A: { texto: 'Deixar a reunião totalmente livre para que cada um se manifeste quando quiser.', pontos: 2 },
            B: { texto: 'Dar a palavra apenas para quem se posicionar espontaneamente.', pontos: 1 },
            C: { texto: 'Definir pauta com tempo para cada tema e rodadas de fala, convidando S e C ativamente a opinar.', pontos: 10 },
            D: { texto: 'Fazer reunião só com D e I e depois informar S e C das decisões.', pontos: 0 }
        },
        respostaCorreta: 'C',
        feedback: {
            C: 'Excelente! Estrutura de fala e convite ativo garante voz para S e C, sem perder objetividade de D e I.',
            A: 'Formato solto tende a favorecer apenas perfis mais expansivos.',
            B: 'S e C costumam falar menos se não forem convidados.',
            D: 'Excluir S e C gera resistência e piora o clima.'
        }
    }
};

// ============================================
// FUNÇÕES DO SIMULADOR
// ============================================

let cenarioAtual = 1;
let pontuacao = 0;

function carregarCenario(numero) {
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
        <p>${cenario.feedback[opcao]}</p>
        <div style="margin-top: 12px; padding: 10px; background: rgba(249,137,72,0.15); border-radius: 8px; border: 1px solid var(--cor-primaria);">
            <strong style="color: var(--cor-primaria);">✓ Alternativa Ideal: ${cenario.respostaCorreta}</strong>
        </div>
    `;
    feedbackDiv.classList.add('show');

    // Mostra botão próximo cenário ou resultado final
    if (cenarioAtual < TOTAL_CENARIOS) {
        document.getElementById('btnProximoCenario').style.display = 'flex';
    } else {
        setTimeout(() => {
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

function filtrarCasos(categoria) {
    const cards = document.querySelectorAll('.caso-card');
    const filtros = document.querySelectorAll('.filtro-caso');

    // Atualiza botões ativos
    filtros.forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');

    // Filtra cards
    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            if (card.getAttribute('data-categoria') === categoria) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        }
    });
}

function abrirCaso(casoId) {
    const modal = document.getElementById('modalCaso');
    const modalBody = document.getElementById('modalCasoBody');

    const casos = {
        caso1: {
            titulo: 'Liderando Equipe de Alta Performance - Perfil D',
            conteudo: `
                <h3>Contexto</h3>
                <p>João é gerente de desenvolvimento em uma startup de tecnologia. Com perfil D dominante, assumiu uma equipe desmotivada que não batia metas há 6 meses.</p>

                <h3>Desafio</h3>
                <p>Equipe de 12 pessoas, com mix de perfis, mas sem direção clara e metas desafiadoras. Ambiente estava acomodado e sem senso de urgência.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>João usou seu perfil D de forma estratégica:</p>
                <ul>
                    <li>Estabeleceu metas audaciosas e prazos claros (característica D)</li>
                    <li>Identificou perfis DISC de cada membro da equipe</li>
                    <li>Criou sub-líderes baseado em perfis complementares</li>
                    <li>Adaptou comunicação e motivação por perfil</li>
                    <li>Deu autonomia proporcional ao perfil de cada um</li>
                </ul>

                <h3>Resultados</h3>
                <p>Em 6 meses:</p>
                <ul>
                    <li>Equipe passou de 60% para 135% das metas</li>
                    <li>Turnover caiu de 40% para 5% ao ano</li>
                    <li>NPS interno subiu de 6 para 9.2</li>
                    <li>Equipe recebeu prêmio de melhor desempenho da empresa</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis D são excelentes para turnarounds, mas precisam equilibrar seu drive por resultados com empatia aos diferentes perfis da equipe. João aprendeu a "dosar" seu estilo direto com cada membro.</p>
            `
        },
        caso2: {
            titulo: 'Fechando Vendas com Relacionamento - Perfil I',
            conteudo: `
                <h3>Contexto</h3>
                <p>Maria é vendedora B2B com perfil I marcante. Trabalhava em empresa de software corporativo com ciclo de vendas longo (6-12 meses).</p>

                <h3>Desafio</h3>
                <p>Taxa de conversão estava em 12%, abaixo da média do mercado (18%). Maria tinha ótimo rapport inicial, mas perdia deals na fase final.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Com mentoria, Maria aprendeu a:</p>
                <ul>
                    <li>Identificar perfil DISC do cliente logo no primeiro contato</li>
                    <li>Adaptar apresentação ao perfil: dados para C, benefícios para D, histórias para I, segurança para S</li>
                    <li>Usar seu carisma (I) para build rapport, mas trazer dados (C) para fechamento</li>
                    <li>Formar parcerias com colegas perfil C para validação técnica</li>
                    <li>Criar "playbooks" por perfil de cliente</li>
                </ul>

                <h3>Resultados</h3>
                <p>Em 8 meses:</p>
                <ul>
                    <li>Conversão subiu de 12% para 27%</li>
                    <li>Ticket médio aumentou 35%</li>
                    <li>Tornou-se top seller da empresa</li>
                    <li>Criou metodologia replicada por toda equipe de vendas</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfil I tem vantagem no relacionamento, mas precisa complementar com estrutura e dados. Maria não mudou sua essência, apenas adicionou ferramentas para diferentes perfis de clientes.</p>
            `
        },
        caso3: {
            titulo: 'Mediação de Conflitos com Empatia - Perfil S',
            conteudo: `
                <h3>Contexto</h3>
                <p>Ana é analista de RH com forte perfil S em hospital de grande porte. Departamentos de enfermagem e administrativo estavam em conflito aberto há 3 meses.</p>

                <h3>Desafio</h3>
                <p>Conflito afetava atendimento aos pacientes. Enfermeiros (maioria perfil S) sentiam-se desrespeitados pelo administrativo (maioria perfil D). Clima estava insustentável.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Ana usou seu perfil S como ponte:</p>
                <ul>
                    <li>Escutou individualmente cada lado sem julgamento (força do S)</li>
                    <li>Identificou que conflito era de ritmo e comunicação, não de pessoas</li>
                    <li>Facilitou workshops misturando perfis</li>
                    <li>Criou protocolo de comunicação adaptado aos perfis</li>
                    <li>Estabeleceu "embaixadores" S e D de cada departamento</li>
                </ul>

                <h3>Resultados</h3>
                <p>Em 4 meses:</p>
                <ul>
                    <li>NPS interdepartamental subiu de 3 para 8.5</li>
                    <li>Reclamações de pacientes caíram 60%</li>
                    <li>Produtividade geral aumentou 25%</li>
                    <li>Modelo foi replicado em outros hospitais da rede</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis S são mediadores naturais. Ana provou que conflitos entre perfis extremos (D vs S) podem ser resolvidos com empatia, estrutura e respeito às diferenças.</p>
            `
        },
        caso4: {
            titulo: 'Análise e Resolução de Problemas - Perfil C',
            conteudo: `
                <h3>Contexto</h3>
                <p>Carlos é gerente de projetos de TI com perfil C acentuado. Projeto crítico de migração de sistemas estava 40% atrasado e 60% acima do orçamento.</p>

                <h3>Desafio</h3>
                <p>Equipe técnica (perfis C e D) em conflito constante. Prazo era inegociável por questões regulatórias. Risco de multa milionária.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Carlos aplicou análise DISC sistemática:</p>
                <ul>
                    <li>Mapeou perfis de toda equipe (12 pessoas)</li>
                    <li>Identificou que conflito era entre perfis D (queriam velocidade) e C (queriam perfeição)</li>
                    <li>Criou matriz de priorização: essencial vs desejável</li>
                    <li>Definiu "critérios de pronto" por perfil</li>
                    <li>Estabeleceu rituais de comunicação adaptados (standups para D, documentação para C)</li>
                </ul>

                <h3>Resultados</h3>
                <p>Em 5 meses:</p>
                <ul>
                    <li>Projeto entregue 2 semanas ANTES do prazo</li>
                    <li>15% ABAIXO do orçamento recalibrado</li>
                    <li>Zero bugs críticos em produção</li>
                    <li>Equipe mantida íntegra para próximos projetos</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfil C traz análise e qualidade, essenciais em projetos críticos. Carlos provou que estrutura e compreensão de perfis resolve conflitos que pareciam técnicos mas eram comportamentais.</p>
            `
        },
        caso5: {
            titulo: 'Formação de Equipe Balanceada - Multi-Perfil',
            conteudo: `
                <h3>Contexto</h3>
                <p>Roberto, diretor de inovação, precisava montar equipe para desenvolver nova linha de produtos. Tinha liberdade total de contratação.</p>

                <h3>Desafio</h3>
                <p>Formar equipe de 8 pessoas do zero para projeto de 18 meses. Produto precisava ser inovador, mas viável comercialmente e tecnicamente.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Roberto usou DISC como critério de formação:</p>
                <ul>
                    <li>2 perfis D: liderança, decisões rápidas, foco em resultados</li>
                    <li>2 perfis I: networking, criatividade, comunicação com stakeholders</li>
                    <li>2 perfis S: suporte, coesão da equipe, mediação de conflitos</li>
                    <li>2 perfis C: qualidade, análise de viabilidade, documentação</li>
                </ul>

                <p>Além disso:</p>
                <ul>
                    <li>Todos passaram por workshop DISC para autoconhecimento</li>
                    <li>Definiu papéis aproveitando forças de cada perfil</li>
                    <li>Criou rituais que atendiam todos os perfis</li>
                    <li>Estabeleceu sistema de tomada de decisão balanceado</li>
                </ul>

                <h3>Resultados</h3>
                <p>Em 18 meses:</p>
                <ul>
                    <li>Produto lançado no prazo</li>
                    <li>3 patentes depositadas</li>
                    <li>Produto atingiu 150% da meta de receita no primeiro ano</li>
                    <li>Equipe considerada referência na empresa</li>
                    <li>Zero turnover - todos os 8 continuaram após projeto</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Equipes balanceadas com diversidade DISC intencional são mais inovadoras, resilientes e eficazes. Não existe "perfil melhor" - existe complementaridade estratégica.</p>
            `
        },
        caso6: {
            titulo: 'Negociação de Alto Impacto - Perfil D',
            conteudo: `
                <h3>Contexto</h3>
                <p>Ricardo, VP de vendas corporativas com perfil D marcante, estava negociando contrato de R$ 12 milhões com multinacional farmacêutica.</p>

                <h3>Desafio</h3>
                <p>Cliente (CFO) tinha perfil C extremo: detalhista, cauteloso, analítico. Ricardo já tinha perdido 2 negociações similares por abordagem muito agressiva.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Ricardo adaptou completamente sua abordagem:</p>
                <ul>
                    <li>Identificou perfil C do CFO logo na primeira reunião</li>
                    <li>Conteve seu impulso D de fechar rápido</li>
                    <li>Preparou documentação técnica exaustiva (258 páginas)</li>
                    <li>Trouxe especialista técnico (perfil C) para todas as reuniões</li>
                    <li>Aceitou processo de 4 meses sem pressionar</li>
                    <li>Respondeu TODAS as 147 perguntas do cliente com dados</li>
                </ul>

                <h3>Momentos Críticos</h3>
                <p>Ricardo quase perdeu o deal 2 vezes:</p>
                <ul>
                    <li>Quando tentou acelerar decisão (impulso D) - cliente recuou</li>
                    <li>Aprendeu a "falar C": dados, não entusiasmo</li>
                </ul>

                <h3>Resultados</h3>
                <p>Após 4 meses:</p>
                <ul>
                    <li>Contrato fechado em R$ 12.8 milhões (6% acima do esperado)</li>
                    <li>Cliente pediu exclusividade por 3 anos</li>
                    <li>Ricardo virou referência interna em vendas para perfis C</li>
                    <li>Criou playbook "D vendendo para C"</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis opostos podem fazer negócios excelentes quando há adaptação genuína. Ricardo não deixou de ser D - apenas aprendeu a "falar C" quando necessário. Flexibilidade comportamental é a chave.</p>
            `
        }
    };

    const caso = casos[casoId];
    modalBody.innerHTML = `
        <h2>${caso.titulo}</h2>
        ${caso.conteudo}
    `;

    modal.classList.add('show');
}

function fecharModalCaso() {
    document.getElementById('modalCaso').classList.remove('show');
}

// Fechar modal ao clicar fora
document.getElementById('modalCaso')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalCaso') {
        fecharModalCaso();
    }
});

// ============================================
// CHAT IA — ENVIO DE MENSAGENS
// ============================================

function enviarMensagem() {
    const input = document.getElementById("chatInput");
    const chat = document.getElementById("chatMessages");

    if (!input || !chat) return;

    const texto = input.value.trim();
    if (texto === "") return;

    // mensagem do usuário
    adicionarMensagemChat("user", texto);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // resposta IA (simulada)
    setTimeout(() => {
        const resposta = gerarRespostaIA(texto);
        adicionarMensagemChat("bot", resposta);
        chat.scrollTop = chat.scrollHeight;
    }, 900);
}

function adicionarMensagemChat(tipo, texto) {
    const chat = document.getElementById("chatMessages");
    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const div = document.createElement("div");
    div.className = `chat-message ${tipo}`;

    div.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${tipo === "bot" ? "robot" : "user"}"></i>
        </div>
        <div class="message-content">
            <p>${texto}</p>
            <span class="message-time">${hora}</span>
        </div>
    `;

    chat.appendChild(div);
}

document.getElementById("chatInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
});

// Inicializa o primeiro cenário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarCenario(1);
});
