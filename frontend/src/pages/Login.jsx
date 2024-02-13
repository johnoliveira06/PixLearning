import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [selectedBank, setSelectedBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [agencyError, setAgencyError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const navigate = useNavigate();

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleAgencyChange = (e) => {
    const newAgency = e.target.value;
    setAgency(newAgency);
    setAgencyError(!newAgency);
  };

  const handleAccountChange = (e) => {
    const newAccount = e.target.value.replace(/\D/g, "");
    setAccount(newAccount);
    setAccountError(newAccount.length !== 6);
    setAccountNumber(newAccount);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedBank) {
      alert("Por favor, selecione um banco.");
      return;
    }

    axios
      .get(`http://localhost:3000/banks/${selectedBank}`)
      .then((bankResponse) => {
        const bankId = bankResponse.data.id;
        console.log("Informações do banco:", bankResponse.data);

        axios
          .get(`http://localhost:3000/banks/${bankId}/agencies`)
          .then((agenciesResponse) => {
            const agencies = agenciesResponse.data;
            console.log("Agências no banco:", agencies);

            let accountFound = false;
            agencies.forEach((agency) => {
              if (!accountFound) {
                axios
                  .get(`http://localhost:3000/agencies/${agency.id}/accounts`)
                  .then((accountsResponse) => {
                    const accounts = accountsResponse.data;
                    console.log("Contas na agência", agency.id, ":", accounts);

                    accounts.forEach((account) => {
                      if (account.number === accountNumber) {
                        accountFound = true;
                        alert("Login bem-sucedido!");
                        if (selectedBank === "1") {
                          navigate("/bancodobrasil");
                        } else if (selectedBank === "2") {
                          navigate("/bradesco");
                        }
                      }
                    });
                  })
                  .catch((err) => console.log(err));
              }
            });

            if (!accountFound && accountNumber) {
              alert("Agência ou conta incorretas. Tente novamente.");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <h1>Entre na sua conta digital</h1>
        <form className="row g-3" onSubmit={handleLogin}>
          <div className="col-12">
            <label className="form-label" htmlFor="inlineFormSelectPref">
              Escolha seu banco
            </label>
            <select
              className="form-select"
              id="inlineFormSelectPref"
              onChange={handleBankChange}
              value={selectedBank}
            >
              <option value="">Escolha...</option>
              <option value="1">Banco do Brasil</option>
              <option value="2">Bradesco</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Agência</label>
            <input
              type="text"
              className={`form-control ${agencyError ? "is-invalid" : ""}`}
              value={agency}
              onChange={handleAgencyChange}
            />
            {agencyError && (
              <p className="error">Agência não pode estar vazia</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Conta
            </label>
            <input
              type="text"
              className={`form-control ${accountError ? "is-invalid" : ""}`}
              value={account}
              onChange={handleAccountChange}
            />
            {accountError && (
              <p className="error">Conta deve conter 6 números</p>
            )}
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
