const ferramentas = {
    swot: {
        titulo: 'Análise SWOT', subtitulo: 'Diagnóstico interno e externo',
        resumo: 'Relacione capacidades e limitações da organização às condições do ambiente. Defina primeiro qual unidade e qual objetivo serão analisados.',
        eixos: 'Forças e fraquezas: ambiente interno · Oportunidades e ameaças: ambiente externo.',
        caixas: [['Forças · internas', 'Competências, processos ou recursos favoráveis ao objetivo.'], ['Fraquezas · internas', 'Lacunas ou limitações relevantes da organização.'], ['Oportunidades · externas', 'Condições do ambiente que podem favorecer o objetivo.'], ['Ameaças · externas', 'Condições do ambiente que podem dificultar o objetivo.']],
        caso: 'Uma escola tem professores experientes, mas processos de matrícula lentos. A procura por cursos digitais cresce e novos concorrentes entram na cidade. Classifique os quatro fatores e proponha uma ação prioritária.',
        rh: 'Use o diagnóstico para relacionar competências existentes, lacunas de desenvolvimento e necessidades de pessoas às prioridades do negócio.',
        limite: 'A matriz não mede viabilidade nem prevê o futuro. Valide percepções com evidências e defina ações, responsáveis e prazos.'
    },
    porter: {
        titulo: 'Cinco Forças de Porter', subtitulo: 'Estrutura competitiva do setor',
        resumo: 'Analise as pressões que influenciam a rentabilidade e a distribuição de valor em uma indústria. O modelo vai além da concorrência direta.',
        eixos: 'Defina o setor e o mercado analisados antes de identificar seus participantes.',
        caixas: [['Rivalidade', 'Como as empresas estabelecidas disputam clientes e valor?'], ['Novos entrantes', 'Quais barreiras dificultam novas entradas?'], ['Substitutos', 'Que outras soluções atendem à mesma necessidade?'], ['Fornecedores', 'Quem fornece insumos críticos e quais são as alternativas?'], ['Compradores', 'Como concentração, diferenciação e custos de troca afetam o poder de negociação?']],
        caso: 'Uma clínica depende de um único software, atende poucos convênios e vê crescer o atendimento digital. Identifique as pressões de fornecedores, compradores e substitutos. Que evidências ainda faltam?',
        rh: 'Discuta quais capacidades e competências ajudam a sustentar o posicionamento escolhido, sem confundir fatores internos de RH com as cinco forças.',
        limite: 'A atratividade do setor não garante resultado individual. Combine a análise externa com a posição e as capacidades da organização.'
    },
    bcg: {
        titulo: 'Matriz BCG', subtitulo: 'Prioridades de portfólio',
        resumo: 'Compare negócios ou produtos usando crescimento do mercado e participação relativa em relação ao principal concorrente.',
        eixos: 'Crescimento alto: linha superior · Crescimento baixo: linha inferior · Participação relativa alta: coluna esquerda · Baixa: coluna direita.',
        caixas: [['Estrela', 'Alto crescimento e alta participação relativa. Pode exigir investimento.'], ['Interrogação', 'Alto crescimento e baixa participação relativa. Avalie capacidade de competir.'], ['Vaca leiteira', 'Baixo crescimento e alta participação relativa. Pode gerar recursos para o portfólio.'], ['Abacaxi', 'Baixo crescimento e baixa participação relativa. Analise alternativas e sinergias.']],
        caso: 'Uma empresa oferece cursos maduros com alta participação e uma plataforma nova com baixa participação em mercado crescente. Como distribuir investimento e capacidade de equipe sem assumir que o quadrante garante lucro?',
        rh: 'Conecte prioridades de investimento ao desenvolvimento de competências e à alocação de equipes. Não use quadrantes de portfólio para classificar pessoas.',
        limite: 'Participação relativa = participação da unidade ÷ participação do principal concorrente. Explicite critérios de corte e complemente com caixa, rentabilidade e sinergias.'
    },
    ansoff: {
        titulo: 'Matriz Ansoff', subtitulo: 'Direções de crescimento',
        resumo: 'Organize alternativas de crescimento conforme a novidade de produtos e mercados para a organização analisada.',
        eixos: 'Mercado atual: linha superior · Mercado novo: linha inferior · Produto atual: coluna esquerda · Produto novo: coluna direita.',
        caixas: [['Penetração de mercado', 'Oferta atual para mercado atual. Exemplo: aumentar recompra.'], ['Desenvolvimento de produto', 'Oferta nova para mercado atual. Exemplo: novo serviço para a base atendida.'], ['Desenvolvimento de mercado', 'Oferta atual para mercado novo. Exemplo: entrar em outra região.'], ['Diversificação', 'Oferta nova para mercado novo. Pode ser relacionada ou não ao negócio atual.']],
        caso: 'Uma consultoria pode vender mais do serviço atual, lançar treinamento para seus clientes, levar o serviço a outra região ou entrar em uma atividade e mercado novos. Classifique as opções e identifique competências exigidas.',
        rh: 'Cada direção pode exigir competências diferentes. Discuta aprendizagem, contratação, parcerias e capacidade antes de escolher uma expansão.',
        limite: 'Mais novidade pode ampliar incertezas, mas a matriz não calcula risco ou retorno. Avalie demanda, recursos e execução antes de investir.'
    }
};
let ferramentaAtual = 'swot';
function mostrarFerramenta(id) {
    const f = ferramentas[id];
    if (!f) return;
    ferramentaAtual = id;
    const fonte = window.DISC_REFERENCIAS[id];
    const e = window.DISC_UI.escape;
    document.getElementById('ferramentaEstrategia').innerHTML = `
        <header><span class="estrategia-sobretitulo">${f.subtitulo}</span><h2>${f.titulo}</h2><p>${f.resumo}</p></header>
        <p class="estrategia-eixos">${f.eixos}</p>
        <div class="estrategia-matriz ${id === 'porter' ? 'cinco-forcas' : ''}">${f.caixas.map(([titulo,descricao],i) => `
            <section class="estrategia-quadrante"><h3>${titulo}</h3><p>${descricao}</p>
                <label for="nota-${i}">Evidências e observações</label><textarea id="nota-${i}" data-campo="quadrante-${i}" rows="3" placeholder="Registre fatores e evidências para a discussão…"></textarea>
            </section>`).join('')}</div>
        <section class="estrategia-exemplo"><h3>Aplicação em aula · exemplo fictício</h3><p>${f.caso}</p></section>
        <section><h3>Conexão com gestão de pessoas</h3><p>${f.rh}</p></section>
        <section><h3>Limites e cuidados de interpretação</h3><p>${f.limite}</p></section>
        <section class="estrategia-plano"><h3>Da análise à ação</h3>
            <label for="acaoEstrategica">Ação prioritária, responsável, prazo e evidência de resultado</label>
            <textarea id="acaoEstrategica" data-campo="acao" rows="3" placeholder="O que o grupo propõe fazer e como acompanhar?"></textarea>
            <small>Rascunho salvo neste navegador. Evite registrar informações pessoais ou confidenciais.</small>
        </section>
        <footer class="estrategia-fonte"><strong>Base conceitual:</strong> ${e(fonte.autor)}. ${e(fonte.obra)}.
            <a href="${e(fonte.url)}" target="_blank" rel="noopener noreferrer">Consultar fonte original <i class="fas fa-external-link-alt"></i></a></footer>`;
    document.querySelectorAll('[data-ferramenta]').forEach(button => {
        const active = button.dataset.ferramenta === id;
        button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('quizEstrategia').href = 'quiz.html?tema=' + id;
    document.querySelectorAll('[data-campo]').forEach(field => {
        const key = `disc-estrategia-${id}-${field.dataset.campo}`;
        try { field.value = localStorage.getItem(key) || ''; } catch {}
        field.addEventListener('input', () => { try { localStorage.setItem(key, field.value); } catch {} });
    });
}
document.querySelectorAll('[data-ferramenta]').forEach(button => button.addEventListener('click', () => mostrarFerramenta(button.dataset.ferramenta)));
document.getElementById('imprimirEstrategia').addEventListener('click', () => {
    document.querySelectorAll('.estrategia-main textarea').forEach(field => {
        field.style.height = Math.max(field.scrollHeight, 120) + 'px';
    });
    window.print();
});
mostrarFerramenta('swot');
