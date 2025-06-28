import React from "react";
import "./Categories.css";

const Categories = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Delhi",
      openPositions: 10,
      icon: <i className="fab fa-microsoft fa-3x"></i>,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Delhi",
      openPositions: 5,
      icon: <i className="fab fa-tesla fa-3x"></i>,
    },
    {
      id: 3,
      title: "Apple",
      location: "Delhi",
      openPositions: 20,
      icon: <i className="fab fa-apple fa-3x"></i>,
    },
  ];

  return (
    <section className="companies py-5">
      <div className="container">
        <h3 className="text-center mb-5 text-white">Top Companies</h3>
        <div className="row g-4 justify-content-center">
          {companies.map((element) => (
            <div className="col-lg-4 col-md-6" key={element.id}>
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body p-4 text-center">
                  <div className="content d-flex align-items-center mb-3">
                    <div className="icon me-3">{element.icon}</div>
                    <div className="text text-start">
                      <h5 className="fw-bold mb-1">{element.title}</h5>
                      <p className="text-muted mb-0">{element.location}</p>
                    </div>
                  </div>
                  <a href="/job/getall" className="btn btn-primary btn-sm">
                    Open Positions ({element.openPositions})
                  </a>
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