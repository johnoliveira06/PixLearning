import React from "react";
import "../styles/Toolbar.css";

function Toolbar() {
  return (
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
      <div className="transfer-tool">
      <div className="tool-icon">
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
