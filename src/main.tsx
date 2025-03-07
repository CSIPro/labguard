import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./Pages/Context/UserContext";
import { LaboratorioProvider } from "./Pages/Context/LaboratorioContext";
import Reporte from "./Pages/Reporte/Reporte";
import ListadoReportes from "./Pages/Reporte/ListadoReportes";
import InfoReporte from "./Pages/Reporte/InfoReportes";
import Login from "./Pages/Login";
import ListadoUsuarios from "./Pages/Usuario/ListadoUsuarios"; 
import AgregarUsuario from "./Pages/Usuario/AgregarUsuario";
import EditarUsuario from "./Pages/Usuario/EditarUsuario";
import EditarLaboratorio from "./Pages/EditarLaboratorio";
import RegistroLab from "./Pages/RegistroLab";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/Login" />;
};

const router = createBrowserRouter([
  { path: "/Login", element: <Login /> },
  { 
    path: "/", element: (
    <ProtectedRoute>
      <App /> 
    </ProtectedRoute>
    ),
  },
  {
    path: "/Reporte/:Nombre/:Id",
    element: (
      <ProtectedRoute>
        <Reporte />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ListadoReporte/:Nombre/:Id",
    element: (
      <ProtectedRoute>
        <ListadoReportes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/InfoReporte/:IdReporte/:Nombre/:Id",
    element: (
      <ProtectedRoute>
        <InfoReporte />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ListadoUsuarios",
    element: (
      <ProtectedRoute>
        <ListadoUsuarios />
      </ProtectedRoute>
    ),
  },
  {
    path: "/AgregarUsuario",
    element: (
      <ProtectedRoute>
        <AgregarUsuario />
      </ProtectedRoute>
    ),
  },
  {
    path: "/EditarUsuario/:id",
    element: (
      <ProtectedRoute>
        <EditarUsuario />
      </ProtectedRoute>
    ),
  },
  {
    path: "/EditarLaboratorio/:id",
    element: (
      <ProtectedRoute>
        <EditarLaboratorio />
      </ProtectedRoute>
    ),
  },

  {
  path: "/RegistroLaboratorio",
    element: (
      <ProtectedRoute>
        <RegistroLab />
      </ProtectedRoute>
    ),
  },
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
