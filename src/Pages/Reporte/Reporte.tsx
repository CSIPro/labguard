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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para mensajes de éxito
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
    setSuccessMessage(''); // Resetear mensaje de éxito al intentar enviar el formulario

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
      usuarioMant: null,
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

      setSuccessMessage('Reporte creado exitosamente'); // Mensaje de éxito
      setTipoMant('');
      setObjeto('');
      setDescripcion('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-lg bg-backgroundColor font-inter text-textoLabs flex flex-col items-center justify-center">
      <header className="bg-colorNavHeaderPag w-full h-20 p-4 flex items-center justify-center mb-6">
        <h1 className="text-3xl font-extrabold text-center flex-grow text-colorArrowBack font-poppins">
          Registrar Reporte
        </h1>
      </header>
      
      {/* Mostrar mensaje de error o éxito */}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div className="text-lg font-inter text-textoLabs ">
          <h3 className="mb-2 font-semibold">Tipo de Mantenimiento</h3>
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
            className="w-full rounded-md bg-selectorButton border-2 border-orange-400 rounded-xl p-2 w-90"
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
          style={{ padding: '10px', width: '450px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
          style={{ padding: '10px', width: '450px', height: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#FCA61F',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '180px',
            marginTop: '15px',
          }}
        >
          Crear Reporte
        </button>
        
        <Link to={`/`}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#643b0e',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '180px',
            marginTop: '5px',
            marginBottom: '30px',
          }}>
            Regresar
            </button>
        </Link>
      </form>
    </div>
  );
};

export default Reporte;
