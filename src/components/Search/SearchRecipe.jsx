import mealLogo from "../../assets/icons/meal.svg";
import arrow from "../../assets/icons/arrowBlue.svg";

const SearchRecipe = (props) => {

	const recipeId = props.recipe.id;

	const handleClick = () => {
		props.setRecipeId(recipeId);
		props.setPostId(null);
		props.handleRecipeClick();
	};
	return (
		<div className="recipe-result" onClick={handleClick}>
			<img src={mealLogo}></img>
			<h3>{props.recipe.title}</h3>
			<img src={arrow}></img>
		</div>
	);
};

export default SearchRecipe;