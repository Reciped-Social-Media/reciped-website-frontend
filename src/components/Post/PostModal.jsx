import postIcon from "../../assets/icons/Post.svg";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import captionIcon from "../../assets/icons/caption.svg";
import mealIcon from "../../assets/icons/meal.svg";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Loader from "../Loader/Loader";
import "./PostModal.css";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6c9eba",
		},
	},
});

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#6c9eba",
	},
	"& .MuiRating-iconHover": {
		color: "#d0c441",
	},
});

const PostModal = (props) => {
	const { title, id, category } = props.recipe;
	const [rating, setRating] = useState(0);
	const [caption, setCaption] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	console.log(props.recipe);

	const handlePost = async () => {
		setIsLoading(true);
		const accessToken = localStorage.getItem("accessToken");
		const username = localStorage.getItem("username");
		const data = { recipeId: id, rating, caption, username, category };
		const res = await axios.post("http://localhost:4000/post", data, {
			headers: {
				Authorisation: `Bearer ${accessToken}`,
			},
		});
		if (res.status === 200) {
			await axios.post("http://localhost:4000/togglePublic", { recipeId: id }, {
				headers: {
					Authorisation: `Bearer ${accessToken}`,
				},
			});
			setIsLoading(false);
			setIsSuccess(true);
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 3000);
			});
			props.handle();
		}
		else if (res.data.error) {
			setIsLoading(false);
			console.log(res.data.error);
		}
	};

	return (
		<>
			{!isLoading && !isSuccess && (
				<div className="Post">
					<div className="Post_title">
						<img src={postIcon} className="Post_icon"></img>
						<h1>Posting "{title}" ?</h1>
						<img src={postIcon} className="Post_icon"></img>
					</div>
					<div className="Post_image">
						<img src={mealIcon} width={200}></img>
					</div>
					<div className="Post_content">
						<div className="caption_box">
							<img src={captionIcon} width={60}></img>
							<input
								type="text"
								placeholder="Add your caption"
								className="Post_input"
								onBlur={(e) => setCaption(e.target.value)}
							></input>
						</div>
						<div className="Post_button_rating">
							<div className="Post_rating">
								<h4 className="Post_rate_title">Rating: </h4>
								<StyledRating
									name="half-rating"
									defaultValue={2.5}
									precision={0.5}
									size="large"
									onChange={(e, value) => setRating(value)}
								/>
							</div>
							<ThemeProvider theme={theme}>
								<span className="Post_button"></span>
								<span className="Post_button">
									<Button
										variant="contained"
										startIcon={<SendIcon />}
										className="Post_button"
										sx={{ ml: 2, color: "white" }}
										onClick={handlePost}
									>
                    Post
									</Button>
								</span>
							</ThemeProvider>
						</div>
					</div>
				</div>
			)}
			{isLoading && !isSuccess && <Loader/>}
			{isSuccess && <ThemeProvider theme={theme}><Alert severity="success" variant="filled" color="primary" sx={{ color: "white" }}>
				<AlertTitle>Success</AlertTitle>
        Your recipe was successfully posted — <strong>Go check it out!</strong>
			</Alert></ThemeProvider>}
		</>
	);
};

export default PostModal;
