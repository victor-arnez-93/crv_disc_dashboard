(() => {
    const chave = 'disc-quiz-edicoes-v1';
    const banco = window.DISC_QUIZ_BANK;
    const lista = document.getElementById('listaQuestoes');
    const busca = document.getElementById('buscarQuestao');
    const form = document.getElementById('editarQuestao');
    const painel = form.closest('details');
    const admin = () => window.__discUsuario?.role === 'admin';
    const e = window.DISC_UI.escape;
    const temas = {
        disc: 'Perfis DISC', lideranca: 'Liderança', comunicacao: 'Comunicação',
        conflitos: 'Gestão de Conflitos', motivacao: 'Motivação', swot: 'Análise SWOT',
        porter: 'Cinco Forças de Porter', bcg: 'Matriz BCG', ansoff: 'Matriz Ansoff'
    };
    const niveis = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' };
    const categoria = document.getElementById('categoriaQuestao');
    const nivel = document.getElementById('nivelQuestao');
    const anterior = document.getElementById('questoesAnterior');
    const proxima = document.getElementById('questoesProxima');
    const porPagina = 6;
    let pagina = 1;
    Object.entries(temas).forEach(([id, titulo]) => categoria.add(new Option(titulo, id)));
    Object.entries(niveis).forEach(([id, titulo]) => nivel.add(new Option(titulo, id)));
    let editando;
    let edicoes = {};

    function aplicar(questao) {
        const indice = banco.findIndex(item => item.id === questao.id);
        if (indice < 0) banco.push(questao);
        else banco[indice] = questao;
    }

    try {
        edicoes = JSON.parse(localStorage.getItem(chave)) || {};
        Object.values(edicoes).forEach(aplicar);
    } catch {
        edicoes = {};
    }

    function listar() {
        if (!admin() || !painel.open) return;
        const normalizar = valor => valor.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
        const termo = normalizar(busca.value.trim());
        const id = /^#?([0-9]+)$/.exec(termo);
        const palavras = termo.split(/\s+/);
        const itens = banco.filter(q => {
            if ((categoria.value && categoria.value !== q.tema) ||
                (nivel.value && nivel.value !== q.dificuldade)) return false;
            if (id) return q.id === Number(id[1]);
            const texto = normalizar(`${temas[q.tema]} ${niveis[q.dificuldade]} ${q.pergunta}`);
            return palavras.every(palavra => texto.includes(palavra));
        });
        const paginas = Math.max(1, Math.ceil(itens.length / porPagina));
        pagina = Math.min(paginas, Math.max(1, pagina));
        document.getElementById('totalQuestoes').textContent = itens.length === 1
            ? '1 questão encontrada' : `${itens.length} questões encontradas`;
        document.getElementById('paginaQuestoes').textContent = `${pagina} / ${paginas}`;
        anterior.disabled = pagina <= 1;
        proxima.disabled = pagina >= paginas;
        const inicio = (pagina - 1) * porPagina;
        lista.innerHTML = itens.slice(inicio, inicio + porPagina).map(q => `
            <details class="quiz-banco-item">
                <summary><small>#${q.id} · ${temas[q.tema]} · ${niveis[q.dificuldade]}</small><br>${e(q.pergunta)}</summary>
                <ul>${q.alternativas.map(a => `<li>${e(a.texto)} ${a.correta ? '<strong>✓ Gabarito</strong>' : ''}</li>`).join('')}</ul>
                <p>${e(q.explicacao)}</p>
                <p><a href="${e(window.DISC_UI.url(q.fonte.url))}" target="_blank" rel="noopener noreferrer">${e(q.fonte.autor)} · ${e(q.fonte.obra)}</a></p>
                <button type="button" class="btn-ler-caso" data-editar="${q.id}">Editar</button>
            </details>`).join('') || '<p>Nenhuma questão corresponde à busca e aos filtros.</p>';
    }

    function editar(questao) {
        if (!admin()) return;
        editando = questao;
        const campos = (opcoes, atual) => Object.entries(opcoes).map(([valor, nome]) =>
            `<option value="${valor}" ${valor === atual ? 'selected' : ''}>${nome}</option>`).join('');
        form.innerHTML = `
            <h3>${questao ? 'Editar questão #' + questao.id : 'Nova questão'}</h3>
            <label>Tema <select name="tema">${campos(temas, questao?.tema)}</select></label>
            <label>Dificuldade <select name="dificuldade">${campos(niveis, questao?.dificuldade)}</select></label>
            <label>Enunciado <textarea name="pergunta" required>${e(questao?.pergunta || '')}</textarea></label>
            ${Array.from({ length: 4 }, (_, i) => `<label>Alternativa ${i + 1}
                <input name="alternativa${i}" required value="${e(questao?.alternativas[i]?.texto || '')}"></label>`).join('')}
            <label>Alternativa correta <select name="correta">${campos({ 0: '1', 1: '2', 2: '3', 3: '4' }, String(questao?.alternativas.findIndex(a => a.correta) ?? 0))}</select></label>
            <label>Justificativa do gabarito <textarea name="explicacao" required>${e(questao?.explicacao || '')}</textarea></label>
            <label>Autor ou instituição <input name="autor" required value="${e(questao?.fonte.autor || '')}"></label>
            <label>Obra e referência <input name="obra" required value="${e(questao?.fonte.obra || '')}"></label>
            <label>URL da fonte <input name="url" type="url" required value="${e(questao?.fonte.url || '')}"></label>
            <div class="quiz-banco-acoes"><button type="submit" class="btn-ler-caso">Salvar questão</button>
            <button type="button" class="btn-ler-caso" data-cancelar>Cancelar</button></div>
            <p role="status"></p>`;
        form.hidden = false;
        form.scrollIntoView({ block: 'start' });
        form.elements.pergunta.focus({ preventScroll: true });
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!admin()) return;
        const dados = new FormData(form);
        const valor = campo => dados.get(campo).trim();
        const id = editando?.id ?? Math.max(...banco.map(q => q.id)) + 1;
        const alternativas = Array.from({ length: 4 }, (_, i) => ({
            texto: valor('alternativa' + i), correta: i === Number(valor('correta'))
        }));
        const questao = {
            id, tema: valor('tema'), dificuldade: valor('dificuldade'),
            conceito: editando?.conceito ?? 'personalizada-' + id,
            pergunta: valor('pergunta'), alternativas, explicacao: valor('explicacao'),
            fonte: { autor: valor('autor'), obra: valor('obra'), url: /^https?:\/\//i.test(valor('url')) ? window.DISC_UI.url(valor('url')) : '' }
        };
        const status = form.querySelector('[role="status"]');
        if (![questao.pergunta, questao.explicacao, ...Object.values(questao.fonte), ...alternativas.map(a => a.texto)].every(Boolean)
            || new Set(alternativas.map(a => a.texto.toLowerCase())).size !== 4) {
            status.textContent = 'Preencha todos os campos, use quatro alternativas diferentes e informe uma URL HTTP ou HTTPS.';
            return;
        }
        if (editando && (editando.tema !== questao.tema || editando.dificuldade !== questao.dificuldade)
            && banco.filter(q => q.tema === editando.tema && q.dificuldade === editando.dificuldade).length <= 12) {
            status.textContent = 'O grupo de origem precisa manter pelo menos 12 questões por dificuldade. Adicione outra questão ao grupo antes de mover esta.';
            return;
        }
        const atualizadas = { ...edicoes, [id]: questao };
        try { localStorage.setItem(chave, JSON.stringify(atualizadas)); }
        catch { status.textContent = 'Não foi possível salvar neste navegador.'; return; }
        edicoes = atualizadas;
        aplicar(questao);
        form.hidden = true;
        busca.value = `#${id}`;
        categoria.value = nivel.value = '';
        refiltrar();
        busca.focus();
    });
    form.addEventListener('click', event => {
        if (event.target.closest('[data-cancelar]')) {
            form.hidden = true;
            document.getElementById('novaQuestao').focus();
        }
    });
    lista.addEventListener('click', event => {
        const botao = event.target.closest('[data-editar]');
        if (botao) editar(banco.find(q => q.id === Number(botao.dataset.editar)));
    });
    painel.addEventListener('toggle', listar);
    function refiltrar() {
        pagina = 1;
        listar();
    }
    busca.addEventListener('input', refiltrar);
    categoria.addEventListener('change', refiltrar);
    nivel.addEventListener('change', refiltrar);
    anterior.addEventListener('click', () => { pagina--; listar(); });
    proxima.addEventListener('click', () => { pagina++; listar(); });
    document.getElementById('novaQuestao').addEventListener('click', () => editar());
    document.getElementById('exportarQuestoes').addEventListener('click', () => {
        if (!admin()) return;
        const arquivo = new Blob(['window.DISC_QUIZ_BANK = ', JSON.stringify(banco, null, 2), ';\n'], { type: 'text/javascript' });
        const url = URL.createObjectURL(arquivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'quiz_bank.js';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
})();
