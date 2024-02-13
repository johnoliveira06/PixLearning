import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/bancodobrasil.css";

function BancodoBrasil() {
  const [accountData, setAccountData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [agencyData, setAgencyData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/accounts/1")
      .then((response) => {
        console.log(response.data);
        setAccountData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da conta:", error);
      });

    axios
      .get("http://localhost:3000/customers/1")
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do cliente:", error);
      });

    axios
      .get("http://localhost:3000/agencies/1")
      .then((response) => {
        console.log(response.data);
        setAgencyData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da agência:", error);
      });

    axios
      .get("http://localhost:3000/accounts/1/transactions")
      .then((response) => {
        console.log(response.data);
        setTransactionData(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados das transações:", error);
      });

    axios
      .get("http://localhost:3000/banks/1")
      .then((response) => {
        console.log(response.data);
        setBankData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do banco:", error);
      });
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#FCFC30" }}
      >
        <div className="container-fluid">
          <img src="../assets/icons/logoBB.svg" alt="" srcSet="" />
          <a className="navbar-brand">Banco do Brasil</a>
          <button className="btn btn-primary">
            <a href="/">Logout</a>
          </button>
        </div>
      </nav>
      <div className="container">
        {accountData && customerData && agencyData && bankData && (
          <div className="account-info">
            <h2>Informações da Conta</h2>
            <p>
              <strong>Nome do Cliente:</strong> {customerData.name}
            </p>
            <p>
              <strong>CPF:</strong> {customerData.cpf}
            </p>
            <p>
              <strong>Saldo:</strong> R$ {accountData.balance.toFixed(2)}
            </p>
            <p>
              <strong>Agência:</strong> {agencyData.number} -{" "}
              {agencyData.description}
            </p>
          </div>
        )}
      </div>
      <div className="transaction-history">
        <h2>Extrato</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BancodoBrasil;
