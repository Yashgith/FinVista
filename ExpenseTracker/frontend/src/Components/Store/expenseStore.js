import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from '../Slices/expenseSlices'

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
})
