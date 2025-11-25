// ============================================================================
// FOTO DO DIA — NETLIFY FUNCTION (v4 FINAL)
// Fluxo: Pexels → Unsplash → Pixabay → fallback
// Sempre retorna 1 foto válida e profissional para o dashboard
// Usa variáveis do Netlify (.env)
// ============================================================================

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;

// Temas profissionais rotativos
const temas = [
  "business teamwork office",
  "leadership people meeting",
  "corporate communication team",
  "diversity inclusion office",
  "career development workplace",
  "technology innovation office",
  "strategy leadership meeting"
];

// Tema do dia (variação estável)
function temaDoDia() {
  const index = new Date().getDay();
  return temas[index % temas.length];
}

// ============================================================================
// CACHE – Reinicia diariamente
// ============================================================================
let CACHE_FOTO = null;
let CACHE_DATA = null;

function cacheValido() {
  return CACHE_FOTO && CACHE_DATA === new Date().toDateString();
}

// ============================================================================
// PEXELS
// ============================================================================
async function buscarPexels(query) {
  try {
    if (!PEXELS_API_KEY) return null;

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.photos?.length) return null;

    const foto = data.photos[0];

    return {
      url: foto.src.large2x || foto.src.large,
      autor: foto.photographer,
      fonte: "Pexels",
      link: foto.url
    };
  } catch {
    return null;
  }
}

// ============================================================================
// UNSPLASH
// ============================================================================
async function buscarUnsplash(query) {
  try {
    if (!UNSPLASH_KEY) return null;

    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_KEY}`
    );

    if (!res.ok) return null;
    const foto = await res.json();

    if (!foto?.urls) return null;

    return {
      url: foto.urls.regular,
      autor: foto.user?.name || "Autor desconhecido",
      fonte: "Unsplash",
      link: foto.links?.html || "#"
    };
  } catch {
    return null;
  }
}

// ============================================================================
// PIXABAY
// ============================================================================
async function buscarPixabay(query) {
  try {
    if (!PIXABAY_KEY) return null;

    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=5`
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.hits?.length) return null;

    const foto = data.hits[0];

    return {
      url: foto.largeImageURL,
      autor: foto.user,
      fonte: "Pixabay",
      link: foto.pageURL
    };
  } catch {
    return null;
  }
}

// ============================================================================
// FALLBACK SE TUDO DER ERRADO
// ============================================================================
function fallbackFoto() {
  return {
    url: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200",
    autor: "Banco de Imagens",
    fonte: "Fallback",
    link: "https://unsplash.com"
  };
}

// ============================================================================
// HANDLER — Netlify padrão
// ============================================================================
exports.handler = async () => {
  try {
    if (cacheValido()) {
      return {
        statusCode: 200,
        body: JSON.stringify(CACHE_FOTO)
      };
    }

    const query = temaDoDia();

    const foto =
      (await buscarPexels(query)) ||
      (await buscarUnsplash(query)) ||
      (await buscarPixabay(query)) ||
      fallbackFoto();

    CACHE_FOTO = foto;
    CACHE_DATA = new Date().toDateString();

    return {
      statusCode: 200,
      body: JSON.stringify(foto)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(fallbackFoto())
    };
  }
};
