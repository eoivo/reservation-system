import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/ReservaList.css";

const ReservaList = () => {
  const [reservas, setReservas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao obter reservas", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (id) => {
    const confirmCancel = window.confirm(
      "Tem certeza que deseja cancelar esta reserva?"
    );
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:5000/reservas/${id}`);
      alert("Reserva cancelada com sucesso");
      fetchReservas();
    } catch (error) {
      console.error("Erro ao cancelar reserva", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const filteredReservas = reservas.filter((reserva) =>
    reserva.nomeCliente.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Carregando reservas...</p>;
  }

  return (
    <div className="reserva-list">
      <h2>Lista de Reservas</h2>
      <input
        type="text"
        placeholder="Buscar por nome do cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredReservas.map((reserva) => (
          <li key={reserva._id}>
            <p>
              <strong>Cliente:</strong> {reserva.nomeCliente}
            </p>
            <p>
              <strong>Telefone:</strong> {reserva.telefone}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(reserva.dataReserva).toLocaleString("pt-BR")}
            </p>
            <p>
              <strong>Pessoas:</strong> {reserva.numeroPessoas}
            </p>
            <p>
              <strong>Restaurante:</strong> {reserva.restaurante}
            </p>
            <button onClick={() => cancelarReserva(reserva._id)}>
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaList;
