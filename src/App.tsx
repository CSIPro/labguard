// App.tsx
import './App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PersonaCard from './components/UsuarioPresentacion/PresentacionUsuario';
import { useUser } from './Pages/UserContext';

function App() {
  const { persona } = useUser();
  const laboratorios = [
    { id: 1, Nombre: "Lab quimica 1" },
    { id: 2, Nombre: "Lab quimica 2" },
    { id: 3, Nombre: "Lab quimica 3" },
    { id: 4, Nombre: "Lab quimica 4" }
  ];
  const [LabValue, setLabValue] = useState(laboratorios);

  return (
    // Contenedor principal
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
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
      <h2>Lista de laboratorios existentes</h2>
      <ul>
        {LabValue.map((Labs) => (
          <li key={Labs.id}>
            {Labs.Nombre}
            <Link to={{ pathname: `/ListadoReporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-1 border-white px-4 py-2 rounded-sm bg-colorButtonOrange hover:bg-gray-300 text-black transition duration-300">Historial</button>
            </Link>
            <Link to={{ pathname: `/Reporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-2 border-white px-4 py-2 rounded-sm bg-colorButtonOrange hover:bg-gray-300 text-black transition duration-300">Hacer un reporte</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;