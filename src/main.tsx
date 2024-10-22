import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Reporte from './Pages/Reporte';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ListadoReportes from './Pages/ListadoReportes';
import InfoReporte from './Pages/InfoReportes';
import Login from './Pages/Login';
import Comentarios from './Pages/Comentarios'; // Importa el nuevo componente
import { UserProvider, useUser } from './Pages/UserContext'; // Importa UserProvider y useUser

export const LabsContext = React.createContext<[
  LabReporte[], 
  React.Dispatch<React.SetStateAction<LabReporte[]>>,
  { [key: string]: Comentario[] }, // Comentarios por reporte
  React.Dispatch<React.SetStateAction<{ [key: string]: Comentario[] }>> // Función para actualizar comentarios
]>([[], () => {}, {}, () => {}]);

export interface LabReporte {
  Id: number;
  NombreLab: string | undefined;
  IdLab: string | undefined;
  FechaActual: string;
  HoraActual: string;
  TipoMant: string;
  MantObjeto: string;
  Manotro: string;
  Descripcion: string;
  Comentarios: string;
  NombreSoli: string;
  Estado: string;
}

export interface Comentario {
  texto: string;
  fecha: string;
  nombreUsuario: string; // Almacena el nombre del usuario
}

// Componente de protección de ruta inline
/*const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { username } = useUser();
  return username ? element : <Navigate to="/Login" replace />;
};*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> /* (
      <ProtectedRoute element={<App />} />
    ) */
  },
  {
    path: "/Reporte/:Nombre/:Id",
    element: <Reporte /> /* (
      <ProtectedRoute element={<Reporte />} />
    ) */
  },
  {
    path: "/ListadoReporte/:Nombre/:Id",
    element: <ListadoReportes /> /* (
      <ProtectedRoute element={<ListadoReportes />} />
    ) */
  },
  {
    path: "/InfoReporte/:IdReporte/:Nombre/:Id",
    element: <InfoReporte /> /* (
      <ProtectedRoute element={<InfoReporte />} />
    ) */
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Comentarios/:Id",
    element: <Comentarios />
  }
]);

function Root() {
  const [Labs, setLabs] = useState<LabReporte[]>([]);
  const [comentariosAdicionales, setComentariosAdicionales] = useState<{ [key: string]: Comentario[] }>({}); // Estado para comentarios

  return (
    <LabsContext.Provider value={[Labs, setLabs, comentariosAdicionales, setComentariosAdicionales]}>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </LabsContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);