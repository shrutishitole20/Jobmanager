import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './pages/ProtectedRoutes'
import UpdateJob from './pages/UpdateJob'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/jobs/:id/edit',
    element: (
      <ProtectedRoutes>
        <UpdateJob />
      </ProtectedRoutes>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
