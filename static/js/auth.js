// ============================================================================
// auth.js — DISC Dashboard
// • Bloqueia acesso sem login em todas as páginas
// • Após login/visitante → redireciona SEMPRE para index.html
// • Visitante → oculta itens de menu restritos (recruta, configuracoes)
// • Admin    → acesso completo
// ============================================================================

(function () {

    // ── Páginas ocultas para visitante (valor do data-page) ──────────────────
    const RESTRITO_VISITANTE = ["recruta", "configuracoes"];

    // ── Credenciais ──────────────────────────────────────────────────────────
    const USUARIOS = [
        {
            email: "admin@sistema.com",
            senha: "admin1234",
            nome:  "Prof. Paulo Rocha",
            cargo: "Gestão de Pessoas",
            role:  "admin"
        }
    ];

    // ── Aplica restrições de menu conforme o papel ───────────────────────────
    function aplicarPermissoes(role) {
        if (role === "admin") return; // admin vê tudo

        RESTRITO_VISITANTE.forEach(page => {
            const btn = document.querySelector(`.menu-item[data-page="${page}"]`);
            if (btn) btn.style.display = "none";
        });
    }

    // ── Se já está autenticado nesta aba, apenas aplica permissões ───────────
    if (window.__discAuthOk) {
        document.addEventListener("DOMContentLoaded", () => {
            aplicarPermissoes(window.__discUsuario?.role || "visitante");
        });
        return;
    }

    // ── Injeta CSS do modal ──────────────────────────────────────────────────
    const style = document.createElement("style");
    style.textContent = `
        #modalLogin {
            display: flex;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999999;
            justify-content: center;
            align-items: center;
        }
        #modalLogin.fechando {
            animation: loginFadeOut .3s ease forwards;
        }
        @keyframes loginFadeOut {
            to { opacity: 0; transform: scale(0.97); }
        }
        .login-content {
            background: var(--cor-sidebar, #1c1b1b);
            border: 2px solid var(--cor-primaria, #F98948);
            border-radius: 20px;
            padding: 36px 38px 32px;
            max-width: 440px;
            width: 92%;
            box-shadow:
                0 0 40px rgba(249,137,72,0.35),
                0 12px 40px rgba(0,0,0,0.6);
            animation: cardPop .35s ease both;
            position: relative;
        }
        .login-logo-topo {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        .login-logo-topo img {
            height: 52px;
            object-fit: contain;
            cursor: pointer;
            transition: opacity .2s ease;
        }
        .login-logo-topo img:hover { opacity: .8; }
        .login-header {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--cor-primaria, #F98948);
            font-family: 'Orbitron', sans-serif;
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 6px;
        }
        .login-header i { font-size: 20px; }
        .login-subtitulo {
            font-family: 'Manrope', sans-serif;
            font-size: 13px;
            color: var(--cor-texto, #ddd);
            opacity: .75;
            margin-bottom: 24px;
        }
        .login-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 16px;
        }
        .login-group label {
            font-family: 'Manrope', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: var(--cor-texto, #ddd);
            opacity: .85;
        }
        .login-group input {
            background: var(--cor-header, #141414);
            border: 2px solid rgba(249,137,72,0.25);
            border-radius: 10px;
            padding: 11px 14px;
            font-family: 'Manrope', sans-serif;
            font-size: 14px;
            color: var(--cor-texto, #eee);
            transition: border-color .25s, box-shadow .25s;
            outline: none;
            width: 100%;
            box-sizing: border-box;
        }
        .login-group input:focus {
            border-color: var(--cor-primaria, #F98948);
            box-shadow: 0 0 10px rgba(249,137,72,0.3);
        }
        .login-erro {
            font-family: 'Manrope', sans-serif;
            font-size: 13px;
            color: #ff6b6b;
            margin-bottom: 12px;
            display: none;
            padding: 8px 12px;
            background: rgba(255,70,70,0.1);
            border-radius: 8px;
            border-left: 3px solid #ff4646;
        }
        .login-erro.visivel { display: block; }
        .login-footer {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 8px;
        }
        .btn-login-entrar {
            padding: 12px 20px;
            border-radius: 30px;
            border: none;
            background: var(--cor-primaria, #F98948);
            color: #0a0a0a;
            font-family: 'Rajdhani', sans-serif;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: .25s ease;
            width: 100%;
        }
        .btn-login-entrar:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 0 18px rgba(249,137,72,0.6);
        }
        .btn-login-visitante {
            padding: 11px 20px;
            border-radius: 30px;
            border: 2px solid rgba(249,137,72,0.25);
            background: transparent;
            color: var(--cor-texto, #ddd);
            font-family: 'Rajdhani', sans-serif;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: .25s ease;
            width: 100%;
        }
        .btn-login-visitante:hover {
            border-color: rgba(249,137,72,0.6);
            box-shadow: 0 0 10px rgba(249,137,72,0.25);
        }
        .login-divisor {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--cor-texto, #ddd);
            opacity: .35;
            font-size: 12px;
            font-family: 'Manrope', sans-serif;
        }
        .login-divisor::before,
        .login-divisor::after {
            content: '';
            flex: 1;
            height: 1px;
            background: currentColor;
        }
        .login-rodape {
            margin-top: 20px;
            text-align: center;
            font-family: 'Manrope', sans-serif;
            font-size: 12px;
            color: var(--cor-texto, #ddd);
            opacity: .4;
        }
        [data-theme="light"] .login-content {
            background: #ffffff;
            box-shadow:
                0 0 30px rgba(36,30,78,0.18),
                0 12px 40px rgba(0,0,0,0.12);
        }
        [data-theme="light"] .login-group input {
            background: #f5f5f5;
            color: #241E4E;
        }
    `;
    document.head.appendChild(style);

    // ── Cria o HTML do modal ─────────────────────────────────────────────────
    const modal = document.createElement("div");
    modal.id = "modalLogin";
    modal.innerHTML = `
        <div class="login-content">
            <div class="login-logo-topo">
                <img src="static/imagens/logo_disc.png" alt="DISC Dashboard"
                     onclick="window.open('https://crvsolucoesti.com/','_blank','noopener,noreferrer')">
            </div>
            <div class="login-header">
                <i class="fas fa-lock"></i>
                <h3>Acesso ao Painel</h3>
            </div>
            <p class="login-subtitulo">Entre com suas credenciais ou acesse como visitante.</p>
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

    // ── Detecta página atual ─────────────────────────────────────────────────
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const eIndex = paginaAtual === "index.html" || paginaAtual === "" || paginaAtual === "/";

    // ── Fecha modal e redireciona ────────────────────────────────────────────
    function concluirLogin(usuario) {
        window.__discAuthOk  = true;
        window.__discUsuario = usuario;

        modal.classList.add("fechando");

        setTimeout(() => {
            modal.remove();

            // Aplica permissões ANTES de navegar (caso já esteja no index)
            aplicarPermissoes(usuario.role);

            // Dispara evento para configuracoes.js preencher o header
            document.dispatchEvent(new CustomEvent("discLoginOk", { detail: usuario }));

            // Redireciona para index se não estiver lá
            if (!eIndex) {
                window.location.href = "index.html";
            }
        }, 300);
    }

    // ── Lógica do botão Entrar ───────────────────────────────────────────────
    function tentarLogin() {
        const email  = document.getElementById("loginEmail").value.trim().toLowerCase();
        const senha  = document.getElementById("loginSenha").value;
        const erro   = document.getElementById("loginErro");
        const usuario = USUARIOS.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            erro.classList.remove("visivel");
            concluirLogin(usuario);
        } else {
            erro.classList.add("visivel");
            document.getElementById("loginSenha").value = "";
            document.getElementById("loginSenha").focus();
            // Chacoalha o modal
            const content = modal.querySelector(".login-content");
            content.style.animation = "none";
            content.offsetHeight; // reflow
            content.style.animation = "loginShake .4s ease";
        }
    }

    // Animação de erro
    const shakeStyle = document.createElement("style");
    shakeStyle.textContent = `
        @keyframes loginShake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-5px); }
            80%      { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    document.getElementById("btnLoginEntrar")
        .addEventListener("click", tentarLogin);

    document.getElementById("loginSenha")
        .addEventListener("keydown", e => { if (e.key === "Enter") tentarLogin(); });

    document.getElementById("loginEmail")
        .addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("loginSenha").focus(); });

    // ── Visitante ────────────────────────────────────────────────────────────
    document.getElementById("btnLoginVisitante")
        .addEventListener("click", () => {
            concluirLogin({
                nome:  "Visitante",
                cargo: "Acesso Visitante",
                role:  "visitante"
            });
        });

})();