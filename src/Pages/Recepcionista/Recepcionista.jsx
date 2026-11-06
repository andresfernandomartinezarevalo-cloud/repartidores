import { useState } from "react";
import "./Recepcionista.css";

function Recepcionista() {
  // Campos del formulario
  const [Nrepartidor, setNrepartidor] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedido, setpedido] = useState("");

  // Lista de Recepcionistas y control de edición
  const [Recepcionistas, setRecepcionistas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setNrepartidor("");
    setTelefono("");
    setpedido("");
    setEditandoId(null);
  };

  const guardarRecepcionista = () => {
    if (Nrepartidor.trim() === "" || telefono.trim() === "" || pedido.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId !== null) {
      // Modo edición: reemplaza los datos del Recepcionista seleccionado
      setRecepcionistas(
        Recepcionistas.map((c) =>
          c.id === editandoId ? { ...c, Nrepartidor, telefono, pedido } : c
        )
      );
    } else {
      // Modo nuevo: agrega un Recepcionista a la lista
      setRecepcionistas([...Recepcionistas, { id: Date.now(), Nrepartidor, telefono, pedido }]);
    }

    limpiarFormulario();
  };

  // Carga los datos del Recepcionista en el formulario para modificarlos
  const editarRecepcionista = (c) => {
    setNrepartidor(c.Nrepartidor);
    setTelefono(c.telefono);
    setpedido(c.pedido);
    setEditandoId(c.id);
  };

  const eliminarRecepcionista = (id) => {
    setRecepcionistas(Recepcionistas.filter((c) => c.id !== id));
    // Si se elimina el que se estaba editando, se limpia el formulario
    if (id === editandoId) limpiarFormulario();
  };

  return (
    <div className="Recepcionistas-contenido">
      <h1>Gestión de Recepcionistas</h1>

      <div className="Recepcionistas-formulario">
        <input
          type="text"
          placeholder="Nrepartidor"
          value={Nrepartidor}
          onChange={(e) => setNrepartidor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="pedido"
          value={pedido}
          onChange={(e) => setpedido(e.target.value)}
        />

        <button onClick={guardarRecepcionista}>
          {editandoId !== null ? "Actualizar" : "Guardar"}
        </button>

        {editandoId !== null && (
          <button className="Recepcionistas-cancelar" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </div>

      <h2>Lista de Recepcionistas</h2>

      <table className="Recepcionistas-tabla">
        <thead>
          <tr>
            <th>Nrepartidor</th>
            <th>Teléfono</th>
            <th>pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Recepcionistas.length === 0 ? (
            <tr>
              <td colSpan="4">No hay Recepcionistas registrados</td>
            </tr>
          ) : (
            Recepcionistas.map((c) => (
              <tr key={c.id}>
                <td>{c.Nrepartidor}</td>
                <td>{c.telefono}</td>
                <td>{c.pedido}</td>
                <td>
                  <button
                    className="Recepcionistas-editar"
                    onClick={() => editarRecepcionista(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="Recepcionistas-eliminar"
                    onClick={() => eliminarRecepcionista(c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Recepcionista;