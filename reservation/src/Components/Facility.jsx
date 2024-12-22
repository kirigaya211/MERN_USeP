import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Facility = () => {
  const [facilities, setFacility] = useState([]);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/facility");
        const data = await response.json();
        setFacility(data);
      } catch (error) {
        console.log("Error fetching facility: ", error);
      }
    };
    fetchFacility();
  }, []);

  return (
    <div className="container mt-5">
      <div
        id="headerCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          {facilities.map((facility, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={facility._id}
            >
              <img
                src={
                  `http://localhost:3001/${facility.image}` ||
                  "https://via.placeholder.com/1200x300"
                }
                className="d-block w-100"
                alt={facility.name}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="text-light">{facility.name}</h5>
                <p className="text-light">
                  {facility.description.slice(0, 50)}...
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#headerCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#headerCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="display-4">Explore Our Facilities</h1>
        <p className="text-muted">
          Discover the best facilities for your events, meetings, and more.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="row">
        {facilities.map((facility) => (
          <div className="col-md-4 mb-4" key={facility._id}>
            <div className="card shadow-sm h-100">
              <img
                src={
                  `http://localhost:3001/${facility.image}` ||
                  "https://via.placeholder.com/400x250"
                }
                alt={facility.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-warning">{facility.name}</h5>
                <p className="card-text text-muted">
                  {facility.description.slice(0, 60)}...
                </p>
                <p className="card-text">
                  <strong>Capacity:</strong> {facility.capacity}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ₱{facility.price}
                </p>
                <div className="mt-auto text-center">
                  <Link
                    to={`/facility/${facility._id}`}
                    className="btn btn-outline-warning btn-sm shadow-sm"
                  >
                    View Facility
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facility;
