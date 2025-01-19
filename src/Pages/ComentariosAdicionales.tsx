import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useLaboratorio } from './LaboratorioContext';
import { Table } from 'antd';

// Definimos la interfaz para Comentario
interface Comentario {
    texto: string;
    fecha: string;
    nombreUsuario: string;
}

const ComentariosAdicionales: React.FC = () => {
    const { persona } = useUser();
    const { IdReporte } = useParams<{ IdReporte: string }>(); 
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const navigate = useNavigate();
    
    // Utilizando LaboratorioContext
    const { laboratorioId } = useLaboratorio();

    // Cargar comentarios desde localStorage al montar el componente
    useEffect(() => {
        const storedComentarios = localStorage.getItem(`comentarios-${IdReporte}`);
        if (storedComentarios) {
            setComentarios(JSON.parse(storedComentarios));
        }
    }, [IdReporte]);

    const handleAddComentario = () => {
        if (comentario.trim() !== '' && persona && IdReporte) {
            const nuevoComentario: Comentario = {
                texto: comentario,
                fecha: new Date().toLocaleString(),
                nombreUsuario: persona.NombrePersonal,
            };

            const updatedComentarios = [...comentarios, nuevoComentario];
            setComentarios(updatedComentarios);
            
            // Guardar en localStorage para persistencia temporal
            localStorage.setItem(`comentarios-${IdReporte}`, JSON.stringify(updatedComentarios));

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
            <p><strong>ID del Reporte:</strong> {IdReporte}</p>
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
