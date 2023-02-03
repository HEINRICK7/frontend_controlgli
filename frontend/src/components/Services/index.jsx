import React from "react";
import "./styles.css";
import reeducacaoImg from "../../assets/reeducacaoimg.png";
import measuring from "../../assets/measuring.png";

const Services = () => {
  return (
    <div className="container_services">
      <h1>Serviços</h1>
      <div className="cards_services">
        <div className="card">
          <img src={reeducacaoImg} width={80} alt="ree" />
          <h2>Reeducação Alimentar</h2>
          <p>
            É importante lembrar que o processo de reeducação alimentar deve ser
            feito de forma gradual e individualizada, com o acompanhamento de um
            profissional de saúde.
          </p>
        </div>
        <div>Hipertrofia</div>
        <div className="card">
          <img src={measuring} width={120}  alt="measuring" />
          <h2>Emagrecimento</h2>
        </div>
      </div>
    </div>
  );
};

export default Services;
