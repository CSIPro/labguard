import React, { useState } from "react";
import { useUser } from "../../Pages/Context/UserContext";
import { CheckOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { WarningOutlined } from "@ant-design/icons";

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

  const [objeto, setObjeto] = useState<string>(editableReport.objeto);
  const [otroObjeto, setOtroObjeto] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fieldLabels: Record<string, string> = {
    objeto: "Objeto",
    especificacion: "Especificación",
    descripcion: "Descripción",
    tipoMant: "Tipo de Mantenimiento", // Aquí cambias el texto
  };

  const handleSave = () => {
    // Si se selecciona "Otro", se asigna el valor del campo de texto al objeto
    const updatedReport = { ...editableReport, objeto: objeto === "OTRO" ? otroObjeto : objeto };
    onUpdateReport(updatedReport);
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

  const handleTipoMantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableReport((prev) => ({
      ...prev,
      tipoMant: e.target.value,
    }));
  };

  return (
    <main className="p-4 bg-white rounded-xl shadow-lg w-3/5 mx-auto">
      <h2 className="text-lg font-inter font-bold text-textoLabs mt-2 mb-12">
        DETALLES DEL REPORTE
      </h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <p className="text-lg font-inter text-textoLabs mb-4">
        <strong className="text-lg font-inter text-textoLabs">ID:</strong>{" "}
        {report.id}
      </p>

      <div className="mb-4 flex justify-center items-center w-full">
        <div className="w-42 text-lg font-inter text-textoLabs">
          {" "}
          {/* Ajusta el tamaño según necesites */}
          <label className="block font-semibold text-center mb-2">
            Objeto:
          </label>
          <select
            value={objeto}
            onChange={(e) => setObjeto(e.target.value)}
            className="w-full rounded-md bg-selectorButton border-2 border-orange-400 p-2"
          >
            <option value="">Seleccionar objeto</option>
            <option value="CAMPANA">Campana</option>
            <option value="LLAVES">Llaves</option>
            <option value="MATRACES">Matraces</option>
            <option value="FUENTE DE AGUA">Fuente de Agua</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>
      </div>

      {/* Si se selecciona "Otro", muestra el campo de texto */}
      {objeto === "OTRO" && (
        <input
          value={otroObjeto}
          onChange={(e) => setOtroObjeto(e.target.value)}
          placeholder="Ingrese el objeto"
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
      )}

      {(["especificacion", "descripcion"] as const).map((field) => (
        <div key={field} className="mb-6 mt-4">
          <label className="text-lg font-inter text-textoLabs mb-2">
            <strong className="text-lg font-inter text-textoLabs mb-2">
              {fieldLabels[field]}:
            </strong>
          </label>
          {isAdmin ? (
            field === "descripcion" ? (
              <textarea
                name={field}
                value={editableReport[field]}
                onChange={handleChange}
                className="border p-2 rounded mb-4 w-[700px] h-[300px] flex items-center justify-center mx-auto"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={editableReport[field]}
                onChange={handleChange}
                className="border p-2 rounded w-[700px] flex items-center justify-center mx-auto"
              />
            )
          ) : (
            <p>{report[field]}</p>
          )}
        </div>
      ))}

      {/* Tipo de Mantenimiento */}
      <div className="text-lg font-inter text-textoLabs mb-6">
        <h3 className="mb-2 font-bold">Tipo de Mantenimiento:</h3>

        <label className="mr-4">
          <input
            type="radio"
            name="tipoMant"
            value="Mantenimiento de Instalación"
            checked={editableReport.tipoMant === "Mantenimiento de Instalación"}
            onChange={handleTipoMantChange}
            className="mr-1"
          />
          Mantenimiento de Instalación
        </label>

        <label>
          <input
            type="radio"
            name="tipoMant"
            value="Mantenimiento de Equipo"
            checked={editableReport.tipoMant === "Mantenimiento de Equipo"}
            onChange={handleTipoMantChange}
            className="mr-1"
          />
          Mantenimiento de Equipo
        </label>
      </div>

      <p className="text-lg font-inter text-textoLabs mb-4 ">
        <strong className="text-lg font-inter text-textoLabs mb-4 ">
          Encargado:
        </strong>{" "}
        {report.usuarioMant?.name || "SIN ASIGNAR"}
        <WarningOutlined className="ml-2" />
      </p>

      {isMantenimiento || isAdmin ? (
        <div className="text-lg font-inter text-textoLabs mt-4">
          <label>
            <strong className="text-lg font-inter text-textoLabs">
              Cambiar Estado:
            </strong>
          </label>
          <select
            value={editableReport.estado}
            onChange={handleEstadoChange}
            className="border p-2 rounded mb-4 ml-2"
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

      <p className="text-lg font-inter text-textoLabs mb-4 ">
        <strong className="text-lg font-inter text-textoLabs mb-4">
          Fecha de Creación:
        </strong>{" "}
        {new Date(report.creado).toLocaleDateString()}
      </p>
      <p className="text-lg font-inter text-textoLabs mb-8 ">
        <strong className="text-lg font-inter text-textoLabs mb-2">
          Laboratorio:
        </strong>{" "}
        {report.laboratorio.nombre}
      </p>

      {isAdmin && (
        <>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg mb-6 hover:bg-blue-600 mr-4"
          >
            Guardar cambios
            <CheckOutlined className="ml-2" />
          </button>
          <button
            onClick={() => onDeleteReport(report.id)}
            className="mt-4 p-2 bg-red-500 text-white rounded-lg ml-2 mb-6 hover:bg-red-600"
          >
            Eliminar Reporte
            <DeleteOutlined className="ml-2" />
          </button>
        </>
      )}
    </main>
  );
};
