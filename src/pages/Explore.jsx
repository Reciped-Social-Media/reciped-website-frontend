import { useEffect, useState } from "react";
import PostRow from "../components/Explore/PostRow";
import fireIcon from "../assets/icons/Fire.svg";
import tickIcon from "../assets/icons/tick.svg";
import clockIcon from "../assets/icons/clock.svg";
import breakfastIcon from "../assets/icons/Sun.svg";
import lunchIcon from "../assets/icons/Pizza.svg";
import dinnerIcon from "../assets/icons/Moon.svg";
import dessertIcon from "../assets/icons/iceCream.svg";
import { useLoaderData } from "react-router-dom";
import RecipeSearchBar from "../components/Recipe/RecipeSearchBar";
import "./Explore.css";
import { Icecream } from "@mui/icons-material";

const Explore = () => {
	const data = useLoaderData();
	const [hotPosts, setHotPosts] = useState([]);
	const [newPosts, setNewPosts] = useState([]);
	const [curatedPosts, setCuratedPosts] = useState([]);
	const [breakfastPosts, setBreakfastPosts] = useState([]);
	const [lunchPosts, setLunchPosts] = useState([]);
	const [dinnerPosts, setDinnerPosts] = useState([]);
	const [dessertPosts, setDessertPosts] = useState([]);

	useEffect(() => {
		setHotPosts(data.hot);
		setNewPosts(data.new);
		setCuratedPosts(data.curated);
		setBreakfastPosts(data.breakfast);
		setLunchPosts(data.lunch);
		setDinnerPosts(data.dinner);
		setDessertPosts(data.dessert);
	}, []);

	return (
		<div className="Explore">
			<div className="Explore__searchbar"><RecipeSearchBar /></div>
			<PostRow title="What's Hot" icon={fireIcon} recipes={hotPosts}/>
			<PostRow title="Just In" icon={clockIcon} recipes={newPosts}/>
			<PostRow title="Our Picks" icon={tickIcon} recipes={curatedPosts}/>
			<PostRow title="Breakfast" icon={breakfastIcon} recipes={breakfastPosts}/>
			<PostRow title="Lunch" icon={lunchIcon} recipes={lunchPosts}/>
			<PostRow title="Dinner" icon={dinnerIcon} recipes={dinnerPosts}/>
			<PostRow title="Dessert" icon={dessertIcon} recipes={dessertPosts}/>
		</div>
	);
};

export default Explore;
