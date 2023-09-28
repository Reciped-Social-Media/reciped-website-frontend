import { useLoaderData } from "react-router-dom";
import axios from "axios";
import "./Explore.css";
import PostTopBar from "../components/Post/PostTopBar";
import PostRow from "../components/Post/PostRow";
import fireIcon from "../assets/icons/Fire.svg";
import checkIcon from "../assets/icons/Check.svg";
import clockIcon from "../assets/icons/clock.svg";
import dessertIcon from "../assets/icons/iceCream.svg";
import sunIcon from "../assets/icons/Sun.svg";
import pizzaIcon from "../assets/icons/Pizza.svg";
import moonIcon from "../assets/icons/Moon.svg";
import { useState } from "react";
import Recipe from "../components/Recipe/Recipe";

const Explore = () => {
	const data = useLoaderData();
	console.log(data);
	const posts = data.post;
	const justIn = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
	const whatsHot = posts.filter(rec => rec.rating >= 4);
	const breakfast = posts.filter(rec => rec.category === "Breakfast");
	const lunch = posts.filter(rec => rec.category === "Lunch");
	const dinner = posts.filter(rec => rec.category === "Dinner");
	const dessert = posts.filter(rec => rec.category === "Dessert");
	console.log(dessert);
	const username = localStorage.getItem("username");
	const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];
	const [showRecipeId, setShowRecipeId] = useState(null);
	const [postId, setPostId] = useState(null);
	const [recipeInteractionData, setRecipeInteractionData] = useState({});
	const [showRecipeModal, setShowRecipeModal] = useState(false);


	const handleRecipeClick = () => {
		setShowRecipeModal(prev => !prev);
		console.log("IN EXPLORE");
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
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
	};

	return (
		<div className="explore-background">
			<div className="explore-content">
				<PostTopBar username={username} />
				<PostRow
					recipes={whatsHot}
					title="WHATS HOT"
					icon={fireIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={justIn}
					title="JUST IN"
					icon={clockIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={posts}
					title="OUR PICKS"
					icon={checkIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={breakfast}
					title="BREAKFAST"
					icon={sunIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={lunch}
					title="LUNCH"
					icon={pizzaIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={dinner}
					title="DINNER"
					icon={moonIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
					setRecipeData={setRecipeInteractionData}
					handleRecipeClick ={handleRecipeClick}
				/>
				<PostRow
					recipes={dessert}
					title="DESSERT"
					icon={dessertIcon}
					setRecipeId={setShowRecipeId}
					setPostId={setPostId}
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
								postId={postId}
								interactions={{
									comments: recipeInteractionData.comments,
									ratings: recipeInteractionData.ratings,
									likes: recipeInteractionData.likes,
									category: recipeInteractionData.category,
									username: recipeInteractionData.username,
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
