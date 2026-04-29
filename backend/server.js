import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Permite chamadas do domínio do dashboard
app.use(cors({
  origin: [
    "https://discprofpaulorocha.com",
    "https://crv-disc-dashboard.onrender.com",
    "http://localhost"
  ]
}));

app.use(express.json());

// Health check — evita cold start longo e serve pra monitorar
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================
// ROTA PRINCIPAL — ASSISTENTE DISC IA
// ============================================================
app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem || mensagem.trim().length === 0) {
    return res.status(400).json({ erro: "Mensagem vazia." });
  }

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
            content: `Você é um assistente especializado em DISC, RH e liderança, integrado ao DISC Dashboard do Prof. Paulo Rubens da CRV Soluções em TI.

Seu papel:
- Explicar os perfis DISC (Dominância, Influência, Estabilidade, Conformidade)
- Orientar sobre recrutamento, liderança e gestão comportamental
- Dar dicas práticas sobre comunicação entre perfis
- Analisar situações de conflito entre perfis DISC
- Apoiar professores e gestores de RH com linguagem acessível

Regras:
- Responda sempre em português brasileiro
- Seja claro, direto e profissional
- Se a pergunta fugir completamente do tema, redirecione com gentileza
- Não invente dados ou pesquisas que não existem
- Respostas entre 3 e 8 parágrafos, sem exagero`
          },
          {
            role: "user",
            content: mensagem
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Erro Groq:", errData);
      return res.status(502).json({ erro: "Erro na API de IA." });
    }

    const data = await response.json();
    res.json({ resposta: data.choices[0].message.content });

  } catch (err) {
    console.error("Erro servidor:", err);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor CRV DISC rodando na porta ${PORT}`);
});