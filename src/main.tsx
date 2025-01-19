import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./Pages/UserContext"
import { LaboratorioProvider } from "./Pages/LaboratorioContext";
import Reporte from "./Pages/Reporte/Reporte";
import ListadoReportes from "./Pages/Reporte/ListadoReportes";
import InfoReporte from "./Pages/Reporte/InfoReportes";
import Login from "./Pages/Login";
import ComentariosAdicionales from "./Pages/ComentariosAdicionales";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Reporte/:Nombre/:Id", element: <Reporte /> },
  { path: "/ListadoReporte/:Nombre/:Id", element: <ListadoReportes /> },
  { path: "/InfoReporte/:IdReporte/:Nombre/:Id", element: <InfoReporte /> },
  { path: "/ComentariosAdicionales/:IdReporte/:Nombre/:Id", element: <ComentariosAdicionales /> },
  { path: "/Login", element: <Login /> }
]);

function Root() {
  return (
    <LaboratorioProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </LaboratorioProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);