import React, { useState } from "react";
import axios from "axios";
import "./styles/ReservaForm.css";

const ReservaForm = ({ onReservaCriada }) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [numeroPessoas, setNumeroPessoas] = useState("");
  const [restaurante, setRestaurante] = useState("");

  const formatarTelefone = (input) => {
    const apenasNumeros = input.replace(/\D/g, "");

    const ddd = apenasNumeros.slice(0, 2);
    const primeiroDigito = apenasNumeros.charAt(2);
    const numero = apenasNumeros.slice(3);

    if (numero.length <= 4) {
      return `(${ddd}) ${primeiroDigito} ${numero}`;
    }

    return `(${ddd}) ${primeiroDigito} ${numero.slice(0, 4)}-${numero.slice(
      4,
      8
    )}`;
  };

  const handleTelefoneChange = (e) => {
    const input = e.target.value;

    const cursorPosition = e.target.selectionStart;

    setTelefone(input);

    setTimeout(() => {
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleTelefoneBlur = (e) => {
    const telefoneFormatado = formatarTelefone(e.target.value);
    setTelefone(telefoneFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaReserva = {
      nomeCliente,
      telefone,
      dataReserva,
      numeroPessoas: parseInt(numeroPessoas),
      restaurante,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/reservas",
        novaReserva
      );
      console.log("Reserva criada:", response.data);
      onReservaCriada();
    } catch (error) {
      console.error("Erro ao criar reserva", error);
    }
  };

  return (
    <form className="reserva-form" onSubmit={handleSubmit}>
      <h2>Fazer Reserva</h2>
      <div>
        <label>Nome do Cliente:</label>
        <input
          type="text"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          placeholder="Ex: João Silva"
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={handleTelefoneChange}
          onBlur={handleTelefoneBlur}
          placeholder="Ex: (85) 9 9999-9999"
          required
        />
      </div>
      <div>
        <label>Data e Hora da Reserva:</label>
        <input
          type="datetime-local"
          value={dataReserva}
          onChange={(e) => setDataReserva(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Número de Pessoas:</label>
        <input
          type="number"
          value={numeroPessoas}
          onChange={(e) => setNumeroPessoas(e.target.value)}
          placeholder="Ex: 4"
          required
        />
      </div>
      <div>
        <label>Restaurante:</label>
        <input
          type="text"
          value={restaurante}
          onChange={(e) => setRestaurante(e.target.value)}
          placeholder="Ex: Restaurante Central"
          required
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservaForm;
