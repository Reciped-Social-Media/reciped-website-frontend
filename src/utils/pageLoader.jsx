import axios from "axios";
import { redirect } from "react-router-dom";

export async function pageLoader(route) {
	const currentUrl = window.location.href;
	if (!currentUrl.includes("cookbook")) {
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 500);
		});
	}
	let accessToken = localStorage.getItem("accessToken");
	const res = await axios.get(`http://localhost:4000/${route}`, {
		headers: {
			Authorisation: `Bearer ${accessToken}`,
		},
	});
	if (res.data.error) {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			throw Error("Not authorized to view this page");
		}
		else {
			const response = await axios.post("http://localhost:4000/token", {
				refreshToken,
			});
			accessToken = response.data.accessToken;
			localStorage.setItem("accessToken", accessToken);
			return redirect(currentUrl);
		}
	}
	return res.data;
}
