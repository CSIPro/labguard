import React from "react";
import { Link } from "react-router-dom";
export default function ListaReporte(){


    return(
        <main>
            <h1>Reporte </h1>
            <form action="">

            <div>
            <Link to={{pathname:`/ListadoReporte`}}><button>Regresar</button></Link>
            </div>
            </form>
            
        </main>
    )
}
