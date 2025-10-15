import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import "./Register.css"


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
      <div className={"flex flex-col p-4 items-center"} >
        <h2 className={"text-4xl my-4"}>Register</h2>
        <form className={"flex flex-col w-sm gap-y-4"} onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Email address</label>
            <input name={"email"}
                   className={"border-2 border-gray-300 p-2"}
                   value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
                name="password"
                className={"border-2 border-gray-300 p-2"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input name={"name"} className={"border-2 border-gray-300 p-2"} value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="flex flex-col mt-2">
            <button
                className={"text-lg p-2 bg-blue-300 hover:bg-blue-400"}
                type="submit">Register</button>
          </div>


        </form>
        {err && <p>{err}</p>}
        <p>
          Have an Account? <Link className={"underline"} to={"/login"}>Login</Link>
        </p>
      </div>
  );
}
