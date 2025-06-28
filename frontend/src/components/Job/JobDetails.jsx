import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./JobDetails.css";
import { Appcontext } from "../../contextApi/AppContext";
import axios from "axios";


const JobDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [oneJob,setOneJob]=useState()
 const {isAuth,setIsAuth}=useContext(Appcontext);
 const token=sessionStorage.getItem("token");
  const reqheader={
      "Content-Type":'application/json',
      "Authorization":`Bearer ${token}`
     }

 const userRole=JSON.parse(sessionStorage.getItem('user'))
 const role=userRole.role;

 const fetchSingleJob=async()=>{
  const res=await axios.get(`http://localhost:3000/api/job/${id}`,{
    headers:reqheader
  });  
  if(res.data.job){
     setOneJob(res.data.job);
     
  }

 }

 useEffect(()=>{
   fetchSingleJob();
  console.log(oneJob);
 },[])

  if (!isAuth) {
    navigateTo("/login");
  }



  return (
    <section className="jobDetail page py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-white">Job Details</h1>
        <div className="banner card shadow-lg border-0">
          <div className="card-body p-5">
            {oneJob?
                <>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Title:</div>
                  <div className="col-md-9">{oneJob.title}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Category:</div>
                  <div className="col-md-9">{oneJob.category}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Country:</div>
                  <div className="col-md-9">{oneJob.country}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">City:</div>
                  <div className="col-md-9">{oneJob.city}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Location:</div>
                  <div className="col-md-9">{oneJob.location}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Description:</div>
                  <div className="col-md-9">{oneJob.description}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Posted On:</div>
                  <div className="col-md-9">{oneJob.jobPostedOn}</div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-3 fw-bold">Salary:</div>
                  <div className="col-md-9">{oneJob.salary}</div>
                </div>
               
                  <div className="text-center">
                    <Link to={`/application/${oneJob._id}`} className="btn btn-primary btn-lg">
                      Apply Now
                    </Link>
                  </div>
               </>
             : (
              <div className="text-center">
                <p>Loading job details...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
