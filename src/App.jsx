import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";


import Administrador from "./Pages/Administrador/Administrador.jsx";
import Inicio from "./Pages/Inicio/Inicio.jsx";
import Login from "./Pages/Login/Login.jsx";
import Pedidos from "./Pages/Pedidos/Pedidos.jsx";
import Cliente from "./Pages/Cliente/Cliente.jsx";
import Recepcionista from "./Pages/Recepcionista/Recepcionista.jsx";
import Repartidor from "./Pages/Repartidor/Repartidor.jsx";

import "./App.css";

function MainLayout() {
  const location = useLocation();
  
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {}
        <Route path="/" element={<Login />} />
  
        {}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/recepcionista" element={<Recepcionista />} />
        <Route path="/repartidor" element={<Repartidor />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
