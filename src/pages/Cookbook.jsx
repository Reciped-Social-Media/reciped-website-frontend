import { useLoaderData } from "react-router-dom";
import RecipeSearchBar from "../components/Recipe/RecipeSearchBar";
import RecipeCard from "../components/Recipe/RecipeCard";
import "./Cookbook.css";
import { useEffect, useRef, useState } from "react";
import Recipe from "../components/Recipe/Recipe";
import { Close } from "@mui/icons-material";
import { postRequest } from "../utils/request";

const AddedListInputItem = ({ item, index, removeItem }) => {
	return (
		<div className="Cookbook__ListInputItem">
			<div className="Cookbook__ListInputItem-value">{item}</div>
			{index >= 0 && (
				<button onClick={() => removeItem(index)}>X</button>
			)}
		</div>
	);
};

const AddRecipeForm = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [directions, setDirections] = useState([]);
	const [newIngredient, setNewIngredient] = useState("");
	const [newDirection, setNewDirection] = useState("");
	const [previewRecipe, setPreviewRecipe] = useState(null);

	useEffect(() => {
		setPreviewRecipe({ title, ingredients, directions });
	}, [title, ingredients, directions]);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleIngredientChange = (event) => {
		setNewIngredient(event.target.value);
	};

	const handleAddIngredient = () => {
		if (newIngredient.trim() !== "") {
			setIngredients([...ingredients, newIngredient.trim()]);
			setNewIngredient("");
		}
	};

	const handleDirectionChange = (event) => {
		setNewDirection(event.target.value);
	};

	const handleAddDirection = () => {
		if (newDirection.trim() !== "") {
			setDirections([...directions, newDirection.trim()]);
			setNewDirection("");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const body = { title, ingredients, directions };
		onSubmit(body);
	};

	const handleRemoveIngredient = (index) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	};

	const handleRemoveDirection = (index) => {
		setDirections(directions.filter((_, i) => i !== index));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Title:</label>
				<input type="text" id="title" value={title} onChange={handleTitleChange} />
			</div>
			<div>
				<label htmlFor="ingredients">Ingredients:</label>
				<div className="Cookbook__ListInput">
					{ingredients.map((ingredient, index) => (
						<AddedListInputItem
							key={index}
							item={ingredient}
							index={index}
							removeItem={handleRemoveIngredient}
						/>
					))}
					<div className="Cookbook__ListInputItem">
						<input
							type="text"
							value={newIngredient}
							onChange={handleIngredientChange}
							placeholder="Add ingredient"
						/>
						<button type="button" onClick={handleAddIngredient}>
							Add
						</button>
					</div>
				</div>
			</div>
			<div>
				<label htmlFor="directions">Directions:</label>
				<div className="Cookbook__ListInput">
					{directions.map((direction, index) => (
						<AddedListInputItem
							key={index}
							item={direction}
							index={index}
							removeItem={handleRemoveDirection}
						/>
					))}
					<div className="Cookbook__ListInputItem">
						<input
							type="text"
							value={newDirection}
							onChange={handleDirectionChange}
							placeholder="Add direction"
						/>
						<button type="button" onClick={handleAddDirection}>
							Add
						</button>
					</div>
				</div>
			</div>
			<h3>Preview</h3>
			{previewRecipe && <Recipe title={previewRecipe.title} ingredients={previewRecipe.ingredients} directions={previewRecipe.directions} />}
			<button type="submit">Submit</button>
		</form>
	);
};

const Cookbook = () => {
	const recipes = useLoaderData();
	const addRecipeRef = useRef(null);
	const [showAddRecipeDialog, setShowAddRecipeDialog] = useState(false);
	const [addRecipeError, setAddRecipeError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const handleAddRecipe = (body) => {
		setAddRecipeError(null);
		if (!body.title) {
			setAddRecipeError("Title cannot be empty!");
			return;
		}
		if (body.ingredients.length === 0) {
			setAddRecipeError("Recipe must have at least one ingredient!");
			return;
		}
		if (body.directions.length === 0) {
			setAddRecipeError("Recipe must have at least one direction!");
			return;
		}
		postRequest("recipe/create", body)
			.then((response) => {
				if (response.status === 200) {
					window.location.reload();
				}
				else {
					setAddRecipeError(response.data.error);
				}
			})
			.catch((error) => {
				console.log(error);
				setAddRecipeError(error);
			});
	};

	useEffect(() => {
		if (showAddRecipeDialog) {
			addRecipeRef.current.showModal();
		}
		else {
			addRecipeRef.current.close();
		}
	}, [showAddRecipeDialog]);

	const filteredRecipes = recipes.filter(rec => rec.title.toLowerCase().includes(searchQuery));

	return (
		<div className="Cookbook">
			<div className="Cookbook__contents">
				<div className="Cookbook__option-bar">
					<div className="RecipeSearchBar__search">
						<input type="text" placeholder="Find your recipe" style={{ width: 1300 }}
							onChange={(e) => setSearchQuery(e.target.value)}
						></input>
					</div>
					<button
						className="Cookbook__option-bar-button"
						onClick={() => setShowAddRecipeDialog(true)}
					>
						Create Recipe
					</button>
				</div>
				<div className="Cookbook__recipes">
					{filteredRecipes.map((recipe) => (
						<RecipeCard _recipe={recipe} _inCookbook={true} key={recipe.id} />
					))}
				</div>
			</div>
			<dialog className="Cookbook__add-recipe-dialog" ref={addRecipeRef} onCancel={() => setShowAddRecipeDialog(false)}>
				<Close className="Cookbook__add-recipe-dialog-close" onClick={() => setShowAddRecipeDialog(false)} />
				<AddRecipeForm onSubmit={handleAddRecipe} />
				{addRecipeError && <div className="Cookbook__add-recipe-dialog-error">{addRecipeError}</div>}
			</dialog>
		</div>
	);
};

export default Cookbook;