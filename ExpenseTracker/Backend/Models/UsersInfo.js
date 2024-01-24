const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  }
})

const userInfoModel = mongoose.model('userInfoModel', userInfoSchema)

module.exports = userInfoModel
