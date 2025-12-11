// @ts-nocheck
import Groq from "groq-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Carrega memória da barbearia
const memoryPath = "./memory/barbearia.json";
let barberMemory = {};

if (fs.existsSync(memoryPath)) {
    barberMemory = JSON.parse(fs.readFileSync(memoryPath, "utf8"));
}

export async function askAI(prompt) {
    try {
        console.log("🔎 Usuário perguntou:", prompt);

        const systemMessage = `
VOCÊ É O ASSISTENTE OFICIAL DA BARBEARIA BROTHERS.

Use SOMENTE as informações abaixo para responder perguntas:

${JSON.stringify(barberMemory, null, 2)}

IMPORTANTE:
- Responda sempre de forma simpática, objetiva e profissional.
- Use preços, horários, serviços e políticas exatamente como estão na memória.
- Se o usuário perguntar algo fora da memória, diga que não sabe e peça para reforçar a pergunta.
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
