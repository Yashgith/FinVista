const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expensesInfoRouter = require('./Routes/ExpenseInfoRoutes')
const userInfoRouter = require('./Routes/UsersDetailsRoutes')
const {authenticateUser} = require('./Services/MiddlewareAuthentication')
// const expensesCsvRouter = require('./Routes/ExpensesCsv')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const authMiddleware = require('../Backend/Routes/Authentication')
// const userRoutes = require('../Backend/Routes/UsersDetails')
const cors = require('cors')

const app = express()
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ExpenseTracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/expensesInfo', expensesInfoRouter)
app.use('/userInfo', userInfoRouter)
// app.use('/expenses/csvFormat', expensesCsvRouter)
// app.use('/api/user', userRoutes)

// app.get('/api/dashboard', authMiddleware, (req, res) => {
//   res.json({ message: `Welcome ${req.user.name} to your dashboard!` })
// })

// Start the server
app.listen(3000, () => {
  console.log(`Server is running`)
})
