import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import ExpenseModal from './ExpenseModal'
import ExpenseItems from './ExpenseItems'
import { setExpenseData } from './Slices/expenseSlices'

export default function Expenses() {
  const[expenseData, setDetails] = useState([])
  const[updatedExpense, setUpdatedExpense] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const updateExpenseDetails = (expense) => {
    setUpdatedExpense(expense)
  }


  return (
    <>
      <ExpenseModal editExpenses = {updatedExpense} />
      <ExpenseItems expenseData={expenseData} editExpenses={updateExpenseDetails} />
    </>
  )
}
