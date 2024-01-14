// expensesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  expenseData: []
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenseData: (state, action) => {
      state.expenseData = action.payload
    },
  },
})

export const { setExpenseData } = expensesSlice.actions
export default expensesSlice.reducer
