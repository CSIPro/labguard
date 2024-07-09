import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Reporte from './Pages/Reporte'
import './index.css'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import ListaReporte from './Pages/ListadoReportes'
import { LabProvider } from './Context/LabsContexto'



const router = createBrowserRouter([
  
  {path: "/",
    element: <App />
  },
  {
    path: "/Reporte/:Nombre/:Id",
    element:<Reporte />
  },
  {
    path:"/ListadoReporte/:Nombre/:Id",
    element: <ListaReporte/>
  }

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>

    <RouterProvider router={router} />
   
  </React.StrictMode>
)
