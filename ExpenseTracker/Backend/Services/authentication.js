const jwt = require('jsonwebtoken')
const secretKey = 'secret key'

function setToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, secretKey, { expiresIn: '1h' })    
}

function getToken(token) {
    if(!token) return null
    try {
        return jwt.verify(token, secretKey)
    } catch(error) {
        return error
    }
}

module.exports = { setToken, getToken }

