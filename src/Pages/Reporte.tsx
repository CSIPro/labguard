import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
      <h1>Registrar Reporte</h1>
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

          
        </form>
        <form action="">
          <link rel="stylesheet" href="" />
        </form>
        
      </div>
    </main>
  );
}
