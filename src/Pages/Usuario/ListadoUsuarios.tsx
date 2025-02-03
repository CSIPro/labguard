import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserContext";

interface Usuario {
  id: number;
  name: string;
  email: string;
  rol: string;
}

const ListadoUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { deleteUser } = useUser();

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de usuarios");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmDelete) return;

    const success = await deleteUser(id.toString());
    if (success) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } else {
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center mb-12">
  <h1 className="text-2xl font-bold text-center">Gestión de Usuario</h1>
</header>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full max-w-4xl border-collapse border border-gray-300 mb-12">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Correo</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No hay usuarios disponibles</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{usuario.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{usuario.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{usuario.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{usuario.rol}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <Link to={`/EditarUsuario/${usuario.id}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Ver / Editar
                    </button>
                  </Link>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <Link to="/AgregarUsuario">
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Agregar Usuario
        </button>
      </Link>
    </main>
  );
};

export default ListadoUsuarios;
