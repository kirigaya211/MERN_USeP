import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/facility");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-2">
      <div className="container">
      
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://imgur.com/a/g1QXFrH"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className=" fs-5">USeP – Resource Management Division </span>
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-semibold" to="/">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary fw-semibold" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary fw-semibold" to="/reservation">
                    Reservations
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-secondary fw-semibold"
                      to="/manage-facility"
                    >
                      Facility Management
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn text-secondary fw-semibold btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn text-secondary fw-semibold  btn-sm ms-2 px-4" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
