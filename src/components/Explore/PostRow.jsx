import { useState } from "react";
import PostCard from "../Post/PostCard";
import rightArrow from "../../assets/icons/rightArrow.svg";
import leftArrow from "../../assets/icons/leftArrow.svg";
import "./PostRow.css";

const PostRow = ({ title, icon, recipes }) => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [transformValue, setTransformValue] = useState("translateX(0px)");

	const scrollLeft = () => {
		if (scrollPosition > 0) {
			setScrollPosition((prev) => prev - 1);
			setTransformValue(`translateX(${-350 * (scrollPosition - 1)}px)`);
		}
	};
	const scrollRight = () => {
		setScrollPosition((prev) => prev + 1);
		setTransformValue(`translateX(${-350 * (scrollPosition + 1)}px)`);
	};

	return (
		<div className="PostRow">
			<div className="PostRow__title">
				<img src={icon}></img>
				<h1>{title}</h1>
			</div>
			<div className="PostRow__container" style={{ transform: transformValue }}>
				<div className="PostRow__card-row">
					{recipes.map((recipe) => (
						<PostCard data={recipe} />
					))}
				</div>
			</div>
			<div className="PostRow__scroll-buttons">
				{scrollPosition <= 0 ? <p></p> : <img src={leftArrow} onClick={scrollLeft} className="PostRow__scroll-left"></img>}
				<img src={rightArrow} onClick={scrollRight} className="PostRow__scroll-right"></img>
			</div>
		</div>
	);
};

export default PostRow;