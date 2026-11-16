import { useState } from "react";
import { usePedidos } from "../../context/PedidosContext.jsx";
import { obtenerPermisosCrud, obtenerUsuarioActual } from "../../Usuarios.jsx";
import "./Repartidor.css";

function Repartidor() {
  const usuario = obtenerUsuarioActual();
  const permisos = obtenerPermisosCrud("repartidor");
  const { pedidos, cambiarEstado } = usePedidos();

  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  const mostrarMensaje = (txt) => {
    setMensajeNotificacion(txt);
    setTimeout(() => setMensajeNotificacion(""), 3500);
  };

  // ─── Filtrar estrictamente: Solo pedidos asignados a ESTE repartidor ───
  const misEntregas = pedidos.filter(
    (p) => p.repartidorAsignado === usuario?.usuario
  );

  const entregasPendientes = misEntregas.filter(
    (p) => p.estado !== "Entregado" && p.estado !== "Cancelado"
  );
  const entregasRealizadas = misEntregas.filter(
    (p) => p.estado === "Entregado"
  );

  const handleMarcarEnCamino = (id) => {
    if (!permisos.ejecutar) {
      alert("No tienes permiso para actualizar este pedido.");
      return;
    }
    cambiarEstado(id, "En camino");
    mostrarMensaje(`Pedido #${id} actualizado a "En camino". Inicia el desplazamiento hacia el cliente.`);
  };

  const handleMarcarEntregado = (id) => {
    if (!permisos.ejecutar) {
      alert("No tienes permiso para actualizar este pedido.");
      return;
    }
    cambiarEstado(id, "Entregado");
    mostrarMensaje(`Pedido #${id} registrado como "Entregado" satisfactoriamente.`);
  };

  return (
    <div className="repartidor-pagina">
      <div className="repartidor-contenido">
        <header className="seccion-header">
          <div className="header-info">
            <h1>Panel de Entregas y Reparto</h1>
            <p className="seccion-subtitulo">
              Visualiza únicamente los pedidos asignados a tu ruta y actualiza el estado de cada entrega.
            </p>
          </div>
          <div className="header-badge-area">
            <span className="badge-sesion-usuario">Repartidor: <strong>{usuario?.usuario}</strong></span>
            <span className="badge-rol-usuario">{usuario?.rol}</span>
          </div>
        </header>

        {/* ─── Mensaje de notificación ─── */}
        {mensajeNotificacion && (
          <div className="alerta-notificacion-exito">
            {mensajeNotificacion}
          </div>
        )}

        {/* ─── Métricas del Repartidor ─── */}
        <section className="metricas-panel-grid">
          <div className="metrica-bloque agendados">
            <span className="metrica-etiqueta">Pendientes de Entrega</span>
            <span className="metrica-valor">{entregasPendientes.length}</span>
            <span className="metrica-ayuda">Por entregar en ruta</span>
          </div>
          <div className="metrica-bloque total">
            <span className="metrica-etiqueta">Entregas Completadas</span>
            <span className="metrica-valor">{entregasRealizadas.length}</span>
            <span className="metrica-ayuda">Finalizadas con éxito</span>
          </div>
          <div className="metrica-bloque asignados">
            <span className="metrica-etiqueta">Total Asignaciones</span>
            <span className="metrica-valor">{misEntregas.length}</span>
            <span className="metrica-ayuda">Historial personal</span>
          </div>
        </section>

        {/* ─── Tabla de entregas asignadas ─── */}
        <section className="card-panel">
          <div className="card-panel-header">
            <h2>Pedidos Asignados a mi Cargo ({misEntregas.length})</h2>
            <span className="card-panel-sub">Información de contacto del cliente, dirección exacta y despacho</span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Dirección de Entrega</th>
                  <th>Productos a Entregar</th>
                  <th>Cant.</th>
                  <th>Instrucciones / Notas</th>
                  <th>Estado Actual</th>
                  <th>Acción de Despacho</th>
                </tr>
              </thead>
              <tbody>
                {misEntregas.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="celda-vacia">
                      Actualmente no tienes pedidos asignados. Cuando recepción te asigne una orden, se reflejará automáticamente aquí.
                    </td>
                  </tr>
                ) : (
                  misEntregas.map((p) => (
                    <tr key={p.id}>
                      <td className="celda-codigo">#{p.id}</td>
                      <td className="celda-principal">{p.cliente}</td>
                      <td>
                        <a
                          href={`tel:${p.telefono}`}
                          className="link-telefono-profesional"
                          title="Llamar al cliente"
                        >
                          {p.telefono || "Sin teléfono"}
                        </a>
                      </td>
                      <td className="celda-direccion">
                        {p.direccion || "Dirección no especificada"}
                      </td>
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
                        {permisos.ejecutar && (
                          <div className="acciones-botones-columna">
                            {p.estado !== "En camino" && p.estado !== "Entregado" && (
                              <button
                                type="button"
                                className="btn-repartidor-encamino"
                                onClick={() => handleMarcarEnCamino(p.id)}
                              >
                                Iniciar Entrega (En camino)
                              </button>
                            )}

                            {p.estado === "En camino" && (
                              <button
                                type="button"
                                className="btn-repartidor-entregado"
                                onClick={() => handleMarcarEntregado(p.id)}
                              >
                                Confirmar Entrega Realizada
                              </button>
                            )}

                            {p.estado === "Entregado" && (
                              <span className="estado-texto-completado">
                                Entrega Completada
                              </span>
                            )}
                          </div>
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

export default Repartidor;
