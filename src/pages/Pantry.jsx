import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./Pantry.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import userIcon from "../assets/icons/user.svg";
import searchIcon from "../assets/icons/SearchIcon.svg";
import pinIcon from "../assets/icons/Pin.svg";
import crossIcon from "../assets/icons/Cross.svg";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import timeout from "../utils/timeout.js";

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

const innerIconSx = { width: 30, height: 30, color: "white" };

const Pantry = () => {
	const accessToken = localStorage.getItem("accessToken");
	const headers = {
		Authorization: `Bearer ${accessToken}`,
	};
	const data = useLoaderData();
	const username = localStorage.getItem("username");
	const [searchQuery, setSearchQuery] = useState("");
	const [addIngredient, setAddIngredient] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isAddLoading, setIsAddLoading] = useState(false);
	const [isAddSuccess, setisAddSuccess] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [alertCaption, setAlertCaption] = useState("");
	const [unit, setUnits] = useState("unit");
	const [amount, setAmount] = useState("");
	const [storage, setStorage] = useState("Fridge");

	const handleUnitChange = (event) => {
		setUnits(event.target.value);
	};

	const handleAmountChange = (event) => {
		setAmount(event.target.value);
	};

	const handleStorageChange = (event) => {
		setStorage(event.target.value);
	};

	const handleSelect = (name, id) => {
		setSearchQuery(name);
		setSearchResults(null);
		setIsSearching(false);
		setAddIngredient({ name: name, id: id });
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSubmit();
			return;
		}
	};

	const handleSubmit = async () => {
		setSearchResults(null);
		setIsSearching(true);
		setIsLoading(true);
		const query = searchQuery;
		setSearchQuery("");
		const res = await axios.get(`http://localhost:4000/pantry/search?name=${query}`, { headers });
		setIsLoading(false);
		setSearchResults(res.data);
	};

	const handleIngredientAdd = async () => {
		setIsAdding(true);
		setIsAddLoading(true);
		const sendData = {
			ingredientId: addIngredient.id,
			storage,
			unit,
			amount,
		};
		const res = await axios.post("http://localhost:4000/pantry/add", sendData, { headers });
		if (!res.data.error) {
			setIsAddLoading(false);
			setAlertCaption("added");
			setisAddSuccess(true);
			await timeout(3000);
			setIsAdding(false);
			setisAddSuccess(false);
		}
	};

	const handleIngredientRemove = async (id) => {
		setIsAdding(true);
		setIsAddLoading(true);
		const response = await axios.get(`http://localhost:4000/pantry/remove?ingredientId=${id}`, { headers });
		if (!response.data.error) {
			setIsAddLoading(false);
			setAlertCaption("removed");
			setisAddSuccess(true);
			await timeout(3000);
			setIsAdding(false);
			setisAddSuccess(false);
		}
		else {
			console.log(response.data.error);
		}
	};

	const fridgeData = data.filter(ing => ing.storage === "Fridge");
	const freezerData = data.filter(ing => ing.storage === "Freezer");
	const pantryData = data.filter(ing => ing.storage === "Pantry");

	return (
		<div className="pantry-background">
			<div className="pantry-filter-bar">
				<div className="pantry-search-field">	<div className="pantry-add">
					<div className="pantry-search-bar">
						<img src={searchIcon} width={20}></img>
						<input type="text" placeholder="search" onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyPress} value={searchQuery}></input>
					</div>
					{isSearching && <div className="item-results">
						<div className="list">
							{searchResults && searchResults.map(item => (
								<div className="ingredient-result" onClick={() => handleSelect(item.name, item.id)}><p>{item.name}</p><AddBoxIcon/></div>
							))}
							{isLoading && <h3>Searching...</h3>}
						</div>
					</div>
					}
				</div>
				<div className="units-add">
					<FormControl sx={{ minWidth: 70, boxShadow: "0 0 5px 0 black", marginRight: 1 }}>
						<Select
							value={storage}
							id="unit"
							onChange={handleStorageChange}
							sx={{ backgroundColor: "#6c9eba", border: "2px solid white", color: "white", "&.Mui-focused": {
								outline: "none",
							} }}
						>
							<MenuItem value='Fridge'>Fridge</MenuItem>
							<MenuItem value='Freezer'>Freezer</MenuItem>
							<MenuItem value='Pantry'>Pantry</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ minWidth: 70, boxShadow: "0 0 5px 0 black" }}>
						<Select
							value={unit}
							id="unit"
							onChange={handleUnitChange}
							sx={{ backgroundColor: "#6c9eba", border: "2px solid white", color: "white", "&.Mui-focused": {
								outline: "none",
							} }}
						>
							<MenuItem value='unit'>unit</MenuItem>
							<MenuItem value='pc'>pc</MenuItem>
							<MenuItem value='g'>g</MenuItem>
							<MenuItem value='ml'>ml</MenuItem>
						</Select>
					</FormControl>
					<input type="text" className="unit-value" placeholder="value" onChange={handleAmountChange} value={amount}></input>
					<ColorButton
						endIcon={<AddBoxIcon />}
						onClick={handleIngredientAdd}
					>
					</ColorButton>
				</div></div>
				<div className="pantry-username">
					<img src={userIcon} width={30}></img>
					<h2>{username}</h2>
				</div>
			</div>
			<div className="pantry-content">
				<div className="pantry-items">
					<div className="pantry-item-grid">
						<div className="storage-title"><DoorSlidingIcon sx={innerIconSx}/><h4>Pantry</h4></div>
						{pantryData.map(ing => (
							<div className="pantry-ingredient"><img src ={pinIcon} className="pin"></img><p>{ing.name}</p><div className="ing-unit">{ing.amount} {ing.unit}</div><img src={crossIcon} className="cross" onClick={() => handleIngredientRemove(ing.ingredientId)}></img></div>
						))}
					</div>
				</div>
				<div className="pantry-items">
					<div className="pantry-item-grid">
						<div className="storage-title"><AcUnitIcon sx={innerIconSx}/><h4>Freezer</h4></div>
						{freezerData.map(ing => (
							<div className="pantry-ingredient"><img src ={pinIcon} className="pin"></img><p>{ing.name}</p><div className="ing-unit">{ing.amount} {ing.unit}</div><img src={crossIcon} className="cross" onClick={() => handleIngredientRemove(ing.ingredientId)}></img></div>
						))}
					</div>
				</div>
				<div className="pantry-items">
					<div className="pantry-item-grid">
						<div className="storage-title"><KitchenIcon sx={innerIconSx}/><h4>Fridge</h4></div>
						{fridgeData.map(ing => (
							<div className="pantry-ingredient"><img src ={pinIcon} className="pin"></img><p>{ing.name}</p><div className="ing-unit">{ing.amount} {ing.unit}</div><img src={crossIcon} className="cross" onClick={() => handleIngredientRemove(ing.ingredientId)}></img></div>
						))}
					</div>
				</div>
			</div>
			{isAdding && <div className="pantry-blur">
				<div className="pantry-loader">
					{isAddLoading && <Loader/>}
					{isAddSuccess && !isAddLoading && <ThemeProvider theme={theme}><Alert severity="success" variant="filled" color="primary" sx={{ color: "white" }}>
						<AlertTitle>Success</AlertTitle>
        Your ingredient was successfully {alertCaption} — <strong>Refresh to check it out!</strong>
					</Alert></ThemeProvider>}
				</div>
			</div>}
		</div>
	);
};
export default Pantry;
