import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const FacilityDetails = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState();
  const [reservedDates, setReservedDates] = useState([]);
  const [date, setDate] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/facility/${id}`
        );
        const data = await response.json();
        setFacility(data);
      } catch (error) {
        console.log("Error fetching facility details:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/reservation/reserved-dates/${id}` 
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch reserved dates.");
        }
    
        const data = await response.json(); 
    
        const reservedDates = data
          .map((date) => new Date(date)) 
          .filter((date) => !isNaN(date)); 
    
        setReservedDates(reservedDates); 
      } catch (error) {
        console.log("Error fetching reservations:", error);
      }
    };
    

    fetchFacilityDetails();
    fetchReservations();
  }, [id]);

  const handleReservation = async () => {
    if (!date || date.length === 0) {
      setMessage("Please select a date for your reservation.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to make a reservation.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/reservation/add-reservation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        setReservedDates([...reservedDates, ...date]);
      } else {
        const error = await response.json();
        setMessage(error.message || "Error creating reservation.");
      }
    } catch (error) {
      console.error("Error making reservation: ", error);
    }
  };

  if (!facility) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const imageUrl = facility.image
    ? `http://localhost:3001/${facility.image}`
    : "https://via.placeholder.com/800x400";

  return (
    <div className="container mt-5">
    
      <div className="row shadow-lg rounded bg-white p-4">
    
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <img
            src={imageUrl}
            alt={facility.name}
            className="rounded shadow-sm"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "450px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-lg-6">
          <h1 className="text-warning display-6 fw-bold mb-3">{facility.name}</h1>
          <p className="text-muted">{facility.description}</p>
          <hr />
          <p className="mb-2">
            <strong className="text-secondary">Capacity:</strong>{" "}
            <span className="text-dark">{facility.capacity}</span>
          </p>
          <p>
            <strong className="text-secondary">Price:</strong>{" "}
            <span className="text-warning fw-bold">₱{facility.price} / day</span>
          </p>

          
          <div className="mt-4">
            <h5 className="text-secondary mb-3">Select Reservation Date</h5>
            <Flatpickr
              value={date}
              onChange={(selectedDate) => setDate(selectedDate)}
              options={{
                enableTime: false,
                dateFormat: "Y-m-d",
                inline: true,
                disable: reservedDates,
              }}
              className="w-50"
            />
            <p className="text-muted mt-2">
              Dates in gray are already reserved. Please select an available
              date.
            </p>
          </div>

         
          <div className="mt-4">
            {message && (
              <div className="alert alert-warning text-center">{message}</div>
            )}
            <button
              className="btn btn-warning btn-lg w-100 shadow"
              onClick={handleReservation}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-light rounded shadow">
        <h4 className="text-warning">Additional Information</h4>
        <p>
          Enjoy premium facilities tailored for your needs. Perfect for events,
          meetings, or leisure. Reserve now to secure your desired dates!
        </p>
      </div>
    </div>
  );
};

export default FacilityDetails;
