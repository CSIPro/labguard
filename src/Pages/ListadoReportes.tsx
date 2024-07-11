import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../main";

export default function ListaReporte(){

let {Nombre,Id} = useParams()
const [Labs,setLabs] = useContext(LabsContext);
console.log(Labs)
const filteredLabs = Labs.filter(
    (reporte) => reporte.NombreLab === Nombre && reporte.IdLab === Id
);
console.log(filteredLabs)
    return(

        <main>
            
            <h1>Reportes del {Nombre} Id: {Id}</h1>
            <div>
                <ul>
                    {filteredLabs.map(
                        (reporte) =>(
                            <li key={reporte.Id}><Link to={`/InfoReporte/${reporte.Id}/${Nombre}/${Id}`}>
                            <button  >
                                {reporte.NombreSoli+" "} {reporte.FechaActual+" "}{reporte.HoraActual+" "} {reporte.TipoMant+" "}  {reporte.Estado}</button>
                                </Link></li>
                            
                    ))}
                </ul>
            </div>
            <form action="">
                
            <div>
            
            <Link to={{pathname:`/`}}><button>Regresar</button></Link><br />
            <Link to={{pathname:`/Reporte/${Nombre}/${Id}`}}><button>Hacer Reporte</button></Link>
            </div>
            </form>
            
        </main>
    )
}
