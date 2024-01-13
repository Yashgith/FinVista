import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import ExpensesGraph from './ExpensesGraph'

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    // get Data from Backend
    axios.get('http://localhost:3000/expenses')
      .then(response => {  setExpenses(response.data) 
      console.log(response.data)})
      .catch(error => console.error('Error fetching expenses:', error))
  }, [])

  const handleExportCSV = () => {
    // Trigger the export of expenses as CSV
    axios.get('http://localhost:3000/expenses/csvFormat', { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'text/csv' })

        // Create a download link
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'expenses.csv'

        // Append the link to the body and trigger the download
        document.body.appendChild(link)
        link.click()

        // Remove the link after download
        document.body.removeChild(link)
      })
      .catch(error => console.error('Error exporting expenses as CSV:', error))
  }

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.date} - {expense.amount} - {expense.category} - {expense.description}
          </li>
        ))}
      </ul>
      <button onClick={handleExportCSV}>Download Report</button>
      {/* <ExpensesGraph /> */}
    </div>
  )
}

export default ViewExpenses
