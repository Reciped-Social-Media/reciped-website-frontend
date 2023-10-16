import { useEffect, useState } from "react";
import PostRow from "../components/Explore/PostRow";
import fireIcon from "../assets/icons/Fire.svg";
import { useLoaderData } from "react-router-dom";
import RecipeSearchBar from "../components/Recipe/RecipeSearchBar";
import "./Explore.css";

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
			<PostRow title="New Posts" icon={fireIcon} recipes={newPosts}/>
			<PostRow title="Curated Posts" icon={fireIcon} recipes={curatedPosts}/>
			<PostRow title="Breakfast" icon={fireIcon} recipes={breakfastPosts}/>
			<PostRow title="Lunch" icon={fireIcon} recipes={lunchPosts}/>
			<PostRow title="Dinner" icon={fireIcon} recipes={dinnerPosts}/>
			<PostRow title="Dessert" icon={fireIcon} recipes={dessertPosts}/>
		</div>
	);
};

export default Explore;
