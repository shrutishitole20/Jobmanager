import { Link } from 'react-router-dom'
import board from '../assets/Whiteboard.png'

const LandingPage = () => {
  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      <div className="row">
        <div className="col-12 col-md-6 me-md-5">
          <img className="w-100" src={board} />
        </div>
        <div className="col-md-5">
          <h1 className="display-1 text-center mt-4">JOB MANAGER</h1>
          <p className="mt-4">
            Take control of your workday with Job Manager — the simplest way to
            organize, track, and prioritize your jobs. Whether you're managing
            freelance gigs, client tasks, or team projects, our intuitive
            dashboard helps you stay focused and never miss a deadline. Add,
            update, and complete jobs with ease — all in one place.
          </p>
          <p>
            Designed for professionals who want clarity and control, Job Manager
            streamlines your workflow so you can focus on getting things done.
            From job creation to progress tracking, you’ll always know what’s
            next. Get started today and experience a smarter way to manage your
            workload.
          </p>
          <Link to="/signup" className="btn btn-lg btn-primary d-block">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
