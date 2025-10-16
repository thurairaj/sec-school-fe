import { useEffect, useState } from "react";
import { api } from "../api/axios.api.js";
import {useNavigate} from "react-router-dom";

export default function StudentsList() {
  const nav = useNavigate();
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/students");
        if (!cancelled) setRows(data.data);
      } catch (e) {
        console.log("students", e);
        if (!cancelled) setErr("Failed to fetch students");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const studentClickHandler = (id) => {
    nav(`/student/${id}`);
  }

  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <h2 className={"text-4xl my-4"}>Students</h2>

        {err && <p>{err}</p>}
        <table className="table table-striped w-4xl">
          <thead>
            <tr className={"*:align-middle *:items-center *:p-4 *:text-2xl"}>
              <th>Name</th>
              <th>Major</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map((row) => (
                <tr onClick={() => studentClickHandler(row._id)} key={row._id} className={"*:text-center *:p-4 hover:bg-blue-100 hover:cursor-pointer"}>
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
