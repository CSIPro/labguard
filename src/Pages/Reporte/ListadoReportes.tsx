import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../../main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const ListaReporte:React.FC=({})=>{

let {Nombre,Id} = useParams()
const [Labs,setLabs] = useContext(LabsContext);
console.log(Labs)
const filteredLabs = Labs.filter(
    (reporte) => reporte.NombreLab === Nombre && reporte.IdLab === Id
);
console.log(filteredLabs)
    return (
      <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
        <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center">
          {/* nuevo: Botón de regresar sin fondo ni borde, con un ícono de flecha */}
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
          {/* nuevo: Título que se centra en el encabezado, ocupando el espacio disponible */}
          <h1 className="text-3xl font-extrabold text-center flex-grow text-colorArrowBack font-poppins">
            Lista de Reportes
          </h1>
        </header>
        <h1 className="font-inter font-medium">
          Reportes del {Nombre} ID: {Id}
        </h1>
        <div>
          <ul>
            {filteredLabs.map((reporte) => (
              <li key={reporte.Id}>
                <Link to={`/InfoReporte/${reporte.Id}/${Nombre}/${Id}`}>
                  <button>
                    {reporte.NombreSoli + " "} {reporte.FechaActual + " "}
                    {reporte.HoraActual + " "} {reporte.TipoMant + " "}{" "}
                    {reporte.Estado}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <form action="">
          <div>
            <Link to={{ pathname: `/` }}>
              <button>Regresar</button>
            </Link>
            <br />
            <Link to={{ pathname: `/Reporte/${Nombre}/${Id}` }}>
              <button>Hacer Reporte</button>
            </Link>
          </div>
        </form>
      </main>
    );
}

export default ListaReporte;
