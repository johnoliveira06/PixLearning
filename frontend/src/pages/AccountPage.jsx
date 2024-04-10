import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/bancodobrasil.css";
import "../styles/TransactionsList.css";
import "../styles/AccountPage.css";
import BalanceBox from "../components/BalanceBox";
import TransactionsList from "../components/TransactionsList";
import Toolbar from "../components/Toolbar";
import { useNavigate } from "react-router-dom";
import {
  getAccounts,
  getAgencies,
  getCustomers,
  transfer,
} from "../services/apiServices";

function loadSession() {
  const data = sessionStorage.getItem("accountLogged");
  return data != null ? data : false;
}

function AccountPage() {
  const [accountData, setAccountData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [agencyData, setAgencyData] = useState(null);

  const navigate = useNavigate();

  const notify = () =>
    toast.success("Transferência realizada com sucesso!", {
      position: "top-center",
      autoClose: 2500,
    });

  async function getData() {
    try {
      const accountResult = await getAccounts();
      setAccountData(accountResult);
      const customerResult = await getCustomers();
      setCustomerData(customerResult);
      const agenciesResult = await getAgencies();
      setAgencyData(agenciesResult);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleTransfer = async (transferData) => {
    try {
      const transferResult = await transfer(
        agencyData.number,
        accountData.number,
        transferData.agencia,
        transferData.conta,
        transferData.valor,
        transferData.password
      );
    } catch (error) {
      console.log(error.message);
      notify();
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("accountLogged", false);
    sessionStorage.removeItem("accountData");
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#FCFC30" }}
      >
        <div className="container-fluid">
          <img src="../assets/icons/logoBB.svg" alt="" srcSet="" />
          <a className="navbar-brand">Banco do Brasil</a>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </nav>
      <div className="container">
        {/* <AccountInfo /> */}
        <BalanceBox />
        {/* <Toolbar navigate={navigate} /> */}
        <Toolbar confirmTransfer={handleTransfer} />
        <TransactionsList />
      </div>
    </>
  );
}

export default AccountPage;
