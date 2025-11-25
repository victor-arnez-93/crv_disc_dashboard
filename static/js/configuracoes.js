// ============================================
// CONFIGURAÇÕES - Tela de Perfil e Preferências
// ============================================

// Upload e troca da foto de perfil
function trocarFotoPerfil(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('fotoPerfil').src = e.target.result;
            // Salvar a foto no localStorage (caso deseje persistir)
            localStorage.setItem('foto_perfil', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Salvar configurações
function salvarConfiguracoes() {
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const tema = document.getElementById('temaSelecionado').value;

    localStorage.setItem('config_nome', nome);
    localStorage.setItem('config_email', email);
    localStorage.setItem('config_tema', tema);

    document.documentElement.setAttribute('data-theme', tema);

    mostrarMsg('✅ Configurações salvas com sucesso!', true);
}

// Carregar configurações salvas (inclui foto)
function carregarConfiguracoes() {
    const nome = localStorage.getItem('config_nome');
    const email = localStorage.getItem('config_email');
    const tema = localStorage.getItem('config_tema');
    const foto = localStorage.getItem('foto_perfil');

    if (nome) document.getElementById('nomeUsuario').value = nome;
    if (email) document.getElementById('emailUsuario').value = email;
    if (tema) {
        document.getElementById('temaSelecionado').value = tema;
        document.documentElement.setAttribute('data-theme', tema);
    }
    if (foto) document.getElementById('fotoPerfil').src = foto;
}

function logoutUsuario() {
    if (confirm('Tem certeza que deseja sair da conta?')) {
        localStorage.clear();
        mostrarMsg('🔓 Logout realizado! Redirecionando...', true);
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1500);
    }
}

function mostrarMsg(texto, sucesso) {
    const msgEl = document.getElementById('mensagemFeedback');
    if (!msgEl) return;
    msgEl.textContent = texto;
    msgEl.style.display = 'block';
    msgEl.style.background = sucesso ?
        'linear-gradient(135deg, #10b981, #059669)' :
        'linear-gradient(135deg, #ef4444, #dc2626)';
    msgEl.style.color = '#fff';
    msgEl.style.fontWeight = '600';
    msgEl.style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)';
    setTimeout(() => {
        msgEl.style.display = 'none';
    }, 3000);
}
