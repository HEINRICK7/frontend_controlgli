import React from "react";
import Nav from "../../components/Nav";
import { Link } from 'react-router-dom';

import "./styles.css";
import contentImg from "../../assets/logo.svg";

const Home = () => {
  return (
    <div className="container">
      <Nav />
      <div className="main">
        <div className="section_left">
          <h1>Bem-vindo à sua jornada de nutrição!</h1>
          <p>
            Aqui, você terá acesso a informações e ferramentas para ajudá-lo a
            alcançar seus objetivos de saúde e bem-estar. Com nosso app, você
            pode monitorar sua ingestão de nutrientes, receber sugestões de
            refeições equilibradas, armazenar suas receitas favoritas e
            acompanhar seu progresso.
            <br />
            <br />
            Para começar, basta fazer login com sua conta ou criar uma nova.
            Então, prepare-se para transformar seus hábitos alimentares e
            alcançar a saúde e o bem-estar que você merece.
          </p>
          <p>
            <Link to={'/login'} className="login-button">
              Vamos lá!
            </Link>
          </p>
        </div>
        <div className="section_rigth">
          {" "}
          <img src={contentImg} width={650} alt="Gli" />
        </div>
      </div>
    </div>
  );
};

export default Home;
