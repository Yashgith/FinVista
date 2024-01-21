const express = require('express')
const router = express.Router()
const Expense = require('../Models/ExpenseDetailsSchema') 

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find()
    res.json(expenses.reverse())
  } catch (error) {
    console.error('Error fetching expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// POST a new expense
router.post('/', async (req, res) => {
  const { date, title, amount, description } = req.body

  try {
    const existingExpenseDate = await Expense.findOne({date})
    if(existingExpenseDate) {
      if(await Expense.findOne({title})) {
        return res.status(400).json({ message: 'Expense details already exists' })
      }
    }
    const newExpense = new Expense({ date, title, amount, description })
    await newExpense.save()
    res.json(newExpense)
  } catch (error) {
    console.error('Error adding expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Update Expense
router.put('/:id', async (req, res) => {
  const { date, title, amount, description } = req.body

  try {
    const existingExpense = await Expense.findById(req.params.id)

    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    existingExpense.date = date
    existingExpense.title = title
    existingExpense.amount = amount
    existingExpense.description = description

    await existingExpense.save()

    res.json(existingExpense)
  } catch (error) {
    console.error('Error updating expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:year', async (req, res) => {
  const year = parseInt(req.params.year)
  try {
    const expenses = await Expense.find({
      date: { $gte: new Date(`${year}-01-01`),
      $lt: new Date(`${year + 1}-01-01`) 
    }})
     const monthNames = [
      'Jan', 'Feb', 'March', 'April',
      'May', 'Jun', 'Jul', 'Aug',
      'Sept', 'Oct', 'Nov', 'Dec'
    ]
    const monthlySums = expenses.reduce((monthlySums, expense) => {
      const month = monthNames[new Date(expense.date).getMonth()]
      if (!monthlySums[month]) {
        monthlySums[month] = 0
      }
      monthlySums[month] += expense.amount
      return monthlySums
    }, {})

    res.json(monthlySums)
  } catch (error) {
    console.error('Error fetching monthly data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
