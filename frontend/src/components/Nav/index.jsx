import React from "react";
import { FiPower, FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import "./index.css";

const Nav = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();

    history.push("/");
  };

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
          <li><Link to="/login" style={{listStyle: 'none', color: 'snow', textDecoration: 'none' }}>Login</Link></li>
        </ul>
      </header>
    </div>
  );
};

export default Nav;
