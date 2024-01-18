import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchExpenseData = createAsyncThunk('expenses/fetchExpenseData', async () => {
  try {
    const response = await axios.get('http://localhost:3000/expensesInfo')
    return response.data
  } catch (error) {
    console.log("error in fetching expense data", error)
  }
})

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenseData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setExpenseData: (state, action) => {
      state.expenseData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.expenseData = action.payload
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setExpenseData } = expenseSlice.actions

export default expenseSlice.reducer
