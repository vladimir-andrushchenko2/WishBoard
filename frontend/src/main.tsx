import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './assets/css/index.css'
import App, { loader as appLoader } from './App'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
