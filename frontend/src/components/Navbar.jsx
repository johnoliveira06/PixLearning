import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  return (
    <>
      <header>
        <div className="back-arrow-container">
          <a href="/">
            <FaArrowLeft className="back-arrow" />
          </a>
        </div>
        <h1 className="logo">SambaCrédito</h1>
      </header>
    </>
  );
}

export default Navbar;
