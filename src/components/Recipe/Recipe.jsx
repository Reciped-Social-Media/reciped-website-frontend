import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import "./Recipe.css";
import foodIcon from "../../assets/icons/food-dinner-icon.svg";
import saltIcon from "../../assets/icons/salt.svg";
import directIcon from "../../assets/icons/directions.svg";
import Loader from "../Loader/Loader";
import "../Loader/Loader.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import starIcon from "../../assets/stars/empty.svg";
import chatIcon from "../../assets/icons/Chat.svg";
import { Rating } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import userIcon from "../../assets/icons/userMain.svg";
import { Alert } from "../Alert";

const RedSwitch = styled(Switch)(() => ({
	"& .MuiSwitch-switchBase.Mui-checked": {
		color: "red",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
		backgroundColor: "red",
	},
}));

const ColorButton = styled(Button)(() => ({
	color: "white",
	backgroundColor: "#6c9eba",
	"&:hover": {
		backgroundColor: "white",
		color: "#6c9eba",
	},
}));

const initialReview = {
	isLiked: false,
	rating: 1,
	comment: "",
};

const reviewReducer = (state, action) => {
	switch (action.type) {
	case "LIKE":
		return {
			isLiked: !state.isLiked,
			rating: state.rating,
			comment: state.comment,
		};
	case "COMMENT":
		return {
			isLiked: state.isLiked,
			rating: state.rating,
			comment: action.value,
		};
	case "RATE":
		return {
			isLiked: state.isLiked,
			rating: action.value,
			comment: state.comment,
		};
	}

	return initialReview;
};

// Constants

const Recipe = ({ id, interactions, handleRecipeClick, postId }) => {
	const [recipe, setRecipe] = useState(null);
	const [reviewState, dispatch] = useReducer(reviewReducer, initialReview);
	const accessToken = localStorage.getItem("accessToken");
	const headers = { Authorization: `Bearer ${accessToken}` };
	const url = "http://localhost:4000";
	let comments = [];
	let likes = [];
	let ratings = [];
	let postUsername = "";
	let category = "";
	if (interactions) {
		comments = interactions.comments;
		likes = interactions.likes;
		ratings = interactions.ratings;
		postUsername = interactions.username;
		category = interactions.category;
	}
	const [addCategory, setAddCategory] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [isReviewed, setIsReviewed] = useState(false);

	const handleAddRecipe = async () => {
		setIsLoading(true);
		const res = await axios.post(
			url + "/cookbook/add",
			{ recipeId: id, category },
			{ headers }
		);
		console.log("BACK");
		setIsLoading(false);
		if (res.data.error) {
			setIsAdded(true);
			setIsSuccess(false);
			return;
		}
		if (res.status === 200) {
			setIsSuccess(true);
			setIsAdded(true);
			handleRecipeClick();
		}
		console.log("DONE!");
	};

	const handleAddReview = async () => {
		setIsLoading(true);
		const likeresponse = await axios.post(
			url + "/interaction/like",
			{ postId },
			{ headers }
		);
		const reviewresponse = await axios.post(
			url + "/interaction/review",
			{ postId, rating: reviewState.rating, comment: reviewState.comment },
			{ headers }
		);
		setIsLoading(false);
		console.log(likeresponse.data);
		console.log(reviewresponse.data);
		if (likeresponse.data.error || reviewresponse.data.error) {
			setIsReviewed(true);
			setIsSuccess(false);
			handleRecipeClick();
			return;
		}
		if (likeresponse.status === 200 && reviewresponse.status === 200) {
			setIsSuccess(true);
			setIsReviewed(true);
			handleRecipeClick();
		}
	};

	const handleCategoryChange = (e) => {
		setAddCategory(e.target.value);
	};

	useEffect(() => {
		const fetchRecipe = async () => {
			if (!id) {
				setRecipe(null);
			}
			else {
				const res = await axios.get(url + `/recipe?recipeId=${id}`, {
					headers,
				});
				if (res.data.error) {
					setRecipe(null);
				}
				else {
					setRecipe(res.data);
				}
			}
		};
		if (!id) {
			setRecipe(null);
		}
		else {
			fetchRecipe().catch((err) => {
				console.log(err);
			});
		}
	}, []);

	return (
		<div className="Recipe">
			{!recipe && (
				<div className="loader">
					<Loader />
				</div>
			)}
			{recipe && !isLoading && !isAdded && (
				<div>
					{interactions && (
						<div className="post-userinfo">
							<div className="userdetails">
								<img src={userIcon}></img>
								<h1>{`Posted by: ${postUsername}`}</h1>
							</div>
							<div className="category">
								<h1>Category: {category}</h1>
							</div>
						</div>
					)}
					<div className="Recipe__title">
						<img src={foodIcon} className="Recipe_icon"></img>
						<h1>{recipe.title}</h1>
						<img src={foodIcon} className="Recipe_icon"></img>
					</div>
					<div className="Recipe__instructions">
						<div className="Recipe__ingredients">
							<div className="Recipe_title">
								<img
									src={saltIcon}
									width={30}
									className="Recipe_title_icon"
								></img>
								<h1>Ingredients</h1>
							</div>
							{recipe.ingredients.map((ingredient) => (
								<li>{ingredient}</li>
							))}
						</div>
						<div className="Recipe__directions">
							<div className="Recipe_title">
								<img
									src={directIcon}
									width={30}
									className="Recipe_title_icon"
								></img>
								<h1>Directions</h1>
							</div>
							<ol>
								{recipe.directions.map((direction) => (
									<li>{direction}</li>
								))}
							</ol>
						</div>
					</div>

					{interactions && (
						<>
							<div className="Recipe__interactions">
								<div className="Recipe__likes">
									<FavoriteIcon sx={{ bgcolor: "transparent", color: "red" }} />
									<h1>Liked by:</h1>
									<AvatarGroup total={likes.length}>
										{likes.slice(0, 2).map((like, index) => (
											<Avatar
												sx={{
													bgcolor:
                            index % 2 === 0 ? "rgba(108, 158, 186)" : "grey",
												}}
											>
												{like[0].toUpperCase()}
											</Avatar>
										))}
									</AvatarGroup>
								</div>
								<div className="Recipe__ratings">
									<img src={starIcon}></img>
									<h1>Rated:</h1>
									<Rating name="read-only" value={3} readOnly />
									<h1>By</h1>
									<AvatarGroup total={ratings.length}>
										{ratings.slice(0, 2).map((rating, index) => (
											<Avatar
												sx={{
													bgcolor:
                            index % 2 === 0 ? "rgba(108, 158, 186)" : "grey",
													color: "white",
												}}
											>
												{rating.username[0].toUpperCase()}
											</Avatar>
										))}
									</AvatarGroup>
								</div>
								<div className="Add-recipe">
									<h1 style={{ marginRight: 10 }}>Save for later: </h1>
									<FormControl>
										<InputLabel id="demo-simple-select-label">
                      Category
										</InputLabel>
										<Select
											value={addCategory}
											label="Category"
											onChange={handleCategoryChange}
											sx={{
												width: "100px",
												color: "#6c9eba",
												outline: "none",
												backgroundColor: "transparent",
												InputLabel: {
													color: "white",
												},
												":-ms-input-placeholder": {
													color: "white",
													outline: "none",
												},
											}}
											size="small"
										>
											<MenuItem value={"Breakfast"}>Breakfast</MenuItem>
											<MenuItem value={"Lunch"}>Lunch</MenuItem>
											<MenuItem value={"Dinner"}>Dinner</MenuItem>
											<MenuItem value={"Dessert"}>Dessert</MenuItem>
											<MenuItem value={"All"}>All</MenuItem>
										</Select>
									</FormControl>
									<ColorButton
										variant="contained"
										endIcon={<AddBoxIcon />}
										sx={{ marginLeft: 5 }}
										onClick={handleAddRecipe}
									>
                    Add
									</ColorButton>
								</div>
							</div>
							<div className="interact-action">
								<span className="like">
									<h1>Like:</h1>
									<RedSwitch onChange={() => dispatch({ type: "LIKE" })} />
								</span>
								<span className="inner">
									<h1>Rate:</h1>
									<Rating
										onChange={(event, newValue) =>
											dispatch({ type: "RATE", value: newValue })
										}
									/>
								</span>
								<span className="comment">
									<h1>Comment :</h1>
									<input
										type="text"
										placeholder="add a comment..."
										onChange={(e) =>
											dispatch({ type: "COMMENT", value: e.target.value })
										}
									></input>
								</span>
								<ColorButton
									variant="contained"
									endIcon={<SendIcon />}
									sx={{ marginLeft: 5 }}
									onClick={handleAddReview}
								>
                  Submit
								</ColorButton>
							</div>
							<div className="Recipe__comments">
								<div className="Comment__title">
									<img src={chatIcon}></img>
									<h1>Comments:</h1>
								</div>
								{comments.map((com, index) => (
									<div className="Recipe__comment__single">
										<Avatar
											sx={{
												bgcolor:
                              index % 2 === 0 ? "rgba(108, 158, 186)" : "grey",
											}}
										>
											{com.username[0].toUpperCase()}
										</Avatar>
										<p>{com.username}</p>
										<p>:</p>
										<p>{com.comment}</p>
										<br></br>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			)}
			{isLoading && !isSuccess && <div className="loader"><Loader /></div>}
			{isSuccess && isAdded && (
				<Alert
					title={"Success!"}
					caption={"Successfully added to your cookbook"}
					severity={"success"}
				/>
			)}
			{!isSuccess && isAdded && (
				<Alert
					title={"Error"}
					caption={"You already have this in your cookbook"}
					severity={"error"}
				/>
			)}
			{isSuccess && isReviewed && (
				<Alert
					title={"Success!"}
					caption={"Successfully reviewed this recipe"}
					severity={"success"}
				/>
			)}
			{!isSuccess && isReviewed && (
				<Alert
					title={"Error"}
					caption={"You have already review this recipe"}
					severity={"error"}
				/>
			)}
		</div>
	);
};

export default Recipe;
