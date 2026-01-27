// ===================================================================
// DISC RECRUTA - LÓGICA DE MATCHING E CRUD
// ===================================================================

let perfilAtivo = 'candidato';
let candidatos = [];
let vagas = [];

// ============================================
// TOGGLE CANDIDATO / EMPRESA - CORRIGIDO
// ============================================
function iniciarTogglePerfil() {
    console.log('🔍 Procurando botões toggle...');

    // CORREÇÃO: Procura por .menu-item dentro de .toggle-perfil
    const botoesToggle = document.querySelectorAll('.toggle-perfil .menu-item');
    const areaCandidato = document.querySelector('.area-candidato');
    const areaEmpresa = document.querySelector('.area-empresa');

    if (botoesToggle.length === 0) {
        console.error('❌ Botões toggle não encontrados');
        return;
    }

    console.log(`✅ ${botoesToggle.length} botões encontrados`);

    // Define estado inicial
    if (areaCandidato) {
        areaCandidato.style.display = 'block';
        areaCandidato.classList.add('area-ativa');
    }
    if (areaEmpresa) {
        areaEmpresa.style.display = 'none';
        areaEmpresa.classList.remove('area-ativa');
    }

    // Adiciona event listeners
    botoesToggle.forEach((btn, index) => {
        console.log(`Botão ${index}: perfil="${btn.dataset.perfil}"`);

        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Previne comportamento padrão
            e.stopPropagation(); // Impede propagação

            console.log('🖱️ Clique no botão:', this.dataset.perfil);

            // Remove active de todos
            botoesToggle.forEach(b => b.classList.remove('active'));

            // Adiciona active no clicado
            this.classList.add('active');

            // Atualiza perfil ativo
            perfilAtivo = this.dataset.perfil;
            console.log('✓ Perfil alterado para:', perfilAtivo);

            // Mostra/esconde áreas
            if (perfilAtivo === 'candidato') {
                if (areaCandidato) {
                    areaCandidato.style.display = 'block';
                    areaCandidato.classList.add('area-ativa');
                }
                if (areaEmpresa) {
                    areaEmpresa.style.display = 'none';
                    areaEmpresa.classList.remove('area-ativa');
                }
            } else {
                if (areaEmpresa) {
                    areaEmpresa.style.display = 'block';
                    areaEmpresa.classList.add('area-ativa');
                }
                if (areaCandidato) {
                    areaCandidato.style.display = 'none';
                    areaCandidato.classList.remove('area-ativa');
                }
            }
        });
    });
}

// ============================================
// SLIDERS DISC
// ============================================
function iniciarSliders() {
    const sliders = ['D', 'I', 'S', 'C'];
    sliders.forEach(letra => {
        const slider = document.getElementById(`perfil${letra}`);
        if (slider) {
            const span = slider.nextElementSibling;
            if (span && span.classList.contains('slider-valor')) {
                span.textContent = `${slider.value}%`;
            }

            slider.addEventListener('input', (e) => {
                const valor = e.target.value;
                const span = e.target.nextElementSibling;
                if (span && span.classList.contains('slider-valor')) {
                    span.textContent = `${valor}%`;
                }
            });
        }
    });
}

// ============================================
// UPLOAD DE ARQUIVO
// ============================================
function iniciarUpload() {
    const fileInput = document.getElementById('candidatoCurriculo');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            const fileNameSpan = document.querySelector('.file-name');
            if (fileName && fileNameSpan) {
                fileNameSpan.textContent = `✓ ${fileName}`;
            }
        });
    }
}

// ============================================
// CADASTRO DE CANDIDATO
// ============================================
function iniciarFormCandidato() {
    const formCandidato = document.getElementById('formCandidato');
    if (formCandidato) {
        formCandidato.addEventListener('submit', async (e) => {
            e.preventDefault();

            const candidato = {
                nome: document.getElementById('candidatoNome')?.value || '',
                email: document.getElementById('candidatoEmail')?.value || '',
                telefone: document.getElementById('candidatoTelefone')?.value || '',
                linkedin: document.getElementById('candidatoLinkedin')?.value || '',
                curriculo: document.getElementById('candidatoCurriculo')?.files[0]?.name || 'curriculo.pdf'
            };

            if (!candidato.nome || !candidato.email) {
                alert('Por favor, preencha pelo menos nome e e-mail.');
                return;
            }

            console.log('Cadastrando candidato:', candidato);

            localStorage.setItem('candidato_nome', candidato.nome);
            localStorage.setItem('candidato_email', candidato.email);

            alert('✓ Cadastro realizado! Você será direcionado para o Teste DISC.');
            setTimeout(() => {
                window.location.href = 'teste_disc.html';
            }, 1500);
        });
    }
}

// ============================================
// CADASTRO DE VAGA
// ============================================
function iniciarFormVaga() {
    const formVaga = document.getElementById('formVaga');
    if (formVaga) {
        formVaga.addEventListener('submit', async (e) => {
            e.preventDefault();

            const vaga = {
                empresa: document.getElementById('vagaEmpresa')?.value || '',
                titulo: document.getElementById('vagaTitulo')?.value || '',
                descricao: document.getElementById('vagaDescricao')?.value || '',
                localizacao: document.getElementById('vagaLocalizacao')?.value || '',
                perfil_ideal: {
                    D: parseInt(document.getElementById('perfilD')?.value || 50),
                    I: parseInt(document.getElementById('perfilI')?.value || 50),
                    S: parseInt(document.getElementById('perfilS')?.value || 50),
                    C: parseInt(document.getElementById('perfilC')?.value || 50)
                }
            };

            if (!vaga.empresa || !vaga.titulo) {
                alert('Por favor, preencha pelo menos empresa e título.');
                return;
            }

            console.log('Cadastrando vaga:', vaga);
            buscarCandidatosCompativeis(vaga.perfil_ideal);

            alert('✓ Vaga cadastrada com sucesso! Buscando candidatos compatíveis...');
            formVaga.reset();
            iniciarSliders();
        });
    }
}

// ============================================
// ALGORITMO DE MATCHING DISC
// ============================================
function calcularCompatibilidade(candidatoDISC, vagaDISC) {
    const diffD = Math.abs((candidatoDISC.D || 50) - (vagaDISC.D || 50));
    const diffI = Math.abs((candidatoDISC.I || 50) - (vagaDISC.I || 50));
    const diffS = Math.abs((candidatoDISC.S || 50) - (vagaDISC.S || 50));
    const diffC = Math.abs((candidatoDISC.C || 50) - (vagaDISC.C || 50));

    const mediaDiff = (diffD + diffI + diffS + diffC) / 4;
    const compatibilidade = 100 - mediaDiff;

    return Math.max(0, Math.min(100, Math.round(compatibilidade)));
}

// ============================================
// BUSCAR CANDIDATOS COMPATÍVEIS
// ============================================
function buscarCandidatosCompativeis(perfilIdeal) {
    const candidatosMock = [
        {
            id: 1,
            nome: 'Ana Silva',
            email: 'ana.silva@email.com',
            perfil_disc: { D: 70, I: 60, S: 40, C: 80 },
            curriculo_url: 'curriculo_ana.pdf'
        },
        {
            id: 2,
            nome: 'Carlos Mendes',
            email: 'carlos.mendes@email.com',
            perfil_disc: { D: 85, I: 70, S: 30, C: 60 },
            curriculo_url: 'curriculo_carlos.pdf'
        },
        {
            id: 3,
            nome: 'Beatriz Costa',
            email: 'beatriz.costa@email.com',
            perfil_disc: { D: 40, I: 80, S: 70, C: 50 },
            curriculo_url: 'curriculo_beatriz.pdf'
        }
    ];

    const candidatosComMatch = candidatosMock.map(cand => ({
        ...cand,
        compatibilidade: calcularCompatibilidade(cand.perfil_disc, perfilIdeal)
    }));

    candidatosComMatch.sort((a, b) => b.compatibilidade - a.compatibilidade);
    renderizarCandidatos(candidatosComMatch);
}

// ============================================
// RENDERIZAR CANDIDATOS
// ============================================
function renderizarCandidatos(candidatos) {
    const lista = document.getElementById('candidatosLista');
    if (!lista) return;

    if (!candidatos || candidatos.length === 0) {
        lista.innerHTML = `
            <div class="candidato-placeholder">
                <i class="fas fa-briefcase"></i>
                <p>Nenhum candidato encontrado</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = candidatos.map(cand => `
        <div class="card-candidato">
            <div class="candidato-header">
                <h4>${cand.nome}</h4>
                <span class="match-badge" style="background: ${cand.compatibilidade >= 80 ? '#10b981' : cand.compatibilidade >= 60 ? '#f59e0b' : '#ef4444'}">
                    ${cand.compatibilidade}% Match
                </span>
            </div>
            <p><i class="fas fa-envelope"></i> ${cand.email}</p>
            <div class="perfil-disc-mini">
                <span>D: ${cand.perfil_disc.D}%</span>
                <span>I: ${cand.perfil_disc.I}%</span>
                <span>S: ${cand.perfil_disc.S}%</span>
                <span>C: ${cand.perfil_disc.C}%</span>
            </div>
            <button class="btn-ver-curriculo" onclick="alert('Abrindo: ${cand.curriculo_url}')">
                <i class="fas fa-file-pdf"></i> Ver Currículo
            </button>
        </div>
    `).join('');
}

// ============================================
// BUSCAR VAGAS COMPATÍVEIS
// ============================================
function buscarVagasCompativeis(perfilCandidato) {
    const vagasMock = [
        {
            id: 1,
            titulo: 'Gerente de Vendas',
            empresa: 'TechCorp',
            localizacao: 'São Paulo - SP',
            perfil_ideal: { D: 80, I: 70, S: 40, C: 60 }
        },
        {
            id: 2,
            titulo: 'Analista de RH',
            empresa: 'People Solutions',
            localizacao: 'Remoto',
            perfil_ideal: { D: 50, I: 75, S: 80, C: 65 }
        }
    ];

    const vagasComMatch = vagasMock.map(vaga => ({
        ...vaga,
        compatibilidade: calcularCompatibilidade(perfilCandidato, vaga.perfil_ideal)
    }));

    vagasComMatch.sort((a, b) => b.compatibilidade - a.compatibilidade);
    renderizarVagas(vagasComMatch);
}

// ============================================
// RENDERIZAR VAGAS
// ============================================
function renderizarVagas(vagas) {
    const lista = document.getElementById('vagasLista');
    if (!lista) return;

    if (!vagas || vagas.length === 0) {
        lista.innerHTML = `
            <div class="vaga-placeholder">
                <i class="fas fa-user-clock"></i>
                <p>Faça o teste DISC para ver vagas compatíveis</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = vagas.map(vaga => `
        <div class="card-vaga">
            <div class="vaga-header">
                <h4>${vaga.titulo}</h4>
                <span class="match-badge" style="background: ${vaga.compatibilidade >= 80 ? '#10b981' : vaga.compatibilidade >= 60 ? '#f59e0b' : '#ef4444'}">
                    ${vaga.compatibilidade}% Match
                </span>
            </div>
            <p><i class="fas fa-building"></i> ${vaga.empresa}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${vaga.localizacao}</p>
            <button class="btn-candidatar" onclick="alert('Candidatando-se para: ${vaga.titulo}')">
                <i class="fas fa-paper-plane"></i> Candidatar-se
            </button>
        </div>
    `).join('');
}

// ============================================
// INICIALIZAÇÃO
// ============================================
console.log('🚀 Iniciando DISC RECRUTA...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}

function inicializar() {
    console.log('✓ DOM carregado');

    setTimeout(() => {
        iniciarTogglePerfil();
        iniciarSliders();
        iniciarUpload();
        iniciarFormCandidato();
        iniciarFormVaga();

        console.log('✓ DISC RECRUTA inicializado com sucesso!');
    }, 100);
}
