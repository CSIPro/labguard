import React from "react";

interface Props {
  report: {
    id: number;
    objeto: string;
    especificacion: string;
    descripcion: string;
    tipoMant: string;
    creado: string;
    laboratorio: {
      id: number;
      clave: string;
      nombre: string;
    };
  };
}

export const VistaReporte: React.FC<Props> = ({ report }) => {
  return (
    <main>
      <h2>Detalles del Reporte</h2>
      <p><strong>ID:</strong> {report.id}</p>
      <p><strong>Objeto:</strong> {report.objeto}</p>
      <p><strong>Especificación:</strong> {report.especificacion}</p>
      <p><strong>Descripción:</strong> {report.descripcion}</p>
      <p><strong>Tipo de Mantenimiento:</strong> {report.tipoMant}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(report.creado).toLocaleDateString()}</p>
      <p><strong>Laboratorio:</strong> {report.laboratorio.nombre}</p>
    </main>
  );
};