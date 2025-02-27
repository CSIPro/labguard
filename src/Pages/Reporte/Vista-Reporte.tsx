import React, { useState } from "react";
import { useUser } from "../../Pages/Context/UserContext";

interface Report {
  id: number;
  objeto: string;
  especificacion: string;
  descripcion: string;
  tipoMant: string;
  estado: string;
  creado: string;
  usuarioMant?: { id: number; name: string } | null;
  laboratorio: { id: number; clave: string; nombre: string };
}

interface Props {
  report: Report;
  onUpdateReport: (updatedReport: Report) => void;
  onDeleteReport: (reportId: number) => void;
}

export const VistaReporte: React.FC<Props> = ({ report, onUpdateReport, onDeleteReport }) => {
  const { user } = useUser();
  const [editableReport, setEditableReport] = useState<Report>(report);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.rol === "ADMINISTRADOR";
  const isMantenimiento = user?.rol === "MANTENIMIENTO";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdateReport(editableReport);
    showSuccessMessage("Los cambios se guardaron correctamente.");
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditableReport((prev) => ({ ...prev, estado: e.target.value }));
    onUpdateReport({ ...editableReport, estado: e.target.value });
    showSuccessMessage("El estado se actualizó correctamente.");
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 1500);
  };

  return (
    <main className="p-4 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-lg font-inter text-textoLabs mt-2 mb-12">
        DETALLES DEL REPORTE
      </h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <p className="text-lg font-inter text-textoLabs mb-4">
        <strong className="text-lg font-inter text-textoLabs">ID:</strong>{" "}
        {report.id}
      </p>

      {(["objeto", "especificacion", "descripcion", "tipoMant"] as const).map(
        (field) => (
          <div key={field} className="mb-4">
            <label className="text-lg font-inter text-textoLabs mb-2">	
              <strong className="text-lg font-inter text-textoLabs mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
            </label>
            {isAdmin ? (
              field === "descripcion" ? (
                <textarea
                  name={field}
                  value={editableReport[field]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={editableReport[field]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              )
            ) : (
              <p>{report[field]}</p>
            )}
          </div>
        )
      )}

      <p>
        <strong className="text-lg font-inter text-textoLabs mb-4">Encargado:</strong> {report.usuarioMant?.name || "Sin asignar"}
      </p>

      {isMantenimiento || isAdmin ? (
        <div className="text-lg font-inter text-textoLabs mt-4">
          <label>
            <strong className="text-lg font-inter text-textoLabs">Cambiar Estado:</strong>
          </label>
          <select
            value={editableReport.estado}
            onChange={handleEstadoChange}
            className="border p-2 rounded mb-4"
          >
            {["PENDIENTE", "EN MANTENIMIENTO", "ARREGLADO"].map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>
          <strong>Estado:</strong> {report.estado}
        </p>
      )}

      <p className="mb-4">
        <strong className="text-lg font-inter text-textoLabs mb-4">Fecha de Creación:</strong>{" "}
        {new Date(report.creado).toLocaleDateString()}
      </p>
      <p>
        <strong className="text-lg font-inter text-textoLabs mb-2">Laboratorio:</strong> {report.laboratorio.nombre}
      </p>

      {isAdmin && (
        <>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Guardar cambios
          </button>
          <button
            onClick={() => onDeleteReport(report.id)}
            className="mt-4 p-2 bg-red-500 text-white rounded ml-2"
          >
            Eliminar Reporte
          </button>
        </>
      )}
    </main>
  );
};
