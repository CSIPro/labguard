
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChangeEvent, FormEvent, useState } from 'react'

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
  const [Value, setValue]= useState(laboratorios);

  

  const handleSubmit =(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
  }

  return (
    <main>
      <h1>Bienvenio a LabGuard</h1>
      <h2>Lista de laboratorios existentes</h2>
      
      <ul>
        {Value.map((Labs) => (
          <li key={Labs.id}>
            {Labs.Nombre} <button ><a href="/RandomPages">Hacer un reporte</a></button>
          </li>))}

      </ul>
      
    </main>
    
  )
}

export default App
