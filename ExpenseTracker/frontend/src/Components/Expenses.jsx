import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseModal from './ExpenseModal'
import ExpenseItems from './ExpenseItems'
import { fetchExpenseData } from './Slices/expenseSlices'

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch()
  const expenseData = useSelector((state) => state.expenses.expenseData)

  useEffect(() => {
    if (!expenseData.length) {
      dispatch(fetchExpenseData())
    }
  }, [dispatch, expenseData])

  // Update searchResults when expenseData changes
  useEffect(() => {
    setSearchResults(expenseData.slice(0, maxTextSearchLength))
  }, [expenseData])

  const updateExpenseDetails = (expense) => {
    setUpdatedExpense(expense)
    setIsUpdate(true)
  }
  
  // search expenses
  let maxTextSearchLength = 6
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
      <ExpenseModal 
        editExpenses={ isUpdate ? updatedExpense : expenseData} 
        isUpdate = {isUpdate}
      />
      <ExpenseItems
        expenseDetails={searchResults}
        editExpenses={updateExpenseDetails}
      />
    </>
  )
}
