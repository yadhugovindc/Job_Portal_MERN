import React from 'react';
import './Myjobs.css';
import { useContext } from 'react';
import { Appcontext } from '../../contextApi/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';


const MyJobs = () => {

  const navigate=useNavigate();
  // const [load,setLoad]=useState(false);
  const {isAuth}=useContext(Appcontext);
  const [array,setArray]=useState([]);
  const [editJob,setEditJob]=useState({
  })

  const token=sessionStorage.getItem("token");
     const reqheader={
      "Content-Type":'application/json',
      "Authorization":`Bearer ${token}`
     }

  const listJobs=async()=>{
    try {
       const res=await axios.get('http://localhost:3000/api/getmyjobs',
      {
        headers:reqheader
      });
      if(res.data){
      setArray(res.data.myjobs);
      console.log("fetched array is",array);
      }
    } catch (error) {
      console.error("error is",error);
      toast.info(error.response.data)
    }
     
  }
 

  const deleteItem=async(DitemID)=>{
    try {
      const res= await axios.delete(`http://localhost:3000/api/deletejob/${DitemID}`,{
        headers:reqheader
      });
      if(res.status===200){
        // setArray(prev=>prev.filter(item=>item._id!==DitemID));
        const updatedArray=array.filter(item=>item._id!==DitemID);
        setArray(updatedArray);
        toast.success(res.data);
       
      }
    } catch (error) {
      if(error.response){
         if(error.response.status===403){
          toast.error(error.response.data)
         }else if(error.response.status===404){
          toast.error(error.response.data)
         }else if(error.response.status===500){
          toast.error(error.response.data)
         }else{
          toast.error("something went wrong")
         }
      }
    }
  }

  const updateItem=async()=>{
    const res=await axios.put(`http://localhost:3000/api/updatejob/${editJob._id}`,editJob,{
      headers:reqheader
    });
    listJobs();
  }

  const handleInputValue=(item)=>{
    setEditJob(item);
    console.log(item);
    
  }
  
  useEffect(()=>{
    listJobs();
  },[])



  if(!isAuth){
   return <Navigate to={'/login'}/>
  }
  return (
   <>
    <section className="intro">
      <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mt-3">
                  <div className="card-body p-0">
                    <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                      <table className="table table-striped mb-0 ">
                        <thead style={{ backgroundColor: '#002d72' }}>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Country</th>
                            <th scope="col">City</th>
                            <th scope="col">Location</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Expired</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {array.length>0?array?.map((item)=>{
                          return  <tr>
                            <td>{item.title}</td>
                            <td>{item.description.substring(0,40)}</td>
                            <td>{item.category}</td>
                            <td>{item.country}</td>
                            <td>{item.city}</td>
                            <td>{item.location}</td>
                            <td>{item.salary}</td>
                            <td>{item.expired===true?<i className="fa-solid fa-circle mt-2" style={{color:"rgb(234, 17, 46)"}}>Yes</i>:<i className="fa-solid fa-circle mt-2" style={{color: "#00cc7a"}}>No</i>}</td>
                            <td> <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleInputValue(item)}><i className="fa-solid fa-file-pen" ></i></button></td>
                            <td><i className="fa-solid fa-trash mt-2" onClick={()=>deleteItem(item._id)}></i></td>
                          </tr>
                          }):<>
                          <tr>
                           <td colSpan={'10'} className='fw-bolder text-center'>No jobs</td>
                          </tr>
                          </>}
                  
                          {/* Add more rows as necessary */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

 

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content ">
      <div class="modal-header ">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Job </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body  p-3">
        <form action="">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" value={editJob.title}  onChange={(e)=>setEditJob({...editJob,title:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Description</label>
            <textarea type="text" value={editJob.description}  onChange={(e)=>setEditJob({...editJob,description:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Category</label>    
            <select value={editJob.category}   className="form-control"
                     onChange={(e)=>setEditJob({...editJob,category:e.target.value})}
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
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Country</label>
            <input type="text" value={editJob.country}  onChange={(e)=>setEditJob({...editJob,country:e.target.value})}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">City</label>
            <input type="text" value={editJob.city}  onChange={(e)=>setEditJob({...editJob,city:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
           <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Location</label>
            <input type="text" value={editJob.location}  onChange={(e)=>setEditJob({...editJob,location:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
           <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Salary</label>
            <input type="text" value={editJob.salary}  onChange={(e)=>setEditJob({...editJob,salary:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>         
          </div>
           <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Expired</label>
             <select class="form-select"  value={editJob.expired} onChange={(e)=>setEditJob({...editJob,expired:e.target.value})} id='exampleInputEmail1' aria-label="Default select example">
                <option selected disabled>Open this select menu</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={updateItem}>Save changes</button>
      </div>
    </div>
  </div>
</div>

   </> 
  );
};

export default MyJobs;
