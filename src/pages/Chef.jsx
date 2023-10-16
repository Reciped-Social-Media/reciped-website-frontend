import { useLoaderData } from "react-router-dom";
import Recipe from "../components/Recipe/Recipe";

const Chef = () => {
	const data = useLoaderData();
	return (
		<div>
			<h1>CHEF</h1>
			{
				data.map(recipe => <Recipe title={recipe.title} ingredients={recipe.ingredients} directions={recipe.directions} />)
			}
		</div>
	);
};
export default Chef;
