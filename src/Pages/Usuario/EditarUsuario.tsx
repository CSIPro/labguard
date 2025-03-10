import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { CheckOutlined } from '@ant-design/icons';

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

      <div className="mt-24 w-full flex justify-center">
        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 mt-8 text-textoLabs">
        <div className="mb-4">
        <label className="block font-semibold mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-2 border-colorOutline p-2 rounded-md"
          required
        />
        </div>

        <div className="mb-4">  
        <label className="block font-semibold mb-2">Correo:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-2 border-colorOutline p-2 rounded-md"
          required
        />
        </div>

        <div className="mb-4">
        <label className="block font-semibold mb-2">Rol:</label>
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full border-2 border-colorOutline p-2 rounded-md"
          required
        >
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="USUARIO">USUARIO</option>
        </select>
        </div>

<div className="mb-4">
        <label className="block font-semibold mb-2">Nueva Contraseña (opcional):</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border-2 border-colorOutline p-2 rounded-md"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
       </div>

        <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="w-52 bg-blue-500 text-confirmTextGreen font-semibold py-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
          disabled={!!passwordError}
        >
          Guardar Cambios
        <CheckOutlined className="ml-2" />

        </button>
        </div>
        
      </form>
    </main>
  );
};

export default EditarUsuario;
