import { useState } from "react";
import { usePedidos } from "../../context/PedidosContext.jsx";
import { obtenerPermisosCrud, obtenerUsuarioActual } from "../../Usuarios.jsx";
import "./Cliente.css";

function Cliente() {
  const usuario = obtenerUsuarioActual();
  const permisos = obtenerPermisosCrud("cliente");
  const { pedidos, crearPedido } = usePedidos();

  // ─── Campos del formulario para agendar ───
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nota, setNota] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const limpiarFormulario = () => {
    setProducto("");
    setCantidad(1);
    setDireccion("");
    setTelefono("");
    setNota("");
  };

  const handleAgendar = (e) => {
    e.preventDefault();

    if (!permisos.crear) {
      alert("No tienes permiso para agendar productos.");
      return;
    }

    if (
      producto.trim() === "" ||
      direccion.trim() === "" ||
      telefono.trim() === ""
    ) {
      alert("El producto, dirección y teléfono son obligatorios");
      return;
    }

    crearPedido({
      producto,
      cantidad,
      direccion,
      telefono,
      nota,
      cliente: usuario?.usuario || "cliente1",
    });

    limpiarFormulario();
    setMensajeExito("Pedido agendado exitosamente. Se ha registrado en la cola de cocina y recepción.");
    setTimeout(() => setMensajeExito(""), 4000);
  };

  // ─── Filtrar: el cliente solo ve los productos que él ha adquirido ───
  const misPedidos = pedidos.filter((p) => p.cliente === usuario?.usuario);

  return (
    <div className="clientes-pagina">
      <div className="clientes-contenido">
        <header className="seccion-header">
          <div className="header-info">
            <h1>Mis Productos Adquiridos</h1>
            <p className="seccion-subtitulo">
              Gestiona tus solicitudes de pedidos y supervisa en tiempo real el estado de entrega.
            </p>
          </div>
          <div className="header-badge-area">
            <span className="badge-sesion-usuario">Usuario: <strong>{usuario?.usuario}</strong></span>
            <span className="badge-rol-usuario">{usuario?.rol}</span>
          </div>
        </header>

        {/* ─── Mensaje de confirmación ─── */}
        {mensajeExito && (
          <div className="alerta-notificacion-exito">
            {mensajeExito}
          </div>
        )}

        {/* ─── Formulario para agendar (solo crear, no editar ni eliminar) ─── */}
        {permisos.crear && (
          <section className="card-panel">
            <div className="card-panel-header">
              <h2>Agendar Nuevo Pedido</h2>
              <span className="card-panel-sub">Ingresa los detalles para la preparación y despacho</span>
            </div>

            <form className="formulario-grid" onSubmit={handleAgendar}>
              <div className="campo-form ancho-completo">
                <label htmlFor="producto">Producto o Combo</label>
                <input
                  id="producto"
                  type="text"
                  placeholder="Ej: Combo 2 Hamburguesas Especiales + Papas Rústicas"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  required
                />
              </div>

              <div className="campo-form">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                  required
                />
              </div>

              <div className="campo-form">
                <label htmlFor="telefono">Teléfono de Contacto</label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="Ej: 3001234567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="campo-form ancho-completo">
                <label htmlFor="direccion">Dirección de Entrega</label>
                <input
                  id="direccion"
                  type="text"
                  placeholder="Calle, número, apartamento o punto de referencia"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>

              <div className="campo-form ancho-completo">
                <label htmlFor="nota">Instrucciones Especiales (Opcional)</label>
                <input
                  id="nota"
                  type="text"
                  placeholder="Ej: Sin cebolla, salsa extra, timbrar en el apto 201"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                />
              </div>

              <div className="form-acciones ancho-completo">
                <button type="submit" className="btn-primario-accion">
                  Agendar Pedido
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ─── Lista de productos adquiridos ─── */}
        <section className="card-panel">
          <div className="card-panel-header">
            <h2>Historial de Pedidos Realizados ({misPedidos.length})</h2>
            <span className="card-panel-sub">Seguimiento en vivo desde la cocina hasta tu domicilio</span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Producto Adquirido</th>
                  <th>Cant.</th>
                  <th>Dirección de Entrega</th>
                  <th>Teléfono</th>
                  <th>Instrucciones</th>
                  <th>Fecha y Hora</th>
                  <th>Estado del Pedido</th>
                  <th>Repartidor</th>
                </tr>
              </thead>
              <tbody>
                {misPedidos.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="celda-vacia">
                      No tienes pedidos registrados actualmente. Utiliza el formulario superior para agendar tu primera orden.
                    </td>
                  </tr>
                ) : (
                  misPedidos.map((p) => (
                    <tr key={p.id}>
                      <td className="celda-codigo">#{p.id}</td>
                      <td className="celda-principal">{p.producto}</td>
                      <td className="celda-centrada">{p.cantidad}</td>
                      <td>{p.direccion}</td>
                      <td>{p.telefono}</td>
                      <td className="celda-nota">{p.nota || "Sin especificaciones"}</td>
                      <td className="celda-centrada">
                        {p.fecha} {p.hora ? `(${p.hora})` : ""}
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
                          <span className="badge-en-espera">En asignación</span>
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

export default Cliente;
