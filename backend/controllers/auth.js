const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
  console.log("Incoming Body (login):", req.body)  // ✅ Debug log

  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createToken()
  res.status(StatusCodes.OK).json({ msg: 'Login Route', name: user.name, token })
}

const register = async (req, res) => {
  console.log("Incoming Body (register):", req.body)  // ✅ Debug log

  const user = await User.create(req.body)
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json({ msg: 'Register Route', name: user.name, token })
}

module.exports = { login, register }
