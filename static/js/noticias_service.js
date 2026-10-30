/* Serviço compartilhado da página de notícias e dos destaques do início. */
window.DISC_NOTICIAS = (() => {
    const fontes = [
        { id: 'vocerh', nome: 'Você RH', limite: 5 },
        { id: 'startups', nome: 'Startups', limite: 3 },
        { id: 'mitsloan', nome: 'MIT Sloan BR', limite: 3 }
    ];
    async function carregar() {
        const respostas = await Promise.allSettled(fontes.map(async fonte => {
            const response = await fetch(`${window.DISC_CONFIG.apiBase}/api/noticias/${fonte.id}`, {
                signal: AbortSignal.timeout(55000)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data.items) || !data.items.length) throw new Error('Fonte sem artigos');
            return { fonte, data };
        }));
        const items = [], estados = [];
        respostas.forEach((resposta, index) => {
            const fonte = fontes[index];
            if (resposta.status === 'rejected') {
                estados.push({ nome: fonte.nome, estado: 'indisponivel' });
                return;
            }
            const { data } = resposta.value;
            estados.push({ nome: fonte.nome, estado: data.stale ? 'cache' : 'atualizada', fetchedAt: data.fetchedAt });
            data.items.slice(0, fonte.limite).forEach(item => {
                const link = window.DISC_UI.url(item.link);
                if (!link || items.some(n => n.link === link)) return;
                const conteudo = item.content || item.description || '';
                const doc = new DOMParser().parseFromString(conteudo, 'text/html');
                const imagem = window.DISC_UI.url(item.thumbnail || doc.querySelector('img')?.getAttribute('src') || '');
                items.push({ titulo: window.DISC_UI.text(item.title),
                    resumo: window.DISC_UI.text(item.description || conteudo).slice(0, 230),
                    conteudo, categoria: fonte.id, fonte: fonte.nome, data: item.pubDate,
                    imagem: imagem || 'static/imagens/' + (fonte.id === 'mitsloan' ? 'imgnot2.png' : 'imgnot1.png'), link });
            });
        });
        items.sort((a,b) => (Date.parse(b.data) || 0) - (Date.parse(a.data) || 0));
        return { items, estados };
    }
    return { carregar };
})();
