import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { VistaReporte } from "./Vista-Reporte";

export default function InfoReporte() {
  const { IdReporte } = useParams<{ IdReporte: string }>();
  const [reporte, setReporte] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await fetch(`${baseUrl}/reporte/${IdReporte}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener el reporte");
        }
        const data = await response.json();
        setReporte(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchReporte();
  }, [IdReporte]);

  const handleUpdateReport = async (updatedReport: any) => {
    try {
      const reportData = {
        objeto: updatedReport.objeto,
        especificacion: updatedReport.especificacion,
        descripcion: updatedReport.descripcion,
        tipoMant: updatedReport.tipoMant,
        estado: updatedReport.estado,
      };

      const response = await fetch(`${baseUrl}/reporte/${IdReporte}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`No se pudo actualizar el reporte: ${JSON.stringify(errorData)}`);
      }

      setReporte({ ...updatedReport, ...reportData });
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
    }
  };

  const handleDeleteReport = async (reportId: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este reporte?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/reporte/${reportId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el reporte");
      }

      navigate("/ListadoReporte/Todos/1");
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundColor flex flex-col items-center py-6 pt-28">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center absolute top-0 left-0">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Historial de Reportes
        </h1>
      </header>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      {reporte ? (
        <VistaReporte 
          report={reporte} 
          onUpdateReport={handleUpdateReport} 
          onDeleteReport={handleDeleteReport} 
        />
      ) : (
        <p className="text-gray-500">Cargando...</p>
      )}

      <div className="mt-6 flex flex-col items-center gap-4">
        <Link to={`/ListadoReporte/Todos/1`}>
          <button className="border-2 border-white px-6 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
            Regresar al listado
          </button>
        </Link>
      </div>
    </div>
  );
}
