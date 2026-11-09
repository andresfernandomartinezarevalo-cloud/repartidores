import { useState } from "react";
import "./Recepcionista.css";

function Recepcionista() {
  // Campos del formulario
  const [NRecepcionista, setNRecepcionista] = useState("");
  const [Ncliente, setNcliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedido, setPedido] = useState("");

  // Lista de Recepcionistas y control de edición
  const [Recepcionistas, setRecepcionistas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setNRecepcionista("");
    setNcliente("");
    setTelefono("");
    setPedido("");
    setEditandoId(null);
  };

  const guardarRecepcionista = () => {
    if (
      NRecepcionista.trim() === "" ||
      Ncliente.trim() === "" ||
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
            ? { ...c, NRecepcionista, Ncliente, telefono, pedido }
            : c
        )
      );
    } else {
      // Modo nuevo: agrega un registro a la lista
      setRecepcionistas([
        ...Recepcionistas,
        { id: Date.now(), NRecepcionista, Ncliente, telefono, pedido },
      ]);
    }

    limpiarFormulario();
  };

  // Carga los datos del registro en el formulario para modificarlos
  const editarRecepcionista = (c) => {
    setNRecepcionista(c.NRecepcionista);
    setNcliente(c.Ncliente);
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
          placeholder="Nombre del Recepcionista"
          value={NRecepcionista}
          onChange={(e) => setNRecepcionista(e.target.value)}
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
            <th>Recepcionista</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Pedido</th>
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
                <td>{c.NRecepcionista}</td>
                <td>{c.Ncliente}</td>
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