import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Facility from "./Components/Facility";

function App() {
  return (
    <>
      <Routes>
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
      </Routes>
    </>
  );
}

export default App;
