import { useLoaderData } from "react-router-dom";
import axios from "axios";
import "./Explore.css";
import PostTopBar from "../components/Post/PostTopBar";
import PostCard from "../components/Post/PostCard";
import PostRow from "../components/Post/PostRow";
import fireIcon from "../assets/icons/Fire.svg";
import checkIcon from "../assets/icons/Check.svg";
import { useState } from "react";
import Recipe from "../components/Recipe/Recipe";

const Explore = () => {
	const data = useLoaderData();
	const username = localStorage.getItem("username");
	const categories = ["All", "Breakfast", "Lunch", "Dinner"];
	const [showRecipeId, setShowRecipeId] = useState(null);
	const [recipeInteractionData, setRecipeInteractionData] = useState({});
	const [showRecipeModal, setShowRecipeModal] = useState(false);


	const handleRecipeClick = () => {
		setShowRecipeModal(prev => !prev);
	};
	const addRecipeHandler = async () => {
		// const searchParams = new URL(window.location.href).searchParams;
		// const recipeId = searchParams.get("id");
		const recipeId = Math.floor(Math.random() * 1000);
		const cat = Math.floor(Math.random() * 3);
		const category = categories[cat];
		const accessToken = localStorage.getItem("accessToken");
		await axios.post(
			"http://localhost:4000/cookbook/add",
			{ recipeId, category },
			{
				headers: {
					Authorisation: `Bearer ${accessToken}`,
				},
			}
		);
	};

	return (
		<div className="explore-background">
			<div className="explore-content">
				<PostTopBar username={username} />
				<PostRow
					recipes={data}
					title="WHATS HOT"
					icon={fireIcon}
					setRecipeId={setShowRecipeId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={data}
					title="OUR PICKS"
					icon={checkIcon}
					setRecipeId={setShowRecipeId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<button onClick={addRecipeHandler}>ADD TO COOKBOOK</button>
				{showRecipeModal && (
					<>
						<div className="RecipeCard__Blur" onClick={handleRecipeClick} />
						<div className="RecipeCard__Modal">
							<Recipe
								id={showRecipeId}
								interactions={{
									comments: recipeInteractionData.comments,
									ratings: recipeInteractionData.ratings,
									likes: recipeInteractionData.likes,
									category: recipeInteractionData.category,
									username: recipeInteractionData.userName,
								}}
								handleRecipeClick={handleRecipeClick}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default Explore;
