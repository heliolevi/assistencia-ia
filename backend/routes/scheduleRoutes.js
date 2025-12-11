import { Router } from "express";
import {
    createAppointment,
    listAppointments,
    getFreeHours,
    cancelAppointment
} from "../services/scheduleService.js";

const router = Router();

// Listar horários disponíveis de uma data
router.get("/horarios/:date", (req, res) => {
    const available = getFreeHours(req.params.date);
    res.json({ available });
});

// Criar agendamento
router.post("/agendar", (req, res) => {
    const { clientName, serviceName, date, hour } = req.body;

    if (!clientName || !serviceName || !date || !hour) {
        return res.status(400).json({ error: "Dados incompletos." });
    }

    const result = createAppointment(clientName, serviceName, date, hour);

    if (result.error) return res.status(400).json(result);
    res.json(result);
});

// Cancelar agendamento
router.delete("/cancelar/:id", (req, res) => {
    const result = cancelAppointment(parseInt(req.params.id));

    if (result.error) return res.status(400).json(result);
    res.json(result);
});

// Listar todos os agendamentos
router.get("/agendamentos", (req, res) => {
    res.json(listAppointments());
});

export default router;
