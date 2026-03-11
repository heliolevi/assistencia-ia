// @ts-nocheck
import { askAI } from "../services/groqService.js";
import { getSession, updateSession } from "../services/sessionService.js";

export async function chat(req, res) {
    try {
        const { message, sessionId = "default" } = req.body;

        if (!message) {
            return res.status(400).json({ erro: "Mensagem não enviada" });
        }

        // 🔹 Recupera ou cria sessão
        const session = getSession(sessionId);

        // 🔹 Exemplo simples de atualização de memória
        if (!session.nome && message.length <= 25) {
            updateSession(sessionId, { nome: message });
        }

        // Chama a IA com a mensagem e a sessão do cliente
        const resposta = await askAI(message, session);

        res.json({ reply: resposta });

    } catch (error) {
        console.error("❌ Erro Controller:", error);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}
