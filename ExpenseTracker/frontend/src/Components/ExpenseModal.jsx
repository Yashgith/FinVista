import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setExpenseData } from './Slices/expenseSlices'
import axios from 'axios'

export default function ExpenseModal({editExpenses, isUpdate}) {
    const dispatch = useDispatch()
    const [expenseInfo, setExpenseInfo] = useState({
        date: '',
        title: '',
        amount: '',
        description: ''
    })
    useEffect(() => {
        if (isUpdate) {
            setExpenseInfo({
                date: editExpenses.date || '', 
                title: editExpenses.title || '',
                amount: editExpenses.amount || '',
                description: editExpenses.description || ''
            })
        }
    }, [editExpenses])

    const formInputChanges = (e) => {
        setExpenseInfo({ 
            ...expenseInfo, [e.target.name]: e.target.value 
        })
    }
    const expensesForm = async (e) => {
        try {
            if (isUpdate) {
                await axios.put(`http://localhost:3000/expensesInfo/${editExpenses._id}`,
                 expenseInfo
                )
                dispatch(setExpenseData(expenseInfo))
            } else {
                console.log("add")
                await axios.post('http://localhost:3000/expensesInfo',
                 expenseInfo
                )
            }
        } catch (err) {
            console.error(`Error in sending ${isUpdate ? 'update' : 'new'} expense information`, err)
        }
    }
    return (
    <div>
        <button
            type="button"
            className="btn-general mx-3"
            data-bs-toggle="modal"
            data-bs-target="#expenseModal"
        >
            Add Expenses
        </button>
        <div
            id="expenseModal"
            className="modal fade"
            aria-labelledby="metricsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="metricsModalLabel"
                        >
                            Add your Expense Details
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className='row row-cols-2 mt-3 g-3'>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={expenseInfo.date}
                                            onChange={formInputChanges}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={expenseInfo.title}
                                            onChange={formInputChanges}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="amount"
                                            value={expenseInfo.amount}
                                            onChange={formInputChanges}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={expenseInfo.description}
                                            onChange={formInputChanges}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn-general"
                            data-bs-dismiss="modal"
                            onClick={expensesForm}
                        >
                            Add
                        </button>
                        <button type="button" className="btn-general" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
