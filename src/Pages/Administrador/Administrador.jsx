import { useState } from "react";
import "./Administrador.css";
function Administrador() {
const [nombre, setNombre] = useState("");
const [telefono, setTelefono] = useState("");
const [correo, setCorreo] = useState("");
const [Administrador, setAdministrador] = useState([]);
const guardarPropietario = () => {
if (
nombre.trim() === "" ||
telefono.trim() === "" ||
correo.trim() === ""
) {
alert("Todos los campos son obligatorios");
return;
}
const nuevo = {
id: Date.now(),
nombre,
telefono,
correo
};
setAdministrador([...Administrador, nuevo]);
setNombre("");
setTelefono("");
setCorreo("");
};
const eliminarPropietario = (id) => {
const listaNueva =
Administrador.filter(
propietario => propietario.id !== id
);
setAdministrador(listaNueva);
};
return (
<div className="contenedor">
<h1>Gestión de Administrador</h1>
<div className="formulario">
<input
type="text"
placeholder="Nombre"
value={nombre}
onChange={(e) =>
setNombre(e.target.value)}
/>
<input
type="text"
placeholder="Teléfono"
value={telefono}
onChange={(e) =>
setTelefono(e.target.value)}
/>
<input
type="email"
placeholder="Correo"
value={correo}
onChange={(e) =>
setCorreo(e.target.value)}
/>
<button
onClick={guardarPropietario}
>
Guardar
</button>
</div>
<h2>Lista de Administrador</h2>
<table>
<thead>
<tr>
<th>ID</th>
<th>Nombre</th>
<th>Teléfono</th>
<th>Correo</th>
<th>Acción</th>
</tr>
</thead>
<tbody>
{
Administrador.map(
propietario => (
<tr
key={propietario.id}
>
<td>{propietario.id}</td>
<td>
{propietario.nombre}
</td>
<td>
{propietario.telefono}
</td>
<td>
{propietario.correo}
</td>
<td>
<button
className="eliminar"
onClick={() =>
eliminarPropietario(
propietario.id
)
}
>
Eliminar
</button>
</td>
</tr>
)
)
}
</tbody>
</table>
</div>
);
}
export default Administrador;