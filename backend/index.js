require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const jobRoutes = require('./routes/jobs')
const authRoutes = require('./routes/auth')
const connectDB = require('./db/connect')
const errorHandler = require('./middlewares/errorHandler')
const authenticate = require('./middlewares/authenticate')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/v1/jobs', authenticate, jobRoutes)
app.use('/api/v1/auth', authRoutes)

// Middlewares
app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server started on port ${process.env.PORT || 3000}...`)
    )
  } catch (err) {
    console.log(err)
  }
}

start()
