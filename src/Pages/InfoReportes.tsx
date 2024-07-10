import React from "react";
import VistaReporte from "../components/Vista-Reporte/Vista-Reporte";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function InfoReporte(){
const {IdReporte,Nombre, Id}= useParams()

return(
    <main>
        <VistaReporte 
        IdReporte= {IdReporte}
        NombreLab={Nombre}
        IdLab={Id}></VistaReporte>
         <Link to={{pathname:`/Reporte/${Nombre}/${Id}`}}><button>Hacer Reporte</button></Link><br />    
       <Link to={{pathname:`/`}}><button>Regresar</button></Link><br />
    </main>
)
}