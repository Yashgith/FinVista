import React, { useState } from 'react'
import axios from 'axios'

const AddExpenses = () => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Send the expense data to the Backend
    axios.post('http://localhost:3000/expenses', formData)
      .then(response => {
        console.log('Expense added successfully:', response.data)
      })
      .catch(error => console.error('Error adding expense:', error))
  }

  return (
    <div>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="number" name="amount" onChange={handleChange} required />
        <input type="text" name="category" onChange={handleChange} required />
        <textarea name="description" onChange={handleChange} required />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default AddExpenses
