import React, { useContext } from "react";
import { LabsContext } from "../../main";
import { Link } from "react-router-dom";
export default function VistaReporte ({IdReporte,NombreLab,IdLab}:any){
const [Labs, setLabs]= useContext(LabsContext)
console.log(Labs)
const filteredLabs = Labs.filter(
    (reporte) => reporte.NombreLab === NombreLab && reporte.IdLab === IdLab && reporte.Id=== IdReporte
);
console.log(filteredLabs)
    return(
    <main>
        <ul>
          {filteredLabs.map((report) => (
            <li key={report.Id+1}>
              <strong>ID:</strong> {report.Id} <br />
              <strong>Nombre del Lab:</strong> {report.NombreLab} <br />
              <strong>ID del Lab:</strong> {report.IdLab} <br />
              <strong>Fecha:</strong> {report.FechaActual} <br />
              <strong>Hora:</strong> {report.HoraActual} <br />
              <strong>Tipo de Mantenimiento:</strong> {report.TipoMant} <br />
              <strong>Objeto de Mantenimiento:</strong> {report.MantObjeto} <br />
              <strong>Descripción:</strong> {report.Descripcion} <br />
              <strong>Nombre del Solicitante:</strong> {report.NombreSoli} <br />
              <form action="">
       
        <Link to={{pathname:`/`}}><button>Menu</button></Link><br />
        </form> 
            </li>
          ))}
          
        </ul>
        
    </main>
)
}