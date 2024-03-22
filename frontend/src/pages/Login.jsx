import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import { getBankList } from "../services/apiServices";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css"; // choose your theme
import "react-simple-toasts/dist/theme/failure.css"; // choose your theme

toastConfig({ theme: "failure" }); // configure global toast settings, like theme

function Login() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [agencyError, setAgencyError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const textInput = useRef(null);

  const { state } = useLocation(); // Obtendo o estado passado via navigate
  const bankData = {
    id: state && state.bank_id, // Obtendo o nome do usuário do estado
    name: state && state.name, // Obtendo o nome do usuário do estado
  };
  // console.log(bankData);

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

  const [data, setData] = useState(null);
  async function getBanksRennan() {
    try {
      const result = await getBankList();
      setData(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
    console.log(data);
  }

  useEffect(() => {
    getBanksRennan();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewLogin = () => {
    let url = `http://localhost:3000/accounts?filter[where][agencies_id]=${agency}&filter[where][number]=${account}&filter[where][password]=${password}`;

    console.log(url);
    axios.get(url).then((loginResponse) => {
      const account = loginResponse.data;

      if (account.length === 1) {
        sessionStorage.setItem("accountLogged", true);
        sessionStorage.setItem("accountData", JSON.stringify(account[0]));
        navigate("/account");
      } else {
        textInput.current?.focus();
        toast("Dados incorretos! Tente novamente mais tarde.");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <h1>{bankData.name}</h1>
        <div className="col-12">
          <label className="form-label" htmlFor="inlineFormSelectPref">
            Entre na sua conta digital
          </label>
          <input
            type="hidden"
            id="inlineFormSelectPref"
            defaultValue={bankData.id}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Código da Agência</label>
          <input
            type="text"
            className={`form-control ${agencyError ? "is-invalid" : ""}`}
            value={agency}
            onChange={handleAgencyChange}
            ref={textInput}
          />
          {agencyError && <p className="error">Agência não pode estar vazia</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword" className="form-label">
            Número da Conta
          </label>
          <input
            type="text"
            className={`form-control ${accountError ? "is-invalid" : ""}`}
            value={account}
            onChange={handleAccountChange}
          />
          {accountError && <p className="error">Conta deve conter 6 números</p>}
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
          <button onClick={handleNewLogin} className="login-button">
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
