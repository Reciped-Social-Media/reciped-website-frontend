import React, { useEffect, useRef, useState } from "react";
import foodIcon from "../../assets/icons/food-dinner-icon.svg";
import saltIcon from "../../assets/icons/salt.svg";
import directionsIcon from "../../assets/icons/directions.svg";
import "./Recipe.css";
import { getRequest, postRequest } from "../../utils/request";

const Recipe = ({ recipeId, className, title, ingredients, directions }) => {
	const [inCookbook, setInCookbook] = useState(null);
	const categoryRef = useRef();

	useEffect(() => {
		if (typeof recipeId !== "number") {
			return;
		}
		getRequest("cookbook/exists?recipeId=" + recipeId).then((res) => {
			setInCookbook(res.data === true);
		});
	}, [recipeId, title, ingredients, directions]);

	const handleAddToCookbook = () => {
		if (categoryRef.current.value === "") return;
		const body = {
			recipeId: recipeId,
			category: categoryRef.current.value,
		};
		postRequest("cookbook/add", body).then((res) => {
			if (res.status === 200) setInCookbook(true);
		});
	};

	const handleRemoveFromCookbook = () => {
		postRequest("cookbook/remove", { recipeId: recipeId }).then((res) => {
			if (res.status === 200) setInCookbook(false);
		});
	};

	return (
		<div className={className}>
			<div className="Recipe__title">
				<img src={foodIcon} className="Recipe__title-icon"></img>
				<h1 className="Recipe__title-text">{title}</h1>
				<img src={foodIcon} className="Recipe__title-icon"></img>
			</div>
			<div className="Recipe__contents">
				<div className="Recipe__ingredients">
					<div className="Recipe__section-title">
						<img src={saltIcon} className="Recipe__section-icon"></img>
						<h2>Ingredients</h2>
					</div>
					<ul>
						{ingredients.map((ingredient) => (
							<li>{ingredient}</li>
						))}
					</ul>
				</div>
				<div className="Recipe__directions">
					<div className="Recipe__section-title">
						<img src={directionsIcon} className="Recipe__section-icon"></img>
						<h2>Directions</h2>
					</div>
					<ol>
						{directions.map((direction) => (
							<li>{direction}</li>
						))}
					</ol>
				</div>
			</div>
			{
				inCookbook === false &&
				<div className="Recipe__cookbook-option">
					<select className="Recipe__add-option-select" ref={categoryRef}>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Dinner">Dinner</option>
						<option value="Dessert">Dessert</option>
					</select>
					<button className="Recipe__add-option-button" onClick={handleAddToCookbook}>Add to Cookbook</button>
				</div>
			}
			{
				inCookbook === true &&
				<div className="Recipe__cookbook-option">
					<button className="Recipe__remove-option-button" onClick={handleRemoveFromCookbook}>Remove from Cookbook</button>
				</div>
			}
		</div>
	);
};

export default Recipe;