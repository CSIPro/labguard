// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Pages/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUsername: setContextUsername, setUserType: setContextUserType, setPersona } = useUser();  

  // Mock de datos de usuarios y personas
  const users = [
    { username: 'admin', password: 'password', userType: 'Maestro' as 'Maestro', persona: { idPersona: 1, NombrePersonal: 'Juan Martinez', Ocupacion: 'Maestro en ciencias', ImagenPerfil: '../src/img/maestro.png' }},
    { username: 'mantenimiento', password: 'password', userType: 'Mantenimiento' as 'Mantenimiento', persona: { idPersona: 2, NombrePersonal: 'Ana López', Ocupacion: 'Técnico de mantenimiento', ImagenPerfil: '../src/img/mantenimiento.jpg' }},
    // Agrega más usuarios aquí
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setContextUsername(username);
      setContextUserType(user.userType as 'Maestro' | 'Mantenimiento');  // Aserción de tipo
      setPersona(user.persona);
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
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;