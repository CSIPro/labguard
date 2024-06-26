

import { useState } from "react";
import { useForm } from "react-hook-form";
  const MantEquipo = [
    {
     id: 1,
     Nombre:"Lab quimica 1",
    },
    {
     id: 2,
     Nombre:"Lab quimica 2",
    }
     
   ]
   const MantInstalacion = [
    {
      id: 1,
      Nombre: "Agua"
    },
    {
      id:2,
      Nombre:"Gas"
    }
   ]
export default function Reporte() {
  const [MantValue, setMantValue]= useState();
  const [RadioValue, setRadioValue] = useState();
  
  const form = useForm({
    defaultValues: {
      Mant: MantEquipo
    },
    mode: "onChange"
  });
  const { register } = form;
    return (
      
      <main>
        <h1>Registrar Reporte</h1>
        <div>
        Bienvenido:

        <form action="">
            tipo de reporte
            <div>
              <label htmlFor="">
                <input type="radio" name="Simon" id="1"  /> Mantenimiento de Equipo
              </label>
              <label htmlFor="">
                <input type="radio" name="Simon" id="2" value="MantInstala" /> Mantenimiento de Instalacion
              </label>

            </div>
            <div>
              <select name="" id="">
                {
                  
             /* MantValue.map((Labs) => (
              <option value={Labs.Nombre} key={Labs.id}>{Labs.Nombre}</option>
              ))*/
                }
              </select>
            </div>
            
      

        </form>
        </div>
        
      </main>
       
    );
  }