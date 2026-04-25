import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const { mensagem } = req.body;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    {
                        role: "system",
                        content: `
Você é um especialista em DISC, RH e liderança.
Responda de forma clara, profissional e prática.
Se a pergunta fugir do contexto, redirecione.
                        `
                    },
                    { role: "user", content: mensagem }
                ]
            })
        });

        const data = await response.json();

        res.json({
            resposta: data.choices[0].message.content
        });

    } catch (err) {
        res.status(500).json({ erro: "Erro na IA" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});