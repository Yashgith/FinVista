const express = require('express')
const router = express.Router()
const Expense = require('../Models/ExpenseModal') 

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
  const { date, amount, category, description } = req.body

  try {
    const newExpense = new Expense({ date, amount, category, description })
    await newExpense.save()
    res.json(newExpense)
  } catch (error) {
    console.error('Error adding expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
