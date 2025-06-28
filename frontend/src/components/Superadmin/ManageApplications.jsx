import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ManageApplications = () => {
  const [application, setApplcation] = useState([]);
  let count = 1;

  const [cl, setCl] = useState();

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
  useEffect(() => {
    getAppl();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <table class="table ms-5">
              <thead>
                <tr>
                  <th scope="col">Sl no</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Cover letter</th>
                  <th scope="col">Job title</th>
                </tr>
              </thead>
              <tbody>
                {application.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{count++}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_no}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setCl(item.cover_letter)}
                          class="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          view cover letter
                        </button>
                      </td>
                      <td>{item.jobTitle}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style={{backgroundColor:"#6dd1bf"}}>
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Cover Letter
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body border-2" style={{backgroundColor:"#a1d4c8"}}>{cl}</div>
            <div class="modal-footer" style={{backgroundColor:"#a1d4c8"}}>
              <button
                type="button"
                class="btn btn-info"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageApplications;
