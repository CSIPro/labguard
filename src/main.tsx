import React from "react";
import { useState } from "react";
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
import { UserProvider, useUser } from "./Pages/UserContext"; // Importa UserProvider y useUser
import Router from "./routes/routes";

export const LabsContext = React.createContext<
  [LabReporte[], React.Dispatch<React.SetStateAction<LabReporte[]>>]
>([[], () => {}]);

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
  Asunto: string;
}

// Componente de protección de ruta inline
/*const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { username } = useUser();
  return username ? element : <Navigate to="/Login" replace />;
};*/

function Root() {
  const [Labs, setLabs] = useState<LabReporte[]>([]);
  return (
    <LabsContext.Provider value={[Labs, setLabs]}>
      <UserProvider>
        <Router />
      </UserProvider>
    </LabsContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
