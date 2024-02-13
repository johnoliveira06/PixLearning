import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div class="footer">
          <div class="message-container">
            <div class="message-contents">
              <p>
                <h3>SambaCrédito</h3>
                <ul className="about">
                  <li>
                    <a href="">Sobre nós</a>
                  </li>
                  <li>
                    <a href="">Carreira</a>
                  </li>
                  <li>
                    <a href="">Blog</a>
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div class="legal-container">
            <div class="legal-contents">
              <ul>
                <li>
                  <a href="/terms-and-conditions" rel="noopener noreferrer">
                    Termos e condições
                  </a>
                </li>
                <li>
                  <a href="/privacy-and-security" rel="noopener noreferrer">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="/help-center" rel="noopener noreferrer">
                    Ouvidoria
                  </a>
                </li>
                <li>
                  <a href="/contact-us" rel="noopener noreferrer">
                    Contate-nos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
