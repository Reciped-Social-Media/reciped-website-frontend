import "./MealModal.css";
import mealLogo from "../../assets/icons/meal.svg";
import AddBoxIcon from "@mui/icons-material/AddBox";
import foodIcon from "../../assets/icons/food-dinner-icon.svg";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";
import { useState } from "react";
import timeout from "../../utils/timeout.js";
import { postRequest } from "../../utils/request";

const MealModal = (props) => {
	const { date, time, source } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isSucces, setIsSuccess] = useState(false);
	const [alertCaption, setAlertCaption] = useState("");

	const addRecipe = async (recipeId) => {
		console.log(date);
		setIsLoading(true);
		const data = {
			recipeId,
			dateEpochMs: date.unix() * 1000,
			time,
			source,
		};
		const res = await postRequest("mealplan/add", data);
		if (res.status === 200) {
			setIsLoading(false);
			setAlertCaption("added");
			setIsSuccess(true);
			await timeout(2000);
			setIsSuccess(false);
			props.handleModalClick();
		}
	};

	return (<div className="meal-blur" onDoubleClick={() => props.handleModalClick()}>
		{isLoading && <div className="loader"><Loader/></div>}
		{isSucces && !isLoading && props.alert(alertCaption)}
		{!isLoading && !isSucces && 	<div className="modal-content">
			<div className="modal-title">
				<img src={foodIcon} width={40}></img>
				<h1>Pick a recipe</h1>
				<img src={foodIcon} width={40}></img>
			</div>
			<div className="meal-grid">
				{props.cookbook && props.cookbook.map(rec => (
					<div className="meal-container">
						<img src={mealLogo} width={40} style={{ marginLeft: 10 }}></img>
						<h4>{rec.title}</h4>
						<AddBoxIcon sx={{ color: "white", marginRight: 2, cursor: "pointer" }} onClick={() => addRecipe(rec.recipeId)}/>
					</div>
				))}
			</div>
		</div>}
	</div>);
};

export default MealModal;