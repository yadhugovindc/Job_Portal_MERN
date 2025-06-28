import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageJobseekers = () => {
  const [users, setUsers] = useState([]);
  let count = 1;

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
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <table class="table ms-5">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => {
                  if (item.role === "job seeker") {
                    return (
                      <tr key={index}>
                        <th scope="row">{count++}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageJobseekers;
