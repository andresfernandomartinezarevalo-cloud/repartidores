import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2>Comidad Rapidas</h2>

      <ul>
        <li>
          <Link to="/inicio">Inicio</Link>
        </li>

        <li>
          <Link to="/administrador">Administrador</Link>
        </li>

        <li>
          <Link to="/pedidos">Pedidos</Link>
        </li>

        <li>
          <Link to="/cliente">Clientes</Link>
        </li>

        <li>
          <Link to="/recepcionista">Recepcionista</Link>
        </li>
      </ul>

      <button
        className="navbar-logout"
        type="button"
        onClick={() => navigate("/")}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
