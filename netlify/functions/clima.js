// ======================================================================
// CLIMA — NETLIFY FUNCTION (VERSÃO FINAL SEM ERROS)
// ======================================================================

exports.handler = async () => {
  try {
    const API_KEY = process.env.OPENWEATHER_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key ausente no servidor." })
      };
    }

    // Cidade fixa — pode mudar se quiser
    const city = "Tatuí";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

    // Netlify suporta fetch nativo — não precisa node-fetch
    const resp = await fetch(url);

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: "Falha ao buscar clima." })
      };
    }

    const data = await resp.json();

    // Emojis mantidos
    const getWeatherEmoji = (weather) => ({
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌫️"
    }[weather] || "🌡️");

    const weather = data.weather?.[0];
    const main = data.main;

    // CORRIGIDO: temperatura agora SEM "|| 0"
    const temperatura = main?.temp !== undefined ? Math.round(main.temp) : "--";

    const payload = {
      emoji: getWeatherEmoji(weather?.main),
      descricao: weather?.description || "",
      temperatura
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
