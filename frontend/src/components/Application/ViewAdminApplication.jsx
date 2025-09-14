import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../../contextApi/AppContext';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { toast } from 'react-toastify';
import './viewadminapplication.css'

const ViewAdminApplication = () => {
const {isAuth,setIsAuth,user}=useContext(Appcontext);
 const [receivedItem,setReceivedItem]=useState([]);
 const [update,setUpdate]=useState({})

 const [url,setUrl]=useState()

  const token=sessionStorage.getItem('token');

  
  const handleInputValue=(item)=>{
    setUrl(item._id);
    setUpdate({jobStatus:item.jobStatus});
  }

   const navigateTo = useNavigate();
    const reqheader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

   const viewApplications=async()=>{
    try {
      const res=await axios.get('http://localhost:3000/api/getemployerapplication',{
          headers:reqheader
        });
      console.log(res);
      if(res){
         setReceivedItem(res.data.item);
         console.log(receivedItem);
      }  
      
    } catch (error) {
      
    }        
   }

   
   const updateStatus=async(url)=>{
    try {
      console.log(url);
      console.log(update); 
      const res=await axios.put(`http://localhost:3000/api/status/${url}`,update,{
      headers:reqheader
    });
     viewApplications();
       if(res.status===200){
         toast.success('job status updated successfully')
       }

    } catch (error) {
      console.log(error);
      
    }
   }



   useEffect(()=>{
    viewApplications();
   },[]) 

  const imageBase = "http://localhost:3000/uploads/";

  if (!isAuth) {
    return navigateTo("/"); 
  }

  return (
    <>
    <section className="my_applications py-5">
      <div className="container">
        <div className="row">
          {receivedItem.length>0?receivedItem.map((item) => (
            <div className="col-12 col-md-6 mt-3" key={item._id}>
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
                      <p><span className="fw-bold">Status: </span>
                        <span className={item.jobStatus } >
                          {item.jobStatus}
                        </span>
                      </p>
                    <PhotoProvider>
                      
                      <PhotoView src={`${imageBase}${item.resume}`}>
                             <img
                        src={`${imageBase}${item.resume}`}
                        alt="resume"
                        className="img-fluid h-50 w-75"
                      />
                      </PhotoView>
                      
                    </PhotoProvider>
                     
                    </div>
                    <div className="col-6">
                      <p><span className="fw-bold">Cover letter:</span><br />{item.cover_letter}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-primary rounded-5">Delete</button>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleInputValue(item)}>
                  Update Status
                </button>
                </div>
              </div>
            </div>
          )):<>no application for u</>}
        </div>
      </div>
    </section>
    <div
  className="modal fade my-modal"
  id="exampleModal"
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog my-modal-dialog">
    <div className="modal-content my-modal-content">
      <div className="modal-header my-modal-header">
        <h1 className="modal-title fs-5 my-modal-title" id="exampleModalLabel">
          Modal title
        </h1>
        <button
          type="button"
          className="btn-close my-modal-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body my-modal-body">
        <label htmlFor="">Update status</label>
       <select name="cars" id="cars" value={update.jobStatus} className='form-control' onChange={(e)=>setUpdate({jobStatus:e.target.value})}>
            <option value="submitted">submitted</option>
            <option value="viewed" >viewed</option>
            <option value="rejected">rejected</option>
            <option value="accepted">accepted</option>
       </select>
      </div>
      <div className="modal-footer my-modal-footer">
        <button
          type="button"
          className="btn btn-secondary my-modal-close-btn"
          data-bs-dismiss="modal"
        >Close
        </button>
        <button type="button" className="btn btn-primary my-modal-save-btn" data-bs-dismiss="modal" onClick={()=>updateStatus(url)}>
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ViewAdminApplication


