import { useState } from "react";
import "./Pedidos.css";

function Pedidos() {
  const [Pedido, setPedido] = useState("");
  const [Cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const [Pedidos, setPedidos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setPedido("");
    setCliente("");
    setFecha("");
    setHora("");
    setMotivo("");
    setEditandoId(null);
  };

  const guardarPedido = () => {
    if (
      Pedido.trim() === "" ||
      Cliente.trim() === "" ||
      fecha === "" ||
      hora === "" ||
      motivo.trim() === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId) {
      setPedidos(
        Pedidos.map((Pedido) =>
          Pedido.id === editandoId
            ? { ...Pedido, Pedido, Cliente, fecha, hora, motivo }
            : Pedido
        )
      );
    } else {
      setPedidos([
        ...Pedidos,
        { id: Date.now(), Pedido, Cliente, fecha, hora, motivo },
      ]);
    }

    limpiarFormulario();
  };

  const editarPedido = (Pedido) => {
    setPedido(Pedido.Pedido);
    setCliente(Pedido.Cliente);
    setFecha(Pedido.fecha);
    setHora(Pedido.hora);
    setMotivo(Pedido.motivo);
    setEditandoId(Pedido.id);
  };

  const eliminarPedido = (id) => {
    setPedidos(Pedidos.filter((Pedido) => Pedido.id !== id));
  };

  return (
    <div className="contenido">
      <h1>Gestión de Pedidos</h1>

      <div className="Pedidos-formulario">
        <input
          type="text"
          placeholder="Pedido"
          value={Pedido}
          onChange={(e) => setPedido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cliente"
          value={Cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <input
          type="text"
          placeholder="Motivo de la Pedido"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <button onClick={guardarPedido}>
          {editandoId ? "Actualizar" : "Agendar"}
        </button>

        {editandoId && (
          <button className="Pedidos-cancelar" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </div>

      <h2>Lista de Pedidos</h2>

      <table className="Pedidos-tabla">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Pedidos.length === 0 ? (
            <tr>
              <td colSpan="6">No hay Pedidos registradas</td>
            </tr>
          ) : (
            Pedidos.map((Pedido) => (
              <tr key={Pedido.id}>
                <td>{Pedido.Pedido}</td>
                <td>{Pedido.Cliente}</td>
                <td>{Pedido.fecha}</td>
                <td>{Pedido.hora}</td>
                <td>{Pedido.motivo}</td>
                <td>
                  <button
                    className="Pedidos-editar"
                    onClick={() => editarPedido(Pedido)}
                  >
                    Editar
                  </button>
                  <button
                    className="Pedidos-eliminar"
                    onClick={() => eliminarPedido(Pedido.id)}
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

export default Pedidos;