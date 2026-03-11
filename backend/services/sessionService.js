// @ts-nocheck

const sessions = {};

export function getSession(sessionId = "default") {
    if (!sessions[sessionId]) {
        sessions[sessionId] = {
            nome: null,
            servico: null,
            data: null,
            horario: null,
            profissional: null,
            etapa: "inicio"
        };
    }

    return sessions[sessionId];
}

export function updateSession(sessionId, data) {
    sessions[sessionId] = {
        ...sessions[sessionId],
        ...data
    };
}

export function clearSession(sessionId) {
    delete sessions[sessionId];
}
