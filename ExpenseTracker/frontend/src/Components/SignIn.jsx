import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin } from './Slices/usersInfoSlices'

const SignIn = () => {
  const [userInfo, setUserData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formInputChanges = (e) => {
    setUserData({ 
        ...userInfo, [e.target.name]: e.target.value 
    })
  }

  const formSubmit = (e) => {
    e.preventDefault()
    dispatch(signin(userInfo))
    navigate('/')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border p-4">
          <h2 className="mb-4">Sign In</h2>
          <form onSubmit={formSubmit}>
            <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={userInfo.email}
                      onChange={formInputChanges}
                      required
                  />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={userInfo.password}
                    onChange={formInputChanges}
                    required
                />
                <p>
                  Don't have an account?{' '}
                  <NavLink to="/register">Sign Up</NavLink>
                </p>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
