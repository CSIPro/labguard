import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons';

const AgregarUsuario: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("ADMINISTRADOR");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { createUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name || !email || !password || !rol) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const newUser = { name, email, password, rol };
    const success = await createUser(newUser);

    if (success) {
      setSuccessMessage("Usuario agregado correctamente");
      setTimeout(() => navigate("/ListadoUsuarios"), 1500);
    } else {
      setError("No se pudo agregar el usuario");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-backgroundColor">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
          Agregar Usuario
        </h1>
      </header>

      <div className="fixed top-24 left-6">
        <Link
          to="/ListadoUsuarios"
          className="bg-buttonBrown text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brown-900 transition flex items-center gap-2"
        >
          <ArrowLeftOutlined />
          Regresar
        </Link>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96 mt-28 text-textoLabs"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <div className="mb-4">
          <label className="block font-semibold mb-2">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-colorOutline p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-colorOutline p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-colorOutline p-2 rounded-md border-2 focus:border-focusInputColor"

          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Rol:</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full border-2 border-colorOutline p-2 rounded-md"
          >
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="MAESTRO">Maestro</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
          </select>
        </div>

        <div className="flex justify-center mt-8">
    <button type="submit" className="w-52 bg-green-400 text-confirmTextGreen font-semibold py-2 rounded-full hover:bg-green-600 flex items-center justify-center">
      <UserAddOutlined className="mr-2" />
      Confirmar Usuario
    </button>
  </div>
      </form>
    </main>
  );
};

export default AgregarUsuario;
