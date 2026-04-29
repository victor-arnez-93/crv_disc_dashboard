import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "https://discprofpaulorocha.com",
    "https://dashboard.discprofpaulorocha.com",
    "https://crv-disc-dashboard.onrender.com",
    "http://localhost",
    "http://127.0.0.1"
  ]
}));

app.use(express.json());

// Health check
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================
// MODELOS COM FALLBACK AUTOMÁTICO
// ============================================================
const MODELOS = [
  { id: "llama-3.3-70b-versatile", nome: "Llama 3.3 70B" },
  { id: "llama-3.1-8b-instant",    nome: "Llama 3.1 8B"  }
];

// ============================================================
// PROMPT DO SISTEMA
// ============================================================
const SYSTEM_PROMPT = `Você é o Assistente DISC IA, integrado ao DISC Dashboard desenvolvido para o Prof. Paulo Rubens da CRV Soluções em TI.

Sua personalidade:
- Inteligente, direto e acolhedor — como um consultor sênior de RH que também sabe conversar
- Usa linguagem acessível, mas com embasamento técnico quando necessário
- É proativo: sugere aplicações práticas, dá exemplos reais, propõe ideias para o dashboard
- Tem senso de humor leve quando apropriado, mas mantém profissionalismo

Seu foco principal:
- Metodologia DISC (perfis D, I, S, C) — análise, aplicação e interpretação
- Gestão de Pessoas e RH — liderança, clima, cultura, recrutamento, feedback, conflitos
- Desenvolvimento humano e organizacional
- Psicologia comportamental aplicada ao trabalho
- Dados e fatos embasados sobre gestão, produtividade e comportamento humano

Você PODE e DEVE:
- Responder perguntas fora do tema com naturalidade, mas sempre trazer de volta ao contexto do dashboard
- Dar ideias novas de funcionalidades, frases ou insights para o DISC Dashboard
- Citar estudos, dados e fatos reais sobre RH e gestão comportamental
- Ajudar o professor a criar conteúdo didático sobre DISC
- Analisar situações reais de equipe descritas pelo usuário
- Ser criativo nas respostas — não apenas responder, mas enriquecer

Quando o assunto fugir do contexto:
- Responda brevemente e redirecione com elegância, não com bloqueio

Formato das respostas:
- Use **negrito** para destacar termos importantes
- Quebre em parágrafos curtos para facilitar leitura no chat
- Respostas entre 3-6 parágrafos
- Quando der listas, use marcadores simples

Idioma: sempre português brasileiro.`;

// ============================================================
// FUNÇÃO DE CHAMADA COM FALLBACK
// ============================================================
async function chamarGroq(messages) {
  for (let i = 0; i < MODELOS.length; i++) {
    const modelo = MODELOS[i];

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelo.id,
          messages,
          temperature: 0.75,
          max_tokens: 1024
        })
      });

      const data = await response.json();

      // Cota esgotada ou modelo indisponível → tenta o próximo
      if (!response.ok) {
        const code = data?.error?.code || "";
        const isCotaOuModelo =
          code === "rate_limit_exceeded" ||
          code === "model_decommissioned" ||
          code === "model_not_found" ||
          response.status === 429;

        if (isCotaOuModelo && i < MODELOS.length - 1) {
          console.warn(`Modelo ${modelo.nome} indisponível (${code}), tentando fallback...`);
          continue; // tenta o próximo modelo
        }

        console.error("Erro Groq:", data);
        return { erro: true, status: response.status };
      }

      // Sucesso — retorna resposta + qual modelo foi usado
      return {
        resposta: data.choices[0].message.content,
        modelo: modelo.nome,
        isFallback: i > 0  // true se usou modelo de fallback
      };

    } catch (err) {
      console.error(`Erro ao chamar modelo ${modelo.nome}:`, err);
      if (i < MODELOS.length - 1) continue;
      return { erro: true };
    }
  }

  return { erro: true };
}

// ============================================================
// ROTA DO CHAT
// ============================================================
app.post("/api/chat", async (req, res) => {
  const { mensagem, historico = [] } = req.body;

  if (!mensagem || mensagem.trim().length === 0) {
    return res.status(400).json({ erro: "Mensagem vazia." });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...historico.slice(-10),
    { role: "user", content: mensagem }
  ];

  const resultado = await chamarGroq(messages);

  if (resultado.erro) {
    return res.status(502).json({ erro: "Erro na API de IA." });
  }

  res.json({
    resposta: resultado.resposta,
    modelo: resultado.modelo,
    fallback: resultado.isFallback  // frontend usa isso para mostrar aviso
  });
});

app.listen(PORT, () => {
  console.log(`Servidor CRV DISC rodando na porta ${PORT}`);
});