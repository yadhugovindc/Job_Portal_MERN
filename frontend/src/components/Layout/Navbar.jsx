import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { Appcontext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(Appcontext);


   
   let itemRole=sessionStorage.getItem("user");

      let userRole=JSON.parse(itemRole);
      console.log(userRole);
      const role=userRole.role;
      console.log(role);
    
  
  const handlelogout=()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuth(false);
    toast.success('logged out successfully')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="https://cdn-icons-png.freepik.com/256/9871/9871830.png?ga=GA1.1.1211554208.1733224352&semt=ais_hybrid" 
            alt="logo" 
            height="40" 
            className="me-2"
          />
          <span className="fw-bold">Job Connect</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/job/getall">
                ALL JOBS
              </Link>
            </li>
         {role==='job seeker' &&   <li className="nav-item">
              <Link className="nav-link" to="/applications/me">
                MY APPLICATIONS
              </Link>
            </li>}
          
            {role==='employer' &&<><li className="nav-item">
              <Link className="nav-link" to="/job/post">
                POST NEW JOB
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/job/me">
                VIEW YOUR JOBS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/applications/employerapplication">
                VIEW RECEIVED APPLICATIONS
              </Link>
            </li></>}
            
             <li className="nav-item">
              <Link className="nav-link">
               <a  type="button" className="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i className="fa-solid fa-circle-user" style={{color:'white',fontSize:'2vw'}}></i></a>
              </Link>
            </li>
            { 
                isAuth===true? <li className="nav-item">
              <button className="btn btn-outline-light ms-3 logout-btn" onClick={handlelogout}>
                LOGOUT
              </button>
            </li>:<></>
            }
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;