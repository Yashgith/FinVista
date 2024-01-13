const express = require('express')
const router = express.Router()
const User = require('../Models/UsersInfo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../Routes/Authentication')

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const newUser = new User({ name, email, password })
    await newUser.save()
    res.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const secretKey = 'a7ad81238bec606865468aef83bc1aa7732e537d14efb94817905c01036d6e1f'

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, secretKey, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
