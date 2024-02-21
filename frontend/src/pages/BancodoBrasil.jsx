import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import "../styles/bancodobrasil.css";

function BancodoBrasil() {
  const [accountData, setAccountData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [agencyData, setAgencyData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [transferData, setTransferData] = useState({
    agencia: "",
    conta: "",
    valor: "",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const notify = () =>
    toast.success("Transferência realizada com sucesso!", {
      position: "top-center",
      autoClose: 2500,
    });

  useEffect(() => {
    axios
      .get("http://localhost:3000/accounts")
      .then((response) => {
        // console.log(response.data);
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
      .get("http://localhost:3000/agencies")
      .then((response) => {
        // console.log(response.data);
        setAgencyData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da agência:", error);
      });

    axios
      .get("http://localhost:3000/accounts/1/transactions")
      .then((response) => {
        // console.log(response.data);
        setTransactionData(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados das transações:", error);
      });

    axios
      .get("http://localhost:3000/banks/1")
      .then((response) => {
        // console.log(response.data);
        setBankData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do banco:", error);
      });
  }, []);

  const handleTransfer = () => {
    console.log(`Agência da conta destino: ${transferData.agencia}
    Conta destino: ${transferData.conta}
    Valor a ser transferido: ${transferData.valor}`);
    if (
      transferData.agencia != agencyData[1].number ||
      transferData.conta != accountData[1].number
    ) {
      console.log("Agência ou conta incorretas. Tente novamente.");
      alert("Agência ou conta incorretas. Tente novamente.");
      return;
    }

    if (isNaN(parseFloat(transferData.valor))) {
      alert("Valor inválido.");
      return;
    }

    if (parseFloat(accountData[0].balance) < parseFloat(transferData.valor)) {
      alert("Seu saldo é insuficiente para a transação.");
      return;
    }

    if (password !== accountData[0].password) {
      alert("Senha incorreta. Tente novamente.");
      return;
    }

    const newTransaction = {
      date: new Date().toISOString(),
      type: "Saída",
      amount: parseFloat(transferData.valor),
      description: "NULL",
      accounts_id: accountData[0].id,
    };

    console.log(`Dados de saída:
    Data: ${newTransaction.date}
    Tipo: ${newTransaction.type}
    Valor: ${newTransaction.amount}`);

    const newTransactionEntrada = {
      date: new Date().toISOString(),
      type: "Entrada",
      amount: parseFloat(transferData.valor),
      description: "NULL",
      accounts_id: accountData[1].id,
    };

    console.log(`Dados de entrada:
    Data: ${newTransactionEntrada.date}
    Tipo: ${newTransactionEntrada.type}
    Valor: ${newTransactionEntrada.amount}`);

    const updatedOriginBalance =
      parseFloat(accountData[0].balance) - parseFloat(transferData.valor);

    console.log("Novo saldo após a transferência:", updatedOriginBalance);

    axios
      .post("http://localhost:3000/transactions", newTransaction)
      .then((response) => {
        axios
          .put("http://localhost:3000/accounts/" + accountData[0].id, {
            number: accountData[0].number,
            password: accountData[0].password,
            balance: updatedOriginBalance,
            agencies_id: agencyData[0].id,
            customers_id: customerData.id,
          })
          .then(() => {
            axios
              .post("http://localhost:3000/transactions", newTransactionEntrada)
              .then(() => {
                setTimeout(() => {
                  console.log("Realizando transferência...");
                  notify();
                }, 3000);
              })
              .catch((error) => {
                alert(
                  "Erro ao registrar entrada na conta de destino: " +
                    error.response.data.message
                );
              });
          })
          .catch((error) => {
            alert(
              "Erro ao atualizar saldo na conta de origem: " +
                error.response.data.message
            );
          });
      })
      .catch((error) => {
        alert("Erro ao realizar transferência: " + error.response.data.message);
      });
    setIsModalOpen(false);
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
              <strong>Saldo:</strong> R$ {accountData[0].balance.toFixed(2)}
            </p>
            <p>
              <strong>Agência:</strong> {agencyData[0].number} -{" "}
              {agencyData[0].description}
            </p>
            <p>
              <strong>Conta:</strong> {accountData[0].number}
            </p>
          </div>
        )}
      </div>
      <div className="transfer-form">
        <h2>Transferência</h2>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Transferência"
        style={customStyles}
      >
        <h2>Senha</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe sua senha"
        />
        <button className="btn btn-primary" onClick={handleTransfer}>
          Confirmar transferência
        </button>
      </Modal>
    </>
  );
}

export default BancodoBrasil;
