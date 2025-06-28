import React, { useContext } from "react";

import { Link } from "react-router-dom";
import './Footer.css'
import { Appcontext } from "../../contextApi/AppContext";

const Footer = () => {
  const {isAuth,setIsAuth}=useContext(Appcontext);
  return (
    <footer className={isAuth ? "footer footerShow" : "footer footerHide"}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="copyright-text">
              2025 All Rights Reserved By JobIndia.in
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="social-links">
              <a 
                href="https://www.facebook.com/profile.php?id=100030535123397" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://www.youtube.com/@CodeWithZeeshu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/zeeshu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://www.instagram.com/z_4_zeeshuuu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;