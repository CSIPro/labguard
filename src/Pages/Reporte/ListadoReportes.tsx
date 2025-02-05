import React, { useState, useEffect } from 'react';
import { useLaboratorio } from '../Context/LaboratorioContext';
import { Link } from 'react-router-dom';
import { Card, Descriptions } from 'antd';

const ListadoReportes = () => {
  const { laboratorioId } = useLaboratorio();
  const [reportes, setReportes] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReportes = async () => {
      if (!laboratorioId) {
        setError('No se encontró un laboratorioId en el contexto');
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await fetch(`${baseUrl}/reporte`);
        if (!response.ok) {
          throw new Error('No se pudo obtener los reportes');
        }
        const data = await response.json();
        const reportesFiltrados = data.filter(
          (reporte: any) => reporte.laboratorio?.id === parseInt(laboratorioId)
        );
        setReportes(reportesFiltrados);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchReportes();
  }, [laboratorioId]);

  return (
    <div className="min-h-screen bg-backgroundColor flex flex-col pt-10">
      {/* Encabezado fijo */}
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Historial de Reportes
        </h1>
      </header>

      {/* Contenedor de las tarjetas */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-20">
        {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
        {reportes.length > 0 ? (
          reportes.map((reporte) => (
            <Card
              key={reporte.id}
              title={`Reporte ${reporte.id}`}
              bordered={false}
              className="shadow-md bg-cardsbg text-textoLabs"
            >
              <Descriptions column={1} size="middle">
                <Descriptions.Item label="Nombre del Lab">{reporte.laboratorio?.nombre}</Descriptions.Item>
                <Descriptions.Item label="Descripción">{reporte.descripcion}</Descriptions.Item>
                <Descriptions.Item label="Estado">{reporte.estado}</Descriptions.Item>
              </Descriptions>

              {/* Botones de acción */}
              <div className="flex space-x-4 mt-4">
                <Link to={`/InfoReporte/${reporte.id}/${reporte.laboratorio.nombre}/${reporte.laboratorio.id}`}>
                  <button className="px-4 py-2 bg-colorButtonOrange text-white rounded hover:bg-colorhoverButton">
                    Ver más
                  </button>
                </Link>
                <Link to={`/`}>
                  <button className="px-4 py-2 bg-buttonBrown text-white rounded hover:bg-ColorhoverBrown">
                    Regresar
                  </button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-red-500 font-bold">No se encontraron reportes para este laboratorio.</div>
        )}
      </div>
    </div>
  );
};

export default ListadoReportes;
