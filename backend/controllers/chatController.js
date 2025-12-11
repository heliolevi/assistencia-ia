// @ts-nocheck
import { askAI } from "../services/groqService.js";

export async function chat(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ erro: "Mensagem não enviada" });
        }

        const resposta = await askAI(message);

        res.json({ reply: resposta });

    } catch (error) {
        console.error("❌ Erro Controller:", error);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}
