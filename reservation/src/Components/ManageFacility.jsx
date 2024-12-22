import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ManageFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to manage facilities.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/facility", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFacilities(data);
        } else {
          const error = await response.json();
          setMessage(error.message || "Failed to fetch facilities.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching facilities.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const addFacility = () => {
    navigate("/add-facility");
  };

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="display-4 text-warning">Manage Facilities</h1>
        <p className="lead text-muted">
          View and manage all facilities or add new ones to your system.
        </p>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className="alert alert-warning text-center" role="alert">
          {message}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Facilities Grid */}
      {!loading && facilities.length > 0 && (
        <div className="row">
          {facilities.map((facility) => (
            <div className="col-md-4 mb-4" key={facility._id}>
              <div className="card shadow-lg h-100">
                {/* Facility Image */}
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
                    <strong>Price:</strong>{" "}
                    <span className="text-warning">₱{facility.price}</span>
                  </p>
                 
                  <div className="mt-auto text-center">
                    <Link
                      to={`/update-facility/${facility._id}`}
                      className="btn btn-warning btn-sm shadow-sm"
                    >
                      Manage Facility
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {!loading && (
        <div className="text-center mt-4">
          <button className="btn btn-warning shadow" onClick={addFacility}>
            Add Facility
          </button>
        </div>
      )}

    
      {!loading && facilities.length === 0 && !message && (
        <div className="text-center">
          <p>No facilities available. Add a new one above.</p>
        </div>
      )}
    </div>
  );
};

export default ManageFacility;
