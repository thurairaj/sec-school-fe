import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Students from "./components/Students.jsx";
import Register from "./components/Register.jsx";
import {useAuth} from "./context/AuthContext.jsx";

function App() {
   const { hasTokens, logout } = useAuth();
  return (
    <>
      <nav className={"flex justify-between px-4 bg-gray-300"}>
          <div className={"flex gap-x-4 *:py-4 *:px-2 *:hover:bg-gray-400"}>
              <Link to="/students">Students</Link>
              {!hasTokens && <Link to="/login">Login</Link>}
              {!hasTokens && <Link to="/register">Register</Link>}
          </div>
          {hasTokens &&
              <div>
                  <button onClick={logout}>
                      Logout
                  </button>
              </div>
          }

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
