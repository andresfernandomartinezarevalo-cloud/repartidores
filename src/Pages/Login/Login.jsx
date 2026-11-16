import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usuarios, permisos } from "../../Usuarios.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const formulario = new FormData(event.target);
    const username = formulario.get("username")?.trim();
    const password = formulario.get("password")?.trim();

    const usuarioEncontrado = usuarios.find(
      (user) =>
        user.usuario.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );

    if (usuarioEncontrado) {
      const usuarioSesion = {
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioSesion));

      const primeraRuta = permisos[usuarioEncontrado.rol]?.[0] || "/inicio";
      navigate(primeraRuta);
    } else {
      setError("Usuario o contraseña incorrectos. Verifique sus credenciales.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <span className="login-brand">Fast<span className="brand-accent">Foot</span></span>
          <h1>Iniciar sesión</h1>
          <p className="login-subtitle">Sistema de Gestión de Pedidos y Delivery</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <div className="login-error-alert" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn-login-submit">
            Ingresar al Sistema
          </button>
        </form>

        <div className="login-footer-info">
          <p className="credenciales-titulo">Cuentas de prueba disponibles:</p>
          <div className="credenciales-grid">
            <div><strong>admin</strong> / admin123</div>
            <div><strong>recepcion1</strong> / recepcion123</div>
            <div><strong>repartidor1</strong> / repartidor123</div>
            <div><strong>cliente1</strong> / cliente123</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
