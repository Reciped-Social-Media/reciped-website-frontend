import { useLoaderData } from "react-router-dom";
import RecipeGrid from "../components/Recipe/RecipeGrid";

const Cookbook = () => {
	const data = useLoaderData();
	return (
		<>
			<RecipeGrid recipes={data}/>
		</>
	);
};
export default Cookbook;
