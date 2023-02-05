import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

import api from "../../services/api";

import Nav from "../../components/Nav";

import "./styles.css";
import "../../global.css";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addToast } = useToasts();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    if (email === "" || password === "") {
      addToast("Preencha todos os campos", {
        appearance: "info",
        autoDismiss: true,
      });
    } else {
      try {
        const response = await api.post("session", data);
        const { token } = response.data;
        const { _id } = response.data.user;
        const { role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);
        localStorage.setItem("role", role);
        if (role === 0) {
          history.push("/profile");
        } else {
          history.push("/users");
        }
      } catch (error) {
        addToast("Email ou senha incorreto", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <div>
      <div className="logon-container">
        <Nav />
        <section className="form">
          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>
            <input
              placeholder="Seu Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <input
              placeholder="Seu password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <button className="button" type="submit">
              Entrar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
