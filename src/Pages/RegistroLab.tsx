import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Crear Reporte</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        
        <input
          value={clave}
            onChange={(e) => setClave(e.target.value)}
          placeholder="Clave"
          required
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#08a3ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '250px',
            marginTop: '15px',
          }}
        >
          Registrar Laboratorio
        </button>
        <Link to={`/`}>
        <button>Regresar</button>
        </Link>
      </form>
    </div>
    
  );
};

export default RegistroLab;