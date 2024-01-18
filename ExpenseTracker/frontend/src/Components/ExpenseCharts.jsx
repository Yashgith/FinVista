import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenseData } from './Slices/expenseSlices'

const ExpenseCharts = () => {
  const [monthlyData, setMonthlyData] = useState({})
  const dispatch = useDispatch()

  const expenseData = useSelector((state) => state.expenses.expenseData)

  useEffect(() => {
    if (!expenseData.length) {
      dispatch(fetchExpenseData())
    }
    const monthlySums = {}
    expenseData.forEach((expense) => {
      const month = new Date(expense.date).getMonth()
      if (!monthlySums[month]) {
        monthlySums[month] = 0
      }
      monthlySums[month] += expense.amount
    })
    console.log(Object.keys(monthlySums))
    console.log(Object.values(monthlySums))
    setMonthlyData(monthlySums)
  }, [expenseData])

  return (
    <div className='container w-50'>
        <Line
          data={{
            labels: Object.keys(monthlyData),
            datasets: [
              {
                label: 'Total Expenses',
                data: Object.values(monthlyData),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75,192,192,1)'
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: 'category',
                labels: Object.keys(monthlyData),
                title: {
                  display: true,
                  text: 'Months'
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Expense Amount',
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }}
        />
    </div>
  )
}

export default ExpenseCharts
