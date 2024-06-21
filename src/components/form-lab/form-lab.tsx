import { useState } from "react";
function InputConEcho() {
    const [texto, setTexto] = useState(''); // Estado para almacenar el texto
  
    const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setTexto(evento.target.value);
      };
  
    return (
      <div>
        <input 
          type="text" 
          value={texto} 
          onChange={manejarCambio}
          placeholder="Escribe algo..." 
        />
        <p>{texto}</p> {/* Mostrar el texto en tiempo real */}
      </div>
    );
  }
  
  export default InputConEcho;