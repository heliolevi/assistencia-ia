export function classifyIntent(message) {
    message = message.toLowerCase();

    if (/olá|boa tarde|bom dia|ei|salve/.test(message)) return "greet";
    if (/preço|quanto|valor/.test(message)) return "ask_price";
    if (/combo|pacote/.test(message)) return "ask_combo";
    if (/horário|agenda|agendar|marcar/.test(message)) return "book_appointment";
    if (/cancelar/.test(message)) return "cancel_appointment";
    if (/reagendar|remarcar/.test(message)) return "reschedule_appointment";
    if (/barbeiro|profissional/.test(message)) return "ask_professional";
    if (/foto|imagens|portfólio/.test(message)) return "show_photos";

    return "smalltalk";
}
