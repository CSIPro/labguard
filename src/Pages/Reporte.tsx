import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Reloj from "../components/Reloj/Reloj"
import { useLocation } from "react-router-dom";
const opciones = [
  { label: "Mantenimiento de Equipo", value: "MantEquipo" },
  { label: "Mantenimiento de Instalación", value: "MantInstalacion" },
];

const MantEquipo = [
  { id: 1, Nombre: "Lab química 1" },
  { id: 2, Nombre: "Lab química 2" },
];

const MantInstalacion = [
  { id: 1, Nombre: "Agua" },
  { id: 2, Nombre: "Gas" },
];

export default function Reporte() {
  console.log(useParams())
  let {Nombre}= useParams()
  const { register, watch, setValue } = useForm({
    defaultValues: {
      primaryOption: "MantEquipo",
      secondaryOption: MantEquipo[0].Nombre,
    },
  });
  
  const primaryOption = watch("primaryOption");
  useEffect(() => {
    setValue( "secondaryOption", primaryOption=== "MantEquipo" ? MantEquipo[0].Nombre : MantInstalacion[0].Nombre)

  }, [setValue, primaryOption])
  
  return (
    <main>
      <h1>Registrar Reporte {Nombre} </h1>
      <h4>Fecha actual del reporte</h4>
    <Reloj></Reloj>
      <div>
        <form>
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
            <textarea name="" id=""></textarea>
          </div>
          <div>
            <select name="" id="">
              <option value="">Maria Elena</option>
              <option value="">Sapote con lechuga</option>
            </select>
          </div>
        </form>
        <div>
        <form action="">
          <Link to="/"><button>Regresar</button></Link>
        </form>
        <form action="">
          <Link to=""><button>Enviar</button></Link>
        </form>
        </div>

     
        
      </div>
    </main>
  );
}
