import React, { useState, useEffect } from "react";

function loadAccount() {
  const data = sessionStorage.getItem('accountData');
  return data != null ? JSON.parse(data) : []; 
}

function AccountInfo() {
  const [account, setAccount] = useState(() => loadAccount());

  return (
    <div>
      <h2>Informações da conta</h2>
      {
        account ? 
          <div>
            <div>ID: {account.id}</div>
            <div>Agência ID: {account.agencies_id}</div>
            <div>N. Conta: {account.number}</div>
            <div>Saldo: {account.balance}</div>
            <div>Cliente: {account.customers_id}</div>
          </div>
        :
          <div>
            <p>Conta não encontrada</p>
          </div>
      }
    </div>
  );
}

export default AccountInfo;
