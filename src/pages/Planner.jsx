import { useLoaderData } from "react-router-dom";

const Planner = () => {
	const data = useLoaderData();
	return (
		<>
			<h1>PLANNER</h1>
			<p>{data}</p>
		</>
	);
};
export default Planner;
