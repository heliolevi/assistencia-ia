// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

// Rotas do chat
app.use("/api", chatRoutes);

// Rotas de agendamento
app.use("/api", scheduleRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${process.env.PORT}`);
});
