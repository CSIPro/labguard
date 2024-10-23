import React, { useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { LabsContext, Comentario } from '../main'; // Asegúrate de que esta ruta sea correcta
import { Table } from 'antd';

const ComentariosAdicionales: React.FC = () => {
  const { persona } = useUser();
  const { IdReporte } = useParams<{ IdReporte: string }>(); // Cambié Id a IdReporte
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const navigate = useNavigate();
  
  // Obtén el contexto
  const [labs, setLabs, comentariosAdicionales, setComentariosAdicionales] = useContext(LabsContext)!;

  useEffect(() => {
    if (IdReporte && comentariosAdicionales[IdReporte]) { // Cambié Id a IdReporte
      setComentarios(comentariosAdicionales[IdReporte]);
    }
  }, [IdReporte, comentariosAdicionales]);

  const handleAddComentario = () => {
    if (comentario.trim() !== '' && persona && IdReporte) { // Cambié Id a IdReporte
      const nuevoComentario: Comentario = {
        texto: comentario,
        fecha: new Date().toLocaleString(),
        nombreUsuario: persona.NombrePersonal,
      };

      const updatedComentarios = [...(comentariosAdicionales[IdReporte] || []), nuevoComentario]; // Cambié Id a IdReporte
      setComentariosAdicionales(prev => ({ ...prev, [IdReporte]: updatedComentarios })); // Cambié Id a IdReporte
      setComentarios(updatedComentarios);
      setComentario(''); // Limpiar el campo de texto
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombreUsuario',
      key: 'nombreUsuario',
    },
    {
      title: 'Comentario',
      dataIndex: 'texto',
      key: 'texto',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
  ];

  // Transformar los comentarios a la forma que necesita la tabla
  const dataSource = comentarios.map((c, index) => ({
    key: index,
    nombreUsuario: c.nombreUsuario,
    texto: c.texto,
    fecha: c.fecha,
  }));

  return (
    <div>
      <h2>Comentarios Adicionales</h2>
      {persona && (
        <div>
          <p><strong>Usuario:</strong> {persona.NombrePersonal}</p>
          <p><strong>Ocupación:</strong> {persona.Ocupacion}</p>
        </div>
      )}
      {/* Mostrar ID del reporte */}
      <p><strong>ID del Reporte:</strong> {IdReporte}</p> {/* Cambié Id a IdReporte */}
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe un comentario adicional..."
      />
      <button onClick={handleAddComentario}>Agregar Comentario</button>

      <h3>Comentarios</h3>
      <Table dataSource={dataSource} columns={columns} />

      <button onClick={() => navigate(-1)}>Regresar al Historial de Reportes</button>
    </div>
  );
};

export default ComentariosAdicionales;