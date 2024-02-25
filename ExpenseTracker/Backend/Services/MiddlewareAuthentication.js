const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    req.user = { id: user.id, email: user.email } 
    next()
  })
}

module.exports = { authenticateUser }
