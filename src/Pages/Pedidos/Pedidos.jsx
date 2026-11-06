import { useState } from "react";
import "./Pedidos.css";

function Pedidos() {
  const [pedido, setpedido] = useState("");
  const [Cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const [Pedidos, setPedidos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setpedido("");
    setCliente("");
    setFecha("");
    setHora("");
    setMotivo("");
    setEditandoId(null);
  };

  const guardarpedido = () => {
    if (
      pedido.trim() === "" ||
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
        Pedidos.map((pedido) =>
          pedido.id === editandoId
            ? { ...pedido, pedido, Cliente, fecha, hora, motivo }
            : pedido
        )
      );
    } else {
      setPedidos([
        ...Pedidos,
        { id: Date.now(), pedido, Cliente, fecha, hora, motivo },
      ]);
    }

    limpiarFormulario();
  };

  const editarpedido = (pedido) => {
    setpedido(pedido.pedido);
    setCliente(pedido.Cliente);
    setFecha(pedido.fecha);
    setHora(pedido.hora);
    setMotivo(pedido.motivo);
    setEditandoId(pedido.id);
  };

  const eliminarpedido = (id) => {
    setPedidos(Pedidos.filter((pedido) => pedido.id !== id));
  };

  return (
    <div className="contenido">
      <h1>Gestión de Pedidos</h1>

      <div className="Pedidos-formulario">
        <input
          type="text"
          placeholder="pedido"
          value={pedido}
          onChange={(e) => setpedido(e.target.value)}
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
          placeholder="Motivo de la pedido"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <button onClick={guardarpedido}>
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
            <th>pedido</th>
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
            Pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.pedido}</td>
                <td>{pedido.Cliente}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.hora}</td>
                <td>{pedido.motivo}</td>
                <td>
                  <button
                    className="Pedidos-editar"
                    onClick={() => editarpedido(pedido)}
                  >
                    Editar
                  </button>
                  <button
                    className="Pedidos-eliminar"
                    onClick={() => eliminarpedido(pedido.id)}
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