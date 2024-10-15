import React, { useState } from "react";
import "./App.css";
import ReservaForm from "./components/ReservaForm";
import ReservaList from "./components/ReservaList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleReservaCriada = () => {
    setRefresh(!refresh); 
  };

  return (
    <div className="App">
      <h1>Sistema de Reservas de Restaurante</h1>
      <ReservaForm onReservaCriada={handleReservaCriada} />
      <ReservaList key={refresh} />
    </div>
  );
}

export default App;
