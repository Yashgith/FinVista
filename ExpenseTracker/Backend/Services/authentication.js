const jwt = require('jsonwebtoken')
const { secretKey } = require('../Config')

function setToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, secretKey, { expiresIn: '1h' })    
}

function verifyToken(token) {
    try {
        if (!token) {
            throw new Error('Token not provided')
        }
        return jwt.verify(token, secretKey)
    } catch (error) {
        throw new Error('Invalid token')
    }
}

module.exports = { setToken, verifyToken }
