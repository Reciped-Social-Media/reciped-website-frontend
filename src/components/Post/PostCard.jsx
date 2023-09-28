import { useEffect, useState } from "react";
import axios from "axios";
import userPost from "../../assets/icons/userPost.svg";
import arrow from "../../assets/icons/arrow.svg";
import "./PostCard.css";
import mealLogo from "../../assets/icons/meal.svg";
import editLogo from "../../assets/icons/edit.svg";
import Rating from "@mui/material/Rating";
import starIcon from "../../assets/stars/full.svg";
import chatIcon from "../../assets/icons/Chat.svg";
import Loader from "../Loader/Loader";
import "../Recipe/Recipe.css";
import "../Recipe/RecipeCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";


const PostCard = (props) => {
	const { id, username, recipeId, caption, category, title } = props.postDetails;
	const [comments, setComments] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [likes, setLikes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleRecipeClick = () => {
		props.setPostId(id);
		props.setRecipeId(recipeId);
		props.setRecipeData({ comments, likes, ratings, username, category });
		props.handleRecipeClick();
	};

	useEffect(() => {
		setIsLoading(true);
		if (id) {
			const fetch = async () => {
				const interactions = await axios.get(`http://localhost:4000/interaction?id=${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				setComments(interactions.data.comments);
				setLikes(interactions.data.likes);
				setRatings(interactions.data.ratings);
				setIsLoading(false);
				return;
			};
			fetch();
		}
		else {
			setIsLoading(false);
			setRatings([{ rating: props.postDetails.rating }]);
		}
	}, []);

	const rating = ratings.map(rat => rat.rating);
	const meanRating = rating.reduce((sum, value) => sum + value, 0) / rating.length;
	const showRating = Math.round(meanRating * 2) / 2;
	return (
		<div className="postcard-content">
			{!isLoading && <><div className="postuser-info">
				<div className="postuser-name">
					<img src={userPost} width={30}></img>
					<p className="postuser-name">{username}</p>
				</div>
				<img src={arrow} width={15} className="postarrow" onClick={handleRecipeClick}></img>
			</div>
			<div className="postuser-pic">
				<img src={mealLogo}></img>
			</div>
			<div className="postuser-title">
				{title}
			</div>
			<div className="recipe-caption">
				<img src={editLogo} width={30}></img>
				<p>{caption}</p>
			</div>
			<div className="post-rating">
				<Rating name="read-only" value={showRating} readOnly precision={0.5}/>
				{showRating}
				{showRating > 1 ? " stars" : " star"}
			</div>
			<div className="post-interactions">
				<div className="interact-row"><span><FavoriteIcon sx={{ color: "red", marginTop: 1.5 }}/></span><p>{likes.length}</p></div>
				<div className="interact-row"><img src={chatIcon} style={{ width: "30px" }}></img><p>{comments.length}</p></div>
				<div className="interact-row"><img src={starIcon} style={{ width: "20px", marginRight: "2px" }}></img><p>{ratings.length}</p></div>
			</div></>}
			{isLoading && <div className="loader-card"><Loader/></div>}
		</div>
	);
};

export default PostCard;
