import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-light text-center p-3 rounded-2"
      style={{ width: '300px' }}
    >
      <p>Company: {job.company}</p>
      <p>Position: {job.position}</p>
      <p>Status: {job.status}</p>
      <button
        onClick={() => navigate(`/jobs/${job._id}/edit`)}
        className="btn btn-md w-75 btn-dark"
      >
        Edit
      </button>
    </div>
  )
}
export default JobCard
