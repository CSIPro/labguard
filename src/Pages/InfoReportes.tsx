import React from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../main";
import { VistaReporte } from "../components/Vista-Reporte/Vista-Reporte";
export default function InfoReporte(){
const {IdReporte,Nombre, Id}= useParams()
console.log(useParams())
const [Labs, setLabs]= useContext(LabsContext)
console.log(Labs)
return(
    <main>
        <VistaReporte 
        IdReporte= {IdReporte}
        Labs={Labs}></VistaReporte>
         <Link to={{pathname:`/Reporte/${Nombre}/${Id}`}}><button>Hacer Reporte</button></Link><br />    
       <Link to={{pathname:`/`}}><button>Regresar</button></Link><br />
    </main>
)
}