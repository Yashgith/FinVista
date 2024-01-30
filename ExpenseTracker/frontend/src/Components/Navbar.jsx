import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Expenses from './Expenses'
import ExpenseCharts from './ExpenseCharts'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './Slices/usersInfoSlices'
import Signup from './Signup'
import SignIn from './SignIn'

export default function Navbar() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        Cookies.remove('authToken')
        navigate('/login')
    }
    const redirectToLogin = () => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <div className="d-inline-block">
                            <img
                                src="/Logo.png"
                                alt="FinVista"
                                width="50"
                            />
                        </div>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/expenses">
                                    Expenses
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/analysis">
                                    Visualize Expenses
                                </NavLink>
                            </li>
                        </ul>
                        <div className="navbar-nav ms-auto me-4">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-link nav-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <NavLink className="nav-link" to="/register">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<SignIn />} />
                {isLoggedIn ? (
                    <>
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/analysis" element={<ExpenseCharts />} />
                    </>
                ) : (
                    <>
                        <Route
                            path="/*"
                            element={<SignIn />}
                            action={redirectToLogin}
                        />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<Signup />} />
                    </>
                )}
            </Routes>
        </>
    )
}
