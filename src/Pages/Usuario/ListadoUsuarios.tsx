import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { EyeOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";

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
    <main className="min-h-screen flex flex-col items-center p-6 bg-backgroundColor">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Gestión de Usuarios
        </h1>
      </header>

      {/* 🔹 Botón de regresar en la esquina superior izquierda */}
      <div className="fixed top-24 left-6">
        <Link
          to="/"
          className="bg-buttonBrown text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brown-900 transition flex items-center gap-2"
        >
          <ArrowLeftOutlined />
          Regresar
        </Link>
      </div>

      {error ? (
        <p className="text-red-500 mt-28">Error: {error}</p>
      ) : (
        <table className="w-full max-w-4xl bg-backgroundTable border-separate border-spacing-0 border-4 border-tableLines mb-12 mt-28 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-colorNavHeaderPag text-textoLabs">
              <th className="border border-tableLines px-4 py-2">ID</th>
              <th className="border border-tableLines px-4 py-2">Nombre</th>
              <th className="border border-tableLines px-4 py-2">Correo</th>
              <th className="border border-tableLines px-4 py-2">Rol</th>
              <th className="border border-tableLines px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No hay usuarios disponibles</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="text-center text-textoLabs">
                  <td className="border border-tableLines px-4 py-2">{usuario.id}</td>
                  <td className="border border-tableLines px-4 py-2">{usuario.name}</td>
                  <td className="border border-tableLines px-4 py-2">{usuario.email}</td>
                  <td className="border border-tableLines px-4 py-2">{usuario.rol}</td>
                  <td className="border border-tableLines px-4 py-2 flex justify-center gap-2">
                    <Link to={`/EditarUsuario/${usuario.id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-40 flex items-center justify-center">
                        <EyeOutlined className="mr-2" />
                        Ver / Editar
                        <EditOutlined className="ml-2" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 w-40 flex items-center justify-center"
                    >
                      Eliminar
                      <DeleteOutlined className="ml-2" />
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
