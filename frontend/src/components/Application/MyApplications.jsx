import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyApplications.css";
import { Appcontext } from "../../contextApi/AppContext";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const MyApplications = () => {
  const { isAuth} = useContext(Appcontext);
  const [applications, setApplications] = useState([]);

  const [url,setUrl]=useState()

  const [editApplication,setEditApplication]=useState({})



  const navigateTo = useNavigate();
  const token = sessionStorage.getItem("token");
  const reqheader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchApplications = async () => {

    const res = await axios.get("http://localhost:3000/api/getform", {
      headers: reqheader,
    });
    console.log(res.data.application);
    setApplications(res.data.application);
  };

  const deleteApplication = async (itemId) => {
    const res = await axios.delete(
      `http://localhost:3000/api/deleteform/${itemId}`,
      {
        headers: reqheader,
      }
    );
    let newArr = applications.filter(item => item._id !== itemId);
    toast.success(res.data);
    setApplications(newArr);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateApplicationStatus=async(url)=>{
     const{name,email,phone_no,address,cover_letter,resume}=editApplication;
       const formData=new FormData();
     formData.append("name",name)
     formData.append("email",email)
     formData.append("phone_no",phone_no)
     formData.append("address",address)
     formData.append("cover_letter",cover_letter);
     if(resume){
         formData.append("resume",resume);
     }
    const res=await axios.put(`http://localhost:3000/api/updateapplication/${url}`,formData,{
      headers:{
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
      }
    });
    if(res.status===200){
      toast.success("successfully updated")
      fetchApplications()
    }
  }

  const handleInputValue=(item)=>{
   setEditApplication(item);
   setUrl(item._id);
   console.log(editApplication);
  }

  if (!isAuth) {
    return navigateTo("/");
  }

  return (
    <>
    <section className="my_applications  py-5">
      <div className="container">
        <div className="row">
          {applications.length > 0 ? (
            applications.map((item) => {
              return (
                <div className="col-6 mt-3">
                  <div className="card h-100 border-info">
                    <div className="card-body">
                      <h4 className="card-title">{item.jobTitle}</h4>
                      <hr />
                      <div className="row">
                        <div className="col-6">
                          <p><span className="fw-bold">Name: </span>{item.name}</p>
                          <p><span className="fw-bold">Phone no: </span>{item.phone_no}</p>
                          <p><span className="fw-bold">Address: </span>{item.address}</p>
                          <p><span className="fw-bold">Email: </span>{item.email}</p>
                          <p><span className="fw-bold">Status: </span><span className={item.jobStatus }>{item.jobStatus}</span></p>
                         
                        <PhotoProvider>
                          <PhotoView  src={`http://localhost:3000/uploads/${item.resume}`}>
                               <img
                            src={`http://localhost:3000/uploads/${item.resume}`}
                            alt=""
                            className="img-fluid h-50 w-75"
                          />
                          </PhotoView >
                        </PhotoProvider>
                         
                          
                        </div>
                        <div className="col-6">
                          <p><span className="fw-bold">Cover letter:</span><br />{item.cover_letter}</p>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-primary rounded-5"
                        onClick={() => deleteApplication(item._id)}
                      >
                        Delete
                      </button>
                      { item.jobStatus==='submitted'?<button type="button" onClick={()=>handleInputValue(item)} class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     Edit Application
                    </button>:<button type="button" disabled onClick={()=>handleInputValue(item)} class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     Edit Application
                    </button>}
                      

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
             
              <div className="row" style={{ height: "100vh" }}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h3 className="fw-lighter">No application found!</h3>
                  <img
                    src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?ga=GA1.1.1211554208.1733224352&semt=ais_hybrid&w=740"
                    alt=""
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Application</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
  <label htmlFor="name">Name</label>
  <input type="text" value={editApplication.name} id="name" onChange={(e)=>setEditApplication({...editApplication,name:e.target.value})} className="form-control mt-2" />

  <label htmlFor="email">Email</label>
  <input type="email" value={editApplication.email} id="email" onChange={(e)=>setEditApplication({...editApplication,email:e.target.value})} className="form-control mt-2" />

  <label htmlFor="address">Address</label>
  <input type="text" value={editApplication.address} id="address" onChange={(e)=>setEditApplication({...editApplication,address:e.target.value})} className="form-control mt-2" />

  <label htmlFor="phone_no">Phone Number</label>
  <input type="number" value={editApplication.phone_no} id="phone_no" onChange={(e)=>setEditApplication({...editApplication,phone_no:e.target.value})} className="form-control mt-2" />

  <label htmlFor="cover_letter">Cover Letter</label>
  <textarea type="text" value={editApplication.cover_letter} id="cover_letter" onChange={(e)=>setEditApplication({...editApplication,cover_letter:e.target.value})} className="form-control mt-2" />

  <label htmlFor="image">Profile Image</label>
  <input type="file"  id="image" accept="image/*" onChange={(e)=>setEditApplication({...editApplication,resume:e.target.files[0]})} className="form-control mt-2" />
</div>
 <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>updateApplicationStatus(url)}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default MyApplications;
