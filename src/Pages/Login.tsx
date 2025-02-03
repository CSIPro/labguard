import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import bgImage from '../img/beaker-6308923.jpg';

const baseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const onFinish: FormProps<{ email: string; password: string; remember?: boolean }>['onFinish'] = async (values) => {
    console.log("Enviando datos a:", `${baseUrl}/auth/login`);
    console.log("Credenciales:", values);

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
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
    <div
  className="flex justify-center items-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
      <Form
        name="login"
        className="bg-white/90 p-8 rounded-lg shadow-md w-full max-w-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center text-textoLabs mb-6">Iniciar Sesión</h2>
        <Form.Item
  label="Correo electrónico: "
  name="email"
  rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
  labelCol={{ span: 24 }}
  wrapperCol={{ span: 24 }}
>
  <Input className="w-full" />
</Form.Item>

<Form.Item
  label="Contraseña: "
  name="password"
  rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
  labelCol={{ span: 24 }}
  wrapperCol={{ span: 24 }}
>
  <Input.Password className="w-full" />
</Form.Item>

{/*
        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>
        */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-50 bg-colorButtonOrange hover-custom text-white py-2 rounded-md">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
