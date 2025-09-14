import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ManageEmployers = () => {
  const [users, setUsers] = useState([]);
  let count = 1;

  const deleteItem=async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:3000/api/deleteitem/${id}`);
      const newItems=users.filter(item=>item._id!==id)
      setUsers(newItems)
    } catch (error) {
      
    }
  }
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getallusers");
      console.log(res);
      setUsers(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table class="table ms-5">
            <thead>
              <tr>
                <th scope="col">Sl No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                if (item.role === "employer") {
                  return (
                    <tr key={index}>
                      <th scope="row">{count++}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td><button className="btn btn-danger" onClick={()=>deleteItem(item._id)}>delete</button></td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployers;
