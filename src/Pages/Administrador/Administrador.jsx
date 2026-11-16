import { useState, useEffect } from "react";
import { usePedidos } from "../../context/PedidosContext.jsx";
import {
  usuarios,
  obtenerUsuarioActual,
  obtenerRepartidores,
} from "../../Usuarios.jsx";
import "./Administrador.css";

const STORAGE_PERSONAL_KEY = "fastfoot_personal_v1";

const personalInicial = [
  { id: 1, nombre: "Carlos Méndez", cargo: "Gerente de Operaciones", telefono: "3001112233", correo: "carlos@fastfoot.com" },
  { id: 2, nombre: "Laura Gómez", cargo: "Jefa de Cocina", telefono: "3114445566", correo: "laura@fastfoot.com" },
  { id: 3, nombre: "María Recepción", cargo: "Supervisora de Despacho", telefono: "3207778899", correo: "recepcion@fastfoot.com" },
  { id: 4, nombre: "Juan Repartidor", cargo: "Repartidor Líder", telefono: "3159990011", correo: "juan@fastfoot.com" },
];

function Administrador() {
  const usuario = obtenerUsuarioActual();
  const {
    pedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    cambiarEstado,
    asignarRepartidor,
    reiniciarPedidos,
  } = usePedidos();

  const repartidoresDisponibles = obtenerRepartidores();

  // ─── Estado de Personal en localStorage ───
  const [personal, setPersonal] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_PERSONAL_KEY);
      if (guardado) return JSON.parse(guardado);
    } catch (e) {
      console.error("Error al leer personal de localStorage:", e);
    }
    return personalInicial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PERSONAL_KEY, JSON.stringify(personal));
    } catch (e) {
      console.error("Error al guardar personal en localStorage:", e);
    }
  }, [personal]);

  // Formulario de personal
  const [nombrePersonal, setNombrePersonal] = useState("");
  const [cargoPersonal, setCargoPersonal] = useState("");
  const [telefonoPersonal, setTelefonoPersonal] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [editandoPersonalId, setEditandoPersonalId] = useState(null);

  // Formulario / Modal de Pedido Administrador
  const [mostrarModalPedido, setMostrarModalPedido] = useState(false);
  const [pedidoEditandoId, setPedidoEditandoId] = useState(null);
  const [formPedido, setFormPedido] = useState({
    producto: "",
    cantidad: 1,
    cliente: "",
    telefono: "",
    direccion: "",
    nota: "",
    estado: "Agendado",
    repartidorAsignado: "",
  });

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");

  const notificar = (msg) => {
    setMensajeNotificacion(msg);
    setTimeout(() => setMensajeNotificacion(""), 3500);
  };

  // ─── Handlers de Personal ───
  const limpiarFormPersonal = () => {
    setNombrePersonal("");
    setCargoPersonal("");
    setTelefonoPersonal("");
    setCorreoPersonal("");
    setEditandoPersonalId(null);
  };

  const guardarPersonal = (e) => {
    e.preventDefault();
    if (
      nombrePersonal.trim() === "" ||
      telefonoPersonal.trim() === "" ||
      correoPersonal.trim() === ""
    ) {
      alert("Nombre, teléfono y correo son obligatorios");
      return;
    }

    if (editandoPersonalId !== null) {
      setPersonal((prev) =>
        prev.map((p) =>
          p.id === editandoPersonalId
            ? {
                ...p,
                nombre: nombrePersonal,
                cargo: cargoPersonal || "Personal",
                telefono: telefonoPersonal,
                correo: correoPersonal,
              }
            : p
        )
      );
      notificar("Registro de personal actualizado exitosamente");
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: nombrePersonal,
        cargo: cargoPersonal || "Personal",
        telefono: telefonoPersonal,
        correo: correoPersonal,
      };
      setPersonal((prev) => [nuevo, ...prev]);
      notificar("Nuevo miembro de personal registrado exitosamente");
    }

    limpiarFormPersonal();
  };

  const editarPersonal = (item) => {
    setNombrePersonal(item.nombre);
    setCargoPersonal(item.cargo || "");
    setTelefonoPersonal(item.telefono);
    setCorreoPersonal(item.correo);
    setEditandoPersonalId(item.id);
  };

  const borrarPersonal = (id) => {
    if (window.confirm("¿Confirmas la eliminación de este registro de personal?")) {
      setPersonal((prev) => prev.filter((p) => p.id !== id));
      if (editandoPersonalId === id) limpiarFormPersonal();
      notificar("Registro de personal eliminado");
    }
  };

  // ─── Handlers de Pedidos (Administrador) ───
  const abrirCrearPedido = () => {
    setPedidoEditandoId(null);
    setFormPedido({
      producto: "",
      cantidad: 1,
      cliente: "cliente1",
      telefono: "3001234567",
      direccion: "Calle 100 # 15-20",
      nota: "",
      estado: "Agendado",
      repartidorAsignado: "",
    });
    setMostrarModalPedido(true);
  };

  const abrirEditarPedido = (p) => {
    setPedidoEditandoId(p.id);
    setFormPedido({
      producto: p.producto,
      cantidad: p.cantidad,
      cliente: p.cliente,
      telefono: p.telefono,
      direccion: p.direccion,
      nota: p.nota || "",
      estado: p.estado,
      repartidorAsignado: p.repartidorAsignado || "",
    });
    setMostrarModalPedido(true);
  };

  const guardarPedidoAdmin = (e) => {
    e.preventDefault();
    if (!formPedido.producto.trim() || !formPedido.cliente.trim()) {
      alert("El producto y el cliente son requeridos");
      return;
    }

    if (pedidoEditandoId !== null) {
      actualizarPedido(pedidoEditandoId, {
        ...formPedido,
        repartidorAsignado: formPedido.repartidorAsignado || null,
      });
      notificar(`Pedido #${pedidoEditandoId} actualizado correctamente`);
    } else {
      crearPedido({
        ...formPedido,
      });
      notificar("Nuevo pedido creado en el sistema");
    }

    setMostrarModalPedido(false);
  };

  const borrarPedidoAdmin = (id) => {
    if (window.confirm(`¿Confirmas la eliminación permanente del pedido #${id}?`)) {
      eliminarPedido(id);
      notificar(`Pedido #${id} eliminado definitivamente`);
    }
  };

  // Filtro
  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstado === "todos") return true;
    return p.estado.toLowerCase() === filtroEstado.toLowerCase();
  });

  const conteo = {
    total: pedidos.length,
    agendados: pedidos.filter((p) => p.estado === "Agendado").length,
    preparacion: pedidos.filter((p) => p.estado === "En preparación").length,
    camino: pedidos.filter((p) => p.estado === "En camino").length,
    entregados: pedidos.filter((p) => p.estado === "Entregado").length,
    cancelados: pedidos.filter((p) => p.estado === "Cancelado").length,
  };

  return (
    <div className="admin-pagina">
      <div className="admin-contenido">
        <header className="seccion-header">
          <div className="header-info">
            <h1>Panel de Control General y Supervisión</h1>
            <p className="seccion-subtitulo">
              Monitoreo integral del flujo de pedidos, reasignaciones operativas y gestión de personal.
            </p>
          </div>
          <div className="header-badge-area">
            <span className="badge-sesion-usuario">Administrador: <strong>{usuario?.usuario}</strong></span>
            <span className="badge-rol-admin">{usuario?.rol}</span>
          </div>
        </header>

        {/* ─── Mensaje de notificación ─── */}
        {mensajeNotificacion && (
          <div className="alerta-notificacion-exito">
            {mensajeNotificacion}
          </div>
        )}

        {/* ─── Dashboard de Métricas Globales ─── */}
        <section className="metricas-panel-grid admin-metricas">
          <div className="metrica-bloque total">
            <span className="metrica-etiqueta">Total Pedidos</span>
            <span className="metrica-valor">{conteo.total}</span>
            <span className="metrica-ayuda">Registros globales</span>
          </div>
          <div className="metrica-bloque agendados">
            <span className="metrica-etiqueta">Agendados</span>
            <span className="metrica-valor">{conteo.agendados}</span>
            <span className="metrica-ayuda">Pendientes de inicio</span>
          </div>
          <div className="metrica-bloque preparacion">
            <span className="metrica-etiqueta">En Cocina</span>
            <span className="metrica-valor">{conteo.preparacion}</span>
            <span className="metrica-ayuda">En preparación</span>
          </div>
          <div className="metrica-bloque camino">
            <span className="metrica-etiqueta">En Ruta</span>
            <span className="metrica-valor">{conteo.camino}</span>
            <span className="metrica-ayuda">Hacia el cliente</span>
          </div>
          <div className="metrica-bloque entregados">
            <span className="metrica-etiqueta">Entregados</span>
            <span className="metrica-valor">{conteo.entregados}</span>
            <span className="metrica-ayuda">Servicio completado</span>
          </div>
          <div className="metrica-bloque personal">
            <span className="metrica-etiqueta">Personal Activo</span>
            <span className="metrica-valor">{personal.length}</span>
            <span className="metrica-ayuda">Equipo registrado</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECCIÓN 1: SUPERVISIÓN Y CONTROL TOTAL DEL FLUJO DE PEDIDOS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="card-panel">
          <div className="card-panel-header con-filtro">
            <div>
              <h2>Flujo Completo de Pedidos del Restaurante</h2>
              <span className="card-panel-sub">
                Visualización y control de todos los estados en tiempo real con persistencia en almacenamiento local
              </span>
            </div>

            <div className="admin-herramientas-acciones">
              <div className="filtro-inline">
                <label htmlFor="filtro-admin">Filtrar por estado:</label>
                <select
                  id="filtro-admin"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="todos">Todos los pedidos ({conteo.total})</option>
                  <option value="Agendado">Agendados ({conteo.agendados})</option>
                  <option value="En preparación">En preparación ({conteo.preparacion})</option>
                  <option value="En camino">En camino ({conteo.camino})</option>
                  <option value="Entregado">Entregados ({conteo.entregados})</option>
                  <option value="Cancelado">Cancelados ({conteo.cancelados})</option>
                </select>
              </div>

              <button
                type="button"
                className="btn-primario-accion"
                onClick={abrirCrearPedido}
              >
                Nuevo Pedido
              </button>

              <button
                type="button"
                className="btn-secundario-neutro"
                onClick={() => {
                  if (window.confirm("¿Deseas restaurar la lista de pedidos a los datos iniciales de prueba?")) {
                    reiniciarPedidos();
                    notificar("Datos iniciales de prueba restaurados exitosamente");
                  }
                }}
                title="Restaura los pedidos semilla"
              >
                Restaurar Datos de Prueba
              </button>
            </div>
          </div>

          {/* Modal / Formulario Flotante para Crear o Editar Pedido */}
          {mostrarModalPedido && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="modal-contenedor">
                <div className="modal-header">
                  <h3>
                    {pedidoEditandoId ? `Modificar Pedido #${pedidoEditandoId}` : "Crear Pedido Manual"}
                  </h3>
                  <button
                    type="button"
                    className="btn-cerrar-modal"
                    onClick={() => setMostrarModalPedido(false)}
                    aria-label="Cerrar modal"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={guardarPedidoAdmin} className="modal-body-form">
                  <div className="campo-form ancho-completo">
                    <label>Descripción del Producto o Combo</label>
                    <input
                      type="text"
                      value={formPedido.producto}
                      onChange={(e) =>
                        setFormPedido({ ...formPedido, producto: e.target.value })
                      }
                      placeholder="Ej: Hamburguesa Doble Queso + Papas"
                      required
                    />
                  </div>

                  <div className="formulario-grid ancho-completo">
                    <div className="campo-form">
                      <label>Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        value={formPedido.cantidad}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, cantidad: Number(e.target.value) })
                        }
                        required
                      />
                    </div>

                    <div className="campo-form">
                      <label>Nombre / Usuario del Cliente</label>
                      <input
                        type="text"
                        value={formPedido.cliente}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, cliente: e.target.value })
                        }
                        placeholder="Ej: cliente1"
                        required
                      />
                    </div>

                    <div className="campo-form">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        value={formPedido.telefono}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, telefono: e.target.value })
                        }
                        placeholder="Ej: 3001234567"
                      />
                    </div>

                    <div className="campo-form">
                      <label>Dirección de Entrega</label>
                      <input
                        type="text"
                        value={formPedido.direccion}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, direccion: e.target.value })
                        }
                        placeholder="Dirección de entrega"
                      />
                    </div>

                    <div className="campo-form">
                      <label>Estado del Flujo</label>
                      <select
                        value={formPedido.estado}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, estado: e.target.value })
                        }
                      >
                        <option value="Agendado">Agendado</option>
                        <option value="En preparación">En preparación</option>
                        <option value="Listo para enviar">Listo para enviar</option>
                        <option value="Asignado">Asignado</option>
                        <option value="En camino">En camino</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>

                    <div className="campo-form">
                      <label>Repartidor Asignado</label>
                      <select
                        value={formPedido.repartidorAsignado}
                        onChange={(e) =>
                          setFormPedido({
                            ...formPedido,
                            repartidorAsignado: e.target.value,
                          })
                        }
                      >
                        <option value="">Sin asignar</option>
                        {repartidoresDisponibles.map((r) => (
                          <option key={r.usuario} value={r.usuario}>
                            {r.usuario}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="campo-form ancho-completo">
                      <label>Instrucciones Especiales</label>
                      <input
                        type="text"
                        value={formPedido.nota}
                        onChange={(e) =>
                          setFormPedido({ ...formPedido, nota: e.target.value })
                        }
                        placeholder="Notas u observaciones"
                      />
                    </div>
                  </div>

                  <div className="modal-footer-acciones">
                    <button
                      type="button"
                      className="btn-secundario-neutro"
                      onClick={() => setMostrarModalPedido(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primario-accion">
                      Guardar Pedido
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabla de todos los pedidos */}
          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Fecha/Hora</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th>Modificar Estado</th>
                  <th>Reasignar</th>
                  <th>Gestión</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="celda-vacia">
                      No existen pedidos registrados para el filtro actual.
                    </td>
                  </tr>
                ) : (
                  pedidosFiltrados.map((p) => (
                    <tr key={p.id}>
                      <td className="celda-codigo">#{p.id}</td>
                      <td className="celda-principal">{p.cliente}</td>
                      <td>{p.telefono || "—"}</td>
                      <td className="celda-direccion">{p.direccion || "—"}</td>
                      <td className="celda-principal">{p.producto}</td>
                      <td className="celda-centrada">{p.cantidad}</td>
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
                      <td>
                        <select
                          className="select-tabla-accion"
                          value={p.estado}
                          onChange={(e) => {
                            cambiarEstado(p.id, e.target.value);
                            notificar(`Estado de #${p.id} cambiado a "${e.target.value}"`);
                          }}
                        >
                          <option value="Agendado">Agendado</option>
                          <option value="En preparación">En preparación</option>
                          <option value="Listo para enviar">Listo para enviar</option>
                          <option value="Asignado">Asignado</option>
                          <option value="En camino">En camino</option>
                          <option value="Entregado">Entregado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className="select-tabla-accion"
                          value={p.repartidorAsignado || ""}
                          onChange={(e) => {
                            asignarRepartidor(p.id, e.target.value);
                            notificar(`Pedido #${p.id} asignado a ${e.target.value || "nadie"}`);
                          }}
                        >
                          <option value="">Sin repartidor</option>
                          {repartidoresDisponibles.map((r) => (
                            <option key={r.usuario} value={r.usuario}>
                              {r.usuario}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="celda-centrada">
                        <div className="fila-botones-gestion">
                          <button
                            type="button"
                            className="btn-accion-editar"
                            onClick={() => abrirEditarPedido(p)}
                            title="Editar datos de este pedido"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn-accion-borrar"
                            onClick={() => borrarPedidoAdmin(p.id)}
                            title="Eliminar permanentemente"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECCIÓN 2: GESTIÓN DE PERSONAL (Persistencia en localStorage)
        ══════════════════════════════════════════════════════════════════ */}
        <section className="card-panel">
          <div className="card-panel-header">
            <h2>Gestión de Personal del Restaurante</h2>
            <span className="card-panel-sub">
              Registro y administración de empleados. Los datos persisten automáticamente en almacenamiento local
            </span>
          </div>

          <form className="formulario-grid" onSubmit={guardarPersonal}>
            <div className="campo-form">
              <label htmlFor="nombre-personal">Nombre Completo</label>
              <input
                id="nombre-personal"
                type="text"
                placeholder="Ej: Pedro Salazar"
                value={nombrePersonal}
                onChange={(e) => setNombrePersonal(e.target.value)}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="cargo-personal">Cargo o Puesto Operativo</label>
              <input
                id="cargo-personal"
                type="text"
                placeholder="Ej: Cocinero Principal, Supervisor"
                value={cargoPersonal}
                onChange={(e) => setCargoPersonal(e.target.value)}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="tel-personal">Teléfono de Contacto</label>
              <input
                id="tel-personal"
                type="tel"
                placeholder="Ej: 3001234567"
                value={telefonoPersonal}
                onChange={(e) => setTelefonoPersonal(e.target.value)}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="correo-personal">Correo Electrónico</label>
              <input
                id="correo-personal"
                type="email"
                placeholder="Ej: empleado@fastfoot.com"
                value={correoPersonal}
                onChange={(e) => setCorreoPersonal(e.target.value)}
                required
              />
            </div>

            <div className="form-acciones ancho-completo">
              <button type="submit" className="btn-primario-accion">
                {editandoPersonalId ? "Actualizar Registro" : "Guardar Personal"}
              </button>
              {editandoPersonalId && (
                <button
                  type="button"
                  className="btn-secundario-neutro"
                  onClick={limpiarFormPersonal}
                  style={{ marginLeft: "10px" }}
                >
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>

          <div style={{ marginTop: "24px" }} className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Cargo Operativo</th>
                  <th>Teléfono</th>
                  <th>Correo Electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personal.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="celda-vacia">
                      No hay miembros de personal registrados en el sistema.
                    </td>
                  </tr>
                ) : (
                  personal.map((item) => (
                    <tr key={item.id}>
                      <td className="celda-codigo">#{item.id}</td>
                      <td className="celda-principal">{item.nombre}</td>
                      <td>
                        <span className="badge-cargo-empleado">{item.cargo}</span>
                      </td>
                      <td>{item.telefono}</td>
                      <td>{item.correo}</td>
                      <td className="celda-centrada">
                        <div className="fila-botones-gestion">
                          <button
                            type="button"
                            className="btn-accion-editar"
                            onClick={() => editarPersonal(item)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn-accion-borrar"
                            onClick={() => borrarPersonal(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECCIÓN 3: ROLES Y PERMISOS DEL SISTEMA RBAC
        ══════════════════════════════════════════════════════════════════ */}
        <section className="card-panel">
          <div className="card-panel-header">
            <h2>Cuentas de Acceso y Matriz de Permisos RBAC</h2>
            <span className="card-panel-sub">
              Configuración de credenciales activas y delimitación de accesos por rol
            </span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="tabla-profesional">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Rol Asignado</th>
                  <th>Alcance de Permisos CRUD y Flujo de Trabajo</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={`${u.usuario}-${i}`}>
                    <td className="celda-principal">{u.usuario}</td>
                    <td><code>{u.password}</code></td>
                    <td className="celda-centrada">
                      <span className={`badge-rol-usuario rol-${u.rol}`}>{u.rol}</span>
                    </td>
                    <td className="celda-permisos-descripcion">
                      {u.rol === "administrador" && "Control total: creación, lectura, modificación, eliminación, ejecución y asignación de pedidos."}
                      {u.rol === "recepcionista" && "Supervisión de pedidos de clientes, cambio de estados en cocina y despacho, asignación de repartidores."}
                      {u.rol === "repartidor" && "Visualización exclusiva de pedidos asignados y actualización de estado (En camino / Entregado)."}
                      {u.rol === "cliente" && "Creación de pedidos y visualización de sus propios productos adquiridos. Sin permisos de edición ni eliminación."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Administrador;
