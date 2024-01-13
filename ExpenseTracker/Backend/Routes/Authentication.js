const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const secretKey = 'a7ad81238bec606865468aef83bc1aa7732e537d14efb94817905c01036d6e1f'

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = decoded
    next()
  })
}

module.exports = Authentication
