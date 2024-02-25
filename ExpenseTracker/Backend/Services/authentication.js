const jwt = require('jsonwebtoken')
require('dotenv').config()

function setToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.SECRET_KEY, { expiresIn: '1h' })    
}

function verifyToken(token) {
    try {
        if (!token) {
            throw new Error('Token not provided')
        }
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        throw new Error('Invalid token')
    }
}

module.exports = { setToken, verifyToken }
