import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { useEffect, useRef, useState } from "react";
import chatIcon from "../../assets/icons/Chat.svg";
import editLogo from "../../assets/icons/edit.svg";
import mealLogo from "../../assets/icons/meal.svg";
import userPost from "../../assets/icons/userPost.svg";
import { getRequest, postRequest } from "../../utils/request";
import "../Recipe/Recipe.css";
import "../Recipe/RecipeCard.css";
import "./PostCard.css";
import { Close } from "@mui/icons-material";
import Recipe from "../Recipe/Recipe";


const PostCard = ({ data }) => {
	const [postData, setPostData] = useState(data);
	const [id, setId] = useState(postData.id);
	const [recipeId, setRecipeId] = useState(postData.recipe.id);
	const [username, setUsername] = useState(postData.user.username);
	const [title, setTitle] = useState(postData.recipe.title);
	const [ingredients, setIngredients] = useState(postData.recipe.ingredients);
	const [directions, setDirections] = useState(postData.recipe.directions);
	const [caption, setCaption] = useState(postData.caption);
	const [rating, setRating] = useState(postData.rating);
	const [likes, setLikes] = useState(postData.likes);
	const [reviews, setReviews] = useState(postData.reviews);
	const [reviewsData, setReviewsData] = useState([]);
	const [liked, setLiked] = useState(postData.liked);
	const [showPostDialog, setShowPostDialog] = useState(false);
	const postDialog = useRef();

	useEffect(() => {
		if (showPostDialog) {
			postDialog?.current?.showModal();
			getRequest(`interaction/review?postId=${id}`)
				.then(res => {
					setReviewsData(res.data);
				}).catch(() => {
					// Do nothing
				});
		}
		else {
			postDialog?.current?.close();
		}
	}, [showPostDialog]);

	useEffect(() => {
		setId(postData.id);
		setRecipeId(postData.recipe.id);
		setUsername(postData.user.username);
		setTitle(postData.recipe.title);
		setIngredients(postData.recipe.ingredients);
		setDirections(postData.recipe.directions);
		setCaption(postData.caption);
		setRating(postData.rating);
		setLikes(postData.likes);
		setReviews(postData.reviews);
		setLiked(postData.liked);
	}, [postData]);

	const handleOnLike = async () => {
		const body = {
			postId: id,
		};
		setLiked(true);
		setLikes(likes + 1);
		const res = await postRequest("interaction/like", body);
		if (res.status === 200) {
			const updatedPost = await getRequest(`interaction/post?postId=${id}`);
			if (updatedPost.status === 200) {
				setPostData(updatedPost.data);
			}
		}
	};

	const handleOnUnlike = async () => {
		const body = {
			postId: id,
		};
		setLiked(false);
		setLikes(likes - 1);
		const res = await postRequest("interaction/unlike", body);
		if (res.status === 200) {
			const updatedPost = await getRequest(`interaction/post?postId=${id}`);
			if (updatedPost.status === 200) {
				setPostData(updatedPost.data);
			}
		}
	};

	return (
		<div className="PostCard">
			<div className="PostCard__user" onClick={() => setShowPostDialog(true)} style={{ cursor: "pointer" }}>
				<div className="PostCard__username" >
					<img src={userPost} width={30}></img>
					<p className="PostCard__username">{username}</p>
				</div>
			</div>
			<div className="PostCard__image" onClick={() => setShowPostDialog(true)} style={{ cursor: "pointer" }}>
				<img src={mealLogo}></img>
			</div>
			<div className="PostCard__title" onClick={() => setShowPostDialog(true)} style={{ cursor: "pointer" }}>
				{title}
			</div>
			<div className="PostCard__caption" onClick={() => setShowPostDialog(true)} style={{ cursor: "pointer" }}>
				<img src={editLogo} width={30}></img>
				<p>{caption}</p>
			</div>
			<div className="PostCard__rating" onClick={() => setShowPostDialog(true)} style={{ cursor: "pointer" }}>
				<Rating name="read-only" value={rating} readOnly precision={0.5} />
				{rating}
				{rating === 1 ? " star" : " stars"}
			</div>
			<div className="PostCard__interactions">
				<div className="PostCard__interaction-like">
					{liked ? <FavoriteIcon className="PostCard__interaction-like-icon" onClick={handleOnUnlike} style={{ color: "red", cursor: "pointer" }} /> : <FavoriteBorder className="PostCard__interaction-like-icon" onClick={handleOnLike} style={{ color: "grey", cursor: "pointer" }} />}
					<p>{likes}</p>
				</div>
				<div className="PostCard__interaction-comments" onClick={() => setShowPostDialog(true)}>
					<img className="PostCard__interaction-comments-icon" src={chatIcon} width={30} style={{ cursor: "pointer" }}></img>
					<p>{reviews}</p>
				</div>
			</div>
			{showPostDialog && <dialog className="PostCard__modal" ref={postDialog} onCancel={() => showPostDialog(false)}>
				<div className="PostCard__modal-close">
					<Close onClick={() => setShowPostDialog(false)} style={{ cursor: "pointer" }} />
				</div>
				<div className="PostCard__modal-contents">
					<Recipe recipeId={recipeId} title={title} ingredients={ingredients} directions={directions} />
					<div className="PostCard__modal-contents-rating">
						<Rating name="read-only" value={rating} readOnly precision={0.5} />
						{rating}
						{(rating === 1 ? " star" : " stars") + " rated by reviewers"}
					</div>
					<div className="PostCard__modal-contents-caption">
						<img src={editLogo} width={30}></img>
						<p className="PostCard__modal-poster">{username}</p>
						<p>{caption}</p>
					</div>
					<div className="PostCard__interactions">
						<div className="PostCard__interaction-like">
							{liked ? <FavoriteIcon className="PostCard__interaction-like-icon" onClick={handleOnUnlike} style={{ color: "red", cursor: "pointer" }} /> : <FavoriteBorder className="PostCard__interaction-like-icon" onClick={handleOnLike} style={{ color: "grey", cursor: "pointer" }} />}
							<p>{likes}</p>
						</div>
						<div className="PostCard__interaction-comments">
							<img className="PostCard__interaction-comments-icon" src={chatIcon} width={30}></img>
							<p>{reviews}</p>
						</div>
					</div>
					{reviewsData.map((review) => (
						<div className="PostCard__comments-contents">
							<div className="PostCard__comments-contents-user">
								<img src={userPost} width={30}></img>
								<p>{review.username}</p>
							</div>
							<div className="PostCard__modal-contents-rating">
								<Rating name="read-only" value={review.rating} readOnly precision={0.5} />
								{review.rating}
								{review.rating === 1 ? " star" : " stars"}
							</div>
							<div className="PostCard__comments-contents-comment">
								<p>{review.comment}</p>
							</div>
						</div>
					))}
				</div>
			</dialog>}

		</div>
	);
};

export default PostCard;
