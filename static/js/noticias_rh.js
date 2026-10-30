let noticias = [];
let focoAnteriorNoticia;
const e = value => window.DISC_UI.escape(value);
function formatarDataRelativa(value) {
    const date = new Date(value);
    if (!value || Number.isNaN(date.getTime())) return 'Data não informada';
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `Há ${minutes} min`;
    if (minutes < 1440) return `Há ${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'short', year: 'numeric' });
}
function paragrafosNoticia(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,style,iframe,object,svg,figure,button,form,nav,aside').forEach(el => el.remove());
    let partes = [...doc.querySelectorAll('p,h2,h3,li')].map(el => el.textContent.trim()).filter(Boolean);
    if (!partes.length) partes = doc.body.textContent.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    const vistos = new Set();
    return partes.filter(p => {
        if (vistos.has(p) || /^(Publicidade|Salvar conteúdo)$/i.test(p)) return false;
        vistos.add(p); return true;
    }).map(p => `<p>${e(p)}</p>`).join('');
}
function fecharNoticia() {
    const bg = document.getElementById('modal-noticia-bg');
    if (bg) bg.style.display = 'none';
    document.body.style.overflow = '';
    focoAnteriorNoticia?.focus();
}
function abrirModalNoticia(index) {
    const n = noticias[index];
    if (!n) return;
    const bg = document.getElementById('modal-noticia-bg');
    focoAnteriorNoticia = document.activeElement;
    document.getElementById('modal-noticia-titulo').textContent = n.titulo;
    document.getElementById('modal-noticia-fonte').textContent = `${n.fonte} · ${formatarDataRelativa(n.data)}`;
    const conteudo = document.getElementById('modal-noticia-conteudo');
    conteudo.innerHTML = `<img class="noticia-capa-leitura" src="${e(n.imagem)}" alt="" loading="lazy">` +
        paragrafosNoticia(n.conteudo || n.resumo) +
        '<p class="nota-didatica">Conteúdo disponibilizado pela fonte. O feed pode trazer somente um trecho; consulte a publicação original para a leitura integral.</p>';
    document.getElementById('modal-noticia-footer').innerHTML = `<a href="${e(n.link)}" target="_blank" rel="noopener noreferrer" class="menu-item"><i class="fas fa-arrow-right"></i> Ver matéria completa</a>`;
    bg.setAttribute('role', 'dialog');
    bg.setAttribute('aria-modal', 'true');
    bg.setAttribute('aria-labelledby', 'modal-noticia-titulo');
    bg.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('fechar-modal-noticia').focus();
    conteudo.scrollTop = 0;
}
function renderizarNoticias() {
    const container = document.getElementById('noticias-rh-cards');
    container.innerHTML = '';
    noticias.forEach((n,index) => {
        const card = document.createElement('article');
        card.className = 'noticia-card';
        card.innerHTML = `<div class="noticia-imagem"></div><span class="noticia-categoria ${e(n.categoria)}">${e(n.fonte)}</span>
            <div class="noticia-conteudo"><h3>${e(n.titulo)}</h3><p>${e(n.resumo)}${n.resumo.length >= 230 ? '…' : ''}</p>
            <div class="noticia-meta"><span>${e(n.fonte)}</span> · <span>${e(formatarDataRelativa(n.data))}</span></div></div>
            <button class="btn-ler-noticia">Ler mais <i class="fas fa-arrow-right"></i></button>`;
        card.querySelector('.noticia-imagem').style.backgroundImage = `url("${n.imagem.replace(/["\\\n\r]/g, '')}")`;
        card.querySelector('button').addEventListener('click', () => abrirModalNoticia(index));
        container.appendChild(card);
    });
}
async function carregarNoticias() {
    const btn = document.getElementById('btn-carregar-novidades');
    if (btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Carregando…';
    let status = document.getElementById('noticias-status');
    if (!status) {
        status = document.createElement('p'); status.id = 'noticias-status'; status.setAttribute('role', 'status');
        document.getElementById('noticias-rh-cards').before(status);
    }
    status.textContent = 'Consultando as três fontes…';
    try {
        const resultado = await window.DISC_NOTICIAS.carregar();
        noticias = resultado.items;
        renderizarNoticias();
        const labels = { atualizada: 'disponível', cache: 'última consulta salva', indisponivel: 'temporariamente indisponível' };
        status.textContent = resultado.estados.map(f => `${f.nome}: ${labels[f.estado]}`).join(' · ');
        if (!noticias.length) status.textContent += '. Tente atualizar novamente em instantes.';
    } catch {
        status.textContent = 'Não foi possível consultar as fontes. Tente atualizar novamente.';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sync-alt"></i> Carregar novidades';
    }
}
document.addEventListener('click', event => {
    if (event.target.id === 'modal-noticia-bg' || event.target.closest('#fechar-modal-noticia')) fecharNoticia();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') fecharNoticia(); });
document.addEventListener('DOMContentLoaded', carregarNoticias);

document.getElementById('btn-carregar-novidades').addEventListener('click', carregarNoticias);
