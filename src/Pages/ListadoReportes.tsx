import React from "react";
import { Link, useParams } from "react-router-dom";


export default function ListaReporte(){
console.log(useParams())
let {Nombre,Id} = useParams()
    return(

        <main>

            <h1>Reportes del {Nombre} Id: {Id}</h1>
            <form action="">

            <div>
            <Link to={{pathname:`/`}}><button>Regresar</button></Link><br />
            <Link to={{pathname:`/Reporte/`}}><button>Hacer Reporte</button></Link>
            </div>
            </form>
            
        </main>
    )
}
