const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
})

const Expense = mongoose.model('expenses', expenseSchema)

module.exports = Expense
