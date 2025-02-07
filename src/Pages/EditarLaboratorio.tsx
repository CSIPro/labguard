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
    <main
  className="min-h-screen flex flex-col items-center justify-center"
  style={{ backgroundImage: "url('/src/img/beaker-6308923.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
>
  {successMessage && (
    <p className="bg-green-200 text-green-800 p-3 rounded-md mb-4 text-center w-full max-w-md">
      {successMessage}
    </p>
  )}

  <form onSubmit={handleSubmit} className="w-full max-w-md bg-white bg-opacity-80 p-12 shadow-md rounded-md text-textoLabs">
    <h1 className="text-2xl font-bold text-center text-textoLabs mb-8">Editar Laboratorio</h1>
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
      className="w-full p-2 mb-12 border rounded"
      required
    />

<div className="flex justify-center">
  <button
    type="submit"
    className="flex items-center justify-center gap-2 bg-buttonBrown text-white p-2 rounded-full hover:bg-colorhoverBrown w-[200px] px-4"
  >
    <span className="flex-1 text-center">Guardar Cambios</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </button>
</div>



      </form>
    </main>
  );
};

export default EditarLaboratorio;
