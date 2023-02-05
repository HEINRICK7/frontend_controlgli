import React from "react";
import Nav from "../../components/Nav";
import Services from "../../components/Services";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import './styles.css'
import contentImg from "../../assets/kelle.jpeg";

const Home = () => {
  return (
    <>
      <div className="home_container">
        <Nav />
        <div className="main">
          <div className="section_left">
            <h1>
              Crie hábitos alimentares de qualidade para alcançar uma vida mais
              saudável
            </h1>
            <p>
              <Link to={"/login"} className="login-button">
                Vamos lá!
              </Link>
            </p>
          </div>
          <div className="section_rigth">
            <img src={contentImg} alt="Gli" />
            <div className="blur"></div>
          </div>
        </div>
        <Services /> 
        <Footer/>
      </div>
    </>
  );
};

export default Home;
