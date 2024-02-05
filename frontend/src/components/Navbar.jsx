import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <>
      <header>
        <h1 class="logo">SambaCrédito</h1>
        <input type="checkbox" class="nav-toggle" id="nav-toggle" />
        <nav>
          <ul>
            <li>
              {" "}
              <a href="">Abra sua conta</a>
            </li>
            <li>
              {" "}
              <a href="">Acesse sua conta</a>
            </li>
          </ul>
        </nav>
        <label for="nav-toggle" class="nav-toggle-label">
          <span></span>
        </label>
      </header>
    </>
  );
}

export default Navbar;
