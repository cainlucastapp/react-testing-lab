// Dependencies
import React from "react";

function AddTransactionForm({postTransaction}) {
  
  // Handle form submission - create transaction object and post it
  function submitForm(e){
    e.preventDefault()
    
    // Get form values using elements collection
    const date = e.target.elements.date.value
    const description = e.target.elements.description.value
    const category = e.target.elements.category.value
    const amount = e.target.elements.amount.value

    // Validate all fields are filled
    if (!date || !description || !category || !amount) {
      alert("Please fill in all fields")
      return
    }
    
    // Validate date is not in the future
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate > today) {
      alert("Transaction date cannot be in the future")
      return
    }
    
    // Validate amount is not zero
    if (parseFloat(amount) === 0) {
      alert("Amount cannot be zero")
      return
    }
    
    const newTransaction = {
      date: date,
      description: description,
      category: category,
      amount: amount
    }
    postTransaction(newTransaction)
    
    // Reset form after successful submission
    e.target.reset()
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="ui segment">
      {/* Form for adding new transactions */}
      <form className="ui form" onSubmit={(e)=>{submitForm(e)}}>
        <div className="inline fields">
          <input type="date" name="date" required max={today} />
          <input type="text" name="description" placeholder="Description" required />
          <input type="text" name="category" placeholder="Category" required />
          <input type="number" name="amount" placeholder="Amount (use - for withdrawals)" step="0.01" required />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;