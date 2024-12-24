import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
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
          `https://mern-usep-backend.onrender.com/api/reservation/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          setMessage("An error occurred while fetching reservation details");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setReservation(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reservation details: ", error);
        setLoading(false);
      }
    };
    fetchReservations();
  }, [id]);

  const cancelReservation = async (reservationId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://mern-usep-backend.onrender.com/api/reservation/cancel-reservation/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setMessage("Reservation cancelled successfully");
        setTimeout(() => navigate("/reservation"), 2000);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to cancel reservation");
      }
    } catch (error) {
      setMessage("An error occurred while cancelling reservation");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{message || "No reservation found."}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg border-0" style={{ borderRadius: "15px" }}>
            <div className="card-header bg-warning text-white text-center">
              <h3 className="card-title fw-bold">Reservation Details</h3>
            </div>
            <div className="card-body">
              {message && (
                <div className="alert alert-info text-center">{message}</div>
              )}
              <div className="mb-4 text-center">
                <i className="bi bi-calendar-check" style={{ fontSize: "3rem", color: "orange" }}></i>
              </div>
              <p className="mb-3 text-center">
                <strong>Reserved Date:</strong>{" "}
                {reservation.reservedDate
                  .map((date) =>
                    new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )
                  .join(", ")}
              </p>
              <p className="mb-3 text-center">
                <strong>Total Price:</strong>{" "}
                <span className="text-warning">₱{reservation.totalAmount}</span>
              </p>
              <div className="text-center">
                <button
                  className="btn btn-danger btn-lg px-5"
                  onClick={() => cancelReservation(reservation._id)}
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
            <div className="card-footer bg-light text-center">
              <small className="text-muted">
                Thank you for choosing our facility. If you have any questions,
                please contact us.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
