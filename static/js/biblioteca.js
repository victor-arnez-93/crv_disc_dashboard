function filtrarCasos(categoria, el) {
    const cards = document.querySelectorAll('#painel-uso .caso-card');
    const filtros = document.querySelectorAll('.filtro-caso');

    filtros.forEach(f => f.classList.remove('active'));

    if (el) {
        el.classList.add('active');
    }

    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            if (card.getAttribute('data-categoria') === categoria) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        }
    });
}

function abrirCaso(casoId) {
    const modal = document.getElementById('uso-modalCaso');
    const modalBody = document.getElementById('uso-modalCasoBody');

    const casos = {
        caso1: {
            titulo: 'Liderando Equipe de Alta Performance - Perfil D',
            conteudo: `
                <h3>Contexto</h3>
                <p>João é gerente de desenvolvimento em uma startup de tecnologia. Com perfil D dominante, assumiu uma equipe desmotivada que não batia metas há 6 meses.</p>

                <h3>Desafio</h3>
                <p>Equipe de 12 pessoas, com mix de perfis, mas sem direção clara e metas desafiadoras. Ambiente estava acomodado e sem senso de urgência.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>João usou seu perfil D de forma estratégica:</p>
                <ul>
                    <li>Estabeleceu metas audaciosas e prazos claros (característica D)</li>
                    <li>Identificou perfis DISC de cada membro da equipe</li>
                    <li>Criou sub-líderes baseado em perfis complementares</li>
                    <li>Adaptou comunicação e motivação por perfil</li>
                    <li>Acordou autonomia conforme competências, experiência e risco das tarefas</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Em 6 meses:</p>
                <ul>
                    <li>Equipe passou de 60% para 135% das metas</li>
                    <li>Turnover caiu de 40% para 5% ao ano</li>
                    <li>NPS interno subiu de 6 para 9.2</li>
                    <li>Equipe recebeu prêmio de melhor desempenho da empresa</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis D são excelentes para turnarounds, mas precisam equilibrar seu drive por resultados com empatia aos diferentes perfis da equipe. João aprendeu a "dosar" seu estilo direto com cada membro.</p>
            `
        },
        caso2: {
            titulo: 'Fechando Vendas com Relacionamento - Perfil I',
            conteudo: `
                <h3>Contexto</h3>
                <p>Maria é vendedora B2B com perfil I marcante. Trabalhava em empresa de software corporativo com ciclo de vendas longo (6-12 meses).</p>

                <h3>Desafio</h3>
                <p>Taxa de conversão estava em 12%, abaixo da média do mercado (18%). Maria tinha ótimo rapport inicial, mas perdia deals na fase final.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Com mentoria, Maria aprendeu a:</p>
                <ul>
                    <li>Identificar perfil DISC do cliente logo no primeiro contato</li>
                    <li>Adaptar apresentação ao perfil: dados para C, benefícios para D, histórias para I, segurança para S</li>
                    <li>Usar seu carisma (I) para build rapport, mas trazer dados (C) para fechamento</li>
                    <li>Formar parcerias com colegas perfil C para validação técnica</li>
                    <li>Criar "playbooks" por perfil de cliente</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Em 8 meses:</p>
                <ul>
                    <li>Conversão subiu de 12% para 27%</li>
                    <li>Ticket médio aumentou 35%</li>
                    <li>Tornou-se top seller da empresa</li>
                    <li>Criou metodologia replicada por toda equipe de vendas</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfil I tem vantagem no relacionamento, mas precisa complementar com estrutura e dados. Maria não mudou sua essência, apenas adicionou ferramentas para diferentes perfis de clientes.</p>
            `
        },
        caso3: {
            titulo: 'Mediação de Conflitos com Empatia - Perfil S',
            conteudo: `
                <h3>Contexto</h3>
                <p>Ana é analista de RH com forte perfil S em hospital de grande porte. Departamentos de enfermagem e administrativo estavam em conflito aberto há 3 meses.</p>

                <h3>Desafio</h3>
                <p>Conflito afetava atendimento aos pacientes. Enfermeiros (maioria perfil S) sentiam-se desrespeitados pelo administrativo (maioria perfil D). Clima estava insustentável.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Ana usou seu perfil S como ponte:</p>
                <ul>
                    <li>Escutou individualmente cada lado sem julgamento (força do S)</li>
                    <li>Identificou que conflito era de ritmo e comunicação, não de pessoas</li>
                    <li>Facilitou workshops misturando perfis</li>
                    <li>Criou protocolo de comunicação adaptado aos perfis</li>
                    <li>Estabeleceu "embaixadores" S e D de cada departamento</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Em 4 meses:</p>
                <ul>
                    <li>NPS interdepartamental subiu de 3 para 8.5</li>
                    <li>Reclamações de pacientes caíram 60%</li>
                    <li>Produtividade geral aumentou 25%</li>
                    <li>Modelo foi replicado em outros hospitais da rede</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis S são mediadores naturais. Ana provou que conflitos entre perfis extremos (D vs S) podem ser resolvidos com empatia, estrutura e respeito às diferenças.</p>
            `
        },
        caso4: {
            titulo: 'Análise e Resolução de Problemas - Perfil C',
            conteudo: `
                <h3>Contexto</h3>
                <p>Carlos é gerente de projetos de TI com perfil C acentuado. Projeto crítico de migração de sistemas estava 40% atrasado e 60% acima do orçamento.</p>

                <h3>Desafio</h3>
                <p>Equipe técnica (perfis C e D) em conflito constante. Prazo era inegociável por questões regulatórias. Risco de multa milionária.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Carlos aplicou análise DISC sistemática:</p>
                <ul>
                    <li>Mapeou perfis de toda equipe (12 pessoas)</li>
                    <li>Identificou que conflito era entre perfis D (queriam velocidade) e C (queriam perfeição)</li>
                    <li>Criou matriz de priorização: essencial vs desejável</li>
                    <li>Definiu "critérios de pronto" por perfil</li>
                    <li>Estabeleceu rituais de comunicação adaptados (standups para D, documentação para C)</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Em 5 meses:</p>
                <ul>
                    <li>Projeto entregue 2 semanas ANTES do prazo</li>
                    <li>15% ABAIXO do orçamento recalibrado</li>
                    <li>Zero bugs críticos em produção</li>
                    <li>Equipe mantida íntegra para próximos projetos</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfil C traz análise e qualidade, essenciais em projetos críticos. Carlos provou que estrutura e compreensão de perfis resolve conflitos que pareciam técnicos mas eram comportamentais.</p>
            `
        },
        caso5: {
            titulo: 'Formação de Equipe Balanceada - Multi-Perfil',
            conteudo: `
                <h3>Contexto</h3>
                <p>Roberto, diretor de inovação, precisava montar equipe para desenvolver nova linha de produtos. Tinha liberdade total de contratação.</p>

                <h3>Desafio</h3>
                <p>Formar equipe de 8 pessoas do zero para projeto de 18 meses. Produto precisava ser inovador, mas viável comercialmente e tecnicamente.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Roberto usou DISC como critério de formação:</p>
                <ul>
                    <li>2 perfis D: liderança, decisões rápidas, foco em resultados</li>
                    <li>2 perfis I: networking, criatividade, comunicação com stakeholders</li>
                    <li>2 perfis S: suporte, coesão da equipe, mediação de conflitos</li>
                    <li>2 perfis C: qualidade, análise de viabilidade, documentação</li>
                </ul>

                <p>Além disso:</p>
                <ul>
                    <li>Todos passaram por workshop DISC para autoconhecimento</li>
                    <li>Definiu papéis aproveitando forças de cada perfil</li>
                    <li>Criou rituais que atendiam todos os perfis</li>
                    <li>Estabeleceu sistema de tomada de decisão balanceado</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Em 18 meses:</p>
                <ul>
                    <li>Produto lançado no prazo</li>
                    <li>3 patentes depositadas</li>
                    <li>Produto atingiu 150% da meta de receita no primeiro ano</li>
                    <li>Equipe considerada referência na empresa</li>
                    <li>Zero turnover - todos os 8 continuaram após projeto</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Equipes balanceadas com diversidade DISC intencional são mais inovadoras, resilientes e eficazes. Não existe "perfil melhor" - existe complementaridade estratégica.</p>
            `
        },
        caso6: {
            titulo: 'Negociação de Alto Impacto - Perfil D',
            conteudo: `
                <h3>Contexto</h3>
                <p>Ricardo, VP de vendas corporativas com perfil D marcante, estava negociando contrato de R$ 12 milhões com multinacional farmacêutica.</p>

                <h3>Desafio</h3>
                <p>Cliente (CFO) tinha perfil C extremo: detalhista, cauteloso, analítico. Ricardo já tinha perdido 2 negociações similares por abordagem muito agressiva.</p>

                <h3>Estratégia DISC Aplicada</h3>
                <p>Ricardo adaptou completamente sua abordagem:</p>
                <ul>
                    <li>Identificou perfil C do CFO logo na primeira reunião</li>
                    <li>Conteve seu impulso D de fechar rápido</li>
                    <li>Preparou documentação técnica exaustiva (258 páginas)</li>
                    <li>Trouxe especialista técnico (perfil C) para todas as reuniões</li>
                    <li>Aceitou processo de 4 meses sem pressionar</li>
                    <li>Respondeu TODAS as 147 perguntas do cliente com dados</li>
                </ul>

                <h3>Momentos Críticos</h3>
                <p>Ricardo quase perdeu o deal 2 vezes:</p>
                <ul>
                    <li>Quando tentou acelerar decisão (impulso D) - cliente recuou</li>
                    <li>Aprendeu a "falar C": dados, não entusiasmo</li>
                </ul>

                <h3>Desdobramentos hipotéticos para debate</h3>
                <p>Após 4 meses:</p>
                <ul>
                    <li>Contrato fechado em R$ 12.8 milhões (6% acima do esperado)</li>
                    <li>Cliente pediu exclusividade por 3 anos</li>
                    <li>Ricardo virou referência interna em vendas para perfis C</li>
                    <li>Criou playbook "D vendendo para C"</li>
                </ul>

                <h3>Lição Aprendida</h3>
                <p>Perfis opostos podem fazer negócios excelentes quando há adaptação genuína. Ricardo não deixou de ser D - apenas aprendeu a "falar C" quando necessário. Flexibilidade comportamental é a chave.</p>
            `
        }
    };

    const caso = casos[casoId];
    if (!caso) return;
    modalBody.innerHTML = `
        <h2>${caso.titulo}</h2>
        <p class="nota-didatica">Caso fictício para aula. Dados e resultados são ilustrativos; não constituem evidência de eficácia do DISC.</p>${caso.conteudo}
    `;

    modal.classList.add('show');
}

function fecharModalCaso() {
    document.getElementById('uso-modalCaso').classList.remove('show');
}

// Fechar modal ao clicar fora
document.getElementById('uso-modalCaso')?.addEventListener('click', (e) => {
    if (e.target.id === 'uso-modalCaso') {
        fecharModalCaso();
    }
});

// ============================================================

document.addEventListener('keydown', e => { if(e.key === 'Escape') fecharModalCaso(); });
