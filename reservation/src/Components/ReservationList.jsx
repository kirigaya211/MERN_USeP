import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to view your reservations");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/api/reservation/user-reservations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          const error = await response.json();
          setMessage(error.message || "Failed to fetch reservations");
        }
      } catch (error) {
        setMessage("An error occurred while fetching your reservations");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleViewFacilityDetails = (reservationId) => {
    navigate(`/reservation-info/${reservationId}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (message) {
    return <div className="alert alert-warning text-center mt-5">{message}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Reservations</h2>
      {reservations.length === 0 ? (
        <p className="text-center">You have no reservations at the moment.</p>
      ) : (
        <div className="row">
          {reservations.map((reservation) => (
            <div className="col-12 mb-4" key={reservation._id}>
              <div className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">
                      Facility:{" "}
                      {reservation.facilityId?.name || "Unknown Facility"}
                    </h5>
                    <p className="card-text">
                      Reserved Date:{" "}
                      {new Date(reservation.reservedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      handleViewFacilityDetails(reservation._id)
                    }
                  >
                    View Reservation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
