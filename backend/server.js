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
// GPT-OSS 20B fica como principal por estar no catálogo atual da Groq
// e ter boa relação entre qualidade, velocidade e limite de uso.
const MODELOS = [
  { id: "openai/gpt-oss-20b",       nome: "GPT-OSS 20B" },
  { id: "llama-3.1-8b-instant",     nome: "Llama 3.1 8B" },
  { id: "llama-3.3-70b-versatile",  nome: "Llama 3.3 70B" }
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
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY não configurada no ambiente.");
    return { erro: true, status: 500, codigo: "missing_api_key" };
  }

  for (let i = 0; i < MODELOS.length; i++) {
    const modelo = MODELOS[i];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelo.id,
          messages,
          temperature: 0.75,
          max_completion_tokens: 1024
        }),
        signal: controller.signal
      });

      const raw = await response.text();
      let data = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = { erro_raw: raw.substring(0, 500) };
      }

      if (!response.ok) {
        const code = data?.error?.code || data?.error?.type || "";
        const mensagemErro = data?.error?.message || "Erro sem mensagem retornada pela Groq";

        console.warn(
          `Groq falhou em ${modelo.nome}: HTTP ${response.status} | ${code} | ${mensagemErro}`
        );

        // Erros ligados a modelo, permissão/cota, capacidade ou indisponibilidade
        // tentam automaticamente o próximo modelo disponível.
        const podeTentarFallback =
          [403, 404, 408, 409, 429, 498, 500, 502, 503, 504].includes(response.status) ||
          [
            "rate_limit_exceeded",
            "model_decommissioned",
            "model_not_found",
            "model_not_allowed",
            "permission_denied",
            "capacity_exceeded",
            "server_error"
          ].includes(code);

        if (podeTentarFallback && i < MODELOS.length - 1) {
          continue;
        }

        return {
          erro: true,
          status: response.status,
          codigo: code || "groq_error"
        };
      }

      const resposta = data?.choices?.[0]?.message?.content;

      if (!resposta) {
        console.warn(`Resposta vazia recebida de ${modelo.nome}.`);
        if (i < MODELOS.length - 1) continue;
        return { erro: true, status: 502, codigo: "empty_response" };
      }

      return {
        resposta,
        modelo: modelo.nome,
        isFallback: i > 0
      };

    } catch (err) {
      const foiTimeout = err?.name === "AbortError";
      console.error(
        `${foiTimeout ? "Timeout" : "Erro"} ao chamar ${modelo.nome}:`,
        err
      );

      if (i < MODELOS.length - 1) continue;
      return {
        erro: true,
        status: foiTimeout ? 504 : 502,
        codigo: foiTimeout ? "timeout" : "network_error"
      };

    } finally {
      clearTimeout(timeout);
    }
  }

  return { erro: true, status: 502, codigo: "all_models_failed" };
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
    const status = resultado.status === 500 ? 500 : 502;
    return res.status(status).json({
      erro: "Erro na API de IA.",
      codigo: resultado.codigo || "groq_error"
    });
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