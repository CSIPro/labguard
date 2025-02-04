import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLaboratorio } from '../Context/LaboratorioContext';

const Reporte = () => {
  const { laboratorioId: laboratorioIdUrl } = useParams<{ laboratorioId: string }>();
  const { laboratorioId: contextoLaboratorioId, setLaboratorioId } = useLaboratorio();
  const [tipoMant, setTipoMant] = useState('');
  const [objeto, setObjeto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [asunto, setAsunto] = useState('');
  const [nombreSolicitante, setNombreSolicitante] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const estado = "PENDIENTE";

  useEffect(() => {
    if (laboratorioIdUrl) {
      setLaboratorioId(laboratorioIdUrl);
    }
  }, [laboratorioIdUrl, setLaboratorioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!contextoLaboratorioId) {
      setError('Laboratorio no seleccionado.');
      return;
    }

    const nuevoReporte = {
      tipoMant,
      objeto,
      descripcion,
      estado,
      asunto,
      nombreSolicitante,
      laboratorio: Number(contextoLaboratorioId),
    };

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reporte`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoReporte),
      });

      if (!response.ok) {
        throw new Error('Error al crear el reporte');
      }

      alert('Reporte creado exitosamente');
      setTipoMant('');
      setObjeto('');
      setDescripcion('');
      setAsunto('');
      setNombreSolicitante('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-lg font-inter text-textoLabs flex flex-col items-center justify-center min-h-screen">
      <h2>Crear Reporte</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex gap-10">
          <label>
            <input type="radio" value="MantEquipo" checked={tipoMant === 'MantEquipo'} onChange={() => setTipoMant('MantEquipo')} />
            Mantenimiento de Equipo
          </label>
          <label>
            <input type="radio" value="MantInstalacion" checked={tipoMant === 'MantInstalacion'} onChange={() => setTipoMant('MantInstalacion')} />
            Mantenimiento de Instalación
          </label>
        </div>
        <select value={objeto} onChange={(e) => setObjeto(e.target.value)} className="bg-selectorButton border-2 border-orange-400 rounded-xl p-2 w-90">
          <option value="">Seleccione un objeto</option>
          <option value="Computadora">Computadora</option>
          <option value="Proyector">Proyector</option>
          <option value="Otros">Otros</option>
        </select>
        {objeto === "Otros" && (
          <input type="text" placeholder="Especifique el objeto" value={objeto} onChange={(e) => setObjeto(e.target.value)} className="border-2 border-orange-400 rounded-md p-2" />
        )}
        <div className="flex items-center gap-2">
          <h4 className="m-0">Asunto del reporte:</h4>
          <input type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} placeholder="Escriba el Asunto" className="w-64 border-2 border-orange-400 rounded-md p-2" />
        </div>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del problema" className="w-[750px] h-[300px] border-2 border-orange-400 rounded-md p-2"></textarea>
        <div>
          <h6>Nombre del solicitante</h6>
          <select value={nombreSolicitante} onChange={(e) => setNombreSolicitante(e.target.value)} className="border-2 border-orange-400 rounded-md p-2">
            <option value="">Seleccione su nombre</option>
            <option value="Juan Pérez">Juan Pérez</option>
            <option value="Ana López">Ana López</option>
            <option value="Carlos Díaz">Carlos Díaz</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}>
          {loading ? 'Enviando...' : 'Crear Reporte'}
        </button>
        <Link to="/">
          <button type="button" className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md">Regresar</button>
        </Link>
      </form>
    </div>
  );
};

export default Reporte;
