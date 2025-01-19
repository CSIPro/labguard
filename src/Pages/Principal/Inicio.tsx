import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
import PersonaCard from '../../components/UsuarioPresentacion/PresentacionUsuario';
import { useLaboratorio } from '../LaboratorioContext';

const Inicio = () => {
  const { persona } = useUser();
  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLaboratorioId } = useLaboratorio();

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/laboratorio');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de laboratorios');
        }
        const data = await response.json();
        setLaboratorios(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error al cargar los laboratorios:', error);
      }
    };

    fetchLaboratorios();
  }, []);

  const handleSelectLaboratorio = (id: string) => {
    setLaboratorioId(id);
  };

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-customCream w-full p-4 flex items-center justify-between">
        {persona && (
          <div className="flex items-center">
            <img
              src={persona.ImagenPerfil}
              alt={persona.NombrePersonal}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-semibold">{persona.NombrePersonal}</h1>
              <p className="text-gray-600">{persona.Ocupacion}</p>
            </div>
          </div>
        )}
        {!persona && <h1 className="text-2xl font-semibold text-center">Bienvenido a LabGuard</h1>}
      </header>

      <div className="bg-customCream p-6 mb-6 text-center w-full h-80 flex flex-col items-center justify-center">
        {persona ? (
          <>
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
      
      {error && <p className="text-red-500">Error: {error}</p>}

      <h2 className="text-xl font-bold text-colorNameUser my-3">Lista de laboratorios existentes</h2>
      
      {laboratorios.length === 0 ? (
        <p>No hay laboratorios disponibles</p>
      ) : (
        <ul>
          {laboratorios.map((lab) => (
            <li key={lab.id} className="my-6 mb-4">
              <span className="text-textoLabs px-5">{lab.nombre}</span>
              <Link to={{ pathname: `/ListadoReporte/${lab.nombre}/${lab.id}` }}>
                <button 
                  onClick={() => handleSelectLaboratorio(lab.id)}
                  className="border-2 border-pink px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                  Historial
                </button>
              </Link>
              <Link to={{ pathname: `/Reporte/${lab.nombre}/${lab.id}` }}>
                <button 
                  onClick={() => handleSelectLaboratorio(lab.id)}
                  className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                  Hacer un reporte
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Inicio;