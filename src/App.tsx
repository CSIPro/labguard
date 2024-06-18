
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChangeEvent, FormEvent, useState } from 'react'

function App() {

  const [Value, setValue]= useState("");
  const handleInputChange=(event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSubmit =(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
  }

  return (
    <main>
      <h1>Bienvenio a LabGuard</h1>
      <h2>Lista de laboratorios existentes</h2>
      
    </main>
    
  )
}

export default App
