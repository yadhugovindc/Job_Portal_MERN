import axios from "axios";
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./Application.css";
import { Appcontext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";


const Application = () => {
  const {isAuth,setIsAuth,user}=useContext(Appcontext);
  const navigateTo = useNavigate();
  const { id } = useParams();
  const token=sessionStorage.getItem('token');

  const [data,setData]=useState({
     name:""
    ,email:""
    ,phone_no:""
    ,address:""
    ,cover_letter:""
    ,jobId:id
    ,resume:""
  });



  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const {name,email,phone_no,address,cover_letter,jobId,resume}=data;
     try {
      if(!name || !email || !phone_no || !address || !cover_letter || !jobId || !resume){
        toast.warning("please fill the form completely");
    }
    else{
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone_no",phone_no);
    formData.append("address",address);
    formData.append("cover_letter",cover_letter);
    formData.append("jobId",jobId);
    formData.append("resume",resume);

    const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    const res=await axios.post("http://localhost:3000/api/submitform",formData,{
       headers:reqHeader
    });
    
    if(res.status===200){
      toast.success(res.data);
      setData({
         name:""
    ,email:""
    ,phone_no:""
    ,address:""
    ,cover_letter:""
    ,jobId:id
    ,resume:""
      })
     navigateTo('/applications/me')
    }
    }
      
     } catch (error) {
      if(error.response){
        if(error.response.status===403){
          toast.warning(error.response.data)
        }else if(error.response.status===400){
           toast.warning(error.response.data)
        }else{
          toast.error(error.response.data.error)
     }
        }

      }  
  };

  if (!isAuth) {
   return navigateTo("/");
  }

  return (
    <section className="application page py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-white">Application Form</h1>
        <div className="card shadow-lg border-0  col-12">
          <div className="card-body p-5">
            <form onSubmit={handleApplication} className="form-floating">
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      value={data.name}
                      onChange={(e) => setData({...data,name:e.target.value})}
                      placeholder="Enter your name"
                      required
                    />
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="email"
                      id="email" 
                      className="form-control form-control-lg"
                      value={data.email}
                      onChange={(e) => setData({...data,email:e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="tel"
                      id="phone"
                      className="form-control form-control-lg"
                      value={data.phone_no}
                      onChange={(e) => setData({...data,phone_no:e.target.value})}
                      placeholder="Enter your phone number"
                      required
                    />
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="address"
                      className="form-control form-control-lg"
                      value={data.address}
                      onChange={(e) => setData({...data,address:e.target.value})}
                      placeholder="Enter your address"
                      required
                    />
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <textarea
                  id="coverLetter"
                  className="form-control form-control-lg"
                  rows="6"
                  value={data.cover_letter}
                  onChange={(e) => setData({...data,cover_letter:e.target.value})}
                  placeholder="Enter your cover letter"
                  required
                />
                <label className="form-label" htmlFor="coverLetter">
                  Cover Letter
                </label>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="resume">
                  Upload Resume in Image (JPEG, JPG, PNG)
                </label>
                <input
                  type="file"
                  id="resume"
                  accept="image/*"
                  className="form-control form-control-lg"
                  onChange={(e) => setData({...data,resume:e.target.files[0]})}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Send Application
                </button>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Application;