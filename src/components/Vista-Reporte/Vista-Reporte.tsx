import React, { useContext } from "react";
import { LabsContext } from "../../main";
import { Link } from "react-router-dom";
import { LabReporte } from "../../main";

interface Props {
  IdReporte: string|any; 
  Labs: LabReporte[]; 
}

export  const VistaReporte : React.FC<Props>=({ IdReporte, Labs })=>{

const filteredLabs = Labs.filter(
    (reporte) => reporte.Id=== parseInt(IdReporte)
);

console.log(filteredLabs)
    return(
    <main>
        <ul>
          {filteredLabs.map((report:any) => (
            <li key={report.Id+1}>
              <strong>ID:</strong> {report.Id} <br />
              <strong>Nombre del Lab:</strong> {report.NombreLab} <br />
              <strong>ID del Lab:</strong> {report.IdLab} <br />
              <strong>Estado del Reporte:</strong> {report.Estado} <br />
              <strong>Fecha:</strong> {report.FechaActual} <br />
              <strong>Hora:</strong> {report.HoraActual} <br />
              <strong>Tipo de Mantenimiento:</strong> {report.TipoMant} <br />
              <strong>Objeto de Mantenimiento:</strong> {report.MantObjeto} <br />
              <strong>Otros: </strong>{report.Manotro}<br/>
              <strong>Descripción:</strong> {report.Descripcion} <br />
              <strong>Nombre del Solicitante:</strong> {report.NombreSoli} <br />
              <form action="">
       
       
        </form> 
            </li>
          ))}
          
        </ul>
        
    </main>
)
}