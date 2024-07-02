

import { useEffect } from "react";
import { useForm } from "react-hook-form";

  const Opciones= [
    {label:"MantEquipo",value: "MantEquipo"},
    {label:"MantInstalacion",value:"MantInstalacion"}
  ]
  
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
  const { register, watch, setValue } = useForm({
    defaultValues: {
      primaryOption: 'MantEquipo',
      secondaryOption: MantEquipo
    },
    mode: 'onChange'
  });
  const getSecondaryOptions = () => {
    if (primaryOption === 'MantEquipo') {
      return MantEquipo;
    } else if (primaryOption === 'MantInstalacion') {
      return MantInstalacion;
    }
    return [];
  };
  const primaryOption = watch('primaryOption');
  useEffect(() => {
    if (primaryOption === 'MantEquipo') {
      setValue('secondaryOption', MantEquipo);
    } else if (primaryOption === 'MantInstalacion') {
      setValue('secondaryOption', MantInstalacion);
    }
  }, [primaryOption, setValue]);
  const form = useForm({
    defaultValues: {
      Mant: MantEquipo
    },
    mode: "onChange"
  });
  
    return (
      
      <main>
        <h1>Registrar Reporte</h1>
        <div>
        Bienvenido:

        <form action="">
            tipo de reporte
            <div>
              <label htmlFor="">
                <input type="radio"  id="1" {...register("primaryOption")} /> Mantenimiento de Equipo
              </label>
              <label htmlFor="">
                <input type="radio"  id="2" value="MantInstala" {...register("secondaryOption")} /> Mantenimiento de Instalacion
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