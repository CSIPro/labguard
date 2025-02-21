import React, { useState, useEffect } from "react";
import { useLaboratorio } from "../Context/LaboratorioContext";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { Card, Descriptions } from "antd";
import dayjs from "dayjs";

const ListadoReportes = () => {
  const { laboratorioId } = useLaboratorio();
  const { user } = useUser();
  const [reportes, setReportes] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReportes = async () => {
      if (!laboratorioId) {
        setError("No se encontró un laboratorioId en el contexto");
        return;
      }
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reporte`);
        if (!response.ok) throw new Error("No se pudo obtener los reportes");
  
        const data = await response.json();
        // Filtrar por laboratorioId y ordenar por id de forma descendente
        setReportes(data
          .filter((reporte: any) => reporte.laboratorio?.id === parseInt(laboratorioId))
          .sort((a: any, b: any) => b.id - a.id) // Ordenar por id descendente
        );
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    fetchReportes();
  }, [laboratorioId]);
  

  const asignarseReporte = async (id: number, estaAsignado: boolean) => {
    if (!user) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reporte/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioMant: estaAsignado ? null : user.id }),
      });

      if (!response.ok) throw new Error("Error al actualizar el reporte");

      setReportes((prevReportes) =>
        prevReportes.map((reporte) =>
          reporte.id === id
            ? { ...reporte, usuarioMant: estaAsignado ? null : { id: user.id, name: user.name } }
            : reporte
        )
      );
    } catch (error) {
      console.error("Error al actualizar reporte:", error);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundColor flex flex-col pt-10">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Historial de Reportes
        </h1>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-20">
        {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
        {reportes.length > 0 ? (
          reportes.map((reporte) => {
            const estaAsignado = reporte.usuarioMant?.id === user?.id;

            return (
              <Card
                key={reporte.id}
                title={`Estado: ${reporte.estado}`}
                bordered={false}
                className="shadow-md bg-cardsbg text-textoLabs"
              >
                <Descriptions column={1} size="middle">
                  <Descriptions.Item label="Tipo de Mantenimiento">{reporte.tipoMant}</Descriptions.Item>
                  <Descriptions.Item label="Objeto">{reporte.objeto}</Descriptions.Item>
                  <Descriptions.Item label="Fecha">{dayjs(reporte.creado).format("YYYY-MM-DD")}</Descriptions.Item>
                  <Descriptions.Item label="Asignado a">{reporte.usuarioMant?.name || "Sin asignar"}</Descriptions.Item>
                </Descriptions>

                {user?.rol === "MANTENIMIENTO" && (
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={estaAsignado} onChange={() => asignarseReporte(reporte.id, estaAsignado)} />
                      <span>{estaAsignado ? "Desasignarme de este reporte" : "Asignarme este reporte"}</span>
                    </label>
                  </div>
                )}

                <div className="flex space-x-4 mt-4">
                  <Link to={`/InfoReporte/${reporte.id}/${reporte.laboratorio.nombre}/${reporte.laboratorio.id}`}>
                    <button className="px-4 py-2 bg-colorButtonOrange text-white rounded hover:bg-colorhoverButton">
                      Ver más
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="px-4 py-2 bg-buttonBrown text-white rounded hover:bg-ColorhoverBrown">
                      Regresar
                    </button>
                  </Link>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center text-red-500 font-bold">No se encontraron reportes para este laboratorio.</div>
        )}
      </div>
    </div>
  );
};

export default ListadoReportes;
