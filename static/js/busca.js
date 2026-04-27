// ============================================================================
// busca.js — DISC Dashboard
// Busca por páginas e conteúdo visível da página atual
// Requer: id="searchInput" no input do header
// ============================================================================

(function () {

const PAGINAS = [
    { titulo: "Início",               url: "index.html",         icone: "fa-home",           role: "todos",  tags: "inicio home dashboard painel boas-vindas frases clima relogio" },
    { titulo: "Teste DISC",           url: "teste_disc.html",    icone: "fa-clipboard-list", role: "todos",  tags: "teste disc avaliacao perfil comportamental dominancia influencia estabilidade conformidade" },
    { titulo: "DISC Recruta",         url: "recruta.html",       icone: "fa-users-cog",      role: "admin",  tags: "recruta recrutamento selecao candidatos disc rh" },
    { titulo: "Insights & IA",        url: "insights_ia.html",   icone: "fa-brain",          role: "todos",  tags: "insights ia inteligencia artificial analise gestao recomendacoes" },
    { titulo: "Quiz para Aulas",      url: "quiz.html",          icone: "fa-question-circle",role: "todos",  tags: "quiz perguntas aula sala aprendizado avaliacao" },
    { titulo: "Casos de Liderança",   url: "casos.html",         icone: "fa-book-open",      role: "todos",  tags: "casos lideranca lider historias exemplos gestao" },
    { titulo: "Simulador Feedback",   url: "feedback.html",      icone: "fa-comments",       role: "todos",  tags: "feedback simulador retorno avaliacao conversa comunicacao" },
    { titulo: "Dinâmicas & Empatia",  url: "dinamicas.html",     icone: "fa-users",          role: "todos",  tags: "dinamicas empatia equipe atividades exercicios team building grupo escuta" },
    { titulo: "Notícias de RH",       url: "noticias_rh.html",   icone: "fa-newspaper",      role: "todos",  tags: "noticias rh recursos humanos artigos tendencias mercado" },
    { titulo: "Configurações",        url: "configuracoes.html", icone: "fa-cog",            role: "admin",  tags: "configuracoes perfil usuario foto nome email tema contato" },
];

function getPaginasVisiveis() {
    const role = window.__discUsuario?.role || "visitante";
    return PAGINAS.filter(p => p.role === "todos" || role === "admin");
}

    function indexarPaginaAtual() {
        const itens = [];
        const seletores = [
            ".card-titulo", ".novo-titulo", ".hero-titulo", ".card h2", ".card h3",
            ".insight-texto", ".noticia-texto", ".foto-tema", ".bemvindo-texto",
            ".subtexto-inicial", ".dashboard-title", "h1", "h2", "h3", ".titulo-pagina",
            ".opcao-texto", ".cenario-conteudo h3", ".cenario-contexto", ".card-subtitulo"
        ];
        seletores.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                const texto = el.textContent.trim();
                if (texto.length < 4) return;
                let secao = "";
                const card = el.closest(".card, .card-novo, .card-hero, .insights-simulador, .insights-compatibilidade");
                if (card) {
                    const t = card.querySelector(".card-titulo, .novo-titulo, h2");
                    if (t) secao = t.textContent.trim();
                }
                if (!itens.some(i => i.texto === texto))
                    itens.push({ texto, secao, tipo: "conteudo", icone: "fa-align-left" });
            });
        });
        return itens;
    }

    function norm(str) {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ");
    }

    function destacar(texto, termo) {
        const re = new RegExp(`(${termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        return texto.replace(re, `<mark style="background:rgba(249,137,72,0.35);color:inherit;border-radius:3px;padding:0 2px;">$1</mark>`);
    }

    function scrollParaTexto(texto, termo) {
        document.querySelectorAll(".disc-hl").forEach(el => { el.outerHTML = el.innerHTML; });
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: n => {
                const p = n.parentElement;
                if (!p) return NodeFilter.FILTER_REJECT;
                if (["script","style","noscript"].includes(p.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
                if (n.textContent.trim().length < 4) return NodeFilter.FILTER_SKIP;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        const t = norm(termo);
        let alvo = null;
        while (walker.nextNode()) {
            if (norm(walker.currentNode.textContent).includes(t)) { alvo = walker.currentNode.parentElement; break; }
        }
        if (alvo) {
            alvo.scrollIntoView({ behavior: "smooth", block: "center" });
            alvo.style.transition = "outline .2s ease, box-shadow .2s ease";
            alvo.style.outline = "2px solid rgba(249,137,72,0.8)";
            alvo.style.boxShadow = "0 0 16px rgba(249,137,72,0.5)";
            alvo.style.borderRadius = "6px";
            setTimeout(() => { alvo.style.outline = ""; alvo.style.boxShadow = ""; }, 2200);
        }
    }

    function fecharBusca(input, container, overlay) {
        input.value = "";
        container.innerHTML = "";
        container.classList.remove("ativo");
        overlay.classList.remove("ativo");
        input.blur();
    }

    function renderizar(resultados, termo, container, input, overlay) {
        if (!resultados.length) {
            container.innerHTML = `<div style="padding:16px;text-align:center;font-family:'Manrope',sans-serif;font-size:13px;opacity:.6;color:var(--cor-texto)"><i class="fas fa-search" style="margin-right:6px;color:var(--cor-primaria)"></i>Nenhum resultado para "<strong>${termo}</strong>"</div>`;
            return;
        }
        const paginas   = resultados.filter(r => r.tipo === "pagina");
        const conteudos = resultados.filter(r => r.tipo === "conteudo");
        let html = "";
        if (paginas.length) {
            html += `<div class="bg-titulo">Páginas</div>`;
            paginas.forEach(r => {
                html += `<div class="bg-item" data-url="${r.url}" tabindex="0" role="option">
                    <i class="fas ${r.icone} bg-icon"></i>
                    <div class="bg-info"><span class="bg-titulo-item">${destacar(r.titulo, termo)}</span></div>
                    <i class="fas fa-arrow-right bg-seta"></i></div>`;
            });
        }
        if (conteudos.length) {
            html += `<div class="bg-titulo">Conteúdo nesta página</div>`;
            conteudos.slice(0, 6).forEach(r => {
                html += `<div class="bg-item bg-item-c" data-scroll="${encodeURIComponent(r.texto)}" tabindex="0" role="option">
                    <i class="fas ${r.icone} bg-icon"></i>
                    <div class="bg-info">
                        ${r.secao ? `<span class="bg-secao">${r.secao}</span>` : ""}
                        <span class="bg-texto">${destacar(r.texto.substring(0,80)+(r.texto.length>80?"…":""),termo)}</span>
                    </div></div>`;
            });
        }
        container.innerHTML = html;
        container.querySelectorAll(".bg-item[data-url]").forEach(el => {
            const go = () => { window.location.href = el.dataset.url; };
            el.addEventListener("click", go);
            el.addEventListener("keydown", e => { if (e.key==="Enter") go(); });
        });
        container.querySelectorAll(".bg-item-c[data-scroll]").forEach(el => {
            const go = () => {
                scrollParaTexto(decodeURIComponent(el.dataset.scroll), termo);
                fecharBusca(input, container, overlay);
            };
            el.addEventListener("click", go);
            el.addEventListener("keydown", e => { if (e.key==="Enter") go(); });
        });
    }

    function init() {
        const input = document.getElementById("searchInput");
        if (!input) return;

        let container = document.getElementById("searchResults");
        if (!container) {
            container = document.createElement("div");
            container.id = "searchResults";
            input.closest(".search-box")?.appendChild(container);
        }
        let overlay = document.getElementById("searchOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "searchOverlay";
            document.body.appendChild(overlay);
        }

        const s = document.createElement("style");
        s.textContent = `
            .search-box { position: relative; }
            #searchResults {
                position: absolute; top: calc(100% + 8px); left: 0; right: 0; min-width: 340px;
                background: var(--cor-sidebar, #1c1b1b);
                border: 2px solid rgba(249,137,72,0.35); border-radius: 14px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(249,137,72,0.18);
                z-index: 9999; max-height: 420px; overflow-y: auto; display: none;
                animation: fadeSlideDown .2s ease both;
            }
            #searchResults.ativo { display: block; }
            .bg-titulo {
                font-family: 'Rajdhani', sans-serif; font-size: 11px; font-weight: 700;
                letter-spacing: 1px; text-transform: uppercase;
                color: var(--cor-primaria, #F98948); padding: 10px 14px 4px; opacity: 0.75;
            }
            .bg-item {
                display: flex; align-items: center; gap: 12px; padding: 10px 14px;
                cursor: pointer; transition: background .15s ease;
            }
            .bg-item:hover, .bg-item:focus { background: rgba(249,137,72,0.1); outline: none; }
            .bg-icon { color: var(--cor-primaria, #F98948); font-size: 14px; width: 16px; flex-shrink: 0; }
            .bg-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
            .bg-titulo-item { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; color: var(--cor-texto, #eee); }
            .bg-secao { font-family: 'Manrope', sans-serif; font-size: 11px; color: var(--cor-primaria, #F98948); opacity:.75; text-transform: uppercase; letter-spacing:.5px; }
            .bg-texto { font-family: 'Manrope', sans-serif; font-size: 13px; color: var(--cor-texto, #eee); opacity:.8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .bg-seta { color: var(--cor-primaria, #F98948); font-size: 11px; opacity:.5; flex-shrink:0; }
            #searchOverlay { display:none; position:fixed; inset:0; z-index:9998; }
            #searchOverlay.ativo { display:block; }
            [data-theme="light"] #searchResults { background: #fff; }
            [data-theme="light"] .bg-titulo-item, [data-theme="light"] .bg-texto { color: #241E4E; }
        `;
        document.head.appendChild(s);

        let indice = null;
        input.addEventListener("focus", () => { if (!indice) indice = indexarPaginaAtual(); });

        let debounce;
        input.addEventListener("input", () => {
            clearTimeout(debounce);
            const termo = input.value.trim();
            if (termo.length < 2) { container.innerHTML=""; container.classList.remove("ativo"); overlay.classList.remove("ativo"); return; }
            debounce = setTimeout(() => {
                const t = norm(termo);
                const res = [];
                getPaginasVisiveis().forEach(p => { if (norm(p.titulo+" "+p.tags).includes(t)) res.push({...p,tipo:"pagina"}); });
                if (!indice) indice = indexarPaginaAtual();
                indice.forEach(item => { if (norm(item.texto+" "+item.secao).includes(t)) res.push(item); });
                container.classList.add("ativo");
                overlay.classList.add("ativo");
                renderizar(res, termo, container, input, overlay);
            }, 220);
        });

        overlay.addEventListener("click", () => fecharBusca(input, container, overlay));
        input.addEventListener("keydown", e => {
            if (e.key==="Escape") fecharBusca(input, container, overlay);
            if (e.key==="ArrowDown") { e.preventDefault(); container.querySelector(".bg-item")?.focus(); }
        });
        container.addEventListener("keydown", e => {
            const itens = [...container.querySelectorAll(".bg-item")];
            const idx = itens.indexOf(document.activeElement);
            if (e.key==="ArrowDown" && idx < itens.length-1) { e.preventDefault(); itens[idx+1].focus(); }
            if (e.key==="ArrowUp") { e.preventDefault(); idx<=0 ? input.focus() : itens[idx-1].focus(); }
            if (e.key==="Escape") fecharBusca(input, container, overlay);
        });
    }

    document.readyState==="loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();