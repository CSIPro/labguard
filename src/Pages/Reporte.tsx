import { useContext, useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Reloj from "../components/Reloj/Reloj"
import { LabReporte, LabsContext } from "../main";

const opciones = [
  { label: "Mantenimiento de Equipo", value: "MantEquipo" },
  { label: "Mantenimiento de Instalación", value: "MantInstalacion" },
];

const MantEquipo = [
  { id: 1, Nombre: "Lab química 1" },
  { id: 2, Nombre: "Lab química 2" },
  { id: 3, Nombre: "Lab química 3" }
];

const MantInstalacion = [
  { id: 1, Nombre: "Agua" },
  { id: 2, Nombre: "Gas" },
];
const Maestro=[
  {id:1, Nombre:"Maria Elena"},
  {id:2, Nombre:"Sapote con lechuga"},
   {id:3, Nombre:"Cilantro"},
  {id:4, Nombre:"Don Jesus"}
]

export default function Reporte() {
  
  const [Labs, setLabs]= useContext(LabsContext)

  let { Nombre, Id } = useParams();
 
  
  const { register, watch, setValue ,handleSubmit} = useForm({
    defaultValues: {
      primaryOption: "MantEquipo",
      secondaryOption: MantEquipo[0].Nombre,
      descripcion: "",
      NombreSoli:""
    },
  });
  

  


  const primaryOption = watch("primaryOption");
  useEffect(() => {
    setValue( "secondaryOption", primaryOption=== "MantEquipo" ? MantEquipo[0].Nombre : MantInstalacion[0].Nombre)

  }, [setValue, primaryOption])

  const onSubmit = (data: any) => {
    const newReporte: LabReporte = {
      Id: Labs.length + 1,
      NombreLab: Nombre,
      IdLab: Id,
      FechaActual: new Date().toLocaleDateString(),
      HoraActual: new Date().toLocaleTimeString(),
      TipoMant: data.primaryOption,
      MantObjeto: data.secondaryOption,
      Descripcion: data.descripcion,
      NombreSoli: data.NombreSoli,
    };
    setLabs((prevLabs) =>[...prevLabs, newReporte]);
    console.log("Nuevo reporte: ",newReporte)
  };
  return (
    
    <main>
      <h1>Registrar Reporte {Nombre} </h1>
      <h1>Con el id {Id}</h1>
      <h4>Fecha actual del reporte</h4>
    <Reloj></Reloj>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {opciones.map((opcion) => (
              <label key={opcion.value} htmlFor={opcion.value}>
                <input
                  type="radio"
                  id={opcion.value}
                  value={opcion.value}
                  {...register("primaryOption")}
                />
                {opcion.label}
              </label>
            ))}
          </div>

          <div>
            <select {...register("secondaryOption")}>
              {primaryOption === "MantEquipo"
                ? MantEquipo.map((option) => (
                    <option value={option.Nombre} key={option.id}>
                      {option.Nombre}
                    </option>
                  ))
                : MantInstalacion.map((option) => (
                    <option value={option.Nombre} key={option.id}>
                      {option.Nombre}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            Descripcion del problema <br />
            <textarea  {...register("descripcion")}></textarea>
          </div>
          <div>
            <h6>Nombre del solicitante</h6>
            <select {...register("NombreSoli")}>
              {Maestro.map((Opcion)=> (
                <option value={Opcion.Nombre} key={Opcion.id}>{Opcion.Nombre}
              </option>))}
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
        <div>

        <form action="">
          <Link to="/"><button >Regresar</button></Link>
        </form>
        
        </div>

     
        
      </div>
      <div>
      
      <h2>Reportes Registrados</h2>
      
        
      </div>
    </main>
    
  );
}
