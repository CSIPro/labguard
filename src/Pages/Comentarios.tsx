import React from 'react';
import { useParams } from 'react-router-dom';
import ComentariosAdicionales from './ComentariosAdicionales';

const Comentarios: React.FC = () => {
  const { Id } = useParams();

  return (
    <div>
      <h1>Comentarios para el Reporte {Id}</h1>
      <ComentariosAdicionales />
    </div>
  );
};

export default Comentarios;