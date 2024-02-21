import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [agencyError, setAgencyError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getBanks() {
      try {
        const response = await axios.get("http://localhost:3000/banks");
        setBanks(response.data);
      } catch (error) {
        console.error("Erro ao buscar bancos:", error);
      }
    }

    getBanks();
  }, []);

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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

        axios
          .get(`http://localhost:3000/banks/${bankId}/agencies`)
          .then((agenciesResponse) => {
            const agencies = agenciesResponse.data;

            let accountFound = false;
            agencies.forEach((agency) => {
              if (!accountFound) {
                axios
                  .get(`http://localhost:3000/agencies/${agency.id}/accounts`)
                  .then((accountsResponse) => {
                    const accounts = accountsResponse.data;

                    accounts.forEach((account) => {
                      if (
                        account.number === accountNumber &&
                        account.password === password
                      ) {
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
              alert("Agência, conta ou senha incorretas. Tente novamente.");
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
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
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
            <label htmlFor="inputPassword" className="form-label">
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
            <label htmlFor="inputPassword" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={handlePasswordChange}
            />
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
