import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from '../Slices/expenseSlices'
import usersReducer from '../Slices/usersInfoSlices'

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: usersReducer
  }
})
