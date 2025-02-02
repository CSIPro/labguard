import React, { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import { useLaboratorio } from '../Context/LaboratorioContext';

const Inicio = () => {
  const { user } = useUser();
  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLaboratorioId } = useLaboratorio();

  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [laboratorioAEliminar, setLaboratorioAEliminar] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await fetch(`${baseUrl}/laboratorio`);
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

  const handleDeleteLaboratorio = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/laboratorio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el laboratorio');
      }
      setLaboratorios(laboratorios.filter((lab) => lab.id !== id));
      setShowConfirm(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const confirmDelete = (id: string) => {
    setLaboratorioAEliminar(id);
    setShowConfirm(id);
  };

  const cancelDelete = () => {
    setShowConfirm(null);
  };

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-customCream w-full p-4 flex items-center justify-between">
        {user?.name ? (
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-600">Rol: {user.rol}</p>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl font-semibold text-center">Bienvenido a LabGuard</h1>
        )}
      </header>

      <div className="bg-customCream p-6 mb-6 text-center w-full h-80 flex flex-col items-center justify-center">
        {user?.name ? (
          <>
            <h1 className="text-2xl font-semibold whitespace-nowrap">{user.name}</h1>
            <p className="text-lg text-gray-600 whitespace-nowrap">{user.email}</p>
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
            <li key={lab.id} className="my-6 mb-4 flex items-center justify-between">
              <span className="text-textoLabs px-5">{lab.nombre}</span>

              {user?.rol === 'ADMINISTRADOR' && (
                <>
                  <button
                    onClick={() => confirmDelete(lab.id)}
                    className="border-2 border-red-500 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300 opacity-80">
                    Eliminar
                  </button>

                  <Link to={`/EditarLaboratorio/${lab.id}`}>
                    <button
                      onClick={() => handleSelectLaboratorio(lab.id)}
                      className="border-2 border-pink px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300 opacity-80">
                      Editar
                    </button>
                  </Link>
                </>
              )}

              <Link to={{ pathname: `/ListadoReporte/${lab.nombre}/${lab.id}` }}>
                <button
                  onClick={() => handleSelectLaboratorio(lab.id)}
                  className="border-2 border-pink px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                  Historial
                </button>
              </Link>

              {user?.rol !== 'MANTENIMIENTO' && (
                <Link to={{ pathname: `/Reporte/${lab.nombre}/${lab.id}` }}>
                  <button
                    onClick={() => handleSelectLaboratorio(lab.id)}
                    className="border-2 border-white px-4 py-2 rounded-lg bg-colorButtonOrange hover:bg-colorhoverButton text-white transition duration-300 opacity-80">
                    Hacer un reporte
                  </button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">¿Estás seguro de que deseas eliminar este laboratorio?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleDeleteLaboratorio(laboratorioAEliminar!)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Sí, eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {user?.rol === "ADMINISTRADOR" && (
        <Link to="/ListadoUsuarios">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Gestión de Usuarios
          </button>
        </Link>
      )}
    </main>
  );
};

export default Inicio;
