import React from "react";
import './Herosection.css'
import { Link } from "react-router-dom";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <i className="fas fa-suitcase fa-3x"></i>,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <i className="fas fa-building fa-3x"></i>,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <i className="fas fa-users fa-3x"></i>,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <i className="fas fa-user-plus fa-3x"></i>,
    },
  ];

  return (
    <section className="heroSection py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="title text-white">
              <h1 className="fw-bold mb-3">Find a Job That Suits</h1>
              <h1 className="fw-bold mb-4">Your Interests and Skills</h1>
              <p className="lead">
                Discover exciting career opportunities tailored to your passion and expertise. Join JobZee to connect with top employers and start your journey today!
              </p>
              <Link to="/register" className="btn btn-primary btn-lg mt-3">
                Get Started
              </Link>
            
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image">
              <img
                src="https://img.freepik.com/free-vector/confident-people-collection_23-2148392617.jpg?ga=GA1.1.1211554208.1733224352&semt=ais_hybrid&w=740"
                alt="Hero Illustration"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="details container mt-5">
        <div className="row g-4 justify-content-center">
          {details.map((element) => (
            <div className="col-lg-3 col-md-6" key={element.id}>
              <div className="card h-100 shadow-lg border-0 text-center">
                <div className="card-body p-4">
                  <div className="icon mb-3">{element.icon}</div>
                  <div className="content">
                    <h5 className="fw-bold">{element.title}</h5>
                    <p className="text-muted">{element.subTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;