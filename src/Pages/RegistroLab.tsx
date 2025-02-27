import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegistroLab = () => {
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [especificacion, setEspecificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado] = useState('PENDIENTE'); // Estado inicial fijo
  const [error, setError] = useState<string>('');
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoLaboratorio = {
      clave,
      nombre,// Estado se envía como "PENDIENTE"
    };

    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${baseUrl}/laboratorio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLaboratorio),
      });

      if (!response.ok) {
        throw new Error('Error al crear el reporte');
      }

      alert('Reporte creado exitosamente');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-backgroundColor">
    <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center fixed top-0 left-0 z-50 transition-all duration-300">
      <h1 className="text-3xl font-extrabold text-center text-colorArrowBack font-poppins">
       Registro de Laboratorios
      </h1>
    </header>

    <div className="fixed top-24 left-6">
        <Link
          to="/"
          className="bg-buttonBrown text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brown-900 transition flex items-center gap-2"
        >
          <ArrowLeftOutlined />
          Regresar
        </Link>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="w-600 bg-white p-6 rounded-lg shadow-md w-96 mt-28 text-textoLabs flex flex-col items-center">
      <div className="mb-4">
      <label className="block font-semibold mb-2">Clave:</label>
        <input
          value={clave}
            onChange={(e) => setClave(e.target.value)}
          placeholder="Clave Laboratorio"
          required
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        </div>
        
      <div className="mb-4">
      <label className="block font-semibold mb-2">Nombre:</label>
        <input
          value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del Laboratorio"
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        </div>

        <button
          type="submit"
          className="w-52 bg-blue-500 text-confirmTextGreen font-semibold py-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
        >
          Registrar Laboratorio
        </button>
      </form>
    </main>
    
  );
};

export default RegistroLab;