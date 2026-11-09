
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

    const username = formulario.get("username");
    const password = formulario.get("password");

    const usuarioEncontrado = usuarios.find(
      (user) =>
        user.usuario === username &&
        user.password === password
    );

    if (usuarioEncontrado) {
      const usuarioSesion = {
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol
      };

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioSesion)
      );

      const primeraRuta = permisos[usuarioEncontrado.rol][0];

      navigate(primeraRuta);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar sesión</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">Usuario</label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Ingresa tu usuario"
            required
          />

          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
            required
          />

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
