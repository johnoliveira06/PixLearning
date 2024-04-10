import React from "react";
import "../styles/Toolbar.css";
import { useNavigate, useNavigation } from "react-router-dom";

function Toolbar() {
  const navigate = useNavigate();

  return (
    <div className="toolbar">
      <div className="transactions-tool">
        <div className="tool-icon"
          onClick={() => {navigate("/account")}}
        >
          <img
            className="tool-icon-image" 
            src="../../assets/images/transactions-tool.png"
          />
        </div>
        Extrato
      </div>
      <div className="transfer-tool">

      <div className="tool-icon"
        onClick={() => {navigate("/transfer")}}
        >
          <img
            className="tool-icon-image" 
            src="../../assets/images/pix-tool.png"
          />
        </div>
        Enviar PIX
      </div>
    </div>
  );
}

export default Toolbar;
