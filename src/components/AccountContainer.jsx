// Dependencies
import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";


function AccountContainer() {
  
  // Transaction state
  const [transactions,setTransactions] = useState([])

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
  
  // Sort function
  function onSort(sortBy){
    
  }

  // Filter using searchand pass new variable down
  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
