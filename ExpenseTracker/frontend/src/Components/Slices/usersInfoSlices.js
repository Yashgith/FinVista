import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

export const signup = createAsyncThunk('userInfo/signup', async (userData) => {
    try {
        const response = await axios.post('http://localhost:3000/userInfo/signup', userData)
        return response.data
    } catch(err) {
        console.log('Error in adding user', err)
        throw err
    }
})

export const signin = createAsyncThunk('userInfo/signin', async (userData) => {
    try {
        console.log(userData)
        const response = await axios.post('http://localhost:3000/userInfo/signin', userData)
        return response.data
    } catch(err) {
        console.log('Error in logging user', err)
        throw err 
    }
})

const usersInfoSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('authToken') || null,
    error: null,
    isLoggedIn: !!Cookies.get('authToken')
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.isLoggedIn = true
        Cookies.set('authToken', action.payload.token)
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { logout } = usersInfoSlice.actions
export default usersInfoSlice.reducer
