import "./App.css";
import { Routes, Route } from "react-router";
import { PrimeReactProvider } from 'primereact/api';
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
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
