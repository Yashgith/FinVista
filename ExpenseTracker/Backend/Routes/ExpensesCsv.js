const express = require('express')
const router = express.Router()
const Expense = require('../Models/ExpenseModal')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find()
    
    // Convert expenses data to CSV
    const csvWriter = createCsvWriter({
      path: 'expenses.csv',
      header: [
        { id: 'date', title: 'Date' },
        { id: 'amount', title: 'Amount' },
        { id: 'category', title: 'Category' },
        { id: 'description', title: 'Description' },
      ],
    })

    const csvData = expenses.map(expense => ({
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    }))

    csvWriter.writeRecords(csvData)
      .then(() => {
        console.log('CSV file created successfully')
        res.download('expenses.csv')
      })
      .catch(error => {
        console.error('Error creating CSV file:', error)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  } catch (error) {
    console.error('Error fetching expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
