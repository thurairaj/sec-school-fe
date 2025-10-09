import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Students from "./components/Students.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <>
      <nav>
        <Link to="/students">Students</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students></Students>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
