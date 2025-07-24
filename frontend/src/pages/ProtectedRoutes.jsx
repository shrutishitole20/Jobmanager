import NotFound from './NotFound'

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <NotFound />
  }
  return children
}
export default ProtectedRoutes
