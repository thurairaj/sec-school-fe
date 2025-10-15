import {useParams} from "react-router-dom";

export default function Student() {
	const {id} = useParams()
	return <p>Edit this: {id}</p>
}
