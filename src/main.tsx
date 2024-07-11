import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Reporte from './Pages/Reporte'
import './index.css'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import ListadoReportes from './Pages/ListadoReportes'
import InfoReporte from './Pages/InfoReportes'
export const LabsContext = React.createContext<[LabReporte[], React.Dispatch<React.SetStateAction<LabReporte[]>>]>([[], () => {}]);

export interface LabReporte {
  Id: number;
  NombreLab: string | undefined;
  IdLab: string | undefined;
  FechaActual: string;
  HoraActual: string;
  TipoMant: string;
  MantObjeto: string;
  Descripcion: string;
  NombreSoli: string;
  Estado: string;

}

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
    element: <ListadoReportes/>
  },
  {
    path:"/InfoReporte/:IdReporte/:Nombre",
    element: <InfoReporte/>
  }

]);
function Root(){
  const [Labs, setLabs]= useState<LabReporte[]>([])
  return(
    <LabsContext.Provider value={[Labs,setLabs]}>
      <RouterProvider router={router}></RouterProvider>
    </LabsContext.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>

    <Root />
   
  </React.StrictMode>
)
