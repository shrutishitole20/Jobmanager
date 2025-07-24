const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
  const { userId } = req.user
  const jobs = await Job.find({ createdBy: userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({ createdBy: userId, _id: jobId })

  if (!job) {
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!job) {
    throw new NotFoundError('Job not found')
  }

  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId })

  if (!job) {
    throw new NotFoundError('Job not found')
  }

  res.status(StatusCodes.OK).send()
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

module.exports = { getAllJobs, getJob, updateJob, deleteJob, createJob }
