import PostCard from "./PostCard";
import { useState } from "react";
import "./PostRow.css";
import rightArrow from "../../assets/icons/rightArrow.svg";
import leftArrow from "../../assets/icons/leftArrow.svg";

const itemsPerPage = 4;

const PostRow = (props) => {
	const recipes = props.recipes;
	const [scrollPosition, setScrollPosition] = useState(0);
	const totalPages = Math.ceil(props.recipes.length / itemsPerPage);
	const scrollLeft = () => {
		if (scrollPosition > 0) {
			setScrollPosition((prev) => prev - 1);
		}
	};
	const scrollRight = () => {
		setScrollPosition((prev) => prev + 1);
	};

	const transformValue = `translateX(${
		scrollPosition * -350
	}px)`;
	return (
		<>
			<div className="postrow-content">
				<div className="row-title">
					<img src={props.icon} width={30}></img>
					<h4>{props.title}</h4>
				</div>
				<div className="row-container" style={{ transform: transformValue }}>
					<div className="post-card-row">
						{props.recipes.map((post) => (
							<PostCard postDetails={post} setRecipeId={props.setRecipeId} setRecipeData={props.setRecipeData} handleRecipeClick={props.handleRecipeClick}/>
						))}
					</div>
				</div>
				<div className="scroll-button">
					{scrollPosition <= 0 ? <p></p> : <img src={leftArrow} onClick={scrollLeft} className="row-button"></img>}
					<img src={rightArrow} onClick={scrollRight} className="row-button"></img>
				</div>
			</div>
		</>
	);
};

export default PostRow;
