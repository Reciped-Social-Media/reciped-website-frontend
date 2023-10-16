import trashLogo from "../../assets/icons/Trash.svg";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MealModal from "./MealModal";
import { useState } from "react";
import "./MealCard.css";
import timeout from "../../utils/timeout.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "../Loader/Loader";
import { postRequest } from "../../utils/request";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6c9eba",
		},
	},
});

const ColorButton = styled(Button)(() => ({
	color: "white",
	backgroundColor: "#6c9eba",
	border: "2px solid white",
	boxShadow: "0 0 5px 0 black",
	paddingLeft: 0,
	paddingRight: 12,
	"&:hover": {
		color: "white",
		backgroundColor: "#6c9eba",
		boxShadow: "0 0 5px 0 black",
	},
}));

const MealCard = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [source, setSource] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const alert = (cap) => (
		<ThemeProvider theme={theme}>
			<Alert
				severity="success"
				variant="filled"
				color="primary"
				sx={{ color: "white" }}
			>
				<AlertTitle>Success</AlertTitle>
        Your meal was successfully {cap} —{" "}
				<strong>Refresh to check it out!</strong>
			</Alert>
		</ThemeProvider>
	);

	const handleModalClick = (mealSource) => {
		setShowModal((prev) => !prev);
		setSource(mealSource);
	};

	const handleDeleteRecipe = async () => {
		setIsLoading(true);
		const data = { mealPlanId: props.id };
		const res = await postRequest("mealplan/remove", data);
		if (res.status === 200) {
			setIsLoading(false);
			setIsSuccess(true);
			await timeout(2000);
			setIsSuccess(false);
		}
	};

	return (
		<>
			<div className="time-block">
				<h4>
					{props.timeIcon}
					{props.time}
					{props.title && <img src={trashLogo} className="trash" onClick={handleDeleteRecipe}></img>}
					{!props.title && props.timeIcon}
				</h4>
				{props.title && (
					<div className="recipe-block">
						<h3 className="rec-title">{props.title}</h3>
						<img src={props.mealLogo} width={180}></img>
						<h3 className="rec-source">Source: {props.source}</h3>
					</div>
				)}
				{!props.title && (
					<div className="add-recipe">
						<ColorButton
							endIcon={<AddBoxIcon />}
							onClick={() => handleModalClick("Cookbook")}
						/>
						<h3 className="rec-title">Add</h3>
						<ColorButton
							endIcon={<QuestionMarkIcon />}
						/>
						<h3 className="rec-title">Recommend</h3>
					</div>
				)}
			</div>
			{showModal && (
				<MealModal
					handleModalClick={handleModalClick}
					cookbook={props.cookbook}
					time={props.time}
					source={source}
					date={props.date}
					alert={alert}
				/>
			)}
			{isLoading && (
				<div className="div-blur">
					<Loader />
				</div>
			)}
			{!isLoading && isSuccess && <div className="div-blur">{alert("removed")}</div>}
		</>
	);
};

export default MealCard;
