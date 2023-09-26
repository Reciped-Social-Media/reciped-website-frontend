import { useLoaderData } from "react-router-dom";

const List = () => {
	const data = useLoaderData();
	return (
		<>
			<h1>LIST</h1>
			<p>{data}</p>
		</>
	);
};
export default List;
