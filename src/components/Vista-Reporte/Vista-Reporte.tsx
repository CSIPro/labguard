import React, { useState, useEffect } from "react";
import { Descriptions, Card } from "antd";
import type { DescriptionsProps } from "antd";
import { LabReporte } from "../../main";

interface Props {
  IdReporte: string;
  Labs: LabReporte[];
}

export const VistaReporte: React.FC<Props> = ({ IdReporte, Labs }) => {
  const filteredLabs = Labs.filter((reporte) => reporte.Id === parseInt(IdReporte));

  if (filteredLabs.length === 0) {
    return <p className="text-center text-red-500 font-bold">No se encontró el reporte</p>;
  }

  const report = filteredLabs[0];

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Manejar el evento de desplazamiento
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false); // Desplazamiento hacia abajo, ocultar encabezado
      } else {
        setShowHeader(true); // Desplazamiento hacia arriba, mostrar encabezado
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col pt-28">
      {/* Encabezado fijado arriba */}
      <header
        className={`bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 shadow-md transition-all duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Información del Reporte
        </h1>
      </header>

      {/* Contenedor de tarjetas con margen superior para separación */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-0">
        {/* Tarjeta de Información General */}
        <Card
          title="Información General"
          bordered={false}
          className="shadow-md bg-cardsbg text-textoLabs"
        >
          <Descriptions column={1} size="middle">
            <Descriptions.Item label="Número de Reporte">{report.Id}</Descriptions.Item>
            <Descriptions.Item label="Nombre del Lab">{report.NombreLab}</Descriptions.Item>
            <Descriptions.Item label="ID del Lab">{report.IdLab}</Descriptions.Item>
            <Descriptions.Item label="Estado">{report.Estado}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Tarjeta de Fecha y Hora */}
        <Card
          title="Fecha y Hora"
          bordered={false}
          className="shadow-md bg-cardsbg text-textoLabs"
        >
          <Descriptions column={1} size="middle">
            <Descriptions.Item label="Fecha">{report.FechaActual}</Descriptions.Item>
            <Descriptions.Item label="Hora">{report.HoraActual}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Tarjeta de Mantenimiento */}
        <Card
          title="Mantenimiento"
          bordered={false}
          className="shadow-md bg-cardsbg text-textoLabs md:col-span-2"
        >
          <Descriptions column={2} size="middle">
            <Descriptions.Item label="Tipo">
              {report.TipoMant === "MantEquipo"
                ? "Mantenimiento de Equipo"
                : report.TipoMant === "MantInstalacion"
                ? "Mantenimiento de Instalación"
                : "No especificado"}
            </Descriptions.Item>
            <Descriptions.Item label="Objeto">{report.MantObjeto}</Descriptions.Item>
            <Descriptions.Item label="Otros">{report.Manotro || "N/A"}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Tarjeta de Descripción */}
        <Card
          title="Descripción"
          bordered={false}
          className="shadow-md bg-cardsbg text-textoLabs md:col-span-2"
        >
          <p className="text-textoLabs">{report.Descripcion}</p>
        </Card>

        {/* Tarjeta de Solicitante */}
        <Card
          title="Solicitante"
          bordered={false}
          className="shadow-md bg-cardsbg text-textoLabs"
        >
          <Descriptions column={1} size="middle">
            <Descriptions.Item label="Nombre">{report.NombreSoli}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </main>
  );
};
