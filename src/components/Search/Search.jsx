import searchIcon from "../../assets/icons/SearchBlue.svg";
import SearchRecipe from "./SearchRecipe";
import "./Search.css";

const Search = (props) => {
	return (
		<>
			<div className="search-title"><img src={searchIcon}></img><h1>This what you're looking for ?</h1></div>
			<div className="recipe-grid">
				{props.recipes.map((rec) => (
					<SearchRecipe recipe={rec} setRecipeId={props.setRecipeId} handleRecipeClick={props.handleRecipeClick} setPostId={props.setPostId}/>
				))}
			</div>
		</>
	);
};

export default Search;
