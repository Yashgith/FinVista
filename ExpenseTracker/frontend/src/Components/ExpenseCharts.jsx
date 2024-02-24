import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpenseData } from './Slices/expenseSlices'
import axios from 'axios'
import { saveAs } from 'file-saver'

const ExpenseCharts = () => {
  const [selectedYear, setSelectedYear] = useState('')
  const [yearlyData, setYearlyData] = useState({})
  const dispatch = useDispatch()
  const expenseData = useSelector((state) => state.expenses.expenseData)
  const [isExpenses, setIsExpenses] = useState({})

  useEffect(() => {
    if (!expenseData.length) {
      dispatch(fetchExpenseData())
    }
  }, [dispatch, expenseData])

  const distinctYears = expenseData.reduce((years, item) => {
    const year = new Date(item.date).getFullYear()
    if (!years.includes(year)) {
      years.push(year)
    }
    return years
  }, [])

  axios.defaults.withCredentials = true
  const downloadCsv = async () => {
    try {
      const res = await axios.get(`https://fin-vista-server.vercel.app/expensesInfo/csv/${selectedYear}`,{ 
        responseType: 'blob' 
      })
      saveAs(res.data, `expenses_${selectedYear}.csv`)
    } catch (err) {
      console.error('Error downloading CSV:', err)
      alert('Error downloading expenses')
    }
  }
  axios.defaults.withCredentials = true
  const OptionSelector = async (e) => {
    const selectYear = e.target.value
    if (isExpenses[selectYear]) {
      setYearlyData(isExpenses[selectYear])
    } else {
      try {
        const res = await axios.get(`https://fin-vista-server.vercel.app/expensesInfo/${selectYear}`)
        const data = res.data
        setYearlyData(data)
        setIsExpenses({
          ...isExpenses,
          [selectYear]: data
        })
        setSelectedYear(selectYear)
      } catch (err) {
        console.log('error in fetching yearly expense data', err)
        alert("Error in fetching expense information")
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-end mt-3">
        <div className="col-3">
          <select className="form-select" value={selectedYear} onChange={OptionSelector}>
            <option value="" className='secondary'>Select Year</option>
            {distinctYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          {selectedYear ? 
            <button className="btn btn-primary" onClick={downloadCsv}>
              Download Expenses
            </button> : ''}
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-6">
          <Line
            data={{
              labels: Object.keys(yearlyData),
              datasets: [
                {
                  label: 'Total Expenses for Months',
                  data: Object.values(yearlyData),
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
                  labels: Object.keys(yearlyData),
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
                    text: 'Expense Amount'
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
                  position: 'top',
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExpenseCharts
