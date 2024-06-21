
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import PersonaCard from './components/UsuarioPresentacion/PresentacionUsuario'
import InputConEcho from './components/form-lab/form-lab'

function App() {
  const laboratorios = [
   {
    id: 1,
    Nombre:"Lab quimica 1",
   },
   {
    id: 2,
    Nombre:"Lab quimica 2",
   }
    
  ]
  
  const [LabValue, setLabValue]= useState(laboratorios);
  const [PersonalValue, setPersonalValue]=useState();

  const persona = {
    idPersona: 1,
    NombrePersonal: "Juan Martinez",
    Ocupacion: "Maestro en ciencias",
    ImagenPerfil: "../src/img/1.jpg",
  };
  
  const handleSubmit =(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
  }

  return (
    <main>
      <InputConEcho/>
      <h1>Bienvenio a LabGuard</h1>
      <div>
        <PersonaCard
        idPersona={persona.idPersona}
        NombrePersonal={persona.NombrePersonal}
        Ocupacion={persona.Ocupacion}
        ImagenPerfil={persona.ImagenPerfil}
      />
      </div>
      <h2>Lista de laboratorios existentes</h2>
      <h3>Vista de un maestro</h3>
      <form >
        <input type="text" />

      </form>
      <ul>
        {LabValue.map((Labs) => (
          <li key={Labs.id}>
            {Labs.Nombre} <button>Notificaciones</button><button ><Link to="/Reporte">Hacer un reporte</Link></button>
          </li>))}

      </ul>
      
    </main>
    
  )
}

export default App
