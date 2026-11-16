// ─── Base de datos de usuarios ───
export const usuarios = [
  { usuario: "admin",         password: "admin123",         rol: "administrador" },
  { usuario: "recepcion1",    password: "recepcion123",     rol: "recepcionista" },
  { usuario: "recepcionista", password: "recepcion123",     rol: "recepcionista" },
  { usuario: "repartidor1",   password: "repartidor123",    rol: "repartidor" },
  { usuario: "repartidor2",   password: "repartidor123",    rol: "repartidor" },
  { usuario: "cliente1",      password: "cliente123",       rol: "cliente" },
  { usuario: "cliente2",      password: "cliente123",       rol: "cliente" },
];

// ─── Permisos de navegación por rol ───
// La primera ruta de cada arreglo es a la que se redirige automáticamente al iniciar sesión
export const permisos = {
  administrador: [
    "/administrador",
    "/inicio",
    "/pedidos",
    "/cliente",
    "/recepcionista",
    "/repartidor"
  ], 

  recepcionista: [
    "/recepcionista",
    "/pedidos",
    "/inicio"
  ],

  repartidor: [
    "/repartidor",
    "/pedidos",
    "/inicio"
  ],

  cliente: [
    "/cliente",
    "/pedidos",
    "/inicio"
  ]
};

// ─── Permisos CRUD granulares por rol ───
// Cada rol define qué acciones puede hacer sobre cada recurso.
//   crear   → puede agendar / registrar
//   leer    → puede ver la lista
//   editar  → puede modificar registros
//   eliminar→ puede borrar registros
//   ejecutar→ puede cambiar estado (procesar / despachar)
//   asignar → puede asignar pedidos a repartidores
export const permisosCrud = {
  administrador: {
    pedidos:       { crear: true,  leer: true,  editar: true,  eliminar: true,  ejecutar: true,  asignar: true },
    recepcionista: { crear: true,  leer: true,  editar: true,  eliminar: true,  ejecutar: true,  asignar: true },
    repartidor:    { crear: true,  leer: true,  editar: true,  eliminar: true,  ejecutar: true,  asignar: true },
    cliente:       { crear: true,  leer: true,  editar: true,  eliminar: true,  ejecutar: true,  asignar: true },
  },

  recepcionista: {
    pedidos:       { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: true,  asignar: true },
    recepcionista: { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: true,  asignar: true },
    repartidor:    { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: false, asignar: false },
    cliente:       { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: false, asignar: false },
  },

  repartidor: {
    pedidos:       { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: true,  asignar: false },
    recepcionista: { crear: false, leer: false, editar: false, eliminar: false, ejecutar: false, asignar: false },
    repartidor:    { crear: false, leer: true,  editar: false, eliminar: false, ejecutar: true,  asignar: false },
    cliente:       { crear: false, leer: false, editar: false, eliminar: false, ejecutar: false, asignar: false },
  },

  cliente: {
    pedidos:       { crear: true,  leer: true,  editar: false, eliminar: false, ejecutar: false, asignar: false },
    recepcionista: { crear: false, leer: false, editar: false, eliminar: false, ejecutar: false, asignar: false },
    repartidor:    { crear: false, leer: false, editar: false, eliminar: false, ejecutar: false, asignar: false },
    cliente:       { crear: true,  leer: true,  editar: false, eliminar: false, ejecutar: false, asignar: false },
  },
};

// ─── Helper para obtener el usuario con sesión activa ───
export function obtenerUsuarioActual() {
  try {
    return JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    return null;
  }
}

// ─── Helper para obtener permisos CRUD del usuario actual ───
export function obtenerPermisosCrud(recurso = "pedidos") {
  const user = obtenerUsuarioActual();
  if (!user || !user.rol) {
    return { crear: false, leer: false, editar: false, eliminar: false, ejecutar: false, asignar: false };
  }
  return permisosCrud[user.rol]?.[recurso] || {
    crear: false,
    leer: false,
    editar: false,
    eliminar: false,
    ejecutar: false,
    asignar: false,
  };
}

// ─── Lista de repartidores disponibles (para asignar pedidos) ───
export function obtenerRepartidores() {
  // Obtenemos repartidores únicos por nombre
  const repartidoresUnicos = [];
  const nombresVistos = new Set();
  
  usuarios
    .filter((u) => u.rol === "repartidor")
    .forEach((u) => {
      if (!nombresVistos.has(u.usuario)) {
        nombresVistos.add(u.usuario);
        repartidoresUnicos.push(u);
      }
    });

  return repartidoresUnicos;
}
