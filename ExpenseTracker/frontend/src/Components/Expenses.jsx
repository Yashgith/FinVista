import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ExpenseModal from './ExpenseModal'

export default function Expenses() {
    const[expenseData, setExpenseData] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/expensesInfo')
                const data = res.data
                setExpenseData(data)
                if(!data) {
                    throw `Invalid Response ${data}`
                }
            } catch(err) {
                console.error(err)
            }
        }
        fetchData()
    },[])
  return (
    <>
        <ExpenseModal />
    </>
  )
}
