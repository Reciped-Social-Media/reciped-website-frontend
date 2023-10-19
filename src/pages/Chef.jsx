import { useLoaderData } from "react-router-dom";
import Recipe from "../components/Recipe/Recipe";
import { useEffect, useState } from "react";
import { postRequest } from "../utils/request";
import { Close } from "@mui/icons-material";
import "./Chef.css";
import AddedListInputItem from "../components/AddedListInputItem/AddedListInputItem";

const GenerateRecipeForm = ({ onSubmit }) => {
	const [ingredients, setIngredients] = useState([]);
	const [newIngredient, setNewIngredient] = useState("");
	const [addIngredientError, setAddIngredientError] = useState(null);
	const [recommendedRecipes, setRecommendedRecipes] = useState([]);

	useEffect(() => {
		setAddIngredientError(null);
	}, [ingredients]);

	const handleIngredientChange = (event) => {
		setNewIngredient(event.target.value);
	};

	const handleAddIngredient = () => {
		if (ingredients.length >= 10) {
			setAddIngredientError("Cannot generate recommendations with more than 10 ingredients!");
			return;
		}
		if (newIngredient.trim() !== "") {
			setIngredients([...ingredients, newIngredient.trim()]);
			setNewIngredient("");
		}
	};

	const handleRemoveIngredient = (index) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (ingredients.length === 0) {
			setAddIngredientError("Must have at least one ingredient!");
			return;
		}
		const body = {
			ingredients,
		};
		setAddIngredientError(null);
		postRequest("chef/recommend", body)
			.then(response => {
				console.log(response);
				if (response.error) {
					setAddIngredientError(response.error);
				}
				else {
					setRecommendedRecipes(response.data);
				}
			})
			.catch(() => setAddIngredientError("Something went wrong!"));
		onSubmit(recommendedRecipes);
	};

	return (
		<form className="GenerateRecipeForm" onSubmit={handleSubmit}>
			<h1 className="GenerateRecipeForm__title">Use Our Wizard to Help You Cook!</h1>
			<div className="GenerateRecipeForm__text-inputs">
				<div className="GenerateRecipeForm__text-input-label">Ingredients</div>
				<div className="GenerateRecipeForm__input-item">
					{ingredients.map((ingredient, index) => (
						<AddedListInputItem
							key={index}
							item={ingredient}
							index={index}
							removeItem={handleRemoveIngredient}
						/>
					))}
					<div className="GenerateRecipeForm__input">
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
			<div className="GenerateRecipeForm__submit">
				{addIngredientError && <div className="GenerateRecipeForm__error">{addIngredientError}</div>}
				<button className="GenerateRecipeForm__submit-button" type="submit">I'm Ready!</button>
			</div>
		</form>
	);
};

const Chef = () => {
	const [recommendedRecipes, setRecommendedRecipes] = useState([]);

	const handleSubmit = (recipes) => {
		setRecommendedRecipes(recipes);
	};

	console.log(recommendedRecipes);

	return (
		<div className="Chef">
			<div className="Chef__contents">
				<div className="Chef__header"/>
				<div className="Chef__form">
					<GenerateRecipeForm onSubmit={handleSubmit} />
				</div>
				<div className="Chef__recipes">
					{recommendedRecipes.map(recipe => (<div className="Chef_recipe"><Recipe title={recipe.title} ingredients={recipe.ingredients} directions={recipe.directions} /></div>))}
				</div>
			</div>
		</div>
	);
};
export default Chef;
