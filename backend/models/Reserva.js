const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  telefone: { type: String, required: true },
  dataReserva: { type: Date, required: true },
  numeroPessoas: { type: Number, required: true },
  restaurante: { type: String, required: true }, // Nome do restaurante
  status: { type: String, default: "pendente" }, // Status da reserva (pendente, confirmada, cancelada)
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

module.exports = Reserva;
