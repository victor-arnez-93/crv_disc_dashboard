// ============================================================================
// auth.js — DISC Dashboard
// • Bloqueia acesso sem login em todas as páginas
// • Persiste sessão via sessionStorage entre navegações
// • Modal de usuário (foto/avatar clicável) com opções estilizadas
// • Modal de confirmação de saída estilizado (tema claro/escuro)
// • CSS externo → auth.css
// ============================================================================

(function () {

    const RESTRITO_VISITANTE = ["recruta", "configuracoes"];

    const USUARIOS = [
        {
            email: "admin@sistema.com",
            senha: "admin1234",
            nome:  "Prof. Paulo Rubens",
            cargo: "Gestão de Pessoas",
            role:  "admin"
        }
    ];

    // ── Permissões de menu ───────────────────────────────────────────────────
    function aplicarPermissoes(role) {
        if (role === "admin") return;
        RESTRITO_VISITANTE.forEach(page => {
            const btn = document.querySelector(`.menu-item[data-page="${page}"]`);
            if (btn) btn.style.display = "none";
        });
    }

    // ── Modal de confirmação de saída ────────────────────────────────────────
    function abrirModalSair() {
        const existente = document.getElementById("modalSairBG");
        if (existente) existente.remove();

        const bg = document.createElement("div");
        bg.id = "modalSairBG";
        bg.className = "auth-modal-bg";
        bg.innerHTML = `
            <div class="auth-modal-box" id="modalSairBox">
                <div class="auth-modal-icone">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <h3 class="auth-modal-titulo">Sair do sistema?</h3>
                <p class="auth-modal-subtitulo">Você será desconectado e retornará à tela de login.</p>
                <div class="auth-modal-acoes">
                    <button class="menu-btn auth-btn-cancelar" id="btnSairCancelar">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="menu-btn auth-btn-confirmar" id="btnSairConfirmar">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(bg);

        setTimeout(() => bg.classList.add("visivel"), 10);

        document.getElementById("btnSairCancelar").addEventListener("click", () => {
            bg.classList.remove("visivel");
            setTimeout(() => bg.remove(), 300);
        });

        document.getElementById("btnSairConfirmar").addEventListener("click", () => {
            try { sessionStorage.removeItem("__discSessao"); } catch {}
            window.__discAuthOk  = false;
            window.__discUsuario = null;
            window.location.reload();
        });

        bg.addEventListener("click", (e) => {
            if (e.target === bg) {
                bg.classList.remove("visivel");
                setTimeout(() => bg.remove(), 300);
            }
        });
    }

    // ── Modal de usuário (clique na foto/avatar) ─────────────────────────────
    function abrirModalUsuario(usuario, anchorEl) {
        const existente = document.getElementById("modalUsuarioBG");
        if (existente) { existente.remove(); return; }

        const isAdmin = usuario.role === "admin";
        const rect = anchorEl.getBoundingClientRect();

        const bg = document.createElement("div");
        bg.id = "modalUsuarioBG";
        bg.className = "user-modal-bg";
        bg.innerHTML = `
            <div class="user-modal-box" id="userModalBox" style="top:${rect.bottom + 10}px; right:${window.innerWidth - rect.right}px;">
                <div class="user-modal-header">
                    <div class="user-modal-avatar">
                    ${isAdmin
                        ? `<img src="static/imagens/foto2.jpeg" alt="Usuário">`
                        : `<i class="fas fa-user-circle"></i>`}
                    </div>
                    <div>
                        <div class="user-modal-nome">${usuario.nome}</div>
                        <div class="user-modal-cargo">${usuario.cargo}</div>
                    </div>
                </div>
                <div class="user-modal-divisor"></div>
                <div class="user-modal-acoes">
                    ${isAdmin ? `
                    <button class="menu-btn user-modal-btn" id="btnModalConfig">
                        <i class="fas fa-cog"></i> Configurações
                    </button>` : ""}
                    <button class="menu-btn user-modal-btn user-modal-btn-sair" id="btnModalSair">
                        <i class="fas fa-sign-out-alt"></i> Sair
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(bg);

        setTimeout(() => document.getElementById("userModalBox")?.classList.add("visivel"), 10);

        document.getElementById("btnModalSair")?.addEventListener("click", () => {
            bg.remove();
            abrirModalSair();
        });

        document.getElementById("btnModalConfig")?.addEventListener("click", () => {
            bg.remove();
            window.location.href = "configuracoes.html";
        });

        // Fecha ao clicar fora
        setTimeout(() => {
            document.addEventListener("click", function fechar(e) {
                if (!document.getElementById("userModalBox")?.contains(e.target) &&
                    e.target !== anchorEl && !anchorEl.contains(e.target)) {
                    bg.remove();
                    document.removeEventListener("click", fechar);
                }
            });
        }, 50);
    }

    // ── Atualiza o header com avatar clicável ────────────────────────────────
    function atualizarHeaderUsuario(usuario) {
        const userBox = document.querySelector(".user-box");
        if (!userBox) return;

        const isAdmin = usuario.role === "admin";

        userBox.innerHTML = `
            <div class="user-avatar-clicavel" id="userAvatarBtn" title="Minha conta">
                ${isAdmin
                    ? `<img src="${usuario.foto || 'static/imagens/foto2.jpeg'}" alt="Usuário" class="user-foto">`
                    : `<div class="user-foto user-avatar-visitante"><i class="fas fa-user-circle"></i></div>`}
            </div>
            <div class="user-info">
                <span class="user-name">${usuario.nome}</span>
                <span class="user-role">${usuario.cargo}</span>
            </div>
        `;

        document.getElementById("userAvatarBtn")?.addEventListener("click", (e) => {
            e.stopPropagation();
            abrirModalUsuario(usuario, document.getElementById("userAvatarBtn"));
        });
    }

    // ── Recupera sessão persistida ───────────────────────────────────────────
    const _sessao = (() => {
        try {
            const sess = JSON.parse(sessionStorage.getItem("__discSessao"));
            if (!sess) return null;

            // Mescla com perfil salvo localmente (foto, nome, cargo)
            const perfil = JSON.parse(localStorage.getItem("__discPerfil") || "{}");
            return { ...sess, ...perfil };
        } catch { return null; }
    })();

    if (_sessao) {
        window.__discAuthOk  = true;
        window.__discUsuario = _sessao;
        document.addEventListener("DOMContentLoaded", () => {
            aplicarPermissoes(_sessao.role);
            atualizarHeaderUsuario(_sessao);
        });
        return;
    }

    // ── Modal de login ───────────────────────────────────────────────────────
    const modal = document.createElement("div");
    modal.id = "modalLogin";
    modal.innerHTML = `
        <div class="login-content">
            <div class="login-logo-topo">
                <img src="static/imagens/logo_disc.png" alt="DISC Dashboard">
                <span class="login-dashboard-label">DASHBOARD</span>
            </div>
            <div class="login-header">
                <i class="fas fa-lock"></i>
                <h3>Acesso ao Painel</h3>
            </div>
            <p class="login-subtitulo login-subtitulo-center">Entre com suas credenciais ou acesse como visitante.</p>
            <div class="login-group">
                <label for="loginEmail">E-mail</label>
                <input type="email" id="loginEmail" placeholder="seu@email.com" autocomplete="username">
            </div>
            <div class="login-group">
                <label for="loginSenha">Senha</label>
                <input type="password" id="loginSenha" placeholder="••••••••" autocomplete="current-password">
            </div>
            <div class="login-erro" id="loginErro">
                <i class="fas fa-exclamation-circle"></i> E-mail ou senha incorretos.
            </div>
            <div class="login-footer">
                <button class="btn-login-entrar" id="btnLoginEntrar">
                    <i class="fas fa-sign-in-alt"></i> Entrar
                </button>
                <div class="login-divisor">ou</div>
                <button class="btn-login-visitante" id="btnLoginVisitante">
                    <i class="fas fa-user"></i> Continuar como Visitante
                </button>
            </div>
            <p class="login-rodape">DISC Dashboard · Prof. Paulo Rubens · CRV Soluções em TI</p>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById("loginEmail")?.focus(), 120);

    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const eIndex = paginaAtual === "index.html" || paginaAtual === "" || paginaAtual === "/";

    function concluirLogin(usuario) {
        window.__discAuthOk  = true;
        window.__discUsuario = usuario;
        try { sessionStorage.setItem("__discSessao", JSON.stringify(usuario)); } catch {}

        modal.classList.add("fechando");
        setTimeout(() => {
            modal.remove();
            aplicarPermissoes(usuario.role);
            atualizarHeaderUsuario(usuario);
            document.dispatchEvent(new CustomEvent("discLoginOk", { detail: usuario }));
            if (!eIndex) window.location.href = "index.html";
        }, 300);
    }

    function tentarLogin() {
        const email   = document.getElementById("loginEmail").value.trim().toLowerCase();
        const senha   = document.getElementById("loginSenha").value;
        const erro    = document.getElementById("loginErro");
        const usuario = USUARIOS.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            erro.classList.remove("visivel");
            concluirLogin(usuario);
        } else {
            erro.classList.add("visivel");
            document.getElementById("loginSenha").value = "";
            document.getElementById("loginSenha").focus();
            const content = modal.querySelector(".login-content");
            content.style.animation = "none";
            content.offsetHeight;
            content.style.animation = "loginShake .4s ease";
        }
    }

    document.getElementById("btnLoginEntrar").addEventListener("click", tentarLogin);
    document.getElementById("loginSenha").addEventListener("keydown", e => { if (e.key === "Enter") tentarLogin(); });
    document.getElementById("loginEmail").addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("loginSenha").focus(); });
    document.getElementById("btnLoginVisitante").addEventListener("click", () => {
        concluirLogin({ nome: "Visitante", cargo: "Acesso Visitante", role: "visitante" });
    });

})();