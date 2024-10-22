import React from "react";
import ListadoReportes from "../Pages/Reporte/ListadoReportes";
import App from "../App";
import Reporte from "../Pages/Reporte/Reporte";
import InfoReporte from "../Pages/Reporte/InfoReportes";
import Login from "../Pages/Login";
import { UserProvider } from "../Pages/UserContext";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
const routes = createBrowserRouter([
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
      }
]);
const Router: React.FC = () => {
    return <RouterProvider router={routes} />;
  };
export default Router;