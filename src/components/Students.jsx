import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { api } from "../api/axios.api.js";

export default function Students() {
  const { user, logout } = useAuth();
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/students");
        if (!cancelled) setRows(data);
      } catch (e) {
        console.log(e);
        if (!cancelled) setErr("Failed to fetch students");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContext: "space-between" }}>
        <h2>Students</h2>
        <div>
          <span>{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
        {err && <p>{err}</p>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                <td>{row.name}</td>
                <td>{row.major}</td>
                <td>{row.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
