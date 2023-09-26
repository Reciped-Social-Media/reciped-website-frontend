import "./RecipeCard.css";
import "../Post/PostModal.css";
import cardIcon from "../../assets/icons/meal.svg";
import infoIcon from "../../assets/icons/info.svg";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PostModal from "../Post/PostModal";
import { styled } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffffff",
		},
	},
});

const StyledSwitch = styled(Switch)({
	"& .MuiSwitch-thumb": {
		"background-color": "#6c9eba",
	},
});


const RecipeCard = (props) => {

	const { title, id, isPublic, category } = props.recipe;
	const [checked, setChecked] = useState(isPublic);
	const [showRecipeModal, setShowRecipeModal] = useState(false);
	const [showPostModal, setShowPostModal] = useState(false);

	const handleCheck = (event) => {
		const isChecked = event.target.checked;
		const accessToken = localStorage.getItem("accessToken");
		axios.post("http://localhost:4000/togglePublic", { checked: isChecked, recipeId: id }, {
			headers: {
				Authorisation: `Bearer ${accessToken}`,
			},
		});
		setChecked(isChecked);
	};

	const handleRecipeClick = () => {
		setShowRecipeModal(prev => !prev);
	};

	const handlePostModalClick = () => {
		setShowPostModal(prev => !prev);
	};

	return (
		<>
			<div className="card-content">
				<div className="post-section">
					<ThemeProvider theme={theme}>
						<CameraAltIcon color="primary" onClick={handlePostModalClick} className="card-icon"/>
					</ThemeProvider>
					<img src={infoIcon} width={25} onClick={handleRecipeClick} className="card-icon"></img>
				</div>
				<img src={cardIcon} className="recipe-icon"></img>
				<text className="card-title">{title}</text>
				<div className="card-category">{category}</div>
				<div className="card-toggle">
					<FormControlLabel control={<StyledSwitch onChange={handleCheck} checked={checked} disabled={true} color="primary"/>} label="Public" />
				</div>
			</div>
			{
				showRecipeModal && (
					<>
						<div className="RecipeCard__Blur" onClick={handleRecipeClick}/>
						<div className="RecipeCard__Modal">
							<Recipe id={id} />
						</div>
					</>
				)
			}
			{ showPostModal && (
				<>
					<div className="Post_Blur" onClick={handlePostModalClick}/>
					<div className="Post_Modal">
						<PostModal recipe={props.recipe} handle={handlePostModalClick}/>
					</div>
				</>
			)}
		</>
	);
};

export default RecipeCard;