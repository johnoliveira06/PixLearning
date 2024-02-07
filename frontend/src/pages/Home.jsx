import React from "react";
import "../styles/home.css";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <header>
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
      <section class="section-one">
        <h2 class="header">Invista. Cresça. Conquiste.</h2>
        <p class="section-one-paragraph">
          Invista no seu futuro, cresça com nossas soluções financeiras e
          aproveite cada conquista. Seu sucesso é o nosso compromisso.
        </p>
      </section>

      <section class="section-three">
        <h3>
          Transformando o presente, moldando o futuro. Tecnologia financeira que
          enriquece vidas.
        </h3>
      </section>

      <section class="section-four">
        <div class="flex-group">
          <div class="content-container">
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
