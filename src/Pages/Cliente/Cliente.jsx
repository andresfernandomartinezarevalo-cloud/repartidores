import { useState } from "react";
import "./Cliente.css";

function Cliente() {
  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedido, setpedido] = useState("");

  // Lista de clientes y control de edición
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setpedido("");
    setEditandoId(null);
  };

  const guardarCliente = () => {
    if (nombre.trim() === "" || telefono.trim() === "" || pedido.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId !== null) {
      // Modo edición: reemplaza los datos del cliente seleccionado
      setClientes(
        clientes.map((c) =>
          c.id === editandoId ? { ...c, nombre, telefono, pedido } : c
        )
      );
    } else {
      // Modo nuevo: agrega un cliente a la lista
      setClientes([...clientes, { id: Date.now(), nombre, telefono, pedido }]);
    }

    limpiarFormulario();
  };

  // Carga los datos del cliente en el formulario para modificarlos
  const editarCliente = (c) => {
    setNombre(c.nombre);
    setTelefono(c.telefono);
    setpedido(c.pedido);
    setEditandoId(c.id);
  };

  const eliminarCliente = (id) => {
    setClientes(clientes.filter((c) => c.id !== id));
    // Si se elimina el que se estaba editando, se limpia el formulario
    if (id === editandoId) limpiarFormulario();
  };

  return (
    <div className="clientes-contenido">
      <h1>Gestión de clientes</h1>

      <div className="clientes-formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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

        <button onClick={guardarCliente}>
          {editandoId !== null ? "Actualizar" : "Guardar"}
        </button>

        {editandoId !== null && (
          <button className="clientes-cancelar" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </div>

      <h2>Lista de clientes</h2>

      <table className="clientes-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="4">No hay clientes registrados</td>
            </tr>
          ) : (
            clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.pedido}</td>
                <td>
                  <button
                    className="clientes-editar"
                    onClick={() => editarCliente(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="clientes-eliminar"
                    onClick={() => eliminarCliente(c.id)}
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

export default Cliente;