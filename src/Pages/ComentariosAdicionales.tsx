import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { LabsContext, Comentario } from '../main';
import { Table } from 'antd';

const ComentariosAdicionales: React.FC = () => {
  const { persona } = useUser();
  const { Id } = useParams<{ Id: string }>();
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const navigate = useNavigate();
  const [labs, setLabs, comentariosAdicionales, setComentariosAdicionales] = React.useContext(LabsContext);

  useEffect(() => {
    if (Id && comentariosAdicionales[Id]) {
      setComentarios(comentariosAdicionales[Id]);
    }
  }, [Id, comentariosAdicionales]);

  const handleAddComentario = () => {
    if (comentario.trim() !== '' && persona && Id) {
      const nuevoComentario: Comentario = {
        texto: comentario,
        fecha: new Date().toLocaleString(),
        nombreUsuario: persona.NombrePersonal,
      };

      const updatedComentarios = [...(comentariosAdicionales[Id] || []), nuevoComentario];
      setComentariosAdicionales(prev => ({ ...prev, [Id]: updatedComentarios }));
      setComentarios(updatedComentarios);
      setComentario('');
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