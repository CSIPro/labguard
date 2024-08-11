import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Pages/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'Maestro' | 'Mantenimiento'>('Maestro');
  const navigate = useNavigate();
  const { setUsername: setContextUsername, setUserType: setContextUserType } = useUser();  // Obtén setUsername y setUserType del contexto

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Falta la lógica para autenticar al usuario
    if (username === 'admin' && password === 'password') {
      setContextUsername(username);  // Establece el nombre de usuario en el contexto
      setContextUserType(userType);  // Establece el tipo de usuario en el contexto
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userType">Tipo de Usuario:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'Maestro' | 'Mantenimiento')}
          >
            <option value="Maestro">Maestro</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;