import React, { useState, useEffect } from "react";
//import { FiPower, FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/Logo_u.png";

import "./index.css";

const Nav = () => {
  const history = useHistory();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleLogout = () => {
    localStorage.clear();

    history.push("/");
  };

  const handleClick = () => setClick(!click);
  //const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, [button]);

  window.addEventListener("resize", showButton);

  const path = window.location.pathname;
  return (
    <div className="nav_bar">
      <header>
        {window.innerWidth <= 960 ? (
          <>
            <div className="header">
              <div className="menu_icon" onClick={handleClick}>
                {click ? <FiX /> : <FiMenu />}
              </div>
            </div>
            <div className="Logo">
              <img src={Logo} style={{ width: "20rem" }} alt="logo" />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <img src={Logo} width={180} alt="logo" />
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                {role !== 0 && (path === "/users" || path === "/register") ? (
                  <div className="container_list">
                    <li
                      style={
                        path === "/users"
                          ? { border: "0", borderBottom: "2px solid #F7B12A" }
                          : null
                      }
                    >
                      <Link
                        style={{
                          width: "100%",
                          listStyle: "none",
                          color: "#919191",
                          textDecoration: "none",
                        }}
                        to="/users"
                      >
                        Lista de Usuários
                      </Link>
                    </li>
                    <li
                      style={
                        path === "/register"
                          ? { border: "0", borderBottom: "2px solid #F7B12A" }
                          : null
                      }
                    >
                      <Link
                        style={{
                          width: "100%",
                          listStyle: "none",
                          color: "#919191",
                          textDecoration: "none",
                        }}
                        to="/register"
                      >
                        Cadastrar Usuário
                      </Link>
                    </li>
                  </div>
                ) : null}
                {token ? (
                  <li
                    style={{
                      listStyle: "none",
                      color: "#FFFF",
                      textDecoration: "none",
                      cursor: "pointer",
                      background: "#e07732",
                      padding: 8,
                      borderRadius: 8,
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                ) : (
                  <li>
                    {path === "/login" ? (
                      <Link
                        to="/"
                        style={{
                          listStyle: "none",
                          color: "#FFFF",
                          textDecoration: "none",
                          cursor: "pointer",
                          background: "#e07732",
                          padding: 8,
                          borderRadius: 8,
                        }}
                      >
                        Home
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        style={{
                          listStyle: "none",
                          color: "#FFFF",
                          textDecoration: "none",
                          cursor: "pointer",
                          background: "#e07732",
                          padding: 8,
                          borderRadius: 8,
                        }}
                      >
                        Login
                      </Link>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Nav;
