import { useState } from "react";
import { usePedidos } from "../../context/PedidosContext.jsx";
import {
  obtenerPermisosCrud,
  obtenerUsuarioActual,
  obtenerRepartidores,
} from "../../Usuarios.jsx";
import "./Recepcionista.css";

function Recepcionista() {
  const usuario = obtenerUsuarioActual();
  const permisos = obtenerPermisosCrud("recepcionista");
  const { pedidos, cambiarEstado, asignarRepartidor } = usePedidos();
  const repartidoresDisponibles = obtenerRepartidores();

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mensajeAccion, setMensajeAccion] = useState("");

  const mostrarNotificacion = (texto) => {
    setMensajeAccion(texto);
    setTimeout(() => setMensajeAccion(""), 3500);
  };

  // ─── Ejecutar: cambiar estado del pedido en cocina/recepción ───
  const handleCambiarEstado = (id, nuevoEstado) => {
    if (!permisos.ejecutar) {
      alert("No tienes permiso para ejecutar o cambiar el estado del pedido.");
      return;
    }
    cambiarEstado(id, nuevoEstado);
    mostrarNotificacion(`Pedido #${id} actualizado a "${nuevoEstado}"`);
  };

  // ─── Asignar pedido a un repartidor ───
  const handleAsignarRepartidor = (id, nombreRepartidor) => {
    if (!permisos.asignar) {
      alert("No tienes permiso para asignar repartidores.");
      return;
    }
    asignarRepartidor(id, nombreRepartidor);
    if (nombreRepartidor) {
      mostrarNotificacion(`Pedido #${id} asignado a ${nombreRepartidor}`);
    } else {
      mostrarNotificacion(`Pedido #${id} quedó sin repartidor asignado`);
    }
  };

  // ─── Filtrar pedidos ───
  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstado === "todos") return true;
    return p.estado.toLowerCase() === filtroEstado.toLowerCase();
  });

  // Métricas
  const conteoAgendados = pedidos.filter((p) => p.estado === "Agendado").length;
  const conteoPreparacion = pedidos.filter((p) => p.estado === "En preparación").length;
  const conteoAsignados = pedidos.filter((p) => p.repartidorAsignado !== null).length;

  return (
    <div className="recepcion-pagina">
      <div className="recepcion-contenido">
        <header className="seccion-header">
          <div className="header-info">
            <h1>Módulo de Recepción y Despacho</h1>
            <p className="seccion-subtitulo">
              Supervisión de pedidos de clientes, control de preparación en cocina y asignación de repartidores.
            </p>
          </div>
          <div className="header-badge-area">
            <span className="badge-sesion-usuario">Operador: <strong>{usuario?.usuario}</strong></span>
            <span className="badge-rol-usuario">{usuario?.rol}</span>
          </div>
        </header>

        {/* ─── Mensaje de notificación ─── */}
        {mensajeAccion && (
          <div className="alerta-notificacion-exito">
            {mensajeAccion}
          </div>
        )}

        {/* ─── Métricas Resumen ─── */}
        <section className="metricas-panel-grid">
          <div className="metrica-bloque agendados">
            <span className="metrica-etiqueta">Por Procesar</span>
            <span className="metrica-valor">{conteoAgendados}</span>
            <span className="metrica-ayuda">En espera de cocina</span>
          </div>
          <div className="metrica-bloque preparacion">
            <span className="metrica-etiqueta">En Preparación</span>
            <span className="metrica-valor">{conteoPreparacion}</span>
            <span className="metrica-ayuda">En línea de cocina</span>
          </div>
          <div className="metrica-bloque asignados">
            <span className="metrica-etiqueta">Asignados</span>
            <span className="metrica-valor">{conteoAsignados}</span>
            <span className="metrica-ayuda">Repartidor asignado</span>
          </div>
          <div className="metrica-bloque total">
            <span className="metrica-etiqueta">Total en Sistema</span>
            <span className="metrica-valor">{pedidos.length}</span>
            <span className="metrica-ayuda">Historial completo</span>
          </div>
        </section>

        {/* ─── Tabla Principal de Gestión ─── */}
        <section className="card-panel">
          <div className="card-panel-header con-filtro">
            <div>
              <h2>Control de Pedidos de Clientes ({pedidosFiltrados.length})</h2>
              <span className="card-panel-sub">Ejecuta el flujo de cocina y asigna el repartidor correspondiente</span>
            </div>

            <div className="filtro-inline">
              <label htmlFor="filtro-estado-rec">Estado:</label>
              <select
                id="filtro-estado-rec"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los pedidos ({pedidos.length})</option>
                <option value="Agendado">Solo Agendados ({conteoAgendados})</option>
                <option value="En preparación">En preparación ({conteoPreparacion})</option>
                <option value="Listo para enviar">Listos para enviar</option>
                <option value="Asignado">Asignados</option>
                <option value="En camino">En camino</option>
                <option value="Entregado">Entregados</option>
              </select>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Producto Solicitado</th>
                  <th>Cant.</th>
                  <th>Instrucciones</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th>Ejecución de Flujo</th>
                  <th>Asignación de Repartidor</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="celda-vacia">
                      No existen pedidos registrados que coincidan con el filtro seleccionado.
                    </td>
                  </tr>
                ) : (
                  pedidosFiltrados.map((p) => (
                    <tr key={p.id}>
                      <td className="celda-codigo">#{p.id}</td>
                      <td className="celda-principal">{p.cliente}</td>
                      <td>{p.telefono || "Sin teléfono"}</td>
                      <td>{p.direccion || "Sin dirección"}</td>
                      <td className="celda-principal">{p.producto}</td>
                      <td className="celda-centrada">{p.cantidad}</td>
                      <td className="celda-nota">{p.nota || "Sin especificaciones"}</td>
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

                      {/* ─── Botones de Ejecutar Flujo ─── */}
                      <td className="celda-acciones">
                        {permisos.ejecutar && p.estado !== "Entregado" && p.estado !== "Cancelado" && (
                          <div className="acciones-botones-columna">
                            {p.estado === "Agendado" && (
                              <button
                                type="button"
                                className="btn-flujo-preparar"
                                onClick={() => handleCambiarEstado(p.id, "En preparación")}
                              >
                                Iniciar Preparación
                              </button>
                            )}

                            {p.estado === "En preparación" && (
                              <button
                                type="button"
                                className="btn-flujo-listo"
                                onClick={() => handleCambiarEstado(p.id, "Listo para enviar")}
                              >
                                Listo para Entrega
                              </button>
                            )}

                            <button
                              type="button"
                              className="btn-flujo-cancelar"
                              onClick={() => handleCambiarEstado(p.id, "Cancelado")}
                            >
                              Cancelar
                            </button>
                          </div>
                        )}

                        {p.estado === "Entregado" && (
                          <span className="estado-texto-completado">Completado</span>
                        )}

                        {p.estado === "Cancelado" && (
                          <span className="estado-texto-cancelado">Cancelado</span>
                        )}
                      </td>

                      {/* ─── Asignación de Repartidor ─── */}
                      <td className="celda-centrada">
                        {permisos.asignar && p.estado !== "Entregado" && p.estado !== "Cancelado" ? (
                          <select
                            className="select-asignacion-profesional"
                            value={p.repartidorAsignado || ""}
                            onChange={(e) => handleAsignarRepartidor(p.id, e.target.value)}
                          >
                            <option value="">Seleccionar Repartidor</option>
                            {repartidoresDisponibles.map((r) => (
                              <option key={r.usuario} value={r.usuario}>
                                {r.usuario}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="texto-muted">—</span>
                        )}
                      </td>
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

export default Recepcionista;
