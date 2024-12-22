import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFacility = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // File object
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("capacity", capacity);
      formData.append("price", price);
      if (image) {
        formData.append("image", image); // Append the file to FormData
      }

      const response = await fetch(
        "http://localhost:3001/api/facility/add-facility",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Facility added successfully");
        setName("");
        setDescription("");
        setLocation("");
        setCapacity("");
        setPrice("");
        setImage("");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to add facility");
      }
    } catch (error) {
      console.error("Error adding facility: ", error);
      setMessage("Failed to add facility");
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); 
  };

return (
    <div className="container mt-5">
        <h1>Add Facility</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">
                    Location
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                    Capacity
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Adding Facility..." : "Add Facility"}
            </button>
        </form>
        {message && <div className="alert alert-primary mt-3">{message}</div>}
    </div>
);
};

export default AddFacility;
