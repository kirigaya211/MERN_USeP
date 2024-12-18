import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="container">
      <h1>Facility</h1>
      <div className="row">
        {facilities.map((facility) => (
          <div className="col-md-4 mb-4" key={facility._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{facility.name}</h5>
                <p className="card-text>">{facility.description}</p>
                <p className="card-text">
                  Capacity: {facility.capacity}
                  Price: ${facility.price}
                </p>
                <Link
                  to={`/facility/${facility._id}`}
                  className="btn btn-primary"
                >
                  View Facility
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facility;
