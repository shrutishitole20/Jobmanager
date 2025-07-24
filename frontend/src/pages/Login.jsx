import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/auth/login`,
        dataObj
      )
      setError(false)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <>
      <div className="text-center mt-5">
        <form
          style={{ maxWidth: '300px', margin: 'auto' }}
          onSubmit={handleLogin}
        >
          <Link to="/">
            <img className="mt-4" src={logo} height="72px" />
          </Link>
          <h1 className="mt-4 mb-3 fw-normal">Please log in</h1>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email Address"
            required
            autoFocus="true"
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <div className="mt-4">
            <button type="submit" className="btn btn-lg btn-primary w-100">
              Log in
            </button>
            <p className="mt-2">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
        {error && (
          <div className="alert alert-danger col-6 col-md-2  m-auto">
            Incorrect email or password
          </div>
        )}
      </div>
    </>
  )
}
export default Login
