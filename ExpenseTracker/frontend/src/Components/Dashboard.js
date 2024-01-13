import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Fetch user details using the token
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://localhost:3000/api/dashboard', { headers: { Authorization: token } })
        .then(response => setUserName(response.data.message))
        .catch(error => console.error('Error fetching user details:', error))
    }
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
