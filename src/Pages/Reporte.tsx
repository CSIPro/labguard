
import PersonaCard from "../components/UsuarioPresentacion/PresentacionUsuario";
const persona = {
    idPersona: 1,
    NombrePersonal: "Juan Martinez",
    Ocupacion: "Maestro en ciencias",
    ImagenPerfil: "../src/img/1.jpg",
  };
export default function Reporte() {
    return (
      <main>
        <h1>Registrar Reporte</h1>
        <div>
        Bienvenido:
        <PersonaCard
        idPersona={persona.idPersona}
        NombrePersonal={persona.NombrePersonal}
        Ocupacion={persona.Ocupacion}
        ImagenPerfil={persona.ImagenPerfil}/>
        <form action="">
            tipo de reporte
            <input type="text" />
      

        </form>
        </div>
        
      </main>
       
    );
  }