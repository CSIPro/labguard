import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Reporte from './Pages/Reporte'
import './index.css'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import ListadoReportes from './Pages/ListadoReportes'
import { LabReporte } from './Pages/Reporte'
export const LabsContext = React.createContext<[LabReporte[], React.Dispatch<React.SetStateAction<LabReporte[]>>]>([[], () => {}]);



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
