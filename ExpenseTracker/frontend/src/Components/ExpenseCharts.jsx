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
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ]
    expenseData.forEach((expense) => {
      const monthName = monthNames[new Date(expense.date).getMonth()]
      if (!monthlySums[monthName]) {
        monthlySums[monthName] = 0
      }
      monthlySums[monthName] += expense.amount
    })
    setMonthlyData(Object.fromEntries(
      Object.entries(monthlySums)
      .sort((a, b) => monthNames.indexOf(a[0]) - monthNames.indexOf(b[0]))
    ))
  }, [expenseData])

  return (
    <div className='container w-50'>
        <Line
          data={{
            labels: Object.keys(monthlyData),
            datasets: [
              {
                label: 'Total Expenses for Months',
                data: Object.values(monthlyData),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 3,
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
                },
                ticks: {
                  color: 'black',
                  font: {
                    weight: 'bold',
                    size: '12px'
                  }
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
                },
                ticks: {
                  color: 'black',
                  font: {
                    weight: 'bold',
                    size: '12px'
                  }
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
