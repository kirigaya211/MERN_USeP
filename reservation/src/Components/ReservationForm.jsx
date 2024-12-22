import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

const ReservationForm = () => {
  const { id } = useParams();
  const [date, setDate] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (date.length === 0) {
      setMessage("Please select at least one date.");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to make a reservation");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/reservation/add-reservation/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            facilityId: id,
            reservedDate: date,
          }),
        }
      );

      if (response.ok) {
        setMessage("Reservation created successfully!");
        setDate([]);
      } else {
        const error = await response.json();
        setMessage(error.message || "Error creating reservation");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Reservation Form </h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="datepicker" className="form-label">
            Pick Dates
          </label>

          <Flatpickr
            value={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            options={{
              mode: "multiple",
              enableTime: true,
              dateFormat: "Y-m-d H:i",
              inline: true,
            }} 
          />
        </div>
        <div className="mt-3">
          <h5>Selected Dates:</h5>
          <ul>
            {date.map((d, index) => (
              <li key={index}>{new Date(d).toDateString()}</li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Reserve
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
