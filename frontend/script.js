const API_URL = "http://localhost:5000/api/chat";

// Allow pressing enter to send
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const sendButton = document.getElementById("send-button");

    const message = input.value.trim();
    if (!message) return;

    // Remove text, disable button and show user message
    input.value = "";
    sendButton.disabled = true;
    sendButton.style.opacity = "0.5";

    chatBox.innerHTML += `
        <div class="message-wrapper user-wrapper">
            <div class="message user-message">${message}</div>
        </div>
    `;
    scrollToBottom();

    // Show temporary typing indicator
    const typingId = "typing-" + Date.now();
    chatBox.innerHTML += `
        <div id="${typingId}" class="message-wrapper bot-wrapper">
            <div class="message bot-message" style="color: var(--text-muted); font-style: italic;">Digitando...</div>
        </div>
    `;
    scrollToBottom();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                sessionId: "cliente-browser-001" // Can be random generated per page load later
            })
        });

        const data = await response.json();
        
        // Remove typing indicator
        document.getElementById(typingId).remove();

        // Print real response (replacing newlines with <br> for proper formatting)
        const formattedReply = (data.reply || "Erro: resposta vazia").replace(/\n/g, '<br>');
        chatBox.innerHTML += `
            <div class="message-wrapper bot-wrapper">
                <div class="message bot-message">${formattedReply}</div>
            </div>
        `;

    } catch (error) {
        document.getElementById(typingId).remove();
        chatBox.innerHTML += `
            <div class="message-wrapper bot-wrapper">
                <div class="message bot-message" style="color: #f85149;">Erro ao conectar ao servidor.</div>
            </div>
        `;
    } finally {
        sendButton.disabled = false;
        sendButton.style.opacity = "1";
        input.focus();
        scrollToBottom();
    }
}

function scrollToBottom() {
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}
