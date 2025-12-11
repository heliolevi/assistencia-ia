// @ts-nocheck
import fs from "fs";
import path from "path";

export function loadMemory() {
    try {
        const memoryPath = path.resolve("backend/memorias/salao/brothers.md");
        const memory = fs.readFileSync(memoryPath, "utf8");

        console.log("🧠 Memória carregada com sucesso.");
        return memory;
    } catch (error) {
        console.error("❌ Erro ao carregar memória:", error);
        return "";
    }
}
