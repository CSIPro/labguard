
import './App.css'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import PersonaCard from './components/UsuarioPresentacion/PresentacionUsuario'


function App() {
  const laboratorios = [
   {
    id: 1,
    Nombre:"Lab quimica 1",
   },
   {
    id: 2,
    Nombre:"Lab quimica 2",
   },
   {
    id: 3,
    Nombre:"Lab quimica 3",
   }
   ,
   {
    id: 4,
    Nombre:"Lab quimica 4",
   }
  ]
  
  const [LabValue, setLabValue]= useState(laboratorios);
  
  const persona = {
    idPersona: 1,
    NombrePersonal: "Juan Martinez",
    Ocupacion: "Maestro en ciencias",
    ImagenPerfil: "../src/img/1.jpg",
  };
  


  return (
    <main>
      <h1 className="text-2xl font-semibold text-center">Bienvenio a LabGuard</h1>
      <div className="rounded-md bg-violet-400">
        <PersonaCard
        idPersona={persona.idPersona}
        NombrePersonal={persona.NombrePersonal}
        Ocupacion={persona.Ocupacion}
        ImagenPerfil={persona.ImagenPerfil}
      />
      </div>
      <h2>Lista de laboratorios existentes</h2>
      <h3>Vista de un maestro</h3>
     
      <ul>
        {LabValue.map((Labs) => (
          <li key={Labs.id}>
            {Labs.Nombre} <Link to={{pathname:`/ListadoReporte/${Labs.Nombre}/${Labs.id}`}}><button>Notificaciones</button></Link><Link to={{pathname:`/Reporte/${Labs.Nombre}/${Labs.id}`}}><button >Hacer un reporte</button></Link>
          </li>))}

      </ul>
      
    </main>
    
  )
}

export default App
