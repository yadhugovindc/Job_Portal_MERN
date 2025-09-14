import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Link to external CSS
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [Noapp,setNoApp]=useState();

  const [application,setApplcation]=useState([])


  const stats = {
    employees: 12,
    jobSeekers: 30,
    applications: 45
  };

  let employees=users?.filter((item)=>item.role==='employer');
  let jobseeker=users?.filter((item)=>item.role==='job seeker');
  console.log("employees",employees,"job seeker",jobseeker);

   const getAppl = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/getallapplications"
      );
      console.log(res);
      if (res.status == 200) {
        setApplcation(res.data);
      }
    } catch (error) {}
  };


  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getallusers");
      console.log(res);
      setUsers(res.data);
    } catch (error) {}
  };

  useEffect(()=>{
    getUsers();
    getAppl();
  },[])
  return (
    <div className="container py-5">
      <h2 className="mb-4 dashboard-title">📊 Dashboard Summary</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-success shadow-sm stat-card">
            <div className="card-body text-center">
              <h5 className="card-title">Employees</h5>
              <p className="display-6">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-primary shadow-sm stat-card">
            <div className="card-body text-center">
              <h5 className="card-title">Job Seekers</h5>
              <p className="display-6">{jobseeker.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-warning shadow-sm stat-card">
            <div className="card-body text-center">
              <h5 className="card-title">Applications</h5>
              <p className="display-6">{application.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
