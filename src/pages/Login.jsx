import {
	Form,
	Link,
	useSearchParams,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";
import React from "react";
import axios from "axios";
import "./Login.css";
import logo from "../assets/logo.svg";
import Alert from "@mui/material/Alert";
import { useReducer } from "react";

const Login = () => {
	const [searchParams] = useSearchParams();
	const isLogin = searchParams.get("mode") === "login";
	const data = useActionData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	let isFormValid = true;

	const isPasswordValid = (inputString) => {
		const hasCapitalLetter = /[A-Z]/.test(inputString);
		const hasSmallLetter = /[a-z]/.test(inputString);
		const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(inputString);
		const isLengthValid = inputString.length > 6;
		return (
			hasCapitalLetter && hasSmallLetter && hasSpecialCharacter && isLengthValid
		);
	};

	const initialState = {
		value: "",
		isTouched: false,
		isValid: false,
	};

	const inputReducer = (state, action) => {
		switch (action.type) {
		case "INPUT":
			return {
				value: action.value,
				isTouched: state.isTouched,
				isValid: action.value.length > 0,
			};
		case "BLUR":
			return {
				value: state.value,
				isTouched: true,
				isValid: state.isValid,
			};
		case "PASSWORD":
			return {
				value: action.value,
				isTouched: state.isTouched,
				isValid: isPasswordValid(action.value),
			};
		}
		return initialState;
	};

	const [firstNameState, firstNameDispatch] = useReducer(
		inputReducer,
		initialState
	);
	const [lastNameState, lastNameDispatch] = useReducer(
		inputReducer,
		initialState
	);
	const [usernameState, usernameDispatch] = useReducer(
		inputReducer,
		initialState
	);
	const [passwordState, passwordDispatch] = useReducer(
		inputReducer,
		initialState
	);

	if (!isLogin) {
		isFormValid =
      firstNameState.isValid &&
      lastNameState.isValid &&
      usernameState.isValid &&
      passwordState.isValid;
	}
	else {
		isFormValid = true;
	}

	return (
		<div className="Login">
			<div className="Login__contents">
				<div className="Login__contents-container">
					<div className="Login__form">
						<img src={logo}></img>
						<h4 className="Login__slogan">Find your taste</h4>
						<h3 className="Login__form-title">
							{isLogin ? "Login" : "Register"}
						</h3>
						{data && data.data.error && (
							<Alert severity="error" variant="filled">
								{data.data.error}
							</Alert>
						)}
						<Form className="Login__form-fields" method="post">
							{!isLogin && (
								<>
									<input
										id="firstName"
										type="text"
										name="firstName"
										placeholder="First Name"
										onChange={(e) =>
											firstNameDispatch({
												type: "INPUT",
												value: e.target.value,
											})
										}
										onBlur={() => firstNameDispatch({ type: "BLUR" })}
									></input>
								</>
							)}
							{!isLogin && (
								<>
									<input
										id="lastName"
										type="text"
										name="lastName"
										placeholder="Last Name"
										onChange={(e) =>
											lastNameDispatch({
												type: "INPUT",
												value: e.target.value,
											})
										}
										onBlur={() => lastNameDispatch({ type: "BLUR" })}
									></input>
								</>
							)}
							<input
								id="username"
								type="username"
								name="username"
								placeholder="Username"
								onChange={(e) =>
									usernameDispatch({
										type: "INPUT",
										value: e.target.value,
									})
								}
								onBlur={() => usernameDispatch({ type: "BLUR" })}
							></input>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								onChange={(e) =>
									passwordDispatch({
										type: "PASSWORD",
										value: e.target.value,
									})
								}
								onBlur={() => passwordDispatch({ type: "BLUR" })}
							></input>
							{!isLogin && !firstNameState.isValid && firstNameState.isTouched && (
								<Alert className="Login__alert" severity="info" color="error">
                  First name may not be empty
								</Alert>
							)}
							{!isLogin && !lastNameState.isValid && lastNameState.isTouched && (
								<Alert className="Login__alert" severity="info" color="error">
                  Last name may not be empty
								</Alert>
							)}
							{!isLogin && !usernameState.isValid && usernameState.isTouched && (
								<Alert className="Login__alert" severity="info" color="error">
                  Username may not be empty
								</Alert>
							)}
							{!isLogin && !passwordState.isValid && passwordState.isTouched && (
								<Alert className="Login__alert" severity="info" color="error">
                  Password must contain :{" "}
									<ul>
										<li>Six or more characters</li>
										<li>A special character</li>
										<li>An uppercase letter</li>
										<li>A lowercase letter</li>
									</ul>
								</Alert>
							)}
							<button type="submit" disabled={!isFormValid}>
								{isSubmitting
									? isLogin
										? "Logging in"
										: "Signing up"
									: isLogin
										? "Log in"
										: "Sign up"}
							</button>
							<h3 className="Login__toggle-mode-text">
								{isLogin
									? "Don't have an account ? "
									: "Already have an account ? "}
								<Link
									className="Login__href"
									to={`?mode=${isLogin ? "signup" : "login"}`}
								>
									{isLogin ? "Sign up" : "Login"}
								</Link>
							</h3>
						</Form>
					</div>
				</div>
			</div>
			<div className="Login__backgroundblur"></div>
		</div>
	);
};

export default Login;

export const action = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get("mode") || "signup";
	const data = await request.formData();
	const authData = {
		firstName: data.get("firstName"),
		lastName: data.get("lastName"),
		username: data.get("username"),
		password: data.get("password"),
	};
	const res = await axios.post(`http://localhost:4000/account/${mode}`, authData);

	if (res.data.error) {
		return res;
	}

	if (res.data.accessToken) {
		localStorage.setItem("accessToken", res.data.accessToken);
		localStorage.setItem("refreshToken", res.data.refreshToken);
		localStorage.setItem("username", res.data.username);
		return redirect("/home");
	}
};