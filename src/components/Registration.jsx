import { useState } from "react";
import { api } from "../api/axios.api.js";
import store from "../store.js";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function reset() {
    setName("");
    setEmail("");
    setPassword("");
  }

  async function register() {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    reset();
    store.setAccess(data?.tokens?.access);
    alert("Registered successfully!");
  }

  return (
    <div>
      <div className={"registration-container"}>
        <h2>Register new user</h2>
        <div className={"field-container"}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type={"text"}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={"field-container"}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={"field-container"}>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
