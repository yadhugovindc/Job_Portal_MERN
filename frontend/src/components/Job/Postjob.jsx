import React, { useContext, useState } from "react";
import axios from "axios";

import { Navigate, useNavigate } from "react-router-dom";

import "./PostJob.css";
import { Appcontext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";

const PostJob = () => {
const [jobForm,setJobForm]=useState({
   title:"", 
   description:"", 
   category:"", 
   country:"", 
   city:"", 
   location:"", 
   salary:""
})
  const {isAuth,setIsAuth,user}=useContext(Appcontext);

  const handleJobPost = async (e) => {
    e.preventDefault();
    const token=sessionStorage.getItem("token");
    const reqheader={
      "Content-Type":'application/json',
      "Authorization":`Bearer ${token}`
     }
     try {
        const res= await axios.post("http://localhost:3000/api/postjobs",jobForm,{
      headers:reqheader
     });
     console.log(res);
     if(res.status===200){
       toast.success(res.data);
       setJobForm({
        title:"", 
        description:"", 
        category:"", 
        country:"", 
        city:"", 
        location:"", 
        salary:""
       })
     }
     } catch (err) {
        if(err.response){
            if(err.response.status===403){
              toast.error(err.response.data)
            }else if(err.response.status===400){
              toast.error(err.response.data)
            }else if(err.response.status===500){
               toast.error(err.response.data)
            }else{
              toast.error("something went wrong")
            }
            }
            console.log(err);
     }
     
  };

  if(!isAuth){
      return <Navigate to={'/login'}/>
    }

  return (
    <section className="job_post page py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-white">Post New Job</h1>
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <form onSubmit={handleJobPost}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="title"
                      className="form-control form-control-lg"
                     value={jobForm.title}
                     onChange={(e)=>setJobForm({...jobForm,title:e.target.value})}
                      placeholder=""
                      required
                    />
                    <label className="form-label" htmlFor="title">
                      Job Title
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <select
                      id="category"
                      className="form-select form-select-lg"
                         value={jobForm.category}
                     onChange={(e)=>setJobForm({...jobForm,category:e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Graphics & Design">Graphics & Design</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Frontend Web Development">Frontend Web Development</option>
                      <option value="MERN Stack Development">MERN Stack Development</option>
                      <option value="Account & Finance">Account & Finance</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="MEAN Stack Development">MEAN Stack Development</option>
                      <option value="MEVN Stack Development">MEVN Stack Development</option>
                      <option value="Data Entry Operator">Data Entry Operator</option>
                    </select>
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="country"
                      className="form-control form-control-lg"
                         value={jobForm.country}
                     onChange={(e)=>setJobForm({...jobForm,country:e.target.value})}
                      placeholder=""
                      required
                    />
                    <label className="form-label" htmlFor="country">
                      Country
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="city"
                      className="form-control form-control-lg"
                         value={jobForm.city}
                     onChange={(e)=>setJobForm({...jobForm,city:e.target.value})}
                      placeholder=""
                      required
                    />
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="location"
                  className="form-control form-control-lg"
                      value={jobForm.location}
                     onChange={(e)=>setJobForm({...jobForm,location:e.target.value})}
                  placeholder=""
                  required
                />
                <label className="form-label" htmlFor="location">
                  Location
                </label>
              </div>
                 <div className="form-outline mb-4">
                <input
                  type="text"
                  id="salary"
                  className="form-control form-control-lg"
                      value={jobForm.salary}
                     onChange={(e)=>setJobForm({...jobForm,salary:e.target.value})}
                  
                  placeholder=""
                  required
                />
                <label className="form-label" htmlFor="salary">
                  Salary
                </label>
              </div>
           
              <div className="form-outline mb-4">
                <textarea
                  id="description"
                  className="form-control form-control-lg"
                  rows="6"
                     value={jobForm.description}
                     onChange={(e)=>setJobForm({...jobForm,description:e.target.value})}
                  placeholder=""
                  required
                />
                <label className="form-label" htmlFor="description">
                  Job Description
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJob;