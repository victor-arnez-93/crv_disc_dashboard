// ======================================================================
// CLIMA — NETLIFY FUNCTION (VERSÃO CORRIGIDA)
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

        const city = "Tatuí";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

        const resp = await fetch(url);
        if (!resp.ok) {
            return {
                statusCode: resp.status,
                body: JSON.stringify({ error: "Falha ao buscar clima." })
            };
        }

        const data = await resp.json();

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

        const hoje = new Date();
        const diasSemana = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
        const previsoes = [];

        // Calcula os 3 dias (hoje, amanhã, depois)
        for (let i = 0; i < 3; i++) {
            const diaAlvo = new Date(hoje);
            diaAlvo.setDate(hoje.getDate() + i);
            diaAlvo.setHours(0, 0, 0, 0); // Zera hora para comparação

            // Procura primeira previsão do dia alvo
            const previsaoDoDia = data.list.find(item => {
                const dataItem = new Date(item.dt * 1000);
                return (
                    dataItem.getDate() === diaAlvo.getDate() &&
                    dataItem.getMonth() === diaAlvo.getMonth() &&
                    dataItem.getFullYear() === diaAlvo.getFullYear()
                );
            });

            if (previsaoDoDia) {
                const diaSemana = diasSemana[diaAlvo.getDay()];

                previsoes.push({
                    dia: diaSemana,
                    emoji: getWeatherEmoji(previsaoDoDia.weather[0].main),
                    descricao: previsaoDoDia.weather[0].description,
                    temperatura: Math.round(previsaoDoDia.main.temp),
                    min: Math.round(previsaoDoDia.main.temp_min),
                    max: Math.round(previsaoDoDia.main.temp_max)
                });
            }
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ previsoes })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro interno ao processar clima." })
        };
    }
};
