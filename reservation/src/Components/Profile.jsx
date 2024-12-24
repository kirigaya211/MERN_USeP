import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // For delete confirmation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to manage your account.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://mern-usep-backend.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser({ ...data, password: "" }); // Set user data
          setName(data.name); // Set name state to user's name
          setEmail(data.email); // Set email state to user's email
        } else {
          const error = await response.json();
          setMessage(error.message || "Failed to fetch user information.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateName = async (name) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://mern-usep-backend.onrender.com/api/users/profile/update-name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );
      if (response.ok) {
        setMessage("Name updated successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update name.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the name.");
    }
  };

  const updateEmail = async (email) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://mern-usep-backend.onrender.com/api/users/profile/update-email",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setMessage("Email updated successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update email.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the email.");
    }
  };

  const updatePassword = async (password) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://mern-usep-backend.onrender.com/api/users/profile/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );
      if (response.ok) {
        setMessage("Password updated successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update password.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the password.");
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://mern-usep-backend.onrender.com/api/users/profile/delete-account",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Account deleted successfully!");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/register"), 2000);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to delete account.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting your account.");
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
      {message && (
        <div
          className="alert alert-info d-flex align-items-center shadow-sm rounded border-0 mb-4"
          role="alert"
        >
          <i className="bi bi-info-circle-fill me-2 fs-5 text-primary"></i>

          <div className="flex-grow-1 text-center">{message}</div>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage("")} 
          ></button>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 border-0">
            <h2 className="text-center text-warning mb-4">Manage Account</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Update name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <button
                  className="btn btn-warning text-white fw-bold"
                  onClick={() => updateName(name)}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Update email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <button
                  className="btn btn-warning text-white fw-bold"
                  onClick={() => updateEmail(email)}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="New password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-warning text-white fw-bold"
                  onClick={() => updatePassword(password)}
                >
                  Update
                </button>
              </div>
            </div>

            <button
              className="btn btn-danger w-100 fw-bold mt-4"
              onClick={() => setShowModal(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Account Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setShowModal(false);
                    handleDeleteAccount();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
