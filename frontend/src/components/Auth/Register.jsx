import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate=useNavigate();
  const [userReg, setUserReg] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const validator=()=>{
    const {name,email,phone,password,role}=userReg;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if(!role){
      toast.error("please select role")
      return false;
    }
    if(!name || name.trim().length <2){
     toast.error("Name must be greater than 2 characters");
     return false;
    }
    if(!email || !emailRegex.test(email)){
      toast.error('Please enter a valid email');
      return false;
    }
    if(!phone || !phoneRegex.test(phone)){
      toast.error('Please enter a valid phone number');
      return false;
    }
    if(!password || password.length <6){
      toast.error("password must be at least 6 characters length");
      return false;
    }
    return true;

  }

  // const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!validator()){
       return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/register",
        userReg,
        {
          headers: {
            "Content-Type": "application/json",
          },
       
        }
      );
      if (res.status === 201) {
        navigate('/login');
        toast.success(res.data);
        setUserReg({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "",
        });
        
      }
      
      console.log(res);
      
    } catch (error) {
      if(error.response){
        if (error.response.status === 400) {
        toast.warning(error.response.data);
      }else if(error.response.status === 500)
      toast.error(error.response.data);
      else{
        toast.error("An unaccepted error occured")
      }
      }
     
      console.log(error);
    }
    console.log(userReg);
  };

  return (
    <section className=" py-5" style={{ background: 'linear-gradient(135deg, #4e54c8, #8f94fb)' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">Create a New Account</h3>
                </div>
                <form className="form-control" onSubmit={handleRegister}>
                  <div className="mb-4 position-relative">
                    <label htmlFor="role" className="form-label fw-semibold">
                      Register As
                    </label>
                    <div className="input-group">
                      <select
                        id="role"
                        className="form-select"
                        onChange={(e) =>
                          setUserReg({ ...userReg, role: e.target.value })
                        }
                        value={userReg.role}
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="employer">Employer</option>
                        <option value="job seeker">Job Seeker</option>
                      </select>
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Name
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        onChange={(e) =>
                          setUserReg({ ...userReg, name: e.target.value })
                        }
                        value={userReg.name}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-pencil-alt"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) =>
                          setUserReg({ ...userReg, email: e.target.value })
                        }
                        value={userReg.email}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        placeholder="Enter your phone number"
                        onChange={(e) =>
                          setUserReg({ ...userReg, phone: e.target.value })
                        }
                        value={userReg.phone}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={(e) =>
                          setUserReg({ ...userReg, password: e.target.value })
                        }
                        value={userReg.password}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Register
                  </button>
                  <div className="text-center">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                      Login Now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block text-center">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?ga=GA1.1.1211554208.1733224352&semt=ais_hybrid&w=740"
              alt="Register Illustration"
              className="img-fluid rounded-3"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
