import { useLoaderData } from "react-router-dom";

const Chef = () => {
	const data = useLoaderData();
	return (
		<>
			<h1>CHEF</h1>
			<p>{data}</p>
		</>
	);
};
export default Chef;
