import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/icons/SearchIcon.svg";
import "./RecipeSearchBar.css";
import { getRequest, postRequest } from "../../utils/request";
import Recipe from "./Recipe";
import { Close, Share } from "@mui/icons-material";

const RecipeSearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [loadingResults, setLoadingResults] = useState(false);
	const [results, setResults] = useState([]);
	const [focused, setFocused] = useState(false);
	const [currentRecipeId, setCurrentRecipeId] = useState(null);
	const [currentRecipeTitle, setCurrentRecipeTitle] = useState("");
	const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState([]);
	const [currentRecipeDirections, setCurrentRecipeDirections] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const recipeDialog = useRef();

	async function onEnterPress(e) {
		if (e.key === "Enter" && searchTerm.trim() !== "" && !loadingResults) {
			setLoadingResults(true);
			setResults([]);
			getRequest(`recipe?queryString=${searchTerm}`).then(res => {
				setLoadingResults(false);
				setResults(res.data);
			}).catch(() => {
				setLoadingResults(false);
				setResults([]);
			});
		}
	}

	useEffect(() => {
		if (showModal) {
			recipeDialog.current.showModal();
		}
		else {
			recipeDialog.current.close();
		}
	}, [showModal]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm.trim() !== "" && !loadingResults) {
				setLoadingResults(true);
				setResults([]);
				getRequest(`recipe?queryString=${searchTerm}`).then(res => {
					setLoadingResults(false);
					setResults(res.data);
				}).catch(() => {
					setLoadingResults(false);
					setResults([]);
				});
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleCurrentSelection = (recipe) => {
		setCurrentRecipeId(recipe.id);
		setCurrentRecipeTitle(recipe.title);
		setCurrentRecipeIngredients(recipe.ingredients);
		setCurrentRecipeDirections(recipe.directions);
		setShowModal(true);
	};

	return (
		<div className="RecipeSearchBar">
			<div className="RecipeSearchBar__search">
				<input type="text" placeholder="Find your taste"
					onChangeCapture={(e) => setSearchTerm(e.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={async () => {
						setTimeout(() => {
							setFocused(false);
						}, 100);
					}}
					onKeyDown={(e) => e.key === "Enter" && onEnterPress(e)}
				></input>
			</div>
			{focused && <div className="RecipeSearchBar__search-contents">
				{loadingResults && <div className="RecipeSearchBar__loading">Loading...</div>}
				<div className="RecipeSearchBar__results">
					{results.map((result) => (
						<div className="RecipeSearchBar__result" onClick={() => handleCurrentSelection(result)}>
							<p>{result.title}</p>
						</div>
					))}
				</div>
			</div>}
			<dialog className="RecipeSearchBar__recipe-dialog" ref={recipeDialog} onCancel={() => setShowModal(false)}>
				<div className="RecipeSearchBar__modal-close">
					<Close onClick={() => setShowModal(false)} style={{ cursor: "pointer" }} />
				</div>
				<Recipe className="RecipeSearchBar__recipe" recipeId={currentRecipeId} title={currentRecipeTitle} ingredients={currentRecipeIngredients} directions={currentRecipeDirections} />
			</dialog>
		</div>
	);
};

export default RecipeSearchBar;