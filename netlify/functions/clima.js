// ======================================================================
// FUNÇÃO SERVERLESS – CLIMA (OPENWEATHER)
// Mantém exatamente o comportamento antigo (emojis, formato, etc.)
// ======================================================================

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  try {
    const API_KEY = process.env.OPENWEATHER_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key ausente no servidor." })
      };
    }

    // Cidade fixa (Tatuí - pode mudar se quiser)
    const city = "Tatuí";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

    const resp = await fetch(url);

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: "Falha ao buscar clima." })
      };
    }

    const data = await resp.json();

    // === MANter EMOJIS EXATAMENTE COMO VOCÊ JÁ USA ===
    function getWeatherEmoji(weather) {
      return {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌫️",
        Haze: "🌫️"
      }[weather] || "🌡️";
    }

    const weather = data.weather?.[0];
    const main = data.main;

    const payload = {
      emoji: getWeatherEmoji(weather?.main),
      descricao: weather?.description || "",
      temperatura: Math.round(main?.temp) || 0
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao processar clima." })
    };
  }
};
