import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ onLogin, setLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/api/user/login', formData)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        onLogin()
        setLoggedIn(true)
      })
      .catch(error => console.error('Error logging in:', error))
  }

  const handleSignUp = () => {
    const navigate = useNavigate()
    navigate('/register')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <p>
            Don't have Account ?
            <Link to='/register' onClick={ handleSignUp }> Sign Up here</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
