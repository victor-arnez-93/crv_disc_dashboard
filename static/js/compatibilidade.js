function analisarCompatibilidade() {
    const perfil1 = document.getElementById('perfil1').value;
    const perfil2 = document.getElementById('perfil2').value;
    const resultado = document.getElementById('resultadoCompatibilidade');

    if (!perfil1 || !perfil2) return;

    const compatibilidades = { /* mesmo objeto que já está hoje */ };

    const chave = [perfil1, perfil2].sort().join('');
    const dados = compatibilidades[chave] || compatibilidades['DD'];

    resultado.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="font-size: 48px; font-weight: 700; color: var(--cor-primaria);">
                ${dados.nivel}
            </div>
            <h3 style="margin: 0;">${dados.titulo}</h3>
        </div>
        <p><strong>Análise:</strong> ${dados.descricao}</p>
        <h4 style="color: var(--cor-primaria); margin-top: 16px; margin-bottom: 8px;">
            💡 Dicas para Melhorar a Colaboração:
        </h4>
        <ul style="margin: 0; padding-left: 20px;">
            ${dados.dicas.map(dica => `<li style="margin-bottom: 6px;">${dica}</li>`).join('')}
        </ul>
    `;

    resultado.classList.add('show');
}