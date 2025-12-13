// Dependencies
import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";


function AccountContainer() {
  
  // Transaction state
  const [transactions,setTransactions] = useState([])

  // Sort State
  const [sortBy, setSortBy] = useState("description")

  // Search state
  const [search,setSearch] = useState("")

  
  // Fetch transactions on initial mount
  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  // POST new transaction and update state
  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }

  // DELETE transaction and update state
  function deleteTransaction(id){
    fetch(`http://localhost:6001/transactions/${id}`,{
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>{
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id)
      setTransactions(updatedTransactions)
    })
  }
  
  // Update sort criteria
  function onSort(sortBy){
    setSortBy(sortBy)
  }

  // Filter transactions based on search input, then sort alphabetically
  const filteredTransactions = transactions
    .filter(transaction =>
      transaction.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))


  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={filteredTransactions} deleteTransaction={deleteTransaction}/>
    </div>
  );
}

export default AccountContainer;
