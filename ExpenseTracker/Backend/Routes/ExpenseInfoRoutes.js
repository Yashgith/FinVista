const express = require('express')
const router = express.Router()
const Expense = require('../Models/ExpenseDetailsSchema') 
const {authenticateUser} = require('../Services/MiddlewareAuthentication')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

// GET all expenses
router.get('/', authenticateUser, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id })
    res.json(expenses.reverse())
  } catch (error) {
    console.error('Error fetching expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// POST a new expense 
router.post('/', authenticateUser, async (req, res) => {
  const { date, title, amount, description } = req.body
  const userId = req.user.id 
  try {
    if (await Expense.findOne({ date, userId })) {
      if (await Expense.findOne({ title, userId })) {
        return res.status(400).json({ message: 'Expense details already exist' })
      }
    }
    const newExpense = new Expense({ userId, date, title, amount, description })
    await newExpense.save()
    res.json(newExpense)
  } catch (error) {
    console.error('Error adding expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})


// Update Expense 
router.put('/:id', authenticateUser, async (req, res) => {
  const { date, title, amount, description } = req.body
  const userId = req.user.id
  try {
    const existingExpense = await Expense.findOne({ _id: req.params.id, userId })
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

// GET yearly expenses
router.get('/:year', authenticateUser, async (req, res) => {
  const userId = req.user.id 
  const year = parseInt(req.params.year)

  try {
    const expenses = await Expense.find({
      userId,
      date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) },
    })

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

router.get('/csv/:year', authenticateUser, async (req, res) => {
  const userId = req.user.id
  const year = parseInt(req.params.year)
  try {
    const expenses = await Expense.find({
      userId,
      date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) }
    })
    const csvWriter = createCsvWriter({
      path: `expenses_${year}.csv`,
      header: [
        { id: 'date', title: 'Date' },
        { id: 'amount', title: 'Amount' },
        { id: 'title', title: 'Category' },
        { id: 'description', title: 'Description' },
      ],
    })
    const csvData = expenses.map(expense => ({
      date: expense.date,
      amount: expense.amount,
      title: expense.title,
      description: expense.description,
    }))
    csvWriter.writeRecords(csvData)
      .then(() => {
        console.log(`CSV file for expenses in ${year} created successfully`)
        res.download(`expenses_${year}.csv`)
      })
      .catch(error => {
        console.error(`Error creating CSV file for expenses in ${year}:`, error)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  } catch (error) {
    console.error('Error fetching yearly expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
