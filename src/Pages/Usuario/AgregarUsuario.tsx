import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

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

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <div className="mb-4">
          <label className="block font-semibold">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Rol:</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="MAESTRO">Maestro</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Agregar Usuario
        </button>
      </form>
    </main>
  );
};

export default AgregarUsuario;
