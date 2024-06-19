import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Reporte from './Pages/Reporte'
import './index.css'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {path: "/",
    element: <App />
  },
  {
    path: "/Reporte",
    element: <Reporte />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
)
