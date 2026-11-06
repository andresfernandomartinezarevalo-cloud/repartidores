import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2>🐾 Veterinaria FOPARRA</h2>

      <ul>
        <li>
          <Link to="/inicio">Inicio</Link>
        </li>

        <li>
          <Link to="/propietarios">Propietarios</Link>
        </li>

        <li>
          <Link to="/mascotas">Mascotas</Link>
        </li>

        <li>
          <Link to="/citas">Citas</Link>
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
