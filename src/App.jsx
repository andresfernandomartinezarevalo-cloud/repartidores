import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar/Navbar.jsx";

// Páginas
import Administrador from "./Pages/Administrador/Administrador.jsx";
import Inicio from "./Pages/Inicio/Inicio.jsx";
import Login from "./Pages/Login/Login.jsx";
import Pedidos from "./Pages/Pedidos/Pedidos.jsx";
import Cliente from "./Pages/Cliente/Cliente.jsx";
import Recepcionista from "./Pages/Recepcionista/Recepcionista.jsx";

import "./App.css";

function MainLayout() {
  const location = useLocation();
  
  // Si la ruta actual es la raíz ("/"), no mostramos el Navbar
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* La primera página al entrar */}
        <Route path="/" element={<Login />} />
  
        {/* Páginas principales de la veterinaria */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/recepcionista" element={<Recepcionista />} />
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