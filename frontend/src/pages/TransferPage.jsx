import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import "../styles/bancodobrasil.css";
import "../styles/TransactionsList.css";
import "../styles/AccountPage.css";
import AccountInfo from "../components/AccountInfo";
import BalanceBox from "../components/BalanceBox";
import TransactionsList from "../components/TransactionsList";
import Toolbar from "../components/Toolbar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAccount, getPixKey as getPixKeyFromApi, isEmpty } from "../services/apiServices";

const options = [
    { value: 'cpfcnpj', label: 'CPF/CNPJ' },
    { value: 'email', label: 'E-mail' },
    { value: 'telefone', label: 'Telefone' },
    { value: 'aleatoria', label: 'Aleatória' }
  ];

async function getPixKey(pixKey) {
    const pixKeyData = await getPixKeyFromApi(pixKey)
    return (pixKeyData.lenght != 0)
        ? pixKeyData[0]
        : {}
}

async function getDestinationAccountData(pixKey) {
    let pixKeyData = await getPixKey(pixKey);
    if (!(pixKeyData === undefined)) {
        // console.log("ATE AQUI: ", pixKeyData);
        // console.log("ATE AQUI: ", pixKeyData.accounts_id);
            let accdata = await getAccount(pixKeyData.accounts_id);
            // console.log("ATE AQUI: ", accdata[0]);
            return accdata[0];
    } else {
        return {}
    }
}

function loadSession() {
  const data = sessionStorage.getItem('accountLogged');
  return data != null ? data : false; 
}

function TransferPage() {
//   const [account, setAccount] = useState([]);
  const accountLogged = useState(loadSession());

//   const [accountData, setAccountData] = useState(null);
//   const [customerData, setCustomerData] = useState(null);
//   const [agencyData, setAgencyData] = useState(null);
//   const [bankData, setBankData] = useState(null);
//   const [transactionData, setTransactionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [password, setPassword] = useState("");
  const [transferData, setTransferData] = useState({
    agencia: "",
    conta: "",
    valor: "",
  });

  const [sourceAccount, setSourceAccount] = useState({
    id: 0,
    agencies_id: 0,
    number: 0,
    balance: 0,
    customers_id: 0,
  });
  const [destinationAccount, setDestinationAccount] = useState({
    id: 0,
    agencies_id: 0,
    number: 0,
    balance: 0,
    customers_id: 0,
  });

  const [transferInformation, setTransferInformation] = useState({
    amount: "",
    description: "",
    pixKey: "",
    sourceAccount: sourceAccount,
    destinationAccount: destinationAccount,
  });

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#FCFC30" }}
      >
        <div className="container-fluid">
          <img src="../assets/icons/logoBB.svg" alt="" srcSet="" />
          <a className="navbar-brand">Banco do Brasil</a>
        </div>
      </nav>
      <div className="container">
        <AccountInfo />
        <BalanceBox />
        <Toolbar />
      </div>
  
      <div className="transfer-form">
        <h2>Transferência</h2>

        <Select options={options} 
            defaultValue={options[0]} 
            name="keyType"
        />

        <input
            type="text"
            placeholder="Chave PIX"
            value={transferInformation.pixkey}
            onChange={(e) => {
                setTransferInformation({ ...transferInformation, pixkey: e.target.value });
                }
            }
            onBlur={(e) => {
                // setDestinationAccount(datadata);
                    if ( (e.target.value) != "") {
                            setDestinationAccount( getDestinationAccountData(e.target.value));
                            console.log("destination account: ", destinationAccount);
                            console.log("teste");
                        }
                }
            }
        />

<div>
      <h2>Informações da conta de destino</h2>
      {
        destinationAccount ? 
          <div>
            <div>ID: {destinationAccount.id}</div>
            <div>Agência ID: {destinationAccount.agencies_id}</div>
            <div>N. Conta: {destinationAccount.number}</div>
            <div>Saldo: {destinationAccount.balance}</div>
            <div>Cliente: {destinationAccount.customers_id}</div>
          </div>
        :
          <div>
            <p>Conta não encontrada</p>
          </div>
      }
    </div>
        <input
            type="text"
            placeholder="Descrição da operação"
            value={transferInformation.description}
            onChange={(e) => {
                setTransferInformation({ ...transferInformation, description: e.target.value });
                }
            }
            onBlur={(e) => console.log("saiu do input descricao" + e.target.value)}
        />

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Agência"
            aria-label="Agência"
            value={transferData.agencia}
            onChange={(e) =>
              setTransferData({ ...transferData, agencia: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Conta"
            aria-label="Conta"
            value={transferData.conta}
            onChange={(e) =>
              setTransferData({ ...transferData, conta: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Valor"
            aria-label="Valor"
            value={transferData.valor}
            onChange={(e) => {
              setTransferData({ ...transferData, valor: e.target.value });
            }}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Transferir
        </button>
        <ToastContainer />
      </div>
  
    </>
  );
}

export default TransferPage;
