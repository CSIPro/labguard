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
    
        console.log("Enviando al backend:", reportData);
    
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
      <main>
        <h2>Información del Reporte</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {reporte ? (
          <VistaReporte 
            report={reporte} 
            onUpdateReport={handleUpdateReport} 
            onDeleteReport={handleDeleteReport} 
          />
        ) : (
          <p>Cargando...</p>
        )}

        <Link to={`/ListadoReporte/Todos/1`}>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            Regresar al listado
          </button>
        </Link>
      </main>
    );
  }
