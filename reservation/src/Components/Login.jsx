import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.token);
        setMessage("Login successful!");
        navigate("/facility");
      } else {
        const error = await response.json();
        setMessage(error.error || "Login failed. Please try again");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body p-4">
          <div className="text-center">
            <img
              src="/assets/USeP-logo.jpg"
              className="rounded-circle mb-4 border"
              alt="logo"
              style={{ width: "80px", height: "80px" }}
            />
            <h3 className="fw-bold">Welcome Back</h3>
            <p className="text-muted fs-6">Please enter your details to sign in</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-light">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-light">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
          </form>
          {message && (
            <div className="alert alert-info text-center" role="alert">
              {message}
            </div>
          )}
          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>
            <button
              className="btn btn-link text-decoration-none text-primary fw-bold p-0"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
