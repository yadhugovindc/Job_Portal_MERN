import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const companies = [
    {
      id: 1,
      title: "Software developement",
      location: "Kakkanad"
    },
    {
      id: 2,
      title: "Accounting",
      location: "Delhi"
    },
    {
      id: 3,
      title: "Data Entry",
      location: "Delhi"
    },
  ];

  return (
    <section className="companies py-5">
      <div className="container">
        <h3 className="text-center mb-5 text-white">Top Category Jobs</h3>
        <div className="row g-4 justify-content-center">
          {companies.map((element) => (
            <div className="col-lg-4 col-md-6" key={element.id}>
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body p-4 text-center">
                  <div className="content d-flex align-items-center mb-3">
                    <div className="text text-start">
                      <h5 className="fw-bold mb-1">{element.title}</h5>
                      <p className="text-muted mb-0">{element.location}</p>
                    </div>
                  </div>
                 
                  <Link to="/job/getall" className="btn btn-primary btn-sm">
                    Open Positions 
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;