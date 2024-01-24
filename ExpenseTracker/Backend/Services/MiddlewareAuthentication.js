const jwt = require('jsonwebtoken')
const secretKey = 'secret key'

function authenticateUser(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

module.exports = { authenticateUser }
