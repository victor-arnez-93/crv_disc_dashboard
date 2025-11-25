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
    const modal = document.getElementById('modalDetalhes');
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
                'Desenvolver capacidade de percepção não-verbal'
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
                'Facilitador apresenta 3-4 situações corporativas conflituosas reais',
                'Divide participantes em grupos pequenos',
                'Cada pessoa recebe um papel (gerente, colaborador, cliente, etc.)',
                'Grupos encenam a situação da perspectiva de cada personagem',
                'Após encenação, trocam de papéis e repetem',
                'Discussão sobre como mudou a percepção ao trocar de papel'
            ],
            materiais: 'Cartões com situações impressas, papéis com personagens, espaço para movimentação.',
            dicas: 'Use situações reais do ambiente de trabalho para maior conexão. Permita que expressem emoções genuínas.'
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
            dicas: 'Use jargões corporativos e informações específicas. Filme para análise posterior (opcional).'
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
                'Pessoa no centro apenas ouve, sem comentar ou justificar',
                'Após todos falarem, pessoa agradece e próxima vai ao centro',
                'Facilitador fecha com reflexão sobre sentimentos e aprendizados'
            ],
            materiais: 'Ambiente tranquilo, cadeiras em círculo, lenços (emoções podem aflorar).',
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
            dicas: 'Grave em vídeo para análise posterior. Discuta barreiras de comunicação identificadas.'
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
        modalBody.innerHTML = `
            <h2>${dinamica.titulo}</h2>
            <p><strong>Descrição:</strong> ${dinamica.descricao}</p>

            <h3 style="color: var(--cor-primaria); margin-top: 24px;">Objetivos:</h3>
            <ul>
                ${dinamica.objetivos.map(obj => `<li>${obj}</li>`).join('')}
            </ul>

            <h3 style="color: var(--cor-primaria); margin-top: 24px;">Passo a Passo:</h3>
            <ol style="list-style: decimal; padding-left: 25px;">
                ${dinamica.passos.map(passo => `<li style="padding-left: 0;">${passo}</li>`).join('')}
            </ol>

            <p style="margin-top: 20px;"><strong>Materiais:</strong> ${dinamica.materiais}</p>
            <p style="margin-top: 12px; padding: 15px; background: rgba(249,137,72,0.1); border-left: 4px solid var(--cor-primaria); border-radius: 8px;"><strong>💡 Dicas:</strong> ${dinamica.dicas}</p>
        `;

        modal.classList.add('show');
    }
}

function fecharModal() {
    const modal = document.getElementById('modalDetalhes');
    modal.classList.remove('show');
}

// Fechar modal ao clicar fora
document.getElementById('modalDetalhes')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalDetalhes') {
        fecharModal();
    }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModal();
    }
});
