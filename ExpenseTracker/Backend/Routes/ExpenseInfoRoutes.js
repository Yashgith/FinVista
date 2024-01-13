const express = require('express')
const router = express.Router()
const Expense = require('../Models/ExpenseDetailsSchema') 

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find()
    res.json(expenses)
  } catch (error) {
    console.error('Error fetching expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// POST a new expense
router.post('/', async (req, res) => {
  const { date, title, amount, description } = req.body

  try {
    const existingExpense = await Expense.findOne({date, title})
    if(existingExpense) {
      return res.status(400).json({ message: 'Expense details already exists' })
    }
    const newExpense = new Expense({ date, title, amount, description })
    await newExpense.save()
    res.json(newExpense)
  } catch (error) {
    console.error('Error adding expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
