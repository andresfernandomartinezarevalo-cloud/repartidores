import { Link, useNavigate, useLocation } from "react-router-dom";
import { permisos } from "../../Usuarios.jsx";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sesion = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  if (!sesion) {
    return null;
  }

  const opciones = [
    { nombre: "Inicio", ruta: "/inicio" },
    { nombre: "Administración", ruta: "/administrador" },
    { nombre: "Pedidos", ruta: "/pedidos" },
    { nombre: "Mis Pedidos", ruta: "/cliente" },
    { nombre: "Recepción", ruta: "/recepcionista" },
    { nombre: "Entregas", ruta: "/repartidor" },
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
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to={rutasPermitidas[0] || "/inicio"}>
            <span className="brand-logo-text">
              Fast<span className="brand-accent">Foot</span>
            </span>
          </Link>
        </div>

        <ul className="navbar-nav">
          {opcionesPermitidas.map((opcion) => {
            const esActivo = location.pathname === opcion.ruta;
            return (
              <li key={opcion.ruta} className="nav-item">
                <Link
                  to={opcion.ruta}
                  className={`nav-link ${esActivo ? "nav-link-activo" : ""}`}
                >
                  {opcion.nombre}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="navbar-user-area">
          <div className="user-profile-info">
            <span className="user-name">{sesion.usuario}</span>
            <span className={`user-role-badge role-${sesion.rol}`}>
              {sesion.rol}
            </span>
          </div>

          <button
            type="button"
            className="btn-logout"
            onClick={cerrarSesion}
            title="Cerrar sesión actual"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
