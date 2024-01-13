const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
})

const Expense = mongoose.model('expenses', expenseSchema)

module.exports = Expense
