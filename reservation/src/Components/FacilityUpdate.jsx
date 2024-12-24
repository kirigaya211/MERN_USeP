import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FacilityUpdate = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState({});
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacility = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to update facility");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://mern-usep-backend.onrender.com/api/facility/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setFacility(data);
        } else {
          setMessage(data.message || "Failed to fetch facility");
        }
      } catch (error) {
        setMessage("An error occurred while fetching facility");
      } finally {
        setLoading(false);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `https://mern-usep-backend.onrender.com/api/reservation/facility-reservations/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setReservations(data);
        } else {
          setMessage(data.message || "Failed to fetch reservations");
        }
      } catch (error) {
        setMessage("An error occurred while fetching reservations");
      }
    };

    fetchFacility();
    fetchReservations();
  }, [id]);

  const handleUpdateFacility = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://mern-usep-backend.onrender.com/api/facility/update-facility/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(facility),
        }
      );

      if (response.ok) {
        setMessage("Facility updated successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update facility");
      }
    } catch (error) {
      setMessage("An error occurred while updating the facility");
    }
  };

  const handleDeleteFacility = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://mern-usep-backend.onrender.com/api/facility/delete-facility/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setMessage("Facility deleted successfully!");
        navigate("/manage-facility");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to delete facility");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the facility");
    }
  };

  const handleRemoveReservation = async (reservationId) => {
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
        setReservations((prev) =>
          prev.filter((reservation) => reservation._id !== reservationId)
        );
        setMessage("Reservation cancelled successfully");
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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {message && <div className="alert alert-info text-center">{message}</div>}
      <div className="row">
        {/* Update Form Section */}
        <div className="col-md-6">
          <div
            className="card shadow-lg p-4 border-0"
            style={{ borderRadius: "15px" }}
          >
            <h2 className="text-center text-warning mb-4">Update Facility</h2>
            <form onSubmit={handleUpdateFacility}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  Facility Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={facility.name || ""}
                  onChange={(e) =>
                    setFacility({ ...facility, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  value={facility.description || ""}
                  onChange={(e) =>
                    setFacility({ ...facility, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label fw-bold">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="form-control"
                  value={facility.location || ""}
                  onChange={(e) =>
                    setFacility({ ...facility, location: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label fw-bold">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  className="form-control"
                  value={facility.capacity || ""}
                  onChange={(e) =>
                    setFacility({ ...facility, capacity: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label fw-bold">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={facility.price || ""}
                  onChange={(e) =>
                    setFacility({ ...facility, price: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100 mb-3 text-white fw-bold"
              >
                Update Facility
              </button>
            </form>
            <button
              className="btn btn-danger w-100 fw-bold"
              onClick={handleDeleteFacility}
            >
              Delete Facility
            </button>
          </div>
        </div>

        {/* Reservations Section */}
        <div className="col-md-6">
          <div
            className="card shadow-lg p-4 border-0"
            style={{ borderRadius: "15px" }}
          >
            <h3 className="text-warning mb-4">Reservations</h3>
            {reservations.length === 0 ? (
              <p className="text-muted">
                No reservations available for this facility.
              </p>
            ) : (
              <ul className="list-group">
                {reservations.map((reservation) => (
                  <li
                    key={reservation._id}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <span>
                      <strong>Date:</strong>{" "}
                      {reservation.reservedDate
                        .map((date) => new Date(date).toLocaleDateString())
                        .join(", ")}
                    </span>
                    <span>
                      <strong>User:</strong>{" "}
                      {reservation.user?.name || "Unknown"}
                    </span>
                    <span>
                      <strong>Total:</strong> ₱{reservation.totalAmount}
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleRemoveReservation(reservation._id)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityUpdate;
