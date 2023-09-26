import { useLoaderData } from "react-router-dom";

const Pantry = () => {
	const data = useLoaderData();
	return (
		<>
			<h1>PANTRY</h1>
			<p>{data}</p>
		</>
	);
};
export default Pantry;
