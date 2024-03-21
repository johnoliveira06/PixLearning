import React, { useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import { getTransactionsList } from "../services/apiServices";

function loadAccount() {
  const data = sessionStorage.getItem('accountData');
  return data != null ? JSON.parse(data) : []; 
}

async function getTransactions(account_id) {
  const transactions = 
  await getTransactionsList(account_id)
  return transactions;
}

function TransactionsList(props) {
  const [account, setAccount] = useState(() => loadAccount());
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect( () => {
    (async function() {
      try {
          setTransactionsList(await getTransactions(account.id));
      } catch (e) {
          console.error(e);
      }
    })();

  }, []);

  return (
    <div>
    <h4 className="transactions-title">Extrato</h4>
      <div id="transactions-list">
        {transactionsList.map( (data,i) => {
          return (          
            <TransactionItem 
            key={i}
              id={data.id}
              date={data.date.substring(0,10)}
              type={data.type}
              amount={data.amount}
              description={data.description}
            />
          )
        })}
      </div>
    </div>
  );
}

export default TransactionsList;