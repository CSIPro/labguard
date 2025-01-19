import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { VistaReporte } from "../../components/Vista-Reporte/Vista-Reporte";
export default function InfoReporte() {
  const { IdReporte } = useParams<{ IdReporte: string }>();
  const [reporte, setReporte] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/reporte/${IdReporte}`);
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

  return (
    <main>
      <h2>Información del Reporte</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reporte ? <VistaReporte report={reporte} /> : <p>Cargando...</p>}

      <Link to={`/ListadoReporte/Todos/1`}>
        <button>Regresar al listado</button>
      </Link>
    </main>
  );
}