import { Router } from "express";
import { chat } from "../controllers/chatController.js";

const router = Router();

// Rota principal do chat
router.post("/chat", chat);

export default router;
