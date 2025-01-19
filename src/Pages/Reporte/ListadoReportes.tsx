import React, { useState, useEffect } from 'react';
import { useLaboratorio } from '../LaboratorioContext';
import { Link } from 'react-router-dom';

const ListadoReportes = () => {
  const { laboratorioId } = useLaboratorio();
  const [reportes, setReportes] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReportes = async () => {
      console.log('laboratorioId desde contexto:', laboratorioId); 

      if (!laboratorioId) {
        setError('No se encontró un laboratorioId en el contexto');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/v1/reporte`);
        if (!response.ok) {
          throw new Error('No se pudo obtener los reportes');
        }
        const data = await response.json();

        console.log('Datos de reportes:', data); 

        const reportesFiltrados = data.filter(
          (reporte: any) => reporte.laboratorio?.id === parseInt(laboratorioId)
        );

        console.log('Reportes filtrados:', reportesFiltrados);
        setReportes(reportesFiltrados);
      } catch (error: any) {
        setError(error.message);
        console.error('Error al cargar los reportes:', error);
      }
    };

    fetchReportes();
  }, [laboratorioId]);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2>Historial de Reportes</h2>
      <ul>
        {reportes.length > 0 ? (
          reportes.map((reporte) => (
            <li key={reporte.id}>
              <h3>{reporte.objeto}</h3>
              <p>{reporte.descripcion}</p>
              <Link to={`/InfoReporte/${reporte.id}/${reporte.laboratorio.nombre}/${reporte.laboratorio.id}`}>
                <button>Ver más</button>
              </Link>
            </li>
          ))
        ) : (
          <li>No se encontraron reportes para este laboratorio.</li>
        )}
      </ul>
    </div>
  );
};

export default ListadoReportes;
