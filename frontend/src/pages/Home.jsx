import React from "react";
import "../styles/home.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>Escolha seu banco</div>
        <div>
          <button
            onClick={() => {
              /* 1. Navigate to the Details route with params */
              navigate('login', {
                state: {
                  bank_id: 1,
                  name: "Banco do Brasil"
                }
              });
            }}
            >Banco do Brasil
          </button>
        </div>

        <div>
          <button
              onClick={() => {
                /* 1. Navigate to the Details route with params */
                navigate('login',  {
                  state: {
                    bank_id: 2,
                    name: "Bradesco"
                  }
                });
              }}
            >Bradesco
          </button>    
        </div>
      </div>
      {/* <header>
        <h1 class="logo">
          <a href="/">SambaCrédito</a>
        </h1>
        <input type="checkbox" class="nav-toggle" id="nav-toggle" />
        <nav>
          <ul>
            <li>
              {" "}
              <a href="/register">Abra sua conta</a>
            </li>
            <li>
              {" "}
              <a href="/login">Acesse sua conta</a>
            </li>
          </ul>
        </nav>
        <label for="nav-toggle" class="nav-toggle-label">
          <span></span>
        </label>
      </header>

      <div class="init">
        <div class="main-container">
          <div class="main">
            <h1>Invista, Cresça, Conquiste.</h1>
          </div>
        </div>
      </div>
      <section class="section-one">
        <div class="middle-container">
          <h3>
            Transformando o presente, moldando o futuro. Tecnologia financeira
            que enriquece vidas.
          </h3>
        </div>
        <div class="clearfix"></div>
      </section>
      <section class="section-two">
        <div className="flex-group">
          <div class="end-container">
            <p>
              Em 2023 o SambaCrédito registrou um resultado recorrente geral
              impressionante de R$ 9,0 bilhões, um aumento de 3,4% em relação ao
              mesmo período do ano anterior, demonstrando sua força e
              estabilidade operacional mesmo em tempos de volatilidade
              econômica.
            </p>
            <a
              href="https://www.correiobraziliense.com.br/economia/2023/09/5123749-banco-do-brasil-expande-mercado-de-carbono-e-aumenta-area-protegida.html"
              class="learn-more-btn section-four-btn"
            >
              Saiba mais
            </a>
            <div class="clearfix"></div>
          </div>
        </div>
      </section>
      <Footer /> */}
    </>
  );
}

export default Home;
