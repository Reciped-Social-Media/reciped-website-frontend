import { useState } from "react";
import searchIcon from "../../assets/icons/SearchIcon.svg";
import userIcon from "../../assets/icons/userMain.svg";
import axios from "axios";
import "./PostTopBar.css";

const PostTopBar = (props) => {

	const [query, setQuery] = useState(null);

	const onKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		props.setIsLoading(true);
		const recipes = await axios.get(`http://localhost:4000/recipe?queryString=${query}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		props.setIsLoading(false);
		props.setSearchResult(recipes.data);
	};

	const handleChange = (event) => {
		if (event.target.value !== "") {
			setQuery(event.target.value);
		}
		else {
			props.setSearchResult(null);
		}
	};
	return (
		<div className="top_bar">
			<div className="search-bar">
				<img src={searchIcon} width={20}></img>
				<input type="text" placeholder="find your taste" onChange={handleChange} onKeyDown={onKeyPress}></input>
			</div>
			<div className="username">
				<img src={userIcon} width={40}></img>
				<p>{props.username}</p>
			</div>
		</div>
	);
};

export default PostTopBar;