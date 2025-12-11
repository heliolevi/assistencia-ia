const API_URL = "http://localhost:5000/api/chat";

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();
    if (!message) return;

    // Exibe mensagem do usuário
    chatBox.innerHTML += `<p class="user-message"><b>Você:</b> ${message}</p>`;
    input.value = "";

    try {
        // Envia para o backend
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        console.log("🔎 Backend:", data);

        // Exibe resposta da IA
        chatBox.innerHTML += `<p class="bot-message"><b>IA:</b> ${data.reply || "Erro: resposta vazia"}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p class="bot-message"><b>IA:</b> Erro ao conectar ao servidor.</p>`;
    }
}
