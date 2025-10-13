import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      nav("/students");
    } catch (e) {
      console.log("login", e);
      setErr("Login failed");
    }
  };

  return (
    <div className={"flex flex-col p-4 items-center"}>
      <h2 className={"text-4xl my-4"}>Login</h2>
      <form className={"flex flex-col w-sm gap-y-3"} onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email address</label>
          <input
              id={"email"}
              className={"border-2 border-gray-300"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
              id={"password"}
              className={"border-2 border-gray-300"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-2">
          <button className={"text-lg p-2 bg-blue-300 hover:bg-blue-400"} type="submit">Login</button>
        </div>

      </form>
      {err && <p>{err}</p>}
      <p className={"mt-4"}>
        No Account? <Link className={"underline"} to={"/register"}>Register</Link>
      </p>
    </div>
  );
}
