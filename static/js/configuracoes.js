// ============================================================================
// configuracoes.js — DISC Dashboard
// Sincroniza perfil entre config/header/index
// Logos clicáveis → crvsolucoesti.com
// WhatsApp na seção Sugestões & Contato
// ============================================================================

(function () {

    function getPerfil() {
        return window.__discPerfil || {
            nome: "Prof. Paulo Rubens", cargo: "Gestão de Pessoas",
            email: "paulo@email.com", foto: null
        };
    }

    function setPerfil(dados) {
        window.__discPerfil = { ...getPerfil(), ...dados };
        document.dispatchEvent(new CustomEvent("discPerfilAtualizado", { detail: window.__discPerfil }));
    }

    function aplicarPerfilHeader(perfil) {
        const nomeEl  = document.querySelector(".user-nome, .user-name, #userName, [data-user-nome]");
        const cargoEl = document.querySelector(".user-cargo, .user-role, #userCargo, [data-user-cargo]");
        const fotoEl  = document.querySelector(".user-foto, .user-avatar, #userFoto, [data-user-foto]");
        if (nomeEl)  nomeEl.textContent  = perfil.nome;
        if (cargoEl) cargoEl.textContent = perfil.cargo;
        if (fotoEl && perfil.foto) fotoEl.src = perfil.foto;
        // preview dentro de configurações
        const pN = document.getElementById("previewNome");
        const pC = document.getElementById("previewCargo");
        const pF = document.getElementById("previewFoto");
        if (pN) pN.textContent  = perfil.nome;
        if (pC) pC.textContent  = perfil.cargo;
        if (pF && perfil.foto) pF.src = perfil.foto;
    }

    function tornarLogosClicareis() {
        const sels = [
            ".logo-header", ".sidebar-logo", ".logo-sidebar",
            "#logoHeader", "#logoSidebar", ".logo-crv", ".config-logo img",
            "img[src*='logo_disc']", "img[src*='logo_crv']"
        ];
        sels.forEach(sel => {
            document.querySelectorAll(sel).forEach(img => {
                if (img.dataset.clicavelOk) return;
                img.dataset.clicavelOk = "1";
                img.style.cursor = "pointer";
                img.title = "CRV Soluções em TI";
                img.addEventListener("click", e => {
                    e.preventDefault(); e.stopPropagation();
                    window.open("https://crvsolucoesti.com/", "_blank", "noopener,noreferrer");
                });
            });
        });
    }

    function configurarContato() {
        const secao = document.querySelector(".secao-contato, #secaoContato, [data-secao='contato']");
        if (!secao || secao.querySelector("[data-wa]")) return;
        const waItem = document.createElement("div");
        waItem.dataset.wa = "1";
        waItem.style.cssText = "display:flex;align-items:center;gap:10px;margin-top:10px;font-family:'Manrope',sans-serif;font-size:14px;color:var(--cor-texto)";
        waItem.innerHTML = `
            <i class="fab fa-whatsapp" style="color:#25D366;font-size:18px;"></i>
            <a href="https://wa.me/5515997021387" target="_blank" rel="noopener noreferrer"
               style="color:var(--cor-texto);text-decoration:none;transition:.2s"
               onmouseover="this.style.color='#25D366'"
               onmouseout="this.style.color='var(--cor-texto)'"
               title="Chamar no WhatsApp">+55 15 99702-1387</a>`;
        const lista = secao.querySelector(".contato-emails, .contato-lista");
        (lista || secao).appendChild(waItem);
    }

    function mostrarToast(msg, tipo) {
        let t = document.getElementById("discToast");
        if (!t) {
            t = document.createElement("div");
            t.id = "discToast";
            t.style.cssText = "position:fixed;bottom:28px;right:28px;padding:14px 22px;border-radius:12px;font-family:'Manrope',sans-serif;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 6px 24px rgba(0,0,0,.4);display:flex;align-items:center;gap:10px;animation:fadeSlideUp .3s ease both;max-width:320px;";
            document.body.appendChild(t);
        }
        const cor   = tipo==="sucesso" ? "#F98948" : "#ff6b6b";
        const icone = tipo==="sucesso" ? "fa-check-circle" : "fa-exclamation-circle";
        const borda = tipo==="sucesso" ? "rgba(249,137,72,.5)" : "rgba(255,70,70,.5)";
        t.style.background = "var(--cor-sidebar,#1c1b1b)";
        t.style.border = `2px solid ${borda}`;
        t.style.color = "var(--cor-texto,#eee)";
        t.innerHTML = `<i class="fas ${icone}" style="color:${cor}"></i> ${msg}`;
        t.style.display = "flex";
        clearTimeout(t._timer);
        t._timer = setTimeout(() => {
            t.style.opacity="0"; t.style.transition="opacity .3s";
            setTimeout(()=>{ t.style.display="none"; t.style.opacity="1"; }, 350);
        }, 3000);
    }

    function initConfiguracoes() {
        const form = document.getElementById("formPerfil") || document.querySelector("form[data-config-perfil]");
        if (!form) return;
        const perfil    = getPerfil();
        const inputNome = document.getElementById("inputNome")  || document.querySelector("input[name='nome']");
        const inputEmail= document.getElementById("inputEmail") || document.querySelector("input[name='email']");
        const inputCargo= document.getElementById("inputCargo") || document.querySelector("input[name='cargo']");
        const fotoPreview = document.getElementById("fotoPreview") || document.getElementById("previewFoto");

        if (inputNome)  inputNome.value  = perfil.nome;
        if (inputEmail) inputEmail.value = perfil.email;
        if (inputCargo) inputCargo.value = perfil.cargo;
        if (fotoPreview && perfil.foto) fotoPreview.src = perfil.foto;

        // Upload foto
        const btnFoto = document.getElementById("btnFoto") || document.querySelector(".btn-upload-foto");
        if (btnFoto) {
            let fotoInput = document.getElementById("fotoInput");
            if (!fotoInput) {
                fotoInput = document.createElement("input");
                fotoInput.type = "file"; fotoInput.id = "fotoInput"; fotoInput.accept = "image/*";
                fotoInput.style.display = "none";
                document.body.appendChild(fotoInput);
            }
            btnFoto.addEventListener("click", () => fotoInput.click());
            fotoInput.addEventListener("change", function () {
                const file = this.files[0]; if (!file) return;
                const reader = new FileReader();
                reader.onload = e => {
                    const b64 = e.target.result;
                    if (fotoPreview) fotoPreview.src = b64;
                    setPerfil({ foto: b64 });
                    aplicarPerfilHeader(getPerfil());
                    mostrarToast("Foto atualizada com sucesso!", "sucesso");
                };
                reader.readAsDataURL(file);
            });
        }

        // Salvar
        const btnSalvar = document.getElementById("btnSalvarPerfil") || form.querySelector("button[type='submit'], .btn-salvar");
        if (btnSalvar) {
            btnSalvar.addEventListener("click", e => {
                e.preventDefault();
                const novo = {};
                if (inputNome?.value.trim())  novo.nome  = inputNome.value.trim();
                if (inputEmail?.value.trim()) novo.email = inputEmail.value.trim();
                if (inputCargo?.value.trim()) novo.cargo = inputCargo.value.trim();
                setPerfil(novo);
                aplicarPerfilHeader(getPerfil());
                mostrarToast("Perfil salvo com sucesso!", "sucesso");
            });
        }

        // Preview em tempo real
        [inputNome, inputCargo].forEach(el => {
            if (!el) return;
            el.addEventListener("input", () => {
                const p = getPerfil();
                aplicarPerfilHeader({ ...p, nome: inputNome?.value||p.nome, cargo: inputCargo?.value||p.cargo });
            });
        });
    }

    document.addEventListener("discLoginOk", e => {
        const u = e.detail;
        if (u?.nome) setPerfil({ nome: u.nome, cargo: u.cargo||"Gestão de Pessoas" });
        aplicarPerfilHeader(getPerfil());
        tornarLogosClicareis();
        configurarContato();
    });

    document.addEventListener("discPerfilAtualizado", e => aplicarPerfilHeader(e.detail));

    function init() {
        aplicarPerfilHeader(getPerfil());
        tornarLogosClicareis();
        configurarContato();
        initConfiguracoes();
    }

    document.readyState==="loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();