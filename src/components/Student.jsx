import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../api/axios.api.js";
import dayjs from "dayjs";
import "./Student.css"

export default function Student() {
	const { id } = useParams()
	const [student, setStudent] = useState(null);
	const [err, setErr] = useState(null);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			try {
				const { data } = await api.get(`/students/${id}`);

				if (!cancelled) setStudent({
					...data,
					formattedEnrollDate: dayjs(data.enrolledAt).format("D MMMM YYYY")});
			} catch (e) {
				console.log("students", e);
				if (!cancelled) setErr("Failed to fetch students");
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);
	return (
		<div className={"flex flex-col items-center"}>
			{student &&
				<div className={"flex flex-col w-sm"}>
					<div className={"flex flex-col items-center"}>
						<h2 className={"text-4xl mt-4"}>{student?.name}</h2>
						<p className={"text-sm italic"}>{student?.bio}</p>
					</div>

					<div className={"flex flex-col mt-4"}>
						<h4 className={"text-2xl font-bold mb-1"}>Enrollment Date</h4>
						<span>{student.formattedEnrollDate}</span>
					</div>

					<div className={"flex flex-col mt-4"}>
						<h4 className={"text-2xl font-bold mb-1"}>GPA</h4>
						<span>{student.gpa}</span>
					</div>


					<div className={"flex flex-col mt-4"}>
						<h4 className={"text-2xl font-bold mb-1"}>Skills</h4>
						<div className={"flex flex-row gap-x-2"}>
							{student.skills.map(skill => (<span
								className={"p-2 border-gray-300 border-dashed border-2 hover:bg-gray-100"}>{skill}</span>))}
						</div>
					</div>


				</div>
			}
			{err && <p>{err}</p>}
		</div>
	)
}
