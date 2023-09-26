import searchIcon from "../../assets/icons/SearchIcon.svg";
import userIcon from "../../assets/icons/userMain.svg";
import "./PostTopBar.css";

const PostTopBar = (props) => {
	return (
		<div className="top_bar">
			<div className="search-bar">
				<img src={searchIcon} width={20}></img>
				<input type="text" placeholder="find your taste"></input>
			</div>
			<div className="username">
				<img src={userIcon} width={40}></img>
				<p>{props.username}</p>
			</div>
		</div>
	);
};

export default PostTopBar;