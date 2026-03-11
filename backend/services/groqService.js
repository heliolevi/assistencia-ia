// @ts-nocheck
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { loadMemory } from "./readMemory.js";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Carrega memória da barbearia
const barbershopContext = loadMemory();

export async function askAI(prompt, session) {
    try {
        console.log("🔎 Usuário perguntou:", prompt);

        const systemMessage = `
VOCÊ É O ASSISTENTE OFICIAL DA BARBEARIA BROTHERS.

REGRAS ABSOLUTAS (NUNCA QUEBRE):
- NÃO se reapresente após a primeira resposta.
- NÃO pergunte novamente informações que já estejam preenchidas na memória do cliente.
- NÃO mostre o estado da conversa ou dados internos ao cliente.
- SE o cliente repetir algo já informado, apenas confirme e avance.
- SE o cliente fizer uma pergunta fora do fluxo, responda e depois retome o fluxo.
- SEJA natural, direto e humano. Sem textos longos ou repetitivos.
- SEJA conciso. Responda em no máximo 2 parágrafos curtos.
- Você deve conduzir o cliente até o agendamento completo (nome, serviço, data, horário).

CONTEXTO DA BARBEARIA:
${barbershopContext}

MEMÓRIA ATUAL DO CLIENTE (VERDADE ABSOLUTA):
${JSON.stringify(session, null, 2)}
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: prompt }
            ]
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("❌ Erro Groq:", error);
        return "Erro ao chamar a IA Groq.";
    }
}
