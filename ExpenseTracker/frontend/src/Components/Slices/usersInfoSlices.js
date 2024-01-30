import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
export const signup = createAsyncThunk('userInfo/signup', async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/userInfo/signup',
      userData, { withCredentials: true }
    )
    return response.data
  } catch (err) {
    console.log('Error in adding user', err)
    alert('Error in Adding User')
    throw err
  }
})
export const signin = createAsyncThunk('userInfo/signin', async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/userInfo/signin', 
      userData, { withCredentials: true }
    )
    const { user, token } = response.data
    return { userId: user._id, token }
  } catch (err) {
    console.log('Error in logging user', err)
    alert('Error in Logging User')
    throw err
  }
})

const usersInfoSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('authToken') || null,
    userId: Cookies.get('userId') || null,
    error: null,
    isLoggedIn: !!Cookies.get('authToken') || !!Cookies.get('userId')
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.userId = null
      state.isLoggedIn = false
      Cookies.remove('userId')
      Cookies.remove('authToken')
    }
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
        state.userId = action.payload.userId
        state.isLoggedIn = true
        Cookies.set('userId', action.payload.userId)
        Cookies.set('authToken', action.payload.token)
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { logout } = usersInfoSlice.actions
export default usersInfoSlice.reducer
