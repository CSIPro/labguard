import React, { useState } from "react";
import { useUser } from "../../Pages/Context/UserContext";

interface Props {
  report: {
    id: number;
    objeto: string;
    especificacion: string;
    descripcion: string;
    tipoMant: string;
    estado: string;
    creado: string;
    laboratorio: {
      id: number;
      clave: string;
      nombre: string;
    };
  };
  onUpdateReport: (updatedReport: any) => void;
  onDeleteReport: (reportId: number) => void;
}

export const VistaReporte: React.FC<Props> = ({ report, onUpdateReport, onDeleteReport }) => {
  const { user } = useUser();
  const [editableReport, setEditableReport] = useState(report);
  const isAdmin = user?.rol === "ADMINISTRADOR";
  const isMantenimiento = user?.rol === "MANTENIMIENTO";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateReport(editableReport);
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoEstado = e.target.value;
    const updatedReport = { ...editableReport, estado: nuevoEstado };
    setEditableReport(updatedReport);
    onUpdateReport(updatedReport);
  };

  return (
    <main>
      <h2>Detalles del Reporte</h2>

      <p><strong>ID:</strong> {report.id}</p>
      
      <label><strong>Objeto:</strong></label>
      {isAdmin ? (
        <input type="text" name="objeto" value={editableReport.objeto} onChange={handleChange} className="border p-2 rounded w-full" />
      ) : (
        <p>{report.objeto}</p>
      )}

      <label><strong>Especificación:</strong></label>
      {isAdmin ? (
        <input type="text" name="especificacion" value={editableReport.especificacion} onChange={handleChange} className="border p-2 rounded w-full" />
      ) : (
        <p>{report.especificacion}</p>
      )}

      <label><strong>Descripción:</strong></label>
      {isAdmin ? (
        <textarea name="descripcion" value={editableReport.descripcion} onChange={handleChange} className="border p-2 rounded w-full" />
      ) : (
        <p>{report.descripcion}</p>
      )}

      <label><strong>Tipo de Mantenimiento:</strong></label>
      {isAdmin ? (
        <input type="text" name="tipoMant" value={editableReport.tipoMant} onChange={handleChange} className="border p-2 rounded w-full" />
      ) : (
        <p>{report.tipoMant}</p>
      )}

      {isMantenimiento ? (
        <div className="mt-4">
          <label><strong>Cambiar Estado:</strong></label>
          <select value={editableReport.estado} onChange={handleEstadoChange} className="border p-2 rounded">
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN MANTENIMIENTO">EN MANTENIMIENTO</option>
            <option value="ARREGLADO">ARREGLADO</option>
          </select>
        </div>
      ) : (
        <p><strong>Estado:</strong> {report.estado}</p>
      )}

      <p><strong>Fecha de Creación:</strong> {new Date(report.creado).toLocaleDateString()}</p>
      <p><strong>Laboratorio:</strong> {report.laboratorio.nombre}</p>

      {isAdmin && (
        <>
          <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Guardar cambios
          </button>

          <button onClick={() => onDeleteReport(report.id)} className="mt-4 p-2 bg-red-500 text-white rounded ml-2">
            Eliminar Reporte
          </button>
        </>
      )}
    </main>
  );
};
