import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { Appcontext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [log, setLog] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate=useNavigate()
  const { isAuth, setIsAuth } = useContext(Appcontext);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(log);
    try {
      const res = await axios.post("http://localhost:3000/api/login", log, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setLog({
          email: "",
          password: "",
          role: "",
        });
       sessionStorage.setItem('token',res.data.jwt_token);
       sessionStorage.setItem('user',JSON.stringify(res.data.user_data));
       if(res.data.user_data.role==='super admin'){
        return navigate('/admin')
       }
       navigate('/');
       setIsAuth(true);

      }
    } catch (err) {
      if(err.response){
        if(err.response.status===400){
          toast.error(err.response.data)
        }else if(err.response.status===404){
          toast.error(err.response.data);
        }else if(err.response.status===500){
          toast.error(err.response.data)
        }
        else{
          toast.error("something went wrong")
        }
      }
      console.log(err);
      
    }
  };



  return (
    <section className=" vh-100 py-5" style={{ background: 'linear-gradient(135deg, #4e54c8, #8f94fb)' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">Login</h3>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-4 position-relative">
                    <label htmlFor="role" className="form-label fw-semibold">
                      Login As
                    </label>
                    <div className="input-group">
                      <select
                        id="role"
                        className="form-select"
                        onChange={(e) =>
                          setLog({ ...log, role: e.target.value })
                        }  value={log.role}
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
                          setLog({ ...log, email: e.target.value })
                        } value={log.email}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
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
                          setLog({ ...log, password: e.target.value })
                        } value={log.password}
                        required
                      />
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Login
                  </button>
                  <div className="text-center">
                    <span>Don't have account </span>
                    <Link to="/register" style={{textDecoration:'none'}} className="text-primary fw-semibold">
                      Sign Up
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
              className="img-fluid rounded-2"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
