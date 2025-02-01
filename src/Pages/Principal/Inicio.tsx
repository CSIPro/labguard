import React, { useState } from "react";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";
import PersonaCard from "../../components/UsuarioPresentacion/PresentacionUsuario";
import BeakerImage from "../../img/beaker-6308923.jpg"; // Ajusta la ruta según sea necesario

const Inicio = () => {
  const { persona } = useUser();
  const laboratorios = [
    { id: 1, Nombre: "Laboratorio Química 1" },
    { id: 2, Nombre: "Laboratorio Química 2" },
    { id: 3, Nombre: "Laboratorio Química 3" },
    { id: 4, Nombre: "Laboratorio Química 4" },
  ];
  const [LabValue, setLabValue] = useState(laboratorios);

  return (
    // Contenedor principal
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      
      {/* Tarjeta de usuario con fondo personalizado */}
      <div
        className="bg-customCream p-6 mb-6 text-center w-full h-80 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${BeakerImage})` }}
      >
        {/* Si hay usuario, muestra su información */}
        {persona ? (
          <>
            <img
              src={persona.ImagenPerfil}
              alt={persona.NombrePersonal}
              className="w-16 h-16 rounded-full border-2 border-white mb-2"
            />
            <h1 className="text-2xl font-semibold text-white">{persona.NombrePersonal}</h1>
            <p className="text-lg text-gray-300">{persona.Ocupacion}</p>
            <PersonaCard
              idPersona={persona.idPersona}
              NombrePersonal={persona.NombrePersonal}
              Ocupacion={persona.Ocupacion}
              ImagenPerfil={persona.ImagenPerfil}
            />
          </>
        ) : (
          // Si no hay usuario, muestra un mensaje de bienvenida
          <h1 className="text-2xl font-semibold text-white bg-opacity-70 p-2 rounded-lg">
            Bienvenido a LabGuard
          </h1>
        )}
      </div>

      {/* Lista de laboratorios */}
      <h2 className="text-xl font-bold text-colorNameUser my-3">Lista de laboratorios existentes</h2>
      <ul>
        {LabValue.map((Labs) => (
          <li key={Labs.id} className="my-6 mb-4">
            <span className="text-textoLabs px-5">{Labs.Nombre}</span>
            <Link to={{ pathname: `/ListadoReporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-2 border-pink px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                Historial
              </button>
            </Link>
            <Link to={{ pathname: `/Reporte/${Labs.Nombre}/${Labs.id}` }}>
              <button className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                Hacer un reporte
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Inicio;
