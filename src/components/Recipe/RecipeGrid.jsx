import RecipeCard from "./RecipeCard";
import "./RecipeGrid.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CakeIcon from "@mui/icons-material/Cake";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const actions = [
	{ icon: <WbTwilightIcon />, name: "Breakfast" },
	{ icon: <LunchDiningIcon />, name: "Lunch" },
	{ icon: <DarkModeIcon />, name: "Dinner" },
	{ icon: <CakeIcon/>, name: "Dessert" },
	{ icon: <QuestionMarkIcon />, name: "All" },
];

const StyledSpeedDial = styled(SpeedDial)({
	"& .MuiSpeedDial-fab": {
		color: "white",
		"background-color": "#6c9eba",
	},

	"& .MuiSpeedDial-fab:hover": {
		color: "white",
		"background-color": "#6c9eba",
	},
});


const RecipeGrid = (props) => {

	const [recipeFilter, setRecipeFilter] = useState("All");
	const filteredRecipes = props.recipes.filter(recipe => recipe.category === recipeFilter || recipeFilter === "All");

	const addRecipeHandler = () => {
		// Collect user data from popup
	};

	return (
		<div className="RecipeGrid">
			<div className="action-buttons">
				<StyledSpeedDial
					ariaLabel="SpeedDial basic example"
					icon={<SpeedDialIcon icon={<AddIcon />}/>}
					direction="right"
				>
					<SpeedDialAction
						key={1}
						icon={<AddIcon/>}
						tooltipTitle={"Add"}
						onClick={addRecipeHandler}
					/>
				</StyledSpeedDial>
				<StyledSpeedDial
					ariaLabel="SpeedDial basic example"
					icon={<SpeedDialIcon icon={<FilterAltIcon />} />}
					direction="left"
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={() => setRecipeFilter(action.name)}
						/>
					))}
				</StyledSpeedDial>
			</div>
			<div className="card-container">
				{filteredRecipes.map(recipe => (
					<RecipeCard recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeGrid;