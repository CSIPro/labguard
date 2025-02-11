import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const EditarUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rol: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del usuario");
        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          rol: data.rol,
          password: "",
        });
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsuario();
  }, [id, baseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      if (e.target.value.length > 0 && e.target.value.length < 6) {
        setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (passwordError) return;
  
    const { password, ...rest } = formData;
    const updatedData = password ? { ...formData } : rest;
  
    const success = await updateUser(id!, updatedData);
    if (success) {
      setSuccessMessage("Los cambios se guardaron con éxito.");
      setTimeout(() => {
        navigate("/ListadoUsuarios");
      }, 2000);
    } else {
      setError("Error al actualizar usuario");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-backgroundColor">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Editar Usuario
        </h1>
      </header>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2">Correo:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2">Rol:</label>
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="USUARIO">USUARIO</option>
        </select>

        <label className="block mb-2">Nueva Contraseña (opcional):</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={!!passwordError}
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
};

export default EditarUsuario;
