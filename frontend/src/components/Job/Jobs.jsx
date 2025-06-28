import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./Jobs.css";
import { Appcontext } from "../../contextApi/AppContext";
import axios from "axios";



const Jobs = () => {
  const {isAuth,setIsAuth}=useContext(Appcontext);
  const navigateTo = useNavigate();
  const [jobsdata,setJobsdata]=useState([])

  useEffect(()=>{
    fetchJobs()
  },[])

  const fetchJobs=async()=>{
    
    const res= await axios.get("http://localhost:3000/api/getalljobs");
    setJobsdata(res.data.jobs);
    console.log(jobsdata);
    
  }

  if (!isAuth) {
    return <Navigate to={'/login'}/>
  }

  return (
    <section className="jobs page py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-white">All Available Jobs</h1>
        <div className="banner row g-4">
          {jobsdata.length > 0 ? (
            jobsdata.map((element) => (
              <div className="col-lg-4 col-md-6" key={element._id}>
                <div className="card h-100 shadow-lg border-0">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3">{element.title}</h5>
                    <p className="card-text mb-2">
                      <strong>Category:</strong> {element.category}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Country:</strong> {element.country}
                    </p>
                    <Link
                      to={`/job/${element._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Job Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-white">No jobs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
