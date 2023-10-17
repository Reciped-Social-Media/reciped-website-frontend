import { useEffect, useRef, useState } from "react";
import mealLogo from "../../assets/icons/meal.svg";
import "./RecipeCard.css";
import ShareIcon from "@mui/icons-material/Share";
import pinIcon from "../../assets/icons/PinBlue.svg";
import { Close, Star, StarBorder } from "@mui/icons-material";
import { postRequest } from "../../utils/request";
import Recipe from "./Recipe";

const RecipeCard = ({ _recipe, _inCookbook }) => {
	const [recipeData] = useState(_recipe);
	const [id, setId] = useState(recipeData.id);
	const [title, setTitle] = useState(recipeData.title);
	const [ingredients, setIngredients] = useState(recipeData.ingredients);
	const [directions, setDirections] = useState(recipeData.directions);
	const [category] = useState(recipeData.category);
	const [sharing, setSharing] = useState(false);
	const [sharedError, setSharedError] = useState("");

	const [showRecipeModal, setShowRecipeModal] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const recipeModal = useRef();
	const shareModal = useRef();
	const shareCategoryRef = useRef();
	const shareCaptionRef = useRef();

	useEffect(() => {
		if (showRecipeModal) {
			recipeModal?.current?.showModal();
		}
		else {
			recipeModal?.current?.close();
		}
		if (showShareModal) {
			shareModal.current.showModal();
		}
		else {
			shareModal.current.close();
		}
		setId(recipeData.id);
		setTitle(recipeData.title);
		setIngredients(recipeData.ingredients);
		setDirections(recipeData.directions);
	}, [
		recipeData,
		showRecipeModal,
		showShareModal,
	]);

	const share = () => {
		if (sharing) return;
		setSharing(true);
		if (shareCaptionRef.current.value === "") {
			setSharedError("Caption cannot be empty.");
			setSharing(false);
			return;
		}
		const body = {
			recipeId: id,
			caption: shareCaptionRef.current.value,
			category: shareCategoryRef.current.value,
		};
		postRequest("interaction/post", body)
			.then((res) => {
				setSharing(false);
				if (res.status === 200) {
					setShowShareModal(false);
				}
				else {
					setSharedError(res.data.error);
				}
			})
			.catch(() => {
				setSharedError("Unknown error occurred!");
				setSharing(false);
			});
	};

	return (
		<div className="RecipeCard">
			<div className="RecipeCard__empty" />
			<div className="RecipeCard__image" onClick={() => setShowRecipeModal(true)}>
				<img src={mealLogo}></img>
			</div>
			{category && <div className="RecipeCard__category">{category}</div>}
			<div className="RecipeCard__title" onClick={() => setShowRecipeModal(true)}>
				{title}
			</div>
			<div className="RecipeCard__interactions">
				<div className="RecipeCard__share">
					<ShareIcon style={{ color: "grey", cursor: "pointer" }} onClick={() => setShowShareModal(true)} />
					<dialog className="RecipeCard__modal" ref={shareModal} onCancel={() => setShowShareModal(false)}>
						<div className="RecipeCard__modal-close">
							<Close onClick={() => setShowShareModal(false)} style={{ cursor: "pointer" }} />
						</div>
						<div className="RecipeCard__share-modal-title">
							<img src={pinIcon}></img>
							<h1>Share to the world!</h1>
						</div>
						<div className="RecipeCard__share-modal-input">
							<textarea placeholder="Share what you think about this recipe..." maxLength={1024} minLength={1} ref={shareCaptionRef} />
							<label>
								Category:
								<select defaultValue={category} ref={shareCategoryRef}>
									<option value="All">All</option>
									<option value="Breakfast">Breakfast</option>
									<option value="Lunch">Lunch</option>
									<option value="Dinner">Dinner</option>
									<option value="Dessert">Dessert</option>
								</select>
							</label>
							<div className="RecipeCard__share-modal-button">
								<button disabled={sharing} onClick={share}>{sharing ? "Sharing..." : "Share"}</button>
							</div>
						</div>
						{sharedError && <div className="RecipeCard__share-modal-error" style={{ color: "red" }}>{sharedError}</div>}
					</dialog>
				</div>
			</div>
			{showRecipeModal && <dialog className="RecipeCard__modal" ref={recipeModal} onCancel={() => setShowRecipeModal(false)}>
				<div className="RecipeCard__modal-close">
					<Close onClick={() => setShowRecipeModal(false)} style={{ cursor: "pointer" }} />
				</div>
				<Recipe recipeId={id} title={title} ingredients={ingredients} directions={directions} />
			</dialog>}
		</div>
	);
};

export default RecipeCard;
