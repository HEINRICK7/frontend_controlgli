import React from "react";
import { Link } from "react-router-dom";

import './styles.css'
const Footer = () => {
  return (
    <div className="container_footer">
       <footer>
    <div class="wrapper">
      <small>&copy;2017 <strong>Awesome Company</strong>, All Rights Reserved</small>
      <nav class="footer-nav">
        <Link to="#">Back to Top</Link>
        <Link to="#">Terms of Use</Link>
        <Link to="#">Privacy</Link>
      </nav>
    </div>
  </footer>
    </div>
  );
};

export default Footer;
