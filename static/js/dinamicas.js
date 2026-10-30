/* ============================================
   DINAMICAS.JS — Funcionalidades da página
   ============================================ */

// ============================================
// FILTROS DE CATEGORIA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const filtros = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.dinamica-card');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            // Remove active de todos
            filtros.forEach(f => f.classList.remove('active'));
            // Adiciona active no clicado
            filtro.classList.add('active');

            const categoria = filtro.getAttribute('data-filtro');

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
        });
    });
});

// ============================================
// MODAL DE DETALHES - TODAS AS 8 DINÂMICAS
// ============================================

function abrirModal(dinamicaId) {
    const modal = document.getElementById('modalCaso');
    const modalBody = document.getElementById('modalBody');

    // Dados completos das 8 dinâmicas
    const dinamicas = {
        dinamica1: {
            titulo: 'Duas Verdades e Uma Mentira',
            descricao: 'Dinâmica clássica de quebra-gelo que ajuda os participantes a se conhecerem melhor de forma leve e divertida.',
            objetivos: [
                'Promover integração entre os participantes',
                'Estimular comunicação e observação',
                'Criar ambiente descontraído e receptivo',
                'Discutir percepções e limites das interpretações, sem inferir mentira por gestos'
            ],
            passos: [
                'Cada pessoa pensa em 3 afirmações sobre si mesma (2 verdadeiras, 1 falsa)',
                'Um por vez, compartilha as 3 afirmações com o grupo',
                'Os demais tentam adivinhar qual é a mentira',
                'A pessoa revela qual era a verdade e explica brevemente',
                'Facilitador pode pedir que grupo vote antes da revelação'
            ],
            materiais: 'Nenhum material específico necessário. Opcional: papel e caneta para anotações.',
            dicas: 'Incentive fatos curiosos e interessantes para tornar mais envolvente! Peça que as mentiras sejam plausíveis para dificultar.'
        },

        dinamica2: {
            titulo: 'Dinâmica do Espelho',
            descricao: 'Exercício profundo de autopercepção que promove reflexão sobre características pessoais e como somos vistos pelos outros.',
            objetivos: [
                'Desenvolver autoconhecimento e autocrítica construtiva',
                'Comparar autopercepção com percepção alheia',
                'Fortalecer inteligência emocional',
                'Identificar pontos cegos comportamentais'
            ],
            passos: [
                'Cada pessoa lista individualmente 5 características que acredita ter',
                'Formam-se duplas ou trios fixos',
                'Os colegas listam 5 características que veem na pessoa',
                'Compartilham as listas e comparam semelhanças e diferenças',
                'Discussão em grupo sobre insights e aprendizados',
                'Momento de reflexão individual para registro pessoal'
            ],
            materiais: 'Papel, caneta, ambiente reservado e silencioso para reflexão.',
            dicas: 'Crie ambiente seguro e respeitoso para compartilhamentos honestos. Oriente sobre feedback construtivo antes de iniciar.'
        },

        dinamica3: {
            titulo: 'Caminhada na Pele do Outro',
            descricao: 'Simulação de situações do dia a dia assumindo perspectivas diferentes para desenvolver empatia e compreensão.',
            objetivos: [
                'Desenvolver empatia e compreensão de perspectivas diferentes',
                'Praticar escuta ativa e comunicação não-violenta',
                'Reduzir julgamentos precipitados',
                'Fortalecer capacidade de resolver conflitos'
            ],
            passos: [
                'Facilitador apresenta 3-4 situações corporativas fictícias ou devidamente anonimizadas',
                'Divide participantes em grupos pequenos',
                'Cada pessoa recebe um papel (gerente, colaborador, cliente, etc.)',
                'Grupos encenam a situação da perspectiva de cada personagem',
                'Após encenação, trocam de papéis e repetem',
                'Discussão sobre como mudou a percepção ao trocar de papel'
            ],
            materiais: 'Cartões com situações impressas, papéis com personagens, espaço para movimentação.',
            dicas: 'Use situações fictícias ou anonimizadas. Não exija relatos pessoais nem exposição emocional.'
        },

        dinamica4: {
            titulo: 'Telefone Sem Fio Corporativo',
            descricao: 'Versão profissional do clássico jogo para demonstrar ruídos de comunicação e importância da clareza.',
            objetivos: [
                'Demonstrar como informações se distorcem na transmissão',
                'Evidenciar importância da comunicação clara e objetiva',
                'Identificar ruídos e barreiras comunicacionais',
                'Praticar técnicas de comunicação eficaz'
            ],
            passos: [
                'Facilitador prepara mensagem corporativa complexa (email, procedimento, etc.)',
                'Participantes formam fila',
                'Primeiro lê a mensagem e sussurra ao segundo',
                'Mensagem passa pessoa por pessoa até o final',
                'Último verbaliza em voz alta o que entendeu',
                'Compara-se com mensagem original e discute-se distorções'
            ],
            materiais: 'Mensagem escrita preparada, cronômetro (opcional), flipchart para comparação.',
            dicas: 'Compare uma rodada sem checagem com outra que permita perguntas. Discuta como confirmar entendimento reduz ruídos.'
        },

        dinamica5: {
            titulo: 'Mapeamento de Forças e Fraquezas',
            descricao: 'Atividade individual e em grupo para identificar pontos fortes e áreas de desenvolvimento de cada membro.',
            objetivos: [
                'Identificar competências individuais e coletivas',
                'Mapear gaps de desenvolvimento da equipe',
                'Promover autoconhecimento profissional',
                'Criar plano de desenvolvimento baseado em dados reais'
            ],
            passos: [
                'Cada pessoa lista 3 principais forças e 3 áreas de melhoria',
                'Em grupos, compartilham suas listas',
                'Grupo adiciona forças que a pessoa não percebeu',
                'Criar matriz visual coletiva em flipchart/quadro',
                'Identificar padrões e complementaridades na equipe',
                'Discutir estratégias para potencializar forças e desenvolver áreas fracas'
            ],
            materiais: 'Papel A4, post-its coloridos, canetas, flipchart, fita adesiva.',
            dicas: 'Enfatize que fraquezas são oportunidades de crescimento. Use cores para visualizar padrões.'
        },

        dinamica6: {
            titulo: 'Círculo de Feedback Positivo',
            descricao: 'Cada pessoa recebe feedbacks construtivos e positivos do grupo, fortalecendo vínculos e autoestima.',
            objetivos: [
                'Fortalecer autoestima e confiança profissional',
                'Praticar dar e receber feedback de forma saudável',
                'Criar cultura de reconhecimento na equipe',
                'Melhorar clima organizacional e engajamento'
            ],
            passos: [
                'Grupo forma círculo físico ou virtual',
                'Uma pessoa por vez fica no centro (ou destaque)',
                'Cada membro do grupo oferece um feedback positivo específico',
                'A pessoa escolhe ouvir ou receber os comentários por escrito e pode pedir esclarecimentos',
                'Após todos falarem, pessoa agradece e próxima vai ao centro',
                'Facilitador fecha com reflexão sobre sentimentos e aprendizados'
            ],
            materiais: 'Ambiente tranquilo e cadeiras em círculo; possibilidade de participação por escrito ou como observador.',
            dicas: 'Feedbacks devem ser específicos, não genéricos. Estabeleça ambiente seguro e confidencial.'
        },

        dinamica7: {
            titulo: 'Construção Colaborativa',
            descricao: 'Equipes devem construir algo juntas usando apenas comunicação verbal, sem gestos ou demonstrações físicas.',
            objetivos: [
                'Desenvolver comunicação clara e precisa',
                'Praticar trabalho em equipe sob restrições',
                'Identificar estilos de liderança emergentes',
                'Avaliar capacidade de planejamento e execução coletiva'
            ],
            passos: [
                'Dividir em equipes de 4-6 pessoas',
                'Cada equipe recebe materiais idênticos (LEGO, papel, etc.)',
                'Escolhem um líder que não pode tocar nos materiais',
                'Líder instrui equipe verbalmente para construir estrutura específica',
                'Executores não podem falar, apenas ouvir e executar',
                'Tempo limitado: 15-20 minutos',
                'Avaliação: qual equipe ficou mais próxima do objetivo?'
            ],
            materiais: 'LEGO, blocos de madeira, papel e palitos, ou materiais recicláveis. Cronômetro.',
            dicas: 'Faça uma segunda rodada com perguntas permitidas. Compare os resultados e discuta o efeito das restrições; não classifique pessoas pela atividade.'
        },

        dinamica8: {
            titulo: 'Apresentação Criativa',
            descricao: 'Cada pessoa se apresenta de forma criativa usando objetos, histórias ou performances breves e divertidas.',
            objetivos: [
                'Quebrar o gelo de forma lúdica e memorável',
                'Estimular criatividade e espontaneidade',
                'Facilitar memorização de nomes e características',
                'Reduzir ansiedade e tensão inicial do grupo'
            ],
            passos: [
                'Cada pessoa traz ou escolhe um objeto que a representa',
                'Preparam apresentação criativa de 1-2 minutos',
                'Pode incluir: história do objeto, metáfora, música, mímica',
                'Apresentam um por vez ao grupo',
                'Grupo pode fazer 1-2 perguntas após cada apresentação',
                'Facilitador fecha destacando elementos comuns e únicos'
            ],
            materiais: 'Objetos pessoais ou disponíveis no ambiente, música de fundo (opcional).',
            dicas: 'Dê exemplo primeiro para encorajar criatividade. Celebre todas as apresentações com aplausos.'
        }
    };

    const dinamica = dinamicas[dinamicaId];

    if (dinamica) {
        document.getElementById('modalTitulo').textContent = dinamica.titulo;
        const indice = Number(dinamicaId.replace('dinamica', '')) - 1;
        const card = document.querySelectorAll('.dinamica-card')[indice];
        const metadados = [...card.querySelectorAll('.dinamica-info span')].map(el => el.textContent.trim());
        const secao = (titulo, conteudo) => `<section class="modal-secao"><h3>${titulo}</h3>${conteudo}</section>`;
        modalBody.innerHTML =
            secao('Contexto', `<p>${dinamica.descricao}</p><p><strong>Duração:</strong> ${metadados[0]} · <strong>Grupo:</strong> ${metadados[1]}</p>`) +
            secao('Objetivos', `<ul>${dinamica.objetivos.map(v => `<li>${v}</li>`).join('')}</ul>`) +
            secao('Passo a passo', `<ol>${dinamica.passos.map(v => `<li>${v}</li>`).join('')}</ol>`) +
            secao('Materiais', `<p>${dinamica.materiais}</p>`) +
            secao('Orientações para facilitar', `<p>${dinamica.dicas}</p>`) +
            secao('Discussão e fechamento', '<ul><li>O que aconteceu durante a atividade?</li><li>Que comportamentos facilitaram ou dificultaram a participação?</li><li>O que pode ser aplicado no trabalho e qual ação o grupo combina experimentar?</li></ul>') +
            secao('Cuidados de aplicação', '<p>Combine participação voluntária e possibilidade de observar sem se expor. Use exemplos fictícios, preserve a privacidade e adapte a atividade às necessidades de acessibilidade. A atividade é didática; não é avaliação psicológica ou diagnóstico individual.</p>');
        document.body.style.overflow = 'hidden';
        modal.classList.add('ativo');
    }
}

function fecharModal() {
    const modal = document.getElementById('modalCaso');
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
}

// Fechar modal ao clicar fora
document.getElementById('modalCaso')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalCaso') {
        fecharModal();
    }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModal();
    }
});

document.getElementById('btnImprimirDinamica').addEventListener('click', () => window.print());
document.getElementById('btnCompartilharDinamica').addEventListener('click', async () => {
    const text = document.getElementById('modalTitulo').textContent + '\n\n' + document.getElementById('modalBody').innerText;
    try {
        if (navigator.share) await navigator.share({ title: 'Dinâmica para aula', text });
        else {
            await navigator.clipboard.writeText(text);
            const button = document.getElementById('btnCompartilharDinamica');
            button.innerHTML = '<i class="fas fa-check"></i> Copiado';
            setTimeout(() => button.innerHTML = '<i class="fas fa-share-alt"></i> Compartilhar', 2000);
        }
    } catch (error) {
        if (error.name !== 'AbortError') document.getElementById('btnCompartilharDinamica').textContent = 'Não foi possível copiar';
    }
});
