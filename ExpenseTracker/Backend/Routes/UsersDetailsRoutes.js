const express = require('express')
const router = express.Router()
const userInfoModel = require('../Models/UsersInfo')
const {setToken} = require('../Services/authentication')
const cookieParser = require('cookie-parser')

router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await userInfoModel.findOne({ email })
    if(existingUser) {
        return res.status(400).json({ message: 'User details already exists' })
    }
    const newUser= new userInfoModel({ email, password })
    await newUser.save()
    res.json(newUser)
  } catch (error) {
    console.error('Error adding User:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await userInfoModel.findOne({ email, password })
    if(!existingUser) {
        return res.status(400).json({ message: 'User details are not exists' })
    }
    const token = setToken(existingUser)
    res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 })
    res.json({ user: existingUser, token })
  } catch (error) {
    console.error('Error adding User:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
