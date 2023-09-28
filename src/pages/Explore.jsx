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
import Search from "../components/Search/Search";
import Loader from "../components/Loader/Loader";
import searchIcon from "../assets/icons/SearchBlue.svg";

const Explore = () => {
	const data = useLoaderData();
	const posts = data.posts;
	const picks = data.picks;
	const justIn = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
	const whatsHot = posts.filter(rec => rec.rating >= 4);
	const breakfast = posts.filter(rec => rec.category === "Breakfast");
	const lunch = posts.filter(rec => rec.category === "Lunch");
	const dinner = posts.filter(rec => rec.category === "Dinner");
	const dessert = posts.filter(rec => rec.category === "Dessert");
	const username = localStorage.getItem("username");

	const [showRecipeId, setShowRecipeId] = useState(null);
	const [postId, setPostId] = useState(null);
	const [recipeInteractionData, setRecipeInteractionData] = useState({});
	const [showRecipeModal, setShowRecipeModal] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);


	const handleRecipeClick = () => {
		setShowRecipeModal(prev => !prev);
	};

	return (
		<div className="explore-background">
			<div className="explore-content">
				<PostTopBar username={username} setSearchResult={setSearchResult} setIsLoading={setIsLoading}/>
				{!searchResult && !isLoading && <><PostRow
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
					recipes={picks}
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
				/></>}
				{searchResult && !isLoading && <Search recipes={searchResult} setRecipeId={setShowRecipeId} handleRecipeClick={handleRecipeClick} setPostId={setPostId}/>}
				{isLoading && <div className="search-wait"><div className="search-wait-title"><img src={searchIcon} width={30}></img><h1>Let's have a look...</h1></div><div className="loader"><Loader/></div></div>}
				{showRecipeModal && (
					<>
						<div className="RecipeCard__Blur" onClick={handleRecipeClick} />
						<div className="RecipeCard__Modal">
							<Recipe
								recipeId={showRecipeId}
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
