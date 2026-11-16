import { createContext, useContext, useState, useEffect } from "react";

const PedidosContext = createContext();

const STORAGE_KEY = "fastfoot_pedidos_v1";

// ─── Pedidos semilla para tener datos listos para probar ───
const pedidosIniciales = [
  {
    id: 1001,
    producto: "Hamburguesa Doble con Queso + Papas",
    cantidad: 2,
    cliente: "cliente1",
    telefono: "3001234567",
    direccion: "Calle 45 # 12-34, Apto 301",
    nota: "Sin cebolla, salsas aparte",
    fecha: "2026-11-15",
    hora: "12:30",
    estado: "Agendado", // Esperando recepción
    repartidorAsignado: null,
    fechaCreacion: "2026-11-15T12:30:00.000Z",
  },
  {
    id: 1002,
    producto: "Pizza Familiar Pepperoni + Gaseosa 1.5L",
    cantidad: 1,
    cliente: "cliente2",
    telefono: "3109876543",
    direccion: "Carrera 7 # 85-20",
    nota: "Timbre 202",
    fecha: "2026-11-15",
    hora: "13:00",
    estado: "En preparación", // En cocina
    repartidorAsignado: null,
    fechaCreacion: "2026-11-15T13:00:00.000Z",
  },
  {
    id: 1003,
    producto: "Combo 12 Alitas BBQ + Papas Francesas",
    cantidad: 1,
    cliente: "cliente1",
    telefono: "3001234567",
    direccion: "Calle 45 # 12-34, Apto 301",
    nota: "Salsa picante extra",
    fecha: "2026-11-15",
    hora: "13:15",
    estado: "Asignado", // Asignado a repartidor1
    repartidorAsignado: "repartidor1",
    fechaCreacion: "2026-11-15T13:15:00.000Z",
  },
  {
    id: 1004,
    producto: "Hamburguesa Clásica + Jugo Natural",
    cantidad: 1,
    cliente: "cliente2",
    telefono: "3109876543",
    direccion: "Carrera 7 # 85-20",
    nota: "Bien cocida",
    fecha: "2026-11-15",
    hora: "11:45",
    estado: "Entregado",
    repartidorAsignado: "repartidor2",
    fechaCreacion: "2026-11-15T11:45:00.000Z",
  },
];

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      if (guardados) {
        return JSON.parse(guardados);
      }
    } catch (e) {
      console.error("Error al leer pedidos de localStorage:", e);
    }
    return pedidosIniciales;
  });

  // Sincronizar automáticamente en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
    } catch (e) {
      console.error("Error al guardar pedidos en localStorage:", e);
    }
  }, [pedidos]);

  // ─── Operaciones CRUD ───

  // 1. Crear nuevo pedido (usado por Cliente y Admin)
  const crearPedido = (nuevoPedido) => {
    const pedidoConMetadatos = {
      id: Date.now(),
      producto: nuevoPedido.producto || "Pedido General",
      cantidad: Number(nuevoPedido.cantidad) || 1,
      cliente: nuevoPedido.cliente || "cliente",
      telefono: nuevoPedido.telefono || "",
      direccion: nuevoPedido.direccion || "",
      nota: nuevoPedido.nota || nuevoPedido.motivo || "",
      fecha: nuevoPedido.fecha || new Date().toISOString().split("T")[0],
      hora:
        nuevoPedido.hora ||
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      estado: "Agendado",
      repartidorAsignado: null,
      fechaCreacion: new Date().toISOString(),
    };

    setPedidos((prev) => [pedidoConMetadatos, ...prev]);
    return pedidoConMetadatos;
  };

  // 2. Actualizar pedido completo (usado por Admin)
  const actualizarPedido = (id, datosActualizados) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...datosActualizados } : p))
    );
  };

  // 3. Eliminar pedido (usado por Admin)
  const eliminarPedido = (id) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  // 4. Ejecutar: cambiar estado del flujo de trabajo (Recepcionista, Admin, Repartidor)
  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  // 5. Asignar repartidor (Recepcionista y Admin)
  const asignarRepartidor = (id, nombreRepartidor) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const yaTieneEstadoAvanzado =
          p.estado === "En camino" || p.estado === "Entregado";
        return {
          ...p,
          repartidorAsignado: nombreRepartidor || null,
          estado: nombreRepartidor && !yaTieneEstadoAvanzado ? "Asignado" : p.estado,
        };
      })
    );
  };

  // 6. Resetear a datos iniciales si se desea
  const reiniciarPedidos = () => {
    setPedidos(pedidosIniciales);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosIniciales));
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        crearPedido,
        actualizarPedido,
        eliminarPedido,
        cambiarEstado,
        asignarRepartidor,
        reiniciarPedidos,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debe usarse dentro de un PedidosProvider");
  }
  return context;
}
