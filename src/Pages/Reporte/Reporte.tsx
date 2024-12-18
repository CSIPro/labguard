import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { LabReporte, LabsContext } from "../../main";
import Clock from "../../components/Reloj/Reloj";

const opciones = [
  { label: "Mantenimiento de Equipo", value: "MantEquipo" },
  { label: "Mantenimiento de Instalación", value: "MantInstalacion" },
];

const MantEquipo = [
  { id: 1, Nombre: "Selecciona el Equipo" },
  { id: 2, Nombre: "Campana" },
  { id: 3, Nombre: "Válvula" },
  { id: 4, Nombre: "Otros" },
];

const MantInstalacion = [
  { id: 1, Nombre: "Agua" },
  { id: 2, Nombre: "Gas" },
  { id: 3, Nombre: "Otros" },
];

const Maestro = [
  { id: 1, Nombre: "Maria Elena" },
  { id: 2, Nombre: "Sapote con lechuga" },
  { id: 3, Nombre: "Cilantro" },
  { id: 4, Nombre: "Don Jesus" },
];

export default function Reporte() {
  const [Labs, setLabs] = useContext(LabsContext);
  let { Nombre, Id } = useParams();

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      primaryOption: "", // Sin selección inicial
      secondaryOption: "",
      asunto: "",
      descripcion: "",
      comentarios: "",
      NombreSoli: "",
      Otros: "",
    },
  });

  const [mensaje, setMensaje] = useState("");

  const primaryOption = watch("primaryOption");
  const secondaryOption = watch("secondaryOption");

  useEffect(() => {
    if (primaryOption) {
      const defaultOption =
        primaryOption === "MantEquipo"
          ? MantEquipo[0].Nombre
          : MantInstalacion[0].Nombre;
      setValue("secondaryOption", defaultOption);
    } else {
      setValue("secondaryOption", "");
    }
  }, [primaryOption, setValue]);

  const handlemensaje = () => {
    setMensaje("Se guardó correctamente");
  };

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
      Asunto: data.asunto,
      Descripcion: data.descripcion,
      Comentarios: data.comentarios,
      NombreSoli: data.NombreSoli,
      Estado: "En Revision",
    };
    setLabs((prevLabs) => [...prevLabs, newReporte]);
    console.log("Nuevo reporte: ", newReporte);
  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center mb-4">
        <h1 className="text-3xl font-extrabold text-center flex-grow text-colorArrowBack font-poppins">
          Registrar Reporte
        </h1>
      </header>
      <h1 className="text-lg font-inter text-textoLabs">{Nombre}</h1>
      <h1 className="text-lg font-inter text-textoLabs mb-4">
        Con el <span className="font-bold">ID </span>
        <span className="font-bold">{Id}</span>
      </h1>
      <h4 className="text-lg font-inter text-textoLabs">
        Fecha actual del reporte
      </h4>
      <div className="text-lg font-inter text-textoLabs">
        <Clock />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", gap: "260px" }}>
            {opciones.map((opcion) => (
              <label
                key={opcion.value}
                htmlFor={opcion.value}
                style={{ display: "block", marginTop: "20px" }}
              >
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
          {primaryOption && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <select
                {...register("secondaryOption")}
                className="bg-selectorButton border-2 border-orange-400 rounded-xl p-2 w-90"
              >
                {(primaryOption === "MantEquipo" ? MantEquipo : MantInstalacion).map(
                  (opcion) => (
                    <option value={opcion.Nombre} key={opcion.id}>
                      {opcion.Nombre}
                    </option>
                  )
                )}
              </select>
              {secondaryOption === "Otros" && (
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="otro">Especifica el equipo: </label>
                  <input
                    type="text"
                    id="otro"
                    {...register("Otros")}
                    placeholder="Escribe aquí el equipo"
                    className="border-2 border-orange-400 rounded-md p-2 h-8 w-30"
                  />
                </div>
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginTop: "20px",
              marginLeft: "-0px",
            }}
          >
            <h4 style={{ margin: 0 }}>Asunto del reporte:</h4>
            <input
              type="text"
              {...register("asunto")}
              placeholder="Escriba el Asunto"
              style={{ width: "250px" }}
              className="border-2 border-orange-400 rounded-md"
            />
          </div>
          <div>
            <br />
            <textarea
              {...register("descripcion")}
              placeholder="Descripcion del problema"
              className="w-[750px] h-[300px] border-2 border-orange-400 rounded-md"
            ></textarea>
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
          <div className="mt-5 flex items-center justify-center gap-1">
            <button
              type="submit"
              onClick={handlemensaje}
              className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300"
            >
              Guardar Reporte
            </button>
            <br />
          </div>
          <Link to="/">
            <button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">
              Menu
            </button>
          </Link>
          <br />
          <Link to={{ pathname: `/ListadoReporte/${Nombre}/${Id}` }}>
            <button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">
              Ver Lista de Reportes
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
