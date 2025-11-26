// ============================================
// GERADOR DE RESPOSTAS IA — OPÇÃO C (COMPLETA)
// ============================================

function gerarRespostaIA(pergunta) {
    const msg = pergunta.toLowerCase().trim();

    // ============================================
    // 1) DETECÇÃO DE ASSUNTOS TOTALMENTE FORA DO TEMA
    // ============================================
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
            Aqui eu sou focado em ajudar com temas como:<br>
            • Análise DISC<br>
            • Liderança e gestão de pessoas<br>
            • Clima organizacional<br>
            • Recrutamento e RH<br>
            • Comunicação e conflitos<br>
            • Saúde mental no ambiente de trabalho<br><br>
            Se quiser, posso te orientar em qualquer um desses assuntos!<br>
            Sobre qual tema gostaria de falar?
        `;
    }

    // ============================================
    // 2) BASE DE RESPOSTAS — PERFIS (DISC)
    // ============================================
    const respostas = [
        {
            keys: ["perfil d", "dominancia", "dominância", "perfil dominante", "d "],
            resp: `
                <strong>Perfil D (Dominância)</strong><br><br>
                Características principais:<br>
                • Rápido, direto e orientado a resultados<br>
                • Gosta de desafios e autonomia<br>
                • Odia detalhes e lentidão<br><br>

                Para lidar bem com esse perfil:<br>
                • Vá direto ao ponto<br>
                • Mostre impacto e resultados<br>
                • Dê autonomia e metas claras<br><br>

                Se quiser, posso te ajudar a:<br>
                • Montar um feedback para um perfil D<br>
                • Resolver um conflito entre D e outros perfis<br>
                • Melhorar a comunicação com esse estilo
            `
        },
        {
            keys: ["perfil i", "influencia", "influência", "influente", "i "],
            resp: `
                <strong>Perfil I (Influência)</strong><br><br>
                Características:<br>
                • Comunicativo, sociável e otimista<br>
                • Gosta de reconhecimento e interação<br>
                • Não curte rotina ou cobranças rígidas<br><br>

                Para ter melhor relação com esse perfil:<br>
                • Use entusiasmo e empatia<br>
                • Envolva em decisões<br>
                • Reconheça publicamente<br><br>

                Quer aprofundar?<br>
                • Posso sugerir formas de motivar um perfil I<br>
                • Ou como dar um feedback sem desmotivá-lo
            `
        },
        {
            keys: ["perfil s", "estabilidade", "estável", "s "],
            resp: `
                <strong>Perfil S (Estabilidade)</strong><br><br>
                Características:<br>
                • Calmo, prestativo, paciente<br>
                • Evita conflitos e mudanças bruscas<br>
                • Valoriza segurança e harmonia<br><br>

                Como trabalhar melhor com esse perfil:<br>
                • Explique mudanças com antecedência<br>
                • Use tom acolhedor e gentil<br>
                • Dê espaço para absorver informações<br><br>

                Quer ajuda com:<br>
                • Estratégia de feedback para um perfil S?<br>
                • Reduzir ansiedade ou insegurança de um colaborador S?
            `
        },
        {
            keys: ["perfil c", "conformidade", "analítico", "c "],
            resp: `
                <strong>Perfil C (Conformidade)</strong><br><br>
                Características:<br>
                • Detalhista, técnico, organizado<br>
                • Gosta de precisão e lógica<br>
                • Evita erros e improvisos<br><br>

                Para lidar melhor com esse perfil:<br>
                • Forneça dados e processos claros<br>
                • Explique lógica das decisões<br>
                • Evite pressão por rapidez extrema<br><br>

                Posso te ajudar com:<br>
                • Feedback estruturado para um C<br>
                • Como evitar conflitos entre C e I ou C e D
            `
        }
    ];

    // Matching keywords
    for (const item of respostas) {
        if (item.keys.some(k => msg.includes(k))) {
            return item.resp;
        }
    }

    // ============================================
    // 3) TEMAS AMPLIADOS (LIDERANÇA, SAÚDE, CLIMA)
    // ============================================

    if (msg.includes("lider") || msg.includes("gestor") || msg.includes("liderança")) {
        return `
            Liderança eficaz envolve adaptar seu estilo aos diferentes perfis DISC.<br><br>
            Algumas estratégias práticas:<br>
            • Com D → Direto, desafiador e orientado a resultados<br>
            • Com I → Inspirador, acolhedor e comunicativo<br>
            • Com S → Gentil, estruturado e paciente<br>
            • Com C → Detalhado, lógico e organizado<br><br>
            Quer que eu analise um caso específico? Posso ajudar!
        `;
    }

    if (msg.includes("saude mental") || msg.includes("ansiedade") || msg.includes("estresse")) {
        return `
            A saúde mental no trabalho é profundamente influenciada pelo estilo comportamental.<br><br>
            Algumas recomendações:<br>
            • Perfis S e C tendem a sofrer mais em ambientes caóticos<br>
            • Perfis D podem acumular stress por excesso de responsabilidade<br>
            • Perfis I podem se desgastar com isolamento<br><br>
            Quer analisar o caso de alguém ou da sua equipe?
        `;
    }

    if (msg.includes("clima") || msg.includes("organizacional") || msg.includes("cultura")) {
        return `
            Melhorar o clima organizacional passa por comunicação, segurança psicológica e clareza de papéis.<br><br>
            Posso te orientar com:<br>
            • Como reduzir conflitos<br>
            • Estratégias de motivação<br>
            • Como alinhar equipes usando DISC<br><br>
            O que você gostaria de melhorar no seu time?
        `;
    }

    if (msg.includes("conflito") || msg.includes("briga") || msg.includes("desentendimento")) {
        return `
            Conflitos entre perfis DISC são comuns. Vamos olhar rapidamente:<br><br>
            • D x S → Ritmo vs segurança<br>
            • I x C → Criatividade vs precisão<br>
            • D x C → Pressa vs análise<br><br>
            Se quiser, posso te ajudar a mediar uma situação específica.
        `;
    }

    // ============================================
    // 4) RESPOSTA PADRÃO INTELIGENTE
    // ============================================

    return `
        Entendi! Para te ajudar melhor, posso falar sobre:<br><br>
        • Perfis D, I, S e C<br>
        • Liderança e gestão<br>
        • Clima organizacional e cultura<br>
        • Saúde mental no trabalho<br>
        • Conflitos e comunicação<br>
        • Recrutamento e análise comportamental<br><br>
        Sobre qual desses temas você quer conversar? 😊
    `;
}

// ============================================
// SIMULADOR DE CENÁRIOS
// ============================================

let cenarioAtual = 1;
let pontuacao = 0;

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
    }
};

function responderCenario(opcao, cenarioNum) {
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

    // Mostra botão próximo cenário
    if (cenarioAtual < 5) {
        document.getElementById('btnProximoCenario').style.display = 'flex';
    } else {
        // Último cenário - mostra resultado final
        setTimeout(() => {
            feedbackDiv.innerHTML += `
                <hr style="margin: 16px 0; border: 1px solid rgba(249,137,72,0.2);">
                <h4 style="color: var(--cor-primaria);">🎉 Simulação Concluída!</h4>
                <p><strong>Pontuação Final: ${pontuacao}/50 pontos</strong></p>
                <p>${avaliarDesempenho(pontuacao)}</p>
            `;
        }, 1000);
    }
}

function avaliarDesempenho(pontos) {
    if (pontos >= 45) return '🏆 Excelente! Você domina os princípios DISC e sabe aplicá-los em situações reais.';
    if (pontos >= 35) return '👏 Muito bom! Você tem boa compreensão do DISC e está no caminho certo.';
    if (pontos >= 25) return '📚 Bom esforço! Continue estudando os perfis para melhorar suas decisões.';
    return '💪 Continue praticando! Revise os perfis DISC e tente novamente.';
}

function proximoCenario() {
    cenarioAtual++;

    if (cenarioAtual > 5) {
        return;
    }

    const cenario = cenarios[cenarioAtual];

    // Atualiza badge
    document.querySelector('.cenario-badge').textContent = `Cenário ${cenarioAtual} de 5`;

    // Atualiza conteúdo
    document.querySelector('.cenario-icone i').className = `fas ${cenario.icone}`;
    document.getElementById('cenarioTitulo').textContent = cenario.titulo;
    document.getElementById('cenarioContexto').textContent = cenario.contexto;

    // Atualiza opções
    const opcoesDiv = document.getElementById('cenarioOpcoes');
    opcoesDiv.innerHTML = '';

    Object.keys(cenario.opcoes).forEach(letra => {
        const opcao = cenario.opcoes[letra];
        const btn = document.createElement('button');
        btn.className = 'opcao-btn';
        btn.onclick = () => responderCenario(letra, cenarioAtual);
        btn.innerHTML = `
            <span class="opcao-letra">${letra}</span>
            <span class="opcao-texto">${opcao.texto}</span>
        `;
        opcoesDiv.appendChild(btn);
    });

    // Esconde feedback e botão
    document.getElementById('feedbackCenario').classList.remove('show');
    document.getElementById('btnProximoCenario').style.display = 'none';
}

function reiniciarSimulador() {
    cenarioAtual = 1;
    pontuacao = 0;
    document.getElementById('pontuacaoTotal').textContent = '0';
    proximoCenario();
}

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
// SIMULADOR DE COMPATIBILIDADE (MANTIDO)
// ============================================

function analisarCompatibilidade() {
    const perfil1 = document.getElementById('perfil1').value;
    const perfil2 = document.getElementById('perfil2').value;
    const resultado = document.getElementById('resultadoCompatibilidade');

    const compatibilidades = {
        'DD': {
            nivel: '70%',
            titulo: 'Boa Compatibilidade - Foco em Resultados',
            descricao: 'Dois perfis D trabalham bem juntos quando há clareza de papéis e objetivos. Cuidado com disputas de poder.',
            dicas: [
                'Estabeleça limites claros de responsabilidade',
                'Defina metas compartilhadas e complementares',
                'Crie canais de comunicação direta'
            ]
        },
        'DI': {
            nivel: '85%',
            titulo: 'Ótima Compatibilidade - Ação + Comunicação',
            descricao: 'D traz foco e resultados, I traz energia e networking. Combinação poderosa para projetos que exigem velocidade e influência.',
            dicas: [
                'D cuida da execução, I cuida das relações',
                'Aproveitem a complementaridade natural',
                'Celebrem conquistas juntos'
            ]
        },
        'DS': {
            nivel: '60%',
            titulo: 'Média Compatibilidade - Requer Ajustes',
            descricao: 'D pode ver S como lento, S pode ver D como agressivo. Requer esforço consciente de adaptação mútua.',
            dicas: [
                'D precisa desacelerar e ouvir mais',
                'S precisa ser mais assertivo quando necessário',
                'Estabeleçam ritmo de trabalho equilibrado'
            ]
        },
        'DC': {
            nivel: '65%',
            titulo: 'Média-Alta Compatibilidade - Velocidade vs Qualidade',
            descricao: 'Conflito natural entre velocidade (D) e precisão (C). Quando bem gerenciado, equilibra resultados rápidos com qualidade.',
            dicas: [
                'Definam prazos realistas juntos',
                'C precisa aceitar "bom o suficiente" às vezes',
                'D precisa respeitar necessidade de análise'
            ]
        },
        'II': {
            nivel: '80%',
            titulo: 'Ótima Compatibilidade - Energia e Criatividade',
            descricao: 'Dois perfis I criam ambiente criativo, animado e colaborativo. Cuidado com falta de foco e dispersão.',
            dicas: [
                'Estabeleçam prazos e metas claras',
                'Usem ferramentas de organização',
                'Balancem socialização com produtividade'
            ]
        },
        'IS': {
            nivel: '90%',
            titulo: 'Excelente Compatibilidade - Harmonia Natural',
            descricao: 'Combinação muito harmoniosa! I traz energia, S traz estabilidade. Ambos valorizam relacionamentos.',
            dicas: [
                'Aproveitem a sinergia natural',
                'I inspire, S apoie',
                'Tomem cuidado com evitar conflitos necessários'
            ]
        },
        'IC': {
            nivel: '55%',
            titulo: 'Baixa-Média Compatibilidade - Opostos',
            descricao: 'I é espontâneo e social, C é metódico e reservado. Requer grande esforço de compreensão mútua.',
            dicas: [
                'Respeitem diferenças de ritmo e estilo',
                'I traga criatividade, C traga estrutura',
                'Comuniquem expectativas claramente'
            ]
        },
        'SS': {
            nivel: '75%',
            titulo: 'Boa Compatibilidade - Harmonia e Cooperação',
            descricao: 'Dois perfis S criam ambiente estável e colaborativo. Podem ter dificuldade com mudanças e decisões rápidas.',
            dicas: [
                'Pratiquem assertividade juntos',
                'Estabeleçam sistema para decisões',
                'Apoiem-se mutuamente em mudanças'
            ]
        },
        'SC': {
            nivel: '80%',
            titulo: 'Ótima Compatibilidade - Consistência e Qualidade',
            descricao: 'Ambos valorizam processos e qualidade. Trabalham bem em ambientes estruturados e previsíveis.',
            dicas: [
                'Criem processos claros juntos',
                'Balancem paciência com produtividade',
                'Celebrem pequenas conquistas'
            ]
        },
        'CC': {
            nivel: '70%',
            titulo: 'Boa Compatibilidade - Precisão e Análise',
            descricao: 'Dois perfis C garantem qualidade excepcional. Cuidado com análise excessiva e lentidão em decisões.',
            dicas: [
                'Estabeleçam prazos realistas mas firmes',
                'Definam critério de "bom o suficiente"',
                'Celebrem qualidade do trabalho'
            ]
        }
    };

    // Gera chave (sempre em ordem alfabética para cobrir ambas combinações)
    const chave = [perfil1, perfil2].sort().join('');
    const dados = compatibilidades[chave] || compatibilidades['DD']; // fallback

    resultado.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="font-size: 48px; font-weight: 700; color: var(--cor-primaria);">
                ${dados.nivel}
            </div>
            <h3 style="margin: 0;">${dados.titulo}</h3>
        </div>
        <p><strong>Análise:</strong> ${dados.descricao}</p>
        <h4 style="color: var(--cor-primaria); margin-top: 16px; margin-bottom: 8px;">
            💡 Dicas para Melhorar a Colaboração:
        </h4>
        <ul style="margin: 0; padding-left: 20px;">
            ${dados.dicas.map(dica => `<li style="margin-bottom: 6px;">${dica}</li>`).join('')}
        </ul>
    `;

    resultado.classList.add('show');
}
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
