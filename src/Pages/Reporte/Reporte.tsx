import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { LabReporte, LabsContext } from "../../main";
import Clock from "../../components/Reloj/Reloj";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { useUser } from "../UserContext";
import PersonaCard from "../../components/UsuarioPresentacion/PresentacionUsuario";
const opciones = [
  { label: "Mantenimiento de Equipo", value: "MantEquipo" },
  { label: "Mantenimiento de Instalación", value: "MantInstalacion" },
];

const MantEquipo = [
  { id: 1, Nombre: "Campana" },
  { id: 2, Nombre: "Balvula" },
  { id: 3, Nombre: "otros" },
];

const MantInstalacion = [
  { id: 1, Nombre: "Agua" },
  { id: 2, Nombre: "Gas" },
  { id: 3, Nombre: "otro" },
];
const Maestro = [
  { id: 1, Nombre: "Maria Elena" },
  { id: 2, Nombre: "Sapote con lechuga" },
  { id: 3, Nombre: "Cilantro" },
  { id: 4, Nombre: "Don Jesus" },
];

export default function Reporte() {
  const [Labs, setLabs] = useContext(LabsContext);
  const {persona} =useUser()

  let { Nombre, Id } = useParams();

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      primaryOption: "MantEquipo",
      secondaryOption: MantEquipo[0].Nombre,
      descripcion: "",
      comentarios: "",
      NombreSoli: "",
      Otros: "",
    },
  });

  const [mensaje, setMensaje] = useState("");

  const handlemensaje = () => {
    setMensaje("Se guardo correctamente");
  };

  const primaryOption = watch("primaryOption");
  useEffect(() => {
    setValue(
      "secondaryOption",
      primaryOption === "MantEquipo"
        ? MantEquipo[0].Nombre
        : MantInstalacion[0].Nombre
    );
  }, [setValue, primaryOption]);

  const onSubmit = (data: any) => {
    const newReporte: LabReporte = {
      Id: Labs.length + 1,
      NombreLab: Nombre,
      IdLab: Id,
      FechaActual: new Date().toLocaleDateString(),
      HoraActual: new Date().toLocaleTimeString(),
      TipoMant: data.primaryOption,
      MantObjeto: data.secondaryOption,
      Manotro: data.Otros,
      Descripcion: data.descripcion,
      Comentarios: data.comentarios,
      NombreSoli: data.NombreSoli,
      Estado: "En Revision",
    };
    setLabs((prevLabs) => [...prevLabs, newReporte]);
    console.log("Nuevo reporte: ", newReporte);
  };
  setTimeout(() => {
    setMensaje("");
  }, 4000);
  return (
    <DefaultLayout
      header={
        <>
          <header className="bg-customCream w-full p-4 flex items-center justify-between">
            {persona && (
              <div className="flex items-center">
                {/* Nuevo: Muestra la imagen del perfil del maestro */}
                <img
                  src={persona.ImagenPerfil}
                  alt={persona.NombrePersonal}
                  className="w-16 h-16 rounded-full mr-4"
                />
                {/* Nuevo: Muestra el nombre del maestro */}
                <div>
                  <h1 className="text-2xl font-semibold">
                    {persona.NombrePersonal}
                  </h1>
                  <p className="text-gray-600">{persona.Ocupacion}</p>
                </div>
              </div>
            )}
            {!persona && (
              <h1 className="text-2xl font-semibold text-center">
                Bienvenido a LabGuard
              </h1>
            )}
          </header>
          {/* Fin de la sección de encabezado */}

          {/* Contenedor de la tarjeta de usuario con fondo customCream */}
          <div className="bg-customCream p-6 mb-6 text-center w-full h-80 flex flex-col items-center justify-center">
            {/* Verifica si hay información de usuario disponible */}
            {persona ? (
              <>
                {/* Muestra el nombre y ocupación del usuario */}
                <h1 className="text-2xl font-semibold whitespace-nowrap">
                  {persona.NombrePersonal}
                </h1>
                <p className="text-lg text-gray-600 whitespace-nowrap">
                  {persona.Ocupacion}
                </p>
                <PersonaCard
                  idPersona={persona.idPersona}
                  NombrePersonal={persona.NombrePersonal}
                  Ocupacion={persona.Ocupacion}
                  ImagenPerfil={persona.ImagenPerfil}
                />
              </>
            ) : (
              <p>No hay información de usuario disponible</p>
            )}
          </div>
        </>
      }
    >
      <main>
        <h1>Registrar Reporte {Nombre} </h1>
        <h1>Con el id {Id}</h1>
        <h4>Fecha actual del reporte</h4>
        <div>
          <Clock />
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
                  ? MantEquipo.map((opcion) => (
                      <option value={opcion.Nombre} key={opcion.id}>
                        {opcion.Nombre}
                      </option>
                    ))
                  : MantInstalacion.map((opcion) => (
                      <option value={opcion.Nombre} key={opcion.id}>
                        {opcion.Nombre}
                      </option>
                    ))}
              </select>
              Menciona otro:
              <input type="text" id="otro" {...register("Otros")} />
            </div>
            <div>
              Descripcion del problema <br />
              <textarea {...register("descripcion")}></textarea>
            </div>
            <div>
              Comentarios adicionales <br />
              <textarea {...register("comentarios")}></textarea>
            </div>
            <div>
              <h6>Nombre del solicitante</h6>
              <select {...register("NombreSoli")}>
                {Maestro.map((Opcion) => (
                  <option value={Opcion.Nombre} key={Opcion.id}>
                    {Opcion.Nombre}
                  </option>
                ))}
              </select>
            </div>
            {mensaje && <p className="mt-2 text-green-600">{mensaje}</p>}
            <button
              type="submit"
              onClick={handlemensaje}
              className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300"
            >
              Guardar Reporte
            </button>
            <br />
            <Link to="/">
              <button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">
                Menu
              </button>
            </Link>{" "}
            <br />
            <Link to={{ pathname: `/ListadoReporte/${Nombre}/${Id}` }}>
              <button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">
                Ver Lista de Reportes
              </button>
            </Link>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
}
