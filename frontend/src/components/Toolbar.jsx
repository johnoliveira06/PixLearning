import React, { useState } from "react";
import "../styles/Toolbar.css";
import { useNavigate, useNavigation } from "react-router-dom";
import Modal from "react-modal";
import "../styles/Modal.css";


// function Toolbar() {
//   const navigate = useNavigate();

//   return (
//     <div className="toolbar">
//       <div className="transactions-tool">
//         <div className="tool-icon"
//           onClick={() => {navigate("/account")}}
//         >
//           <img
//             className="tool-icon-image" 
//             src="../../assets/images/transactions-tool.png"
//           />
//         </div>
//         Extrato
//       </div>
//       <div className="transfer-tool">

//       <div className="tool-icon"
//         onClick={() => {navigate("/transfer")}}
//         >
//           <img
//             className="tool-icon-image" 
//             src="../../assets/images/pix-tool.png"
//           />
//         </div>
//         Enviar PIX
//       </div>
//     </div>

// No componente Toolbar
function Toolbar({ confirmTransfer }) {
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

  const handleConfirmTransfer = () => {
    if (password.trim() === "") {
      alert("Por favor, insira sua senha.");
      return;
    }

    confirmTransfer({ ...transferData, password });
    setIsModalOpen(false);
    setTransferData({
      agencia: "",
      conta: "",
      valor: "",
    });
    setPassword("");
  };

  return (
    <>
      <div className="toolbar">
        <div className="transactions-tool">
          <div className="tool-icon">
            <img
              className="tool-icon-image"
              src="../../assets/images/transactions-tool.png"
            />
          </div>
          Extrato
        </div>
        <div className="transfer-tool" onClick={() => setIsModalOpen(true)}>
          <div className="tool-icon">
            <img
              className="tool-icon-image"
              src="../../assets/images/pix-tool.png"
            />
          </div>
          Enviar PIX
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Transferência"
        style={customStyles}
        className="custom-modal"
      >
        <div className="input-group mb-3">
          <h4>Agência</h4>
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
          <h4>Conta</h4>
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
          <h4>Valor</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Valor"
            aria-label="Valor"
            value={transferData.valor}
            onChange={(e) =>
              setTransferData({ ...transferData, valor: e.target.value })
            }
          />
        </div>
        <h4>Senha</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe sua senha"
        />
        <button className="btn btn-primary" onClick={handleConfirmTransfer}>
          Confirmar transferência
        </button>
      </Modal>
    </>
  );
}

export default Toolbar;
