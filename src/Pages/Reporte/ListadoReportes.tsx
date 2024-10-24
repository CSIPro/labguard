import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../../main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import "../../tableStyles.css"; // Ajusta la ruta a dos niveles hacia arriba
 // Ajusta la ruta según la ubicación del archivo

// Componente ListaReporte
const ListaReporte: React.FC = () => {
  let { Nombre, Id } = useParams();
  const [Labs] = useContext(LabsContext);
  
  // Filtra los laboratorios basados en Nombre e Id
  const filteredLabs = Labs.filter(
    (reporte) => reporte.NombreLab === Nombre && reporte.IdLab === Id
  );

  // Datos de la tabla
  const data = filteredLabs.map((reporte) => ({
    key: String(reporte.Id),           // Asegúrate de que Id sea un string
    estado: reporte.Estado,
    asunto: reporte.Asunto,
    nombreSoli: reporte.NombreSoli,
  }));

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: 'Estatus',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => {
        let color = 'green'; // Activo
        if (estado === 'En proceso') {
          color = 'orange'; // En proceso
        } else if (estado === 'Cancelado') {
          color = 'red'; // Cancelado
        }
        return <Tag color={color}>{estado.toUpperCase()}</Tag>;
      },
      width: '10%', // nuevo: Ancho específico para la columna de estatus
    },
    {
      title: 'Título',
      dataIndex: 'asunto',
      key: 'asunto',
      width: '40%', // nuevo: Ancho específico para la columna de título
    },
    {
      title: 'Solicitante',
      dataIndex: 'nombreSoli',
      key: 'nombreSoli',
      width: '20%', // nuevo: Ancho específico para la columna de solicitante
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/InfoReporte/${record.key}/${Nombre}/${Id}`}>
            <a>Ver {record.asunto}</a>
          </Link>
          <a>Eliminar</a>
        </Space>
      ),
      width: '10%', // nuevo: Ancho específico para la columna de acciones
    },
  ];

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center">
        {/* Botón de regresar */}
        <button
          className="mr-2 p-0 bg-transparent border-none"
          aria-label="Regresar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-colorArrowBack"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12H3m0 0l6-6m-6 6l6 6"
            />
          </svg>
        </button>
        {/* Título */}
        <h1 className="text-3xl font-extrabold text-center flex-grow text-colorArrowBack font-poppins">
          Lista de Reportes
        </h1>
      </header>
      <h1 className="text-textoLabs font-inter text-lg font-medium mt-6">
        Reportes del {Nombre}
      </h1>
      <h1 className="text-textoLabs font-inter text-lg font-semibold" style={{ marginBottom: '20px' }}>
        ID: {Id}
      </h1>

      {/* Contenedor de la tabla con ancho específico */}
      <div
        style={{
          width: "70%",
          height: "400px",
          overflowY: "auto",
          padding: "0px",
          borderRadius: "12px",
          border: "2px solid #e0e0e0",
        }}
      >
        {/* Tabla de reportes */}
        <Table
          className="custom-table"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size="large"
          style={{ width: "100%" }} // nuevo: Asegura que la tabla use el 100% del contenedor
        />
      </div>



      <form action="">
        <div style={{ marginTop: '40px' }}> {/* nuevo: Se agregó un margen superior para separar los botones */}
          <Link to={{ pathname: `/` }}>
            <button className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">Regresar</button>
          </Link>
          <br />
          <Link to={{ pathname: `/Reporte/${Nombre}/${Id}` }}>
            <button>Hacer Reporte</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ListaReporte;
