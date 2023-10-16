import { useLoaderData } from "react-router-dom";
import Calender from "../components/Calender/Calender";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CakeIcon from "@mui/icons-material/Cake";
import userIcon from "../assets/icons/user.svg";
import breadLogo from "../assets/icons/bread.svg";
import pizzaLogo from "../assets/icons/PizzaWhite.svg";
import dinnerLogo from "../assets/icons/Cocktail.svg";
import shortCakeLogo from "../assets/icons/ShortCake.svg";
import MealCard from "../components/Meal/MealCard";
import { useState } from "react";
import dayjs from "dayjs";
import "./Planner.css";

const mapper = [
	{
		icon: <WbTwilightIcon/>,
		mealLogo: breadLogo,
		time: "Breakfast",
	},
	{
		icon: <LunchDiningIcon/>,
		mealLogo: pizzaLogo,
		time: "Lunch",
	}, {
		icon: <DarkModeIcon/>,
		mealLogo: dinnerLogo,
		time: "Dinner",
	}, {
		icon: <CakeIcon/>,
		mealLogo: shortCakeLogo,
		time: "Dessert",
	},
];

const Planner = () => {
	const data = useLoaderData();
	const [date, setDate] = useState(dayjs());
	const cookbookRecipes = data.cookbook;
	const plannerRecipes = data.planner;
	const handleChange = (newVal) => {
		setDate(newVal);
	};
	const username = localStorage.getItem("username");
	const todayRecipes = plannerRecipes.filter(rec => dayjs(rec.date).isSame(date, "day"));
	return (
		<div className="planner-background">
			<div className="planner-content">
				<div className="planner-username">
					<img src={userIcon} width={30}></img>
					<h2>{username}</h2>
				</div>
				<Calender value={date} handleChange={handleChange}/>
				<div className="day-grid">
					{mapper.map(meal => {
						const recipe = todayRecipes.filter(rec => rec.time === meal.time);
						console.log(recipe);
						return <MealCard title={recipe.length < 1 ? null : recipe[0].title} timeIcon={meal.icon} mealLogo={meal.mealLogo} source={recipe.length < 1 ? null : recipe[0].source} time={meal.time} cookbook={cookbookRecipes.filter(rec => rec.category === meal.time)} date={date} id={recipe.length < 1 ? null : recipe[0].id}/>;
					})}
				</div>
			</div>
		</div>
	);
};
export default Planner;
