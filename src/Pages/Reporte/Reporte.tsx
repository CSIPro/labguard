import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLaboratorio } from '../LaboratorioContext';

const Reporte = () => {
  const { laboratorioId: laboratorioIdUrl } = useParams<{ laboratorioId: string }>();
  const { laboratorioId: contextoLaboratorioId, setLaboratorioId } = useLaboratorio();

  const [tipoMant, setTipoMant] = useState('');
  const [objeto, setObjeto] = useState('');
  const [especificacion, setEspecificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (laboratorioIdUrl) {
      setLaboratorioId(laboratorioIdUrl);
    }
  }, [laboratorioIdUrl, setLaboratorioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contextoLaboratorioId) {
      setError('Laboratorio no seleccionado.');
      return;
    }

    const nuevoReporte = {
      tipoMant,
      objeto,
      especificacion,
      descripcion,
      laboratorio: Number(contextoLaboratorioId),
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/reporte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoReporte),
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
          value={tipoMant}
          onChange={(e) => setTipoMant(e.target.value)}
          placeholder="Tipo de Mantenimiento"
          required
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          value={objeto}
          onChange={(e) => setObjeto(e.target.value)}
          placeholder="Objeto"
          required
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          value={especificacion}
          onChange={(e) => setEspecificacion(e.target.value)}
          placeholder="Especificación"
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
          style={{ padding: '10px', width: '250px', height: '100px', borderRadius: '5px', border: '1px solid #ccc' }}
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
          Crear Reporte
        </button>
      </form>

      {contextoLaboratorioId && (
        <div style={{ marginTop: '20px', fontSize: '16px' }}>
          <p><strong>ID del Laboratorio Actual:</strong> {contextoLaboratorioId}</p>
        </div>
      )}
    </div>
  );
};

export default Reporte;
