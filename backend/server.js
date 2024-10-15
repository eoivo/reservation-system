// Importar dependências
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicializar a aplicação Express
const app = express();

// Middlewares
app.use(cors()); // Permitir que o front-end aceda ao back-end
app.use(express.json()); // Permitir que o corpo das requisições seja em JSON

// Conexão à base de dados MongoDB
mongoose
  .connect("mongodb://localhost:27017/reservas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Modelo de Reserva (Mongoose)
const ReservaSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  telefone: { type: String, required: true },
  dataReserva: { type: Date, required: true },
  numeroPessoas: { type: Number, required: true },
  restaurante: { type: String, required: true },
  status: { type: String, default: "pendente" }, // Status: pendente, confirmada, cancelada
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

// Rotas da API

// Rota para criar uma nova reserva
app.post("/reservas", async (req, res) => {
  try {
    const novaReserva = new Reserva(req.body);
    const reserva = await novaReserva.save();
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar reserva", err });
  }
});

// Rota para listar todas as reservas
app.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter reservas", err });
  }
});

// Rota para cancelar uma reserva
app.delete("/reservas/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva não encontrada" });
    }
    res.status(200).json({ message: "Reserva cancelada" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cancelar reserva", err });
  }
});

// Iniciar o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
