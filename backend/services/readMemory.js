// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadMemory() {
    try {
        const memoryPath = path.resolve(__dirname, "../memories/salao/brothers.md");
        const memory = fs.readFileSync(memoryPath, "utf8");

        console.log("🧠 Memória carregada com sucesso.");
        return memory;
    } catch (error) {
        console.error("❌ Erro ao carregar memória:", error);
        return "";
    }
}
