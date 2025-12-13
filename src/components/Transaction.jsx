// Dependencies
import React from "react";

function Transaction({transaction}) {
  return (
    // Table row displaying individual transaction details
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
