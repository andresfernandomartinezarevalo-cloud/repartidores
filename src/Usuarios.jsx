
export const usuarios = [
  {
    usuario: "admin",
    password: "1234",
    rol: "administrador"
  },
  {
    usuario: "recepcionista",
    password: "1234",
    rol: "recepcionista"
  },
  {
    usuario: "repartidor",
    password: "1234",
    rol: "repartidor"
  },
  {
    usuario: "cliente",
    password: "1234",
    rol: "cliente"
  }
];

export const permisos = {
  administrador: [
    "/inicio",
    "/administrador",
    "/pedidos",
    "/cliente",
    "/recepcionista",
    "/repartidor"
  ],

  recepcionista: [
    "/inicio",
    "/pedidos",
    "/cliente",
    "/repartidor"
  ],

  repartidor: [
    "/inicio",
    "/cliente",
    "/pedidos"
  ],

  cliente: [
    "/inicio",
    "/pedidos"
  ]
};
