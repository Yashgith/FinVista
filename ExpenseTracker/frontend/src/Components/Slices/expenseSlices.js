import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../Store/apis'

export const fetchExpenseData = createAsyncThunk('expenses/fetchExpenseData', async (_, { getState }) => {
  try {
    const userId = getState().auth.userId
    const response = await api.get(`/expensesInfo?userId=${userId}`,
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.log("error in fetching expense data", error)
    alert('Error in adding Expense')
  }
})

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenseData: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setExpenseData: (state, action) => {
      state.expenseData = action.payload
    },
    setError: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }
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
  }
})

export const { setExpenseData, setError } = expenseSlice.actions
export default expenseSlice.reducer
