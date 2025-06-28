import React from "react";

const Working = () => {
  return (
    <section className="howitworks py-5">
      <div className="container">
        <h3 className="text-center mb-5 text-white">How JobZee Works</h3>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-lg border-0 text-center">
              <div className="card-body p-4">
                <i className="fas fa-user-plus fa-3x mb-3 text-primary"></i>
                <h5 className="card-title fw-bold">Create Account</h5>
                <p className="card-text">
                  Sign up as an Employer or Job Seeker to start your journey. Create a profile to connect with opportunities or talent.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-lg border-0 text-center">
              <div className="card-body p-4">
                <i className="fas fa-search fa-3x mb-3 text-primary"></i>
                <h5 className="card-title fw-bold">Find a Job/Post a Job</h5>
                <p className="card-text">
                  Browse thousands of job listings or post job openings to attract the best candidates for your organization.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-lg border-0 text-center">
              <div className="card-body p-4">
                <i className="fas fa-paper-plane fa-3x mb-3 text-primary"></i>
                <h5 className="card-title fw-bold">Apply or Recruit</h5>
                <p className="card-text">
                  Apply for your dream job or recruit top talent by reviewing applications and hiring suitable candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;