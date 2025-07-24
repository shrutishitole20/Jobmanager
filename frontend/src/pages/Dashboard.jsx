import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import JobCard from '../components/JobCard'

const Dashboard = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])

  const addJob = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const dataObj = Object.fromEntries(data)
    form.reset()
    try {
      const res = await axiosInstance.post('/jobs', dataObj)
      const newJobs = [...jobs, res.data.job]
      setJobs(newJobs)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axiosInstance.get('/jobs')
        setJobs(res.data.jobs)
      } catch (err) {
        console.log(err)
      }
    }

    getJobs()
  }, [])

  return (
    <>
      <nav className="navbar bg-dark fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img src={logo} width="40px" alt="Logo" />
          </a>
          <Link to="/" className="btn btn-lg btn-danger" onClick={handleLogout}>
            Log out
          </Link>
        </div>
      </nav>
      <div style={{ margin: '7rem' }} className="text-center mb-5">
        <form style={{ maxWidth: '300px', margin: 'auto' }} onSubmit={addJob}>
          <input
            className="form-control"
            type="text"
            name="company"
            placeholder="Company"
            required
          />
          <input
            className="form-control"
            type="text"
            name="position"
            placeholder="Position"
            required
          />
          <div className="mt-4">
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="container d-flex gap-5 flex-wrap justify-content-center">
        {jobs.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
    </>
  )
}
export default Dashboard
