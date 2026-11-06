import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate("/inicio");
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
            placeholder="Ingresa cualquier usuario"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Ingresa cualquier contraseña"
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;