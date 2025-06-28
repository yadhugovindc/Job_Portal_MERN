import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './AdminHome.css'

const AdminHome = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-3 div1 d-flex flex-column align-items-center">
  <nav>
    <ul className="nav flex-column w-100 gap-3">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-linkitem text-white">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/managejobseekers" className="nav-linkitem text-white">Manage Job Seekers</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/manageemployers" className="nav-linkitem text-white">Manage Employees</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/manageapplication" className="nav-linkitem text-white">Manage Application</Link>
      </li>
      
    </ul>
  </nav>
</div>

           <div className="col-10">
                <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome