import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../../main";

const ListaReporte: React.FC = () => {
  const { Nombre, Id } = useParams();
  const [Labs] = useContext(LabsContext);

  // Filtra los reportes que coinciden con el Nombre y Id
  const filteredLabs = Labs.filter(
    (reporte) => reporte.NombreLab === Nombre && reporte.IdLab === Id
  );

  return (
    <main>
      <h1>
        Reportes del {Nombre} Id: {Id}
      </h1>
      <div>
        <ul>
          {filteredLabs.length > 0 ? (
            filteredLabs.map((reporte) => (
              <li key={reporte.Id}>
                <Link to={`/InfoReporte/${reporte.Id}/${Nombre}/${Id}`}>
                  <button>
                    {reporte.NombreSoli} {reporte.FechaActual} {reporte.HoraActual}{" "}
                    {reporte.TipoMant} {reporte.Estado}
                  </button>
                </Link>

                {/* Botón para redirigir a ComentariosAdicionales */}
                <Link to={`/ComentariosAdicionales/${reporte.Id}/${Nombre}/${reporte.IdLab}`}>
                  <button style={{ marginLeft: "10px" }}>Ver Comentarios</button>
                </Link>
              </li>
            ))
          ) : (
            <li>No hay reportes disponibles para mostrar.</li>
          )}
        </ul>
      </div>
      <form action="">
        <div>
          <Link to="/">
            <button type="button">Regresar</button>
          </Link>
          <br />
          <Link to={`/Reporte/${Nombre}/${Id}`}>
            <button type="button">Hacer Reporte</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ListaReporte;