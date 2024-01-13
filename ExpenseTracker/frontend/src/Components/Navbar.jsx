import React, { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Expenses from './Expenses'

export default function Navbar() { 
    // const [loggedIn, setLoggedIn] = useState(false)

  return ( 
    <>
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Navbar</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/addexpenses">Add Expenses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/viewexpenses">View Expenses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/expenses">Expenses</NavLink>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    <Routes>
        {/* <Route path='/login' element={<Login onLogin={() => setLoggedIn(true)} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addexpenses' element={loggedIn ? <AddExpenses /> : <Navigate to='/login' />} />
        <Route path='/viewexpenses' element={loggedIn ? <ViewExpenses /> : <Navigate to='/login' />} /> */}
        <Route path='/expenses' element={<Expenses />} />
    </Routes>
    </>
  )   
}
