import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'

const ExpensesGraph = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch expenses data from the API
    axios.get('http://localhost:3000/expenses')
      .then(response => {
        const expensesData = response.data
        setData(expensesData)
      })
      .catch(error => console.error('Error fetching expenses:', error))
  }, [])

  // Process data to get expenses per month
  const expensesByMonth = data.reduce((acc, expense) => {
    const month = new Date(expense.date).getMonth() + 1 
    const year = new Date(expense.date).getFullYear()
    const key = `${year}-${month}`

    if (!acc[key]) {
      acc[key] = 0
    }

    acc[key] += expense.amount
    return acc
  }, {})

  const plotData = [{
    x: Object.keys(expensesByMonth),
    y: Object.values(expensesByMonth),
    type: 'bar',
    marker: { color: 'blue' },
  }]

  return (
    <div>
      <Plot
        data={plotData}
        layout={{ width: 800, height: 400, title: 'Expenses vs Month' }}
      />
    </div>
  )
}

export default ExpensesGraph
