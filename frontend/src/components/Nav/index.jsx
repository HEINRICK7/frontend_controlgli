import React from 'react';
import { FiPower, FiUser} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './index.css'


const Nav = () => {

    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="nav_bar">
            <header>
                <span> 
                    <FiUser color="FFF" size={20}/>  
                     <p>{}</p>
                     <Link className="dashboard" to="/dashboard">Dashboard</Link>
                </span>
                
                <button type="button" onClick={handleLogout}>
                    <FiPower color="FFF" size={20}/> 
                </button>
               
            </header> 
        </div>
    );
}

export default Nav;
