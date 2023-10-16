import axios from "axios";
import { redirect } from "react-router-dom";
import { getRequest } from "./request";

export async function pageLoader(route) {
	const res = await getRequest(route);
	return res.data;
}
