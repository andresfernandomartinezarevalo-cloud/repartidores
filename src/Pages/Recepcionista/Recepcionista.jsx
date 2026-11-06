import { useState } from "react";
import "./Recepcionista.css";

function Recepcionista() {
  // Campos del formulario
  const [Nrepartidor, setNrepartidor] = useState("");
  const [Ncliente, setNcliente] = useState("");
  const [estado, setEstado] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedido, setPedido] = useState("");

  // Lista de Recepcionistas y control de edición
  const [Recepcionistas, setRecepcionistas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setNrepartidor("");
    setNcliente("");
    setEstado("");
    setTelefono("");
    setPedido("");
    setEditandoId(null);
  };

  const guardarRecepcionista = () => {
    if (
      Nrepartidor.trim() === "" ||
      Ncliente.trim() === "" ||
      estado === "" ||
      telefono.trim() === "" ||
      pedido.trim() === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId !== null) {
      // Modo edición: reemplaza los datos del registro seleccionado
      setRecepcionistas(
        Recepcionistas.map((c) =>
          c.id === editandoId
            ? { ...c, Nrepartidor, Ncliente, estado, telefono, pedido }
            : c
        )
      );
    } else {
      // Modo nuevo: agrega un registro a la lista
      setRecepcionistas([
        ...Recepcionistas,
        { id: Date.now(), Nrepartidor, Ncliente, estado, telefono, pedido },
      ]);
    }

    limpiarFormulario();
  };

  // Carga los datos del registro en el formulario para modificarlos
  const editarRecepcionista = (c) => {
    setNrepartidor(c.Nrepartidor);
    setNcliente(c.Ncliente);
    setEstado(c.estado);
    setTelefono(c.telefono);
    setPedido(c.pedido);
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
          placeholder="Nombre del repartidor"
          value={Nrepartidor}
          onChange={(e) => setNrepartidor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={Ncliente}
          onChange={(e) => setNcliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pedido"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Estado del pedido</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En camino">En camino</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>

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
            <th>Repartidor</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Pedido</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Recepcionistas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay registros</td>
            </tr>
          ) : (
            Recepcionistas.map((c) => (
              <tr key={c.id}>
                <td>{c.Nrepartidor}</td>
                <td>{c.Ncliente}</td>
                <td>{c.telefono}</td>
                <td>{c.pedido}</td>
                <td>{c.estado}</td>
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