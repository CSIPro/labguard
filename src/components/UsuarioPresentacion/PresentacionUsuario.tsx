import { FC } from "react"


    interface Props {
        idPersona: number;
        NombrePersonal: string;
        Ocupacion: string;
        ImagenPerfil: string;
    }      
    const PersonaCard: React.FC<Props> = ({ idPersona, NombrePersonal, Ocupacion, ImagenPerfil }) => {
        return (
          <div className="persona-card">
            <img src={ImagenPerfil} alt={`Profile of ${NombrePersonal}`} width={200} height={200}/>
            <h2>{NombrePersonal}</h2>
            <p>{Ocupacion}</p>
          
          </div>
        );
      };
      
      export default PersonaCard;