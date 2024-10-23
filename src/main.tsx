import React, { createContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Reporte from "./Pages/Reporte/Reporte";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ListadoReportes from "./Pages/Reporte/ListadoReportes";
import InfoReporte from "./Pages/Reporte/InfoReportes";
import Login from "./Pages/Login";
import { UserProvider } from "./Pages/UserContext";
import Router from "./routes/routes";
import ComentariosAdicionales from "./Pages/ComentariosAdicionales";

// Define el contexto y su tipo
export const LabsContext = createContext<[LabReporte[], React.Dispatch<React.SetStateAction<LabReporte[]>>, { [key: string]: Comentario[] }, React.Dispatch<React.SetStateAction<{ [key: string]: Comentario[] }>>]>([[], () => {}, {}, () => {}]);

// Define la interfaz para los reportes
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

// Define la interfaz para los comentarios
export interface Comentario {
  texto: string;
  fecha: string;
  nombreUsuario: string; // Almacena el nombre del usuario
}

// Define las rutas de tu aplicación
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/Reporte/:Nombre/:Id",
    element: <Reporte />
  },
  {
    path: "/ListadoReporte/:Nombre/:Id",
    element: <ListadoReportes />
  },
  {
    path: "/InfoReporte/:IdReporte/:Nombre/:Id",
    element: <InfoReporte />
  },
  {
    path: "/ComentariosAdicionales/:IdReporte/:Nombre/:Id",
    element: <ComentariosAdicionales />
  },
  {
    path: "/Login",
    element: <Login />
  }
]);

// Componente raíz
function Root() {
  const [Labs, setLabs] = useState<LabReporte[]>([]);
  const [comentariosAdicionales, setComentariosAdicionales] = useState<{ [key: string]: Comentario[] }>({}); // Estado para comentarios

  return (
    <LabsContext.Provider value={[Labs, setLabs, comentariosAdicionales, setComentariosAdicionales]}>
      <UserProvider>
        <Router />
      </UserProvider>
    </LabsContext.Provider>
  );
}

// Renderiza el componente raíz
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);