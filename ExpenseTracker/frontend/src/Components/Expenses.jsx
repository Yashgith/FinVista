import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import ExpenseModal from './ExpenseModal'
import ExpenseItems from './ExpenseItems'
import { setExpenseData } from './Slices/expenseSlices'

export default function Expenses() {
  const [expenseData, setDetails] = useState([])
  const [updatedExpense, setUpdatedExpense] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get expense details 
        const res = await axios.get('http://localhost:3000/expensesInfo')
        const data = res.data
        dispatch(setExpenseData(data))
        setDetails(data)
        if (!data) {
          throw `Invalid Response ${data}`
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [dispatch])

  let maxTextSearchLength = 6
  useEffect(() => {
    // Update searchResults when expenseData changes
    setSearchResults(expenseData.slice(0, maxTextSearchLength))
  }, [expenseData])

  const updateExpenseDetails = (expense) => {
    setUpdatedExpense(expense)
  }

  const handleSearch = (e) => {
    let searchText = e.target.value

    let searchResults =
      searchText.length > 0
        ? expenseData.filter((item) =>
              item.title && item.title
              .toLowerCase()
              .startsWith(searchText.toLowerCase())
          )
        : expenseData.slice(0, maxTextSearchLength)

    setSearchTerm(searchText)
    setSearchResults(searchResults)
  }

  return (
    <>
      <div className="container w-50 m-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ExpenseItems
        expenseData={searchResults}
        editExpenses={updateExpenseDetails}
      />
      <ExpenseModal 
        editExpenses={updatedExpense} 
      />
    </>
  )
}
