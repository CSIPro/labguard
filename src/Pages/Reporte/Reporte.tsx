import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLaboratorio } from '../Context/LaboratorioContext';

const Reporte = () => {
  const { laboratorioId: laboratorioIdUrl } = useParams<{ laboratorioId: string }>();
  const { laboratorioId: contextoLaboratorioId, setLaboratorioId } = useLaboratorio();

  const [tipoMant, setTipoMant] = useState('');
  const [objeto, setObjeto] = useState('');
  const [otroObjeto, setOtroObjeto] = useState('');
  const [especificacion, setEspecificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado] = useState('PENDIENTE');
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

    if (!tipoMant) {
      setError('Debe seleccionar un tipo de mantenimiento.');
      return;
    }

    if (!objeto) {
      setError('Debe seleccionar un objeto.');
      return;
    }

    const objetoFinal = objeto === "OTRO" ? otroObjeto : objeto;

    if (!objetoFinal) {
      setError('Debe ingresar un objeto personalizado.');
      return;
    }

    const nuevoReporte = {
      tipoMant,
      objeto: objetoFinal,
      especificacion,
      descripcion,
      estado,
      laboratorio: Number(contextoLaboratorioId),
    };

    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${baseUrl}/reporte`, {
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
        
        <div>
          <h3>Tipo de Mantenimiento</h3>
          <label>
            <input
              type="radio"
              name="tipoMant"
              value="Mantenimiento de Instalación"
              checked={tipoMant === "Mantenimiento de Instalación"}
              onChange={(e) => setTipoMant(e.target.value)}
            />
            Mantenimiento de Instalación
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="tipoMant"
              value="Mantenimiento de Equipo"
              checked={tipoMant === "Mantenimiento de Equipo"}
              onChange={(e) => setTipoMant(e.target.value)}
            />
            Mantenimiento de Equipo
          </label>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Objeto:</label>
          <select
            value={objeto}
            onChange={(e) => setObjeto(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Seleccionar objeto</option>
            <option value="CAMPANA">Campana</option>
            <option value="LLAVES">Llaves</option>
            <option value="MATRACES">Matraces</option>
            <option value="FUENTE DE AGUA">Fuente de Agua</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>

        {objeto === "OTRO" && (
          <input
            value={otroObjeto}
            onChange={(e) => setOtroObjeto(e.target.value)}
            placeholder="Ingrese el objeto"
            style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        )}

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
        
        <Link to={`/`}>
          <button>Regresar</button>
        </Link>
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
