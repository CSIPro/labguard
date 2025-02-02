import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLaboratorio } from "./Context/LaboratorioContext";

const EditarLaboratorio = () => {
  const { id } = useParams<{ id: string }>();
  const { setLaboratorio } = useLaboratorio();
  const [localLaboratorio, setLocalLaboratorio] = useState<{ nombre: string; clave: string }>({ nombre: "", clave: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLaboratorio = async () => {
      try {
        const response = await fetch(`${baseUrl}/laboratorio/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del laboratorio");
        }
        const data = await response.json();
        setLocalLaboratorio({ nombre: data.nombre, clave: data.clave });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaboratorio();
  }, [id, baseUrl]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalLaboratorio((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/laboratorio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localLaboratorio),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar el laboratorio");
      }
      setLaboratorio({ id: id!, ...localLaboratorio });

      setSuccessMessage("Los cambios fueron guardados correctamente.");

      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/");
      }, 1500);

    } catch (error: any) {
      setError(error.message);
    }
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (isLoading) return <p className="text-center">Cargando laboratorio...</p>;

  return (
    <main className="min-h-screen bg-backgroundColor flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Laboratorio</h1>

      {successMessage && (
        <p className="bg-green-200 text-green-800 p-3 rounded-md mb-4 text-center w-full max-w-md">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={localLaboratorio.nombre}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2">Clave:</label>
        <input
          type="text"
          name="clave"
          value={localLaboratorio.clave}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Guardar Cambios
        </button>
      </form>
    </main>
  );
};

export default EditarLaboratorio;
