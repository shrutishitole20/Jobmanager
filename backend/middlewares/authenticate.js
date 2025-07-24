const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Failed')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: decoded.userId, name: decoded.name }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication Failed')
  }
}

module.exports = authenticate
