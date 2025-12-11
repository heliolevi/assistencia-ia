import fs from "fs";
import path from "path";

const filePath = path.resolve("data/schedules.json");

function loadData() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function createAppointment(clientName, serviceName, date, hour) {
    const data = loadData();

    // verifica conflito
    const conflict = data.appointments.find(a => a.date === date && a.hour === hour);
    if (conflict) {
        return { error: "Horário já ocupado." };
    }

    const newAppt = { id: Date.now(), clientName, serviceName, date, hour };
    data.appointments.push(newAppt);
    saveData(data);
    return newAppt;
}

export function listAppointments() {
    return loadData().appointments;
}

export function getFreeHours(date) {
    const booked = loadData().appointments.filter(a => a.date === date).map(a => a.hour);

    const hours = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00"
    ];

    const available = hours.filter(h => !booked.includes(h));
    return available;
}

export function cancelAppointment(id) {
    const data = loadData();
    const index = data.appointments.findIndex(a => a.id === id);
    if (index === -1) return { error: "Agendamento não encontrado." };

    const removed = data.appointments.splice(index, 1);
    saveData(data);
    return removed[0];
}
