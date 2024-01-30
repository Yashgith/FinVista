import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseModal from './ExpenseModal'
import ExpenseItems from './ExpenseItems'
import { fetchExpenseData } from './Slices/expenseSlices'

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [updatedExpense, setUpdatedExpense] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch()

  // get expense details from state
  const expenseData = useSelector((state) => state.expenses.expenseData)
  const userId = useSelector((state) => state.auth.userId)
  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenseData(userId))
    }
  }, [dispatch, expenseData.length, userId])

  // Update searchResults when expenseData changes
  const updateExpenseDetails = (expense) => {
    setUpdatedExpense(expense)
    setIsUpdate(true)
  }
  
  // search expenses
  let maxTextSearchLength = 6
  useEffect(() => {
    if(expenseData.length) {
      setSearchResults(expenseData.slice(0, maxTextSearchLength))
    }
  }, [expenseData])

  const handleSearch = (e) => {
    let searchText = e.target.value
    let searchResults =
      searchText.length > 0
        ? expenseData.filter((item) =>
          (item.title && item.title.toLowerCase().startsWith(searchText.toLowerCase())) ||
          (item.amount && item.amount.toString().startsWith(searchText.toLowerCase())) 
        ) 
        : expenseData.slice(0, maxTextSearchLength)

    setSearchTerm(searchText)
    setSearchResults(searchResults)
  }
  const handleSearchDate = (e) => {
    let searchText = e.target.value
    let searchResults =
      searchText.length > 0
        ? expenseData.filter((item) => {
          return item.date.includes(searchText)
        }) : expenseData.slice(0, maxTextSearchLength)
    setSearchDate(searchText)
    setSearchResults(searchResults)
  }

  return (
    <>
      <div className="row container m-2">
        <div className='col-md-6'>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, amount..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className='col-md-2'>
          <input
            type="date"
            className="form-control"
            placeholder="Search..."
            value={searchDate}
            onChange={handleSearchDate}
          />
        </div>
          <ExpenseModal 
            editExpenses={ isUpdate ? updatedExpense : expenseData} 
            isUpdate = {isUpdate}
          />
      </div>
      <ExpenseItems
        expenseDetails={searchResults}
        editExpenses={updateExpenseDetails}
      />
    </>
  )
}
