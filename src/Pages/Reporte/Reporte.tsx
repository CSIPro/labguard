import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
  { id: 4, Nombre: "Otros" }
];

const MantInstalacion = [
  { id: 1, Nombre: "Agua" },
  { id: 2, Nombre: "Gas" },
  { id: 3, Nombre: "otro" }
];
const Maestro = [
  { id: 1, Nombre: "Maria Elena" },
  { id: 2, Nombre: "Sapote con lechuga" },
  { id: 3, Nombre: "Cilantro" },
  { id: 4, Nombre: "Don Jesus" }
]

export default function Reporte() {

  const [Labs, setLabs] = useContext(LabsContext)

  let { Nombre, Id } = useParams();


  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      primaryOption: "MantEquipo",
      secondaryOption: MantEquipo[0].Nombre,
      asunto: "",
      descripcion: "",
      comentarios: "",
      NombreSoli: "",
      Otros:""
    },
  });


  const [mensaje, setMensaje] = useState("")

  const handlemensaje = () => {
    setMensaje("Se guardo correctamente")
  }

  
  
  const primaryOption = watch("primaryOption");
  useEffect(() => {
    setValue("secondaryOption", primaryOption === "MantEquipo" ? MantEquipo[0].Nombre : MantInstalacion[0].Nombre)

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
      Manotro:data.Otros,
      Asunto: data.asunto,
      Descripcion: data.descripcion,
      Comentarios: data.comentarios,
      NombreSoli: data.NombreSoli,
      Estado: "En Revision"
    };
    setLabs((prevLabs) => [...prevLabs, newReporte]);
    console.log("Nuevo reporte: ", newReporte)
  };
  setTimeout(() => {
    setMensaje("")
  }, 4000);
  return (

    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center mb-4">
      <h1 className="text-3xl font-extrabold text-center flex-grow text-colorArrowBack font-poppins">Registrar Reporte</h1>
      </header>
      <h1 className="text-lg font-inter text-textoLabs">{Nombre}</h1>
      <h1 className="text-lg font-inter text-textoLabs mb-4">Con el <span className="font-bold">ID </span><span className="font-bold">{Id}</span></h1>
      <h4 className="text-lg font-inter text-textoLabs">Fecha actual del reporte</h4>
      <div className="text-lg font-inter text-textoLabs">
      <Clock />
        <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", gap: "260px" }}> {/* NUEVO: Usar Flexbox con gap para espaciar ambas opciones de radio uniformemente */}
            {opciones.map((opcion) => (
              <label key={opcion.value} htmlFor={opcion.value} style={{ display: "block", marginTop: "20px" }}> {/* NUEVO: Se agrega margen derecho para separar cada opción */}
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

          <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}> {/* NUEVO: Se agrega margen superior para separar el select del grupo de radio buttons */}
            <select {...register("secondaryOption")}>
              {primaryOption === "MantEquipo"
                ? MantEquipo.map((opcion) => (
                  <option value={opcion.Nombre} key={opcion.id}>
                    {opcion.Nombre}
                    
                  </option>
                
                ) 
              
              )
                : MantInstalacion.map((opcion) => (
                  <option value={opcion.Nombre} key={opcion.id}>
                    {opcion.Nombre}
                  </option>
                  
                ))
                
            
                }
            </select>
            {/*<label htmlFor="otro" style={{ marginBottom: "5px" }}>
   Alineación de la etiqueta y el input
  Menciona otro:
</label> } 
            <input type="text" id="otro" {...register("Otros") } /> */}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", marginLeft: "-0px" }}> {/* Margen negativo para mover a la izquierda */}
  <h4 style={{ margin: 0 }}>Asunto del reporte:</h4>
  <input type="text" {...register("asunto")} placeholder="Escriba el Asunto" style={{ width: "250px" }} />
</div>
          <div>
            Descripcion del problema <br />
            <textarea  {...register("descripcion")} className="w-[750px]"></textarea>
          </div>
          <div>
            Comentarios adicionales <br />
            <textarea  {...register("comentarios")}></textarea>
          </div>
          <div>
            <h6>Nombre del solicitante</h6>
            <select {...register("NombreSoli")}>
              {Maestro.map((Opcion) => (
                <option value={Opcion.Nombre} key={Opcion.id}>{Opcion.Nombre}
                </option>))}
            </select>
          </div>
          {mensaje && <p className="mt-2 text-green-600">{mensaje}</p>}
          <button type="submit" onClick={handlemensaje}className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">Guardar Reporte</button><br />
          <Link to="/"><button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">Menu</button></Link> <br />
          <Link to={{ pathname: `/ListadoReporte/${Nombre}/${Id}` }}><button className="border-2 border-white px-4 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-black transition duration-300">Ver Lista de Reportes</button></Link>


        </form>

      </div>

    </main>

  );
}
