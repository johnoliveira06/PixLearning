import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { getBankList } from "../services/apiServices";

function Home() {
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();

  async function getBanks() {
    try {
      const result = await getBankList();
      setBanks(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    getBanks();
  }, []);

  const bankImages = {
    1: "../../assets/icons/logoBB.svg",
    2: "../../assets/icons/logoBradesco_vermelho.svg",
  };

  return (
    <div className="home-container">
      <h1>Escolha seu banco</h1>
      <div className="home-content">
        {banks.map((bank) => (
          <div key={bank.id} className="bank-item">
            <a
              className="bank-link"
              href={`/login/${bank.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate("login", {
                  state: {
                    bank_id: bank.id,
                    name: bank.name,
                  },
                });
              }}
            >
              <img
                className="bank-image"
                src={`/images/banks/${bankImages[bank.id]}`}
                alt={bank.name}
              />
              {bank.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
