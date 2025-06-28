import React,{useContext,useEffect} from 'react'
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import Postjob from './components/Job/Postjob';
import Application from './components/Application/Application';
import MyApplications from './components/Application/MyApplications';
import Home from './components/Home/Home';
import Notfound from './components/NotFound/Notfound';
import { Appcontext } from './contextApi/AppContext';
import ViewAdminApplication from './components/Application/ViewAdminApplication';
import Offcanvas from './components/Application/Offcanvas';
import AdminHome from './components/Superadmin/AdminHome';
import Dashboard from './components/Superadmin/Dashboard';
import ManageApplications from './components/Superadmin/ManageApplications';
import ManageEmployers from './components/Superadmin/ManageEmployers';
import ManageJobseekers from './components/Superadmin/ManageJobseekers';



const App = () => {
  const {isAuth,setIsAuth,user}=useContext(Appcontext);
  
  return (
    <>
    <BrowserRouter>
       {
        isAuth? <>
        <Navbar />
        <Offcanvas/>
        </>
        :<></>
       }
       
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home/>} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
           <Route path="/applications/employerapplication" element={<ViewAdminApplication/>} />
          <Route path="/job/post" element={<Postjob/>} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/admin/" element={<AdminHome/>} >
              <Route path="" element={<Navigate to="dashboard"/>} />
              <Route path="/admin/dashboard"  element={<Dashboard/>} />
              <Route path="/admin/manageapplication" element={<ManageApplications />} />
              <Route path="/admin/managejobseekers" element={<ManageJobseekers />} />
              <Route path="/admin/manageemployers" element={<ManageEmployers />} />
          </Route>
          <Route path="*" element={<Notfound/>} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>


           
    </>
  )
}

export default App