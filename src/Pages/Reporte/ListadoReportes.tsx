import React, { useState, useEffect } from "react";
import { useLaboratorio } from "../Context/LaboratorioContext";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { Tag, Card, Descriptions } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, ToolOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type EstadoReporte = "PENDIENTE" | "EN MANTENIMIENTO" | "ARREGLADO";

const getEstadoTag = (estado: EstadoReporte) => {
  const estados: Record<EstadoReporte, { color: string; icon: JSX.Element }> = {
    "ARREGLADO": { color: "green", icon: <CheckCircleOutlined /> },
    "EN MANTENIMIENTO": { color: "orange", icon: <ToolOutlined /> },
    "PENDIENTE": { color: "red", icon: <ExclamationCircleOutlined /> },
  };

  // Verifica si el estado existe en el objeto de estados
  const estadoData = estados[estado];
  if (!estadoData) {
    // Si el estado no es válido, devuelve un estado por defecto o no muestra nada
    return <Tag color="gray">Estado desconocido</Tag>;
  }

  return (
    <Tag color={estadoData.color} className="text-md px-3 py-1 flex items-center gap-1">
      {estadoData.icon} {estado}
    </Tag>
  );
};



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
        setReportes(data.filter((reporte: any) => reporte.laboratorio?.id === parseInt(laboratorioId)));
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
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center absolute top-0 left-0">
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
                className="shadow-md rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 mb-12"
                title={
                  <span className="font-semibold text-lg">
                    {reporte.especificacion}
                  </span>
                }
              >
                <div className="flex justify-between items-center mb-4 mr-52 ">
                  <span className="font-medium text-gray-600">Estado:</span>
                  {getEstadoTag(reporte.estado)}
                </div>

                <Descriptions column={1} size="middle">
                  <Descriptions.Item label="Tipo de Mantenimiento">
                    {reporte.tipoMant}
                  </Descriptions.Item>
                  <Descriptions.Item label="Objeto">
                    {reporte.objeto}
                  </Descriptions.Item>
                  <Descriptions.Item label="Fecha">
                    {dayjs(reporte.creado).format("YYYY-MM-DD")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Asignado a">
                    {reporte.usuarioMant?.name || "Sin asignar"}
                  </Descriptions.Item>
                </Descriptions>

                <div className="flex justify-end mt-4 space-x-3">
                  <Link
                    to={`/InfoReporte/${reporte.id}/${reporte.laboratorio.nombre}/${reporte.laboratorio.id}`}
                  >
                    <button className="px-4 py-2 bg-colorButtonOrange text-white rounded-lg hover:bg-orange-400 transition">
                      Ver más
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="px-4 py-2 bg-buttonBrown text-white rounded-lg hover:bg-brown-900 transition">
                      Regresar
                    </button>
                  </Link>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center text-red-500 font-bold">
            No se encontraron reportes para este laboratorio.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoReportes;
