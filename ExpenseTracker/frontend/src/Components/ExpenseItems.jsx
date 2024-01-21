import React from 'react'

const ExpenseItems = (props) => {
    const handleEditClick = (expense) => {
        props.editExpenses(expense)
    }
  return (
    <div className="row container justify-content-center">
         {props.expenseDetails.map((item) => (
                <div key={item._id} className="col-md-3 m-3">
                    <div className="card">
                        <div className="card-body">
                            <div className='d-flex justify-content-end'>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#expenseModal"
                                onClick={() => handleEditClick(item)} 
                            >
                                Edit
                            </button>
                            </div>
                            <h5 className="card-title text-center">
                                {new Date(item.date).toLocaleDateString('en-US',{ 
                                    day: 'numeric', month: 'short', year: 'numeric' 
                                })}
                            </h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>Title:</b> <span>{item.title}</span></li>
                                <li class="list-group-item"><b>Spend Amount:</b> <span>{item.amount}</span></li>
                                <li class="list-group-item"><b>Description:</b> <span>{item.description}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default ExpenseItems
