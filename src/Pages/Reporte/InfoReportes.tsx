import React from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LabsContext } from "../../main";
import { VistaReporte } from "../../components/Vista-Reporte/Vista-Reporte";
export default function InfoReporte(){
const {IdReporte = "", Nombre, Id} = useParams()
console.log(useParams())
const [Labs, setLabs]= useContext(LabsContext)
console.log(Labs)
return(
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center py-6">
    <VistaReporte IdReporte={IdReporte} Labs={Labs} />
  
    <div className="mt-6 flex flex-col items-center gap-4">
      <Link to={{ pathname: `/Reporte/${Nombre}/${Id}` }}>
        <button className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
          Hacer Reporte
        </button>
      </Link>
  
      <Link to={{ pathname: `/` }}>
        <button className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
          Regresar
        </button>
      </Link>
    </div>
  </main>
  

)
}