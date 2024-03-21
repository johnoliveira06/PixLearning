import React, { useState, useEffect } from "react";
import "../styles/BalanceBox.css";

function loadAccount() {
  const data = sessionStorage.getItem('accountData');
  return data != null ? JSON.parse(data) : []; 
}

function BalanceBox() {
  const [account, setAccount] = useState(() => loadAccount());

  return (
    <div className="balance-box">
      <div className="balance-description">
        Saldo atual:
      </div>
      <div className="balance-value">{account.balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
    </div>
  );
}

export default BalanceBox;
