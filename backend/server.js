const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/reservas";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const ReservaSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  telefone: { type: String, required: true },
  dataReserva: { type: Date, required: true },
  numeroPessoas: { type: Number, required: true },
  restaurante: { type: String, required: true },
  status: { type: String, default: "pendente" },
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

app.post("/reservas", async (req, res) => {
  try {
    const novaReserva = new Reserva(req.body);
    const reserva = await novaReserva.save();
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar reserva", err });
  }
});

app.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter reservas", err });
  }
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
