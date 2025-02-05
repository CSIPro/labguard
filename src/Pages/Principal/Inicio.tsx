import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useLaboratorio } from "../Context/LaboratorioContext";
import BeakerImage from "../../img/beaker-6308923.jpg";

const Inicio = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLaboratorioId } = useLaboratorio();

  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await fetch(`${baseUrl}/laboratorio`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de laboratorios");
        }
        const data = await response.json();
        setLaboratorios(data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error al cargar los laboratorios:", error);
      }
    };

    fetchLaboratorios();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleEliminarLaboratorio = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/laboratorio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el laboratorio');
      }
      setLaboratorios(laboratorios.filter((lab) => lab.id !== id));
      setShowConfirm(null);
    } catch (error) {
      setError('Error al eliminar el laboratorio');
      console.error('Error al eliminar laboratorio:', error);
    }
  };

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <div
  className="w-full p-4 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat h-80 rounded-lg"
  style={{ backgroundImage: `url(${BeakerImage})` }}
>
  {user?.name ? (
    <div className="bg-white bg-opacity-50 p-4 rounded-lg text-center">
      <h1 className="text-2xl font-semibold text-center bg-white bg-opacity-50 p-4 rounded-lg">
      Bienvenido a LabGuard
    </h1>
      <h1 className="text-2xl font-semibold">{user.name}</h1>
      <p className="text-gray-600">Rol: {user.rol}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  ) : (
    <h1 className="text-2xl font-semibold text-center bg-white bg-opacity-50 p-4 rounded-lg">
      Bienvenido a LabGuard
    </h1>
  )}
</div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <h2 className="text-xl font-bold text-colorNameUser my-3">
  Lista de laboratorios existentes
</h2>

{laboratorios.length === 0 ? (
  <p>No hay laboratorios disponibles</p>
) : (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-400  rounded-2xl overflow-hidden mb-4">
      <thead className="bg-backgroundTableBar border-b border-gray-400">
        <tr className="text-left text-gray-700 uppercase text-sm text-textoLabs leading-normal">
          <th className="py-3 px-6 border-r border-gray-400">Clave</th>
          <th className="py-3 px-6 border-r border-gray-400">Nombre</th>
          <th className="py-3 px-6">Acciones</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm divide-y divide-gray-300">
        {laboratorios.map((lab) => (
          <tr key={lab.clave} className="hover:bg-gray-100">
            <td className="py-3 px-6 border-r border-gray-300">{lab.clave}</td>
            <td className="py-3 px-6 border-r border-gray-300">{lab.nombre}</td>
            <td className="py-3 px-6 flex items-center space-x-2">
              {user?.rol === "ADMINISTRADOR" && (
                <>
                  <button
                    onClick={() => setShowConfirm(lab.id)}
                    className="text-red-500 hover:text-red-700"
                    >
                      Eliminar 🗑️
                  </button>

                  <Link to={`/EditarLaboratorio/${lab.id}`}>
                    <button
                      
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Editar ✏️
                    </button>
                  </Link>
                </>
              )}

              <Link to={{ pathname: `/ListadoReporte/${lab.nombre}/${lab.clave}` }}>
                <button className="text-green-500 hover:text-green-700">Historial de Reportes 📂</button>
              </Link>

              {user?.rol !== "MANTENIMIENTO" && (
          
                <Link to={{ pathname: `/Reporte/${lab.nombre}/${lab.id}` }}>
                  <button
                  onClick={()=> setLaboratorioId(lab.id)}
                  className="text-blue-500 hover:text-blue-700">
                    Crear Reporte 📩
                  </button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">
              ¿Estás seguro de que deseas eliminar este laboratorio?
            </h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEliminarLaboratorio(showConfirm)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {user?.rol === "ADMINISTRADOR" && (
        <>
          <Link to="/ListadoUsuarios">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Gestión de Usuarios
            </button>
          </Link>
          <Link to="/RegistroLaboratorio">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4">
              Registrar Laboratorio
            </button>
          </Link>
        </>
      )}

{user && (
<button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mb-8">
            Cerrar Sesión
</button>
        )}

    </main>
  );
};

export default Inicio;
