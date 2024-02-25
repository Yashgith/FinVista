const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expensesInfoRouter = require('./Routes/ExpenseInfoRoutes')
const userInfoRouter = require('./Routes/UsersDetailsRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

// Added cors for authentication
app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
}))

app.use(cookieParser())

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
})

app.get('/', (req, res) => {
  res.json("hello")
})

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/expensesInfo', expensesInfoRouter)
app.use('/userInfo', userInfoRouter)

app.options('*', cors())

app.listen(3000, () => {
  console.log(`Server is running on port`)
})

module.exports = app
