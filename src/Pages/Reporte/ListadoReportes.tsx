import React, { useState, useEffect } from "react";
import { useLaboratorio } from "../Context/LaboratorioContext";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { Tag, Card, Descriptions } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, ToolOutlined, ArrowLeftOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type EstadoReporte = "PENDIENTE" | "EN MANTENIMIENTO" | "ARREGLADO";

const getEstadoTag = (estado: EstadoReporte) => {
  const estados: Record<EstadoReporte, { color: string; icon: JSX.Element }> = {
    "ARREGLADO": { color: "green", icon: <CheckCircleOutlined /> },
    "EN MANTENIMIENTO": { color: "orange", icon: <ToolOutlined /> },
    "PENDIENTE": { color: "red", icon: <ExclamationCircleOutlined /> },
  };

  const estadoData = estados[estado] || { color: "gray", icon: null };
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
  const [filtro, setFiltro] = useState<string>("nuevo");

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

  const reportesFiltrados = reportes
    .filter((reporte) => {
      if (["PENDIENTE", "EN MANTENIMIENTO", "ARREGLADO"].includes(filtro)) {
        return reporte.estado === filtro;
      }
      return true;
    })
    .sort((a, b) => {
      if (filtro === "viejo") {
        return new Date(a.creado).getTime() - new Date(b.creado).getTime();
      }
      return new Date(b.creado).getTime() - new Date(a.creado).getTime();
    });

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
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center absolute top-0 left-0">
  <Link
    to="/"
    className="bg-transparent transition group absolute left-6 top-6"
  >
    <ArrowLeftOutlined className="text-3xl text-hoverArrow group-hover:text-colorArrowBack" />
  </Link>
  <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins flex-1 text-center">
    Historial de Reportes
  </h1>
</header>

      <div className="fixed top-24 left-6">
      </div>

      <div className="mt-24 mb-4 text-center">
        <label className="mr-2 font-bold">Filtrar por:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="nuevo">Más reciente a Más antiguo (opción default)</option>
          <option value="viejo">Más antiguo a Más reciente</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN MANTENIMIENTO">En Mantenimiento</option>
          <option value="ARREGLADO">Arreglado</option>
        </select>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-4">
        {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
        {reportesFiltrados.length > 0 ? (
          reportesFiltrados.map((reporte) => {
            const estaAsignado = reporte.usuarioMant?.id === user?.id;

            return (
              <Card
                key={reporte.id}
                className="shadow-md rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 mb-12"
                title={
                  <span className="font-semibold text-lg text-textoLabs ">
                    {reporte.especificacion}
                  </span>
                }
              >
                <div className="flex justify-between items-center mb-4 mr-52">
                  <span className="font-semibold text-base text-brown-800">
                    Estado:
                  </span>
                  {getEstadoTag(reporte.estado)}
                </div>

                <Descriptions
                  column={1}
                  size="middle"
                  className="text-textoLabs font-mediumlight"
                >
                  <Descriptions.Item
                    label={
                      <span className="font-semibold text-base text-brown-800">
                        Laboratorio
                      </span>
                    }
                  >
                    {reporte.laboratorio.nombre}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="font-semibold text-base text-brown-800">
                        Tipo de Mantenimiento
                      </span>
                    }
                  >
                    {reporte.tipoMant}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="font-semibold text-base text-brown-800">
                        Objeto
                      </span>
                    }
                  >
                    {reporte.objeto}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="font-semibold text-base text-brown-800">
                        Fecha
                      </span>
                    }
                  >
                    {dayjs(reporte.creado).format("YYYY-MM-DD")}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="font-semibold text-base text-brown-800">
                        Asignado a
                      </span>
                    }
                  >
                    {reporte.usuarioMant?.name || "Sin asignar"}
                  </Descriptions.Item>
                </Descriptions>

                {user?.rol === "MANTENIMIENTO" && (
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={estaAsignado}
                        onChange={() =>
                          asignarseReporte(reporte.id, estaAsignado)
                        }
                      />
                      <span>
                        {estaAsignado
                          ? "Desasignarme de este reporte"
                          : "Asignarme este reporte"}
                      </span>
                    </label>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <Link
                    to={`/InfoReporte/${reporte.id}/${reporte.laboratorio.nombre}/${reporte.laboratorio.id}`}
                  >
                    <button className="px-4 py-2 bg-colorButtonOrange text-white text-base font-mediumlight rounded-lg hover:bg-orange-400 transition flex items-center justify-center">
                      Ver más
                      <EyeOutlined className="ml-2" />
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
