import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <img
          src="https://img.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg?ga=GA1.1.1211554208.1733224352&semt=ais_hybrid&w=740"
          alt="Page Not Found"
          className="img-fluid mb-4"
          style={{ maxWidth: '300px' }}
        />
        <h1 className="display-5 fw-bold text-danger mb-3">404 - Page Not Found</h1>
        <p className="lead text-secondary mb-4">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg shadow-sm">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
