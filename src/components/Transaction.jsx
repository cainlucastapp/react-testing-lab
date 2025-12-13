// Dependencies
import React from "react";

function Transaction({transaction, deleteTransaction}) {
  return (
    // Table row displaying individual transaction details
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>
        {/* Delete button - removes transaction on click */}
        <button className="ui button" onClick={() => deleteTransaction(transaction.id)}>
          Delete
        </button>
      </td>

    </tr>
  );
}

export default Transaction;
