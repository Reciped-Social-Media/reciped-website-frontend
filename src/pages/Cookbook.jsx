import { useLoaderData } from "react-router-dom";
import RecipeCard from "../components/Recipe/RecipeCard";
import "./Cookbook.css";
import { useEffect, useRef, useState } from "react";
import Recipe from "../components/Recipe/Recipe";
import { Close } from "@mui/icons-material";
import { postRequest } from "../utils/request";

const AddedListInputItem = ({ item, index, removeItem }) => {
	return (
		<div className="AddedListInputItem__ListInputItem">
			<div className="AddedListInputItem__ListInputItem-value">{item}</div>
			{index >= 0 && (
				<Close onClick={() => removeItem(index)} style={{ cursor: "pointer", color: "lightcoral" }}/>
			)}
		</div>
	);
};

const AddRecipeForm = () => {
	const [title, setTitle] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [directions, setDirections] = useState([]);
	const [newIngredient, setNewIngredient] = useState("");
	const [newDirection, setNewDirection] = useState("");
	const [previewRecipe, setPreviewRecipe] = useState(null);
	const [addRecipeError, setAddRecipeError] = useState(null);

	useEffect(() => {
		if (title !== "" || ingredients.length > 0 || directions.length > 0) setPreviewRecipe({ title, ingredients, directions });
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
		const body = {
			title,
			ingredients,
			directions,
		};
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

	const handleRemoveIngredient = (index) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	};

	const handleRemoveDirection = (index) => {
		setDirections(directions.filter((_, i) => i !== index));
	};

	return (
		<form className="AddRecipeForm" onSubmit={handleSubmit}>
			<h1 className="AddRecipeForm__title">Create Your Own Recipe!</h1>
			<div className="AddRecipeForm__input-title">
				<label>Title</label>
				<input type="text" id="title" value={title} onChange={handleTitleChange} />
			</div>
			<div className="AddRecipeForm__text-inputs">
				<div className="AddRecipeForm__text-input-label">Ingredients</div>
				<div className="AddRecipeForm__input-item">
					{ingredients.map((ingredient, index) => (
						<AddedListInputItem
							key={index}
							item={ingredient}
							index={index}
							removeItem={handleRemoveIngredient}
						/>
					))}
					<div className="AddRecipeForm__input">
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
				<div className="AddRecipeForm__text-input-label">Directions</div>
				<div className="AddRecipeForm__input-item">
					{directions.map((direction, index) => (
						<AddedListInputItem
							key={index}
							item={direction}
							index={index}
							removeItem={handleRemoveDirection}
						/>
					))}
					<div className="AddRecipeForm__textarea">
						<textarea
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
			{previewRecipe &&
			<div className="AddRecipeForm__preview">
				<h2>Preview</h2>
				<Recipe title={previewRecipe.title} ingredients={previewRecipe.ingredients} directions={previewRecipe.directions} />
			</div>}
			<div className="AddRecipeForm__submit">
				{addRecipeError && <div className="AddRecipeForm__error">{addRecipeError}</div>}
				<button className="AddRecipeForm__submit-button" type="submit">Submit</button>
			</div>
		</form>
	);
};

const Cookbook = () => {
	const recipes = useLoaderData();
	const addRecipeRef = useRef(null);
	const [showAddRecipeDialog, setShowAddRecipeDialog] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

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
				<div className="Cookbook__add-recipe-dialog-close">
					<Close onClick={() => setShowAddRecipeDialog(false)} style={{ cursor: "pointer" }} />
				</div>
				<AddRecipeForm />
			</dialog>
		</div>
	);
};

export default Cookbook;