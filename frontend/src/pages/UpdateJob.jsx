import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import { useEffect, useState } from 'react'
import logo from '../assets/letter-j.png'

const UpdateTask = () => {
  const { id } = useParams()
  const [job, setJob] = useState([])
  const navigate = useNavigate()

  const editJob = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      await axiosInstance.patch(`/jobs/${id}`, dataObj)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const deleteJob = async () => {
    try {
      await axiosInstance.delete(`/jobs/${id}`)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`)
        setJob(res.data.job)
      } catch (err) {
        console.log(err)
      }
    }

    getJob()
  }, [])

  return (
    <>
      <div className="text-center mt-5">
        <form style={{ maxWidth: '300px', margin: 'auto' }} onSubmit={editJob}>
          <Link to="/dashboard">
            <img className="mt-4 mb-4" src={logo} height="72px" />
          </Link>
          <input
            className="form-control"
            type="text"
            name="company"
            placeholder="Company"
            defaultValue={job.company}
            required
          />
          <input
            className="form-control"
            type="text"
            name="position"
            placeholder="Position"
            defaultValue={job.position}
            required
          />
          <select name="status" className="form-control">
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
          <div className="mt-4">
            <button type="submit" className="btn btn-dark w-100 btn-lg mb-2">
              Edit
            </button>
            <button
              type="button"
              onClick={deleteJob}
              className="btn btn-danger w-100 btn-lg"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default UpdateTask
