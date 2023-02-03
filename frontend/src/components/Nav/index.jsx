import React from "react";
import { FiPower, FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import "./index.css";

const Nav = () => {
  const history = useHistory();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  console.log(role);
  const handleLogout = () => {
    localStorage.clear();

    history.push("/");
  };
  const path = window.location.pathname;
  console.log(path);
  return (
    <div className="nav_bar">
      {/* <header>
                <span> 
                    <FiUser color="FFF" size={20}/>  
                     <p>{user._id}</p>
                     <Link className="dashboard" to="/dashboard">Dashboard</Link>
                </span>
                
                <button type="button" onClick={handleLogout}>
                    <FiPower color="FFF" size={20}/> 
                </button>
                <p>Login</p>
               
            </header>  */}
      <header>
        <ul>
          <li>Logo</li>
          {(role === 0 && path === "/") || path === "/login" ? (
            <div className="container_list">
              <li>
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
              <li>
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
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Nav;
