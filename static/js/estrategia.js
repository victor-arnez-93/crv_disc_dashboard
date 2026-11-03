const ferramentas = {
    swot: {
        titulo: 'Análise SWOT', subtitulo: 'Diagnóstico interno e externo',
        resumo: 'Relacione capacidades e limitações da organização às condições do ambiente. Defina primeiro qual unidade e qual objetivo serão analisados.',
        eixos: 'Forças e fraquezas: ambiente interno · Oportunidades e ameaças: ambiente externo.',
        caixas: [['Forças · internas', 'Competências, processos ou recursos favoráveis ao objetivo.'], ['Fraquezas · internas', 'Lacunas ou limitações relevantes da organização.'], ['Oportunidades · externas', 'Condições do ambiente que podem favorecer o objetivo.'], ['Ameaças · externas', 'Condições do ambiente que podem dificultar o objetivo.']],
        limite: 'A matriz não mede viabilidade nem prevê o futuro. Valide percepções com evidências e defina ações, responsáveis e prazos.'
    },
    porter: {
        titulo: 'Cinco Forças de Porter', subtitulo: 'Estrutura competitiva do setor',
        resumo: 'Analise as pressões que influenciam a rentabilidade e a distribuição de valor em uma indústria. O modelo vai além da concorrência direta.',
        eixos: 'Defina o setor e o mercado analisados antes de identificar seus participantes.',
        caixas: [['Rivalidade', 'Como as empresas estabelecidas disputam clientes e valor?'], ['Novos entrantes', 'Quais barreiras dificultam novas entradas?'], ['Substitutos', 'Que outras soluções atendem à mesma necessidade?'], ['Fornecedores', 'Quem fornece insumos críticos e quais são as alternativas?'], ['Compradores', 'Como concentração, diferenciação e custos de troca afetam o poder de negociação?']],
        limite: 'A atratividade do setor não garante resultado individual. Combine a análise externa com a posição e as capacidades da organização.'
    },
    bcg: {
        titulo: 'Matriz BCG', subtitulo: 'Prioridades de portfólio',
        resumo: 'Compare negócios ou produtos usando crescimento do mercado e participação relativa em relação ao principal concorrente.',
        eixos: 'Crescimento alto: linha superior · Crescimento baixo: linha inferior · Participação relativa alta: coluna esquerda · Baixa: coluna direita.',
        caixas: [['Estrela', 'Alto crescimento e alta participação relativa. Pode exigir investimento.'], ['Interrogação', 'Alto crescimento e baixa participação relativa. Avalie capacidade de competir.'], ['Vaca leiteira', 'Baixo crescimento e alta participação relativa. Pode gerar recursos para o portfólio.'], ['Abacaxi', 'Baixo crescimento e baixa participação relativa. Analise alternativas e sinergias.']],
        limite: 'Participação relativa = participação da unidade ÷ participação do principal concorrente. Explicite critérios de corte e complemente com caixa, rentabilidade e sinergias.'
    },
    ansoff: {
        titulo: 'Matriz Ansoff', subtitulo: 'Direções de crescimento',
        resumo: 'Organize alternativas de crescimento conforme a novidade de produtos e mercados para a organização analisada.',
        eixos: 'Mercado atual: linha superior · Mercado novo: linha inferior · Produto atual: coluna esquerda · Produto novo: coluna direita.',
        caixas: [['Penetração de mercado', 'Oferta atual para mercado atual. Exemplo: aumentar recompra.'], ['Desenvolvimento de produto', 'Oferta nova para mercado atual. Exemplo: novo serviço para a base atendida.'], ['Desenvolvimento de mercado', 'Oferta atual para mercado novo. Exemplo: entrar em outra região.'], ['Diversificação', 'Oferta nova para mercado novo. Pode ser relacionada ou não ao negócio atual.']],
        limite: 'Mais novidade pode ampliar incertezas, mas a matriz não calcula risco ou retorno. Avalie demanda, recursos e execução antes de investir.'
    }
};
function mostrarFerramenta(id) {
    const f = ferramentas[id];
    if (!f) return;
    const fonte = window.DISC_REFERENCIAS[id];
    const e = window.DISC_UI.escape;
    document.getElementById('ferramentaEstrategia').innerHTML = `
        <header><span class="estrategia-sobretitulo">${f.subtitulo}</span><h2>${f.titulo}</h2><p>${f.resumo}</p></header>
        <p class="estrategia-eixos">${f.eixos}</p>
        <div class="estrategia-matriz ${id === 'porter' ? 'cinco-forcas' : ''}">${f.caixas.map(([titulo, descricao]) => `
            <section class="estrategia-quadrante"><h3>${titulo}</h3><p>${descricao}</p></section>`).join('')}</div>
        <section><h3>Como interpretar</h3><p>${f.limite}</p></section>
        <footer class="estrategia-fonte"><strong>Base conceitual:</strong> ${e(fonte.autor)}. ${e(fonte.obra)}.
            <a href="${e(fonte.url)}" target="_blank" rel="noopener noreferrer">Consultar fonte original <i class="fas fa-external-link-alt"></i></a></footer>`;
    document.querySelectorAll('[data-ferramenta]').forEach(button => {
        const active = button.dataset.ferramenta === id;
        button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('quizEstrategia').href = 'quiz.html?tema=' + id;

}
document.querySelectorAll('[data-ferramenta]').forEach(button => button.addEventListener('click', () => mostrarFerramenta(button.dataset.ferramenta)));
document.getElementById('imprimirEstrategia').addEventListener('click', window.DISC_IMPRIMIR);
mostrarFerramenta('swot');
