import axios from "axios";

async function tryGetRequest(path) {
	const options = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	};
	let res;
	try {
		res = await axios.get(`http://localhost:4000/${path}`, options);
	}
	catch (err) {

		res = err.response;
	}
	return res;
}

async function tryPostRequest(path, body) {
	const options = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	};
	let res;
	try {
		res = await axios.post(`http://localhost:4000/${path}`, body, options);
	}
	catch (err) {
		res = err.response;
	}
	return res;
}

export async function getRequest(path) {
	let res = await tryGetRequest(path);
	let retries = 0;
	while (retries < 3 && res.status === 403) {
		retries++;
		await refreshSession();
		res = await tryGetRequest(path);
	}
	return res;
}

export async function postRequest(path, body) {
	let res = await tryPostRequest(path, body);
	let retries = 0;
	while (retries < 3 && res.status === 403) {
		retries++;
		await refreshSession();
		res = await tryPostRequest(path, body);
	}
	return res;
}

export async function refreshSession() {
	const sessionId = localStorage.getItem("sessionId");
	const refreshToken = localStorage.getItem("refreshToken");
	const res = await axios.post("http://localhost:4000/account/refresh-session", {
		sessionId,
		refreshToken,
	});
	localStorage.setItem("refreshToken", res.data.refreshToken);
	localStorage.setItem("accessToken", res.data.accessToken);
}