import React from 'react'

const ExpenseItems = (props) => {
    const handleEditClick = (expense) => {
      props.editExpenses(expense)
    }
  return (
    <div className="row container justify-content-center">
         {props.expenseData.map((item) => (
                <div key={item._id} className="col-md-3 m-3">
                    <div className="card">
                        <div className="card-body">
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#expenseModal"
                                onClick={() => handleEditClick(item)} 
                            >
                                Edit
                            </button>
                            <h5 className="card-title text-center">
                                {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </h5>
                            <p className="card-text">Title: {item.title}</p>
                            <p className="card-text">Amount: {item.amount}</p>
                            <p className="card-text">Description: {item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default ExpenseItems
