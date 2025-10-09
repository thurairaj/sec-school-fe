import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await register(email, password, name);
      nav("/students");
    } catch (e) {
      console.log(e);
      setErr("Login failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {err && <p>{err}</p>}
      <p>
        Have an Account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}
