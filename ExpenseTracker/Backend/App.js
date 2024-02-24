const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expensesInfoRouter = require('./Routes/ExpenseInfoRoutes')
const userInfoRouter = require('./Routes/UsersDetailsRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

// added cors for authentication
const corsOptions = {
  origin: ['https://deploy-mern-lwhq.vercel.app'],
  methods: ["POST", "GET"],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ExpenseTracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))

app.get('/', (req, res) => {
  res.json("hello")
})
// Middleware
app.use(bodyParser.json())

// Routes
app.use('/expensesInfo', expensesInfoRouter)
app.use('/userInfo', userInfoRouter)

app.listen(3000, () => {
  console.log(`Server is running`)
})
