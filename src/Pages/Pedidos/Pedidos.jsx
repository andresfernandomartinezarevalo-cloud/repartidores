import { useState } from "react";
import "./Citas.css";

function Citas() {
  const [mascota, setMascota] = useState("");
  const [propietario, setPropietario] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const [citas, setCitas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setMascota("");
    setPropietario("");
    setFecha("");
    setHora("");
    setMotivo("");
    setEditandoId(null);
  };

  const guardarCita = () => {
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha === "" ||
      hora === "" ||
      motivo.trim() === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId) {
      setCitas(
        citas.map((cita) =>
          cita.id === editandoId
            ? { ...cita, mascota, propietario, fecha, hora, motivo }
            : cita
        )
      );
    } else {
      setCitas([
        ...citas,
        { id: Date.now(), mascota, propietario, fecha, hora, motivo },
      ]);
    }

    limpiarFormulario();
  };

  const editarCita = (cita) => {
    setMascota(cita.mascota);
    setPropietario(cita.propietario);
    setFecha(cita.fecha);
    setHora(cita.hora);
    setMotivo(cita.motivo);
    setEditandoId(cita.id);
  };

  const eliminarCita = (id) => {
    setCitas(citas.filter((cita) => cita.id !== id));
  };

  return (
    <div className="contenido">
      <h1>Gestión de Citas</h1>

      <div className="citas-formulario">
        <input
          type="text"
          placeholder="Mascota"
          value={mascota}
          onChange={(e) => setMascota(e.target.value)}
        />
        <input
          type="text"
          placeholder="Propietario"
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
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
          placeholder="Motivo de la cita"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <button onClick={guardarCita}>
          {editandoId ? "Actualizar" : "Agendar"}
        </button>

        {editandoId && (
          <button className="citas-cancelar" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </div>

      <h2>Lista de Citas</h2>

      <table className="citas-tabla">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Propietario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay citas registradas</td>
            </tr>
          ) : (
            citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.mascota}</td>
                <td>{cita.propietario}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.motivo}</td>
                <td>
                  <button
                    className="citas-editar"
                    onClick={() => editarCita(cita)}
                  >
                    Editar
                  </button>
                  <button
                    className="citas-eliminar"
                    onClick={() => eliminarCita(cita.id)}
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

export default Citas;