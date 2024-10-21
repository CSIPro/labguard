import React, {useState} from 'react'
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
import PersonaCard from '../../components/UsuarioPresentacion/PresentacionUsuario';
const Inicio = () => {
    const {persona} =useUser()
    const laboratorios = [
      { id: 1, Nombre: "Laboratorio Química 1" },
      { id: 2, Nombre: "Laboratorio Química 2" },
      { id: 3, Nombre: "Laboratorio Química 3" },
      { id: 4, Nombre: "Laboratorio Química 4" }
    ];
    const [LabValue, setLabValue] = useState(laboratorios);
  
  return (
      // Contenedor principal
      <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      {/* Nuevo: Encabezado con la imagen del perfil del maestro y el nombre */}
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
              <h1 className="text-2xl font-semibold">{persona.NombrePersonal}</h1>
              <p className="text-gray-600">{persona.Ocupacion}</p>
            </div>
          </div>
        )}
        {!persona && <h1 className="text-2xl font-semibold text-center">Bienvenido a LabGuard</h1>}
      </header>
      {/* Fin de la sección de encabezado */}

      {/* Contenedor de la tarjeta de usuario con fondo customCream */}
      <div className="bg-customCream p-6 mb-6 text-center w-full h-80 flex flex-col items-center justify-center">
        {/* Verifica si hay información de usuario disponible */}
        {persona ? (
          <>
            {/* Muestra el nombre y ocupación del usuario */}
            <h1 className="text-2xl font-semibold whitespace-nowrap">{persona.NombrePersonal}</h1>
            <p className="text-lg text-gray-600 whitespace-nowrap">{persona.Ocupacion}</p>
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
      <h2 className="text-xl font-bold text-colorNameUser my-3">Lista de laboratorios existentes</h2>
      <ul>
        {LabValue.map((Labs) => (
          <li key={Labs.id} className="my-6 mb-4">
            <span className="text-textoLabs px-5">{Labs.Nombre}</span>
            <Link to={{ pathname: `/ListadoReporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-2 border-pink px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">Historial</button>
            </Link>
            <Link to={{ pathname: `/Reporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">Hacer un reporte</button>
            </Link>
          </li>
        ))}
      </ul>

     
    </main>
  )
}

export default Inicio
