
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";

import Administrador from "./Pages/Administrador/Administrador.jsx";
import Inicio from "./Pages/Inicio/Inicio.jsx";
import Login from "./Pages/Login/Login.jsx";
import Pedidos from "./Pages/Pedidos/Pedidos.jsx";
import Cliente from "./Pages/Cliente/Cliente.jsx";
import Recepcionista from "./Pages/Recepcionista/Recepcionista.jsx";
import Repartidor from "./Pages/Repartidor/repartidor.jsx";

import { permisos } from "./Usuarios.jsx";

import "./App.css";

function MainLayout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  const sesion = localStorage.getItem("usuario");

  if (!hideNavbar && !sesion) {
    return <Navigate to="/" replace />;
  }

  if (!hideNavbar && sesion) {
    let usuario;

    try {
      usuario = JSON.parse(sesion);
    } catch {
      localStorage.removeItem("usuario");
      return <Navigate to="/" replace />;
    }

    const rutasPermitidas = permisos[usuario.rol] || [];

    if (!rutasPermitidas.includes(location.pathname)) {
      return (
        <Navigate
          to={rutasPermitidas[0] || "/"}
          replace
        />
      );
    }
  }

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/inicio" element={<Inicio />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/recepcionista" element={<Recepcionista />} />
        <Route path="/repartidor" element={<Repartidor />} />

        <Route path="*" element={<Navigate to="/" replace />} />
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
