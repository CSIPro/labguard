import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Reloj from "../components/Reloj/Reloj";


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
    setValue(
      "secondaryOption",
      primaryOption === "MantEquipo"
        ? MantEquipo[0].Nombre
        : MantInstalacion[0].Nombre
    );
  }, [setValue, primaryOption]);

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center">
      <h1>Registrar Reporte</h1>
      </header>
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
            {/* NUEVO: Agrego un label para el select de "secondaryOption" */}
            {/* Para qué: Asociar una etiqueta al select para mejorar la accesibilidad y legibilidad */}
            <label htmlFor="secondaryOption">Selecciona una opción</label>
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
            {/* NUEVO: Agrego un label para el select de "responsable" */}
            {/* Para qué: Asociar una etiqueta al select para mejorar la accesibilidad y legibilidad */}
            <label htmlFor="responsable">Responsable</label>
            <select name="responsable" id="responsable">
              {/* NUEVO: Opciones para el select de responsables */}
              {/* Para qué: Proporcionar opciones predeterminadas para que el usuario seleccione */}
              <option value="Maria Elena">Maria Elena</option>
              <option value="Sapote con lechuga">Sapote con lechuga</option>
            </select>
          </div>
        </form>
        <div>
          <form action="">
            <Link to="/">
              <button>Regresar</button>
            </Link>
          </form>
          <form action="">
            <Link to="">
              <button>Enviar</button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
