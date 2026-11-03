(() => {
    const abas = [...document.querySelectorAll('[data-biblioteca-aba]')];
    function mostrarAba() {
        const id = location.hash.slice(1);
        const ativa = abas.find(aba => aba.dataset.bibliotecaAba === id) || abas[0];
        abas.forEach(aba => {
            const selecionada = aba === ativa;
            aba.setAttribute('aria-pressed', String(selecionada));
            document.getElementById(aba.getAttribute('aria-controls')).hidden = !selecionada;
        });
    }
    abas.forEach(aba => aba.addEventListener('click', () => {
        location.hash = aba.dataset.bibliotecaAba;
    }));
    window.addEventListener('hashchange', mostrarAba);
    mostrarAba();
})();
