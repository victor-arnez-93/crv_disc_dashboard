// ============================================================================
// FOTO DO DIA — VERSÃO FINAL (IMAGENS FIXAS + LEGENDA PROFISSIONAL)
// ============================================================================

// ============================================================================
// CACHE – Reinicia diariamente
// ============================================================================
let CACHE_FOTO = null;
let CACHE_DATA = null;

function cacheValido() {
  return CACHE_FOTO && CACHE_DATA === new Date().toDateString();
}

// ============================================================================
// IMAGENS + LEGENDAS (FIXAS)
// ============================================================================
const imagens = [
  {
    url: "/static/imagens/img1.png",
    titulo: "Conexões organizacionais",
    legenda: "Estruturas organizacionais eficazes dependem da qualidade das conexões, não apenas da hierarquia formal."
  },
  {
    url: "/static/imagens/img2.png",
    titulo: "Ambiente corporativo",
    legenda: "O ambiente organizacional influencia diretamente cultura, desempenho e tomada de decisão."
  },
  {
    url: "/static/imagens/img3.png",
    titulo: "Confiança e negociação",
    legenda: "Relações profissionais sustentáveis são construídas com confiança, clareza e alinhamento de expectativas."
  },
  {
    url: "/static/imagens/img4.png",
    titulo: "Governança e decisão",
    legenda: "Decisões estratégicas consistentes exigem estrutura, dados e alinhamento entre liderança."
  },
  {
    url: "/static/imagens/img5.png",
    titulo: "Ambiente de trabalho",
    legenda: "Espaços organizados e funcionais contribuem para foco, produtividade e colaboração."
  },
  {
    url: "/static/imagens/img6.png",
    titulo: "Análise e gestão",
    legenda: "A gestão moderna combina análise de dados com leitura comportamental para decisões mais eficazes."
  },
  {
    url: "/static/imagens/img7.png",
    titulo: "Performance e resultados",
    legenda: "Resultados consistentes vêm da capacidade de transformar informação em ação estratégica."
  },
  {
    url: "/static/imagens/img8.png",
    titulo: "Perfil comportamental (DISC)",
    legenda: "Compreender perfis comportamentais melhora comunicação, liderança e desempenho em equipe."
  }
];

// ============================================================================
// HANDLER — Netlify
// ============================================================================
exports.handler = async () => {
  try {
    if (cacheValido()) {
      return {
        statusCode: 200,
        body: JSON.stringify(CACHE_FOTO)
      };
    }

    const index = Math.floor(Date.now() / 86400000) % imagens.length;
    const foto = imagens[index];

    CACHE_FOTO = foto;
    CACHE_DATA = new Date().toDateString();

    return {
      statusCode: 200,
      body: JSON.stringify(foto)
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(imagens[0])
    };
  }
};