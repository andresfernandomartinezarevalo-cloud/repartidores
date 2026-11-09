
import { Link, useNavigate } from "react-router-dom";
import { permisos } from "../../Usuarios.jsx";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const sesion = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  if (!sesion) {
    return null;
  }

const opciones = [
  { nombre: "Inicio", ruta: "/inicio" },
  { nombre: "Administrador", ruta: "/administrador" },
  { nombre: "Pedidos", ruta: "/pedidos" },
  { nombre: "Clientes", ruta: "/cliente" },
  { nombre: "Recepcionista", ruta: "/recepcionista" },
  { nombre: "Repartidor", ruta: "/repartidor" }
];

const rutasPermitidas = permisos[sesion.rol] || [];

const opcionesPermitidas = opciones.filter((opcion) =>
  rutasPermitidas.includes(opcion.ruta)
);

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <h2>FastFoot</h2>

      <ul>
        {opcionesPermitidas.map((opcion) => (
          <li key={opcion.ruta}>
            <Link to={opcion.ruta}>
              {opcion.nombre}
            </Link>
          </li>
        ))}
      </ul>

      <button
        className="navbar-logout"
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
