import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';

const baseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Enviando datos a:", `${baseUrl}/auth/login`);
    console.log("Credenciales:", { email, password });

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);

      if (!response.ok) {
        alert('Usuario o contraseña incorrectos');
        return;
      }

      const data = JSON.parse(responseText);

      if (data.token) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          rol: data.rol,
        });

        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        navigate('/');
      } else {
        alert("Error: La respuesta no contiene un token válido.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
