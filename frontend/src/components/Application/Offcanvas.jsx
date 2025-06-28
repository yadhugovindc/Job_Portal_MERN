import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Offcanvas = () => {

const [profile,setProfile]=useState(null)

const token=sessionStorage.getItem('token');  
const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
 
const getUserProfile=async()=>{
  try {
    const res=await axios.get('http://localhost:3000/api/profile',{
      headers:reqHeader
    })
    if(res.status==200){
      setProfile(res.data);
      if(profile){
        console.log('user profiledata',profile);
      }    
    }
  } catch (error) {
    if(error.response){
      if(error.response.status==404){
        toast.error(error.response.data)
      }else if(error.response.status==500){
        toast.error(error.response.data)
      }else{
        toast.error('something went wrong')
      }
    }
  }
}
useEffect(()=>{
  getUserProfile()
  
},[])

  return (
    <>{

      profile && 
    
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Profile</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="container m">
            <div className="row ">
              
                <i
                  class="fa-solid fa-circle-user p-0 d-flex justify-content-center"
                  style={{ fontSize: "50px" }}
                ></i>
             
            </div>
            <div className="row ">
              <div
                className="p-3 bg-light rounded shadow d-flex justify-content-center flex-column"
              >
                <p className="mb-2 fw-bold" style={{ color: "#0d6efd" }}>
                  Name: <span className="fw-normal text-dark">{profile.name}</span>
                </p>
                <p className="mb-2 fw-bold" style={{ color: "#0d6efd" }}>
                  Email:
                  <span className="fw-normal text-dark">{profile.email}</span>
                </p>
                <p className="mb-0 fw-bold" style={{ color: "#0d6efd" }}>
                  Phone no:
                  <span className="fw-normal text-dark">{profile.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default Offcanvas;
