import React, { useState, useEffect } from "react";
import "../styles/BalanceBox.css";

function loadAccount() {
  const data = sessionStorage.getItem('accountData');
  return data != null ? JSON.parse(data) : []; 
}

function loadSession() {
  const data = sessionStorage.getItem('accountLogged');
  return data != null ? data : false; 
}

function BalanceBox() {
  const [account, setAccount] = useState(() => loadAccount());
  const accountLogged = useState(loadSession());

  return (
    <div className="balance-box">
      <div className="balance-description">
        Saldo atual:
      </div>
      {
        accountLogged ?
        <div className="balance-value">{account.balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        : 
        <div>Usuário não logado</div>
      }
    </div>
  );
}

export default BalanceBox;
