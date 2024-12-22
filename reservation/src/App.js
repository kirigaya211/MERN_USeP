import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Facility from "./Components/Facility";
import FacilityDetails from "./Components/FacilityDetails";
import ReservationForm from "./Components/ReservationForm";
import ReservationList from "./Components/ReservationList";
import ReservationInfo from "./Components/ReservationInfo";
import ManageFacility from "./Components/ManageFacility";
import AddFacility from "./Components/AddFacility";
import FacilityUpdate from "./Components/FacilityUpdate";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Facility />
            </>
          }
        />
        <Route
          path="/facility"
          element={
            <>
              <Navbar />
              <Facility />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/facility/:id"
          element={
            <>
              <Navbar />
              <FacilityDetails />
            </>
          }
        />
        <Route
          path="/reservation/:id"
          element={
            <>
              <Navbar />
              <ReservationForm />
            </>
          }
        />
        <Route
          path="/reservation"
          element={
            <>
              <Navbar />
              <ReservationList />
            </>
          }
        />
        <Route
          path="/reservation-info/:id"
          element={
            <>
              <Navbar />
              <ReservationInfo />
            </>
          }
        />
        <Route
          path="/manage-facility"
          element={
            <>
              <Navbar />
              <ManageFacility />
            </>
          }
        />
        <Route
          path="/add-facility"
          element={
            <>
              <Navbar />
              <AddFacility />
            </>
          }
        />
        <Route
          path="/update-facility/:id"
          element={
            <>
              <Navbar />
              <FacilityUpdate />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
