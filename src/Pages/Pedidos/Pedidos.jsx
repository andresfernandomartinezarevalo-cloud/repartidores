import { useState } from "react";
import { usePedidos } from "../../context/PedidosContext.jsx";
import {
  obtenerPermisosCrud,
  obtenerUsuarioActual,
  obtenerRepartidores,
} from "../../Usuarios.jsx";
import "./Pedidos.css";

function Pedidos() {
  const usuario = obtenerUsuarioActual();
  const permisos = obtenerPermisosCrud("pedidos");
  const {
    pedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    cambiarEstado,
    asignarRepartidor,
  } = usePedidos();

  const repartidoresDisponibles = obtenerRepartidores();

  // ─── Campos del formulario ───
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cliente, setCliente] = useState(
    usuario?.rol === "cliente" ? usuario.usuario : ""
  );
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nota, setNota] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  const notificar = (msg) => {
    setMensajeNotificacion(msg);
    setTimeout(() => setMensajeNotificacion(""), 3500);
  };

  const limpiarFormulario = () => {
    setProducto("");
    setCantidad(1);
    setCliente(usuario?.rol === "cliente" ? usuario.usuario : "");
    setTelefono("");
    setDireccion("");
    setNota("");
    setEditandoId(null);
  };

  const handleGuardar = (e) => {
    e.preventDefault();

    if (!producto.trim() || !cliente.trim()) {
      alert("El producto y el cliente son obligatorios");
      return;
    }

    if (editandoId !== null) {
      if (!permisos.editar) {
        alert("No tienes permiso para editar pedidos");
        return;
      }
      actualizarPedido(editandoId, {
        producto,
        cantidad,
        cliente,
        telefono,
        direccion,
        nota,
      });
      notificar(`Pedido #${editandoId} actualizado correctamente`);
    } else {
      if (!permisos.crear) {
        alert("No tienes permiso para crear pedidos");
        return;
      }
      crearPedido({
        producto,
        cantidad,
        cliente,
        telefono,
        direccion,
        nota,
      });
      notificar("Pedido registrado exitosamente");
    }

    limpiarFormulario();
  };

  const handleEditar = (p) => {
    if (!permisos.editar) return;
    setProducto(p.producto);
    setCantidad(p.cantidad);
    setCliente(p.cliente);
    setTelefono(p.telefono || "");
    setDireccion(p.direccion || "");
    setNota(p.nota || "");
    setEditandoId(p.id);
  };

  const handleEliminar = (id) => {
    if (!permisos.eliminar) {
      alert("No tienes permiso para eliminar pedidos");
      return;
    }
    if (window.confirm(`¿Confirmas la eliminación del pedido #${id}?`)) {
      eliminarPedido(id);
      notificar(`Pedido #${id} eliminado`);
    }
  };

  // ─── Filtrar pedidos según rol RBAC ───
  const pedidosVisibles = pedidos.filter((p) => {
    if (!permisos.leer) return false;

    if (usuario?.rol === "cliente") {
      return p.cliente === usuario.usuario;
    }

    if (usuario?.rol === "repartidor") {
      return p.repartidorAsignado === usuario.usuario;
    }

    return true;
  });

  return (
    <div className="pedidos-pagina">
      <div className="pedidos-contenido">
        <header className="seccion-header">
          <div className="header-info">
            <h1>Gestión General de Pedidos</h1>
            <p className="seccion-subtitulo">
              Registro, supervisión y seguimiento del estado de los pedidos del restaurante.
            </p>
          </div>
          <div className="header-badge-area">
            <span className="badge-sesion-usuario">Usuario: <strong>{usuario?.usuario}</strong></span>
            <span className={`badge-rol-usuario role-${usuario?.rol}`}>{usuario?.rol}</span>
          </div>
        </header>

        {/* ─── Mensaje de notificación ─── */}
        {mensajeNotificacion && (
          <div className="alerta-notificacion-exito">
            {mensajeNotificacion}
          </div>
        )}

        {/* ─── Formulario: solo si tiene permiso de crear o editar ─── */}
        {(permisos.crear || (permisos.editar && editandoId)) && (
          <section className="card-panel">
            <div className="card-panel-header">
              <h2>{editandoId ? `Modificar Pedido #${editandoId}` : "Registrar Pedido"}</h2>
              <span className="card-panel-sub">Ingresa la información requerida para procesar la orden</span>
            </div>

            <form className="formulario-grid" onSubmit={handleGuardar}>
              <div className="campo-form ancho-completo">
                <label htmlFor="producto-pedidos">Producto o Combo</label>
                <input
                  id="producto-pedidos"
                  type="text"
                  placeholder="Descripción del producto o combo"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  required
                />
              </div>

              <div className="campo-form">
                <label htmlFor="cantidad-pedidos">Cantidad</label>
                <input
                  id="cantidad-pedidos"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  required
                />
              </div>

              <div className="campo-form">
                <label htmlFor="cliente-pedidos">Nombre del Cliente</label>
                <input
                  id="cliente-pedidos"
                  type="text"
                  placeholder="Usuario o nombre del cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  disabled={usuario?.rol === "cliente"}
                  required
                />
              </div>

              <div className="campo-form">
                <label htmlFor="tel-pedidos">Teléfono de Contacto</label>
                <input
                  id="tel-pedidos"
                  type="tel"
                  placeholder="Ej: 3001234567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="dir-pedidos">Dirección de Entrega</label>
                <input
                  id="dir-pedidos"
                  type="text"
                  placeholder="Dirección completa"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

              <div className="campo-form ancho-completo">
                <label htmlFor="nota-pedidos">Instrucciones o Notas</label>
                <input
                  id="nota-pedidos"
                  type="text"
                  placeholder="Detalles adicionales para la preparación"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                />
              </div>

              <div className="form-acciones ancho-completo">
                <button type="submit" className="btn-primario-accion">
                  {editandoId ? "Actualizar Pedido" : "Registrar Pedido"}
                </button>

                {editandoId && (
                  <button
                    type="button"
                    className="btn-secundario-neutro"
                    onClick={limpiarFormulario}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {/* ─── Tabla de Pedidos ─── */}
        <section className="card-panel">
          <div className="card-panel-header">
            <h2>Lista de Pedidos Registrados ({pedidosVisibles.length})</h2>
            <span className="card-panel-sub">Órdenes autorizadas para tu nivel de acceso</span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Fecha y Hora</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  {(permisos.editar ||
                    permisos.eliminar ||
                    permisos.ejecutar ||
                    permisos.asignar) && <th>Acciones Disponibles</th>}
                </tr>
              </thead>
              <tbody>
                {pedidosVisibles.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="celda-vacia">
                      {usuario?.rol === "repartidor"
                        ? "No tienes pedidos asignados actualmente."
                        : usuario?.rol === "cliente"
                        ? "No tienes productos adquiridos actualmente."
                        : "No hay pedidos registrados en el sistema."}
                    </td>
                  </tr>
                ) : (
                  pedidosVisibles.map((p) => (
                    <tr key={p.id}>
                      <td className="celda-codigo">#{p.id}</td>
                      <td className="celda-principal">{p.producto}</td>
                      <td className="celda-centrada">{p.cantidad}</td>
                      <td>{p.cliente}</td>
                      <td>{p.telefono || "—"}</td>
                      <td className="celda-direccion">{p.direccion || "—"}</td>
                      <td className="celda-centrada">
                        {p.fecha} <small>{p.hora ? `(${p.hora})` : ""}</small>
                      </td>
                      <td className="celda-centrada">
                        <span
                          className={`badge-estado estado-${p.estado
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td className="celda-centrada">
                        {p.repartidorAsignado ? (
                          <span className="badge-repartidor-asignado">
                            {p.repartidorAsignado}
                          </span>
                        ) : (
                          <span className="badge-en-espera">Sin asignar</span>
                        )}
                      </td>

                      {(permisos.editar ||
                        permisos.eliminar ||
                        permisos.ejecutar ||
                        permisos.asignar) && (
                        <td className="celda-acciones">
                          <div className="fila-botones-gestion">
                            {/* Editar (Admin) */}
                            {permisos.editar && (
                              <button
                                type="button"
                                className="btn-accion-editar"
                                onClick={() => handleEditar(p)}
                              >
                                Editar
                              </button>
                            )}

                            {/* Eliminar (Admin) */}
                            {permisos.eliminar && (
                              <button
                                type="button"
                                className="btn-accion-borrar"
                                onClick={() => handleEliminar(p.id)}
                              >
                                Eliminar
                              </button>
                            )}

                            {/* Ejecutar Recepcionista y Admin */}
                            {permisos.ejecutar &&
                              usuario?.rol !== "repartidor" &&
                              p.estado !== "Entregado" &&
                              p.estado !== "Cancelado" && (
                                <>
                                  {p.estado === "Agendado" && (
                                    <button
                                      type="button"
                                      className="btn-flujo-preparar"
                                      onClick={() => {
                                        cambiarEstado(p.id, "En preparación");
                                        notificar(`Pedido #${p.id} en preparación`);
                                      }}
                                    >
                                      Preparar
                                    </button>
                                  )}
                                  {p.estado === "En preparación" && (
                                    <button
                                      type="button"
                                      className="btn-flujo-listo"
                                      onClick={() => {
                                        cambiarEstado(p.id, "Listo para enviar");
                                        notificar(`Pedido #${p.id} listo para despacho`);
                                      }}
                                    >
                                      Listo
                                    </button>
                                  )}
                                </>
                              )}

                            {/* Ejecutar Repartidor */}
                            {permisos.ejecutar &&
                              usuario?.rol === "repartidor" &&
                              p.estado !== "Entregado" &&
                              p.estado !== "Cancelado" && (
                                <>
                                  {p.estado !== "En camino" && (
                                    <button
                                      type="button"
                                      className="btn-repartidor-encamino"
                                      onClick={() => {
                                        cambiarEstado(p.id, "En camino");
                                        notificar(`Pedido #${p.id} en camino`);
                                      }}
                                    >
                                      En camino
                                    </button>
                                  )}
                                  {p.estado === "En camino" && (
                                    <button
                                      type="button"
                                      className="btn-repartidor-entregado"
                                      onClick={() => {
                                        cambiarEstado(p.id, "Entregado");
                                        notificar(`Pedido #${p.id} entregado`);
                                      }}
                                    >
                                      Entregado
                                    </button>
                                  )}
                                </>
                              )}

                            {/* Asignar Repartidor */}
                            {permisos.asignar &&
                              p.estado !== "Entregado" &&
                              p.estado !== "Cancelado" && (
                                <select
                                  className="select-tabla-accion"
                                  value={p.repartidorAsignado || ""}
                                  onChange={(e) => {
                                    asignarRepartidor(p.id, e.target.value);
                                    notificar(`Pedido #${p.id} asignado a ${e.target.value || "nadie"}`);
                                  }}
                                >
                                  <option value="">Asignar</option>
                                  {repartidoresDisponibles.map((r) => (
                                    <option key={r.usuario} value={r.usuario}>
                                      {r.usuario}
                                    </option>
                                  ))}
                                </select>
                              )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Pedidos;
