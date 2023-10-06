import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chef from "./pages/Chef";
import Cookbook from "./pages/Cookbook";
import ErrorPage from "./pages/Error";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import List from "./pages/List";
import Login, { action as FormAction } from "./pages/Login";
import Pantry from "./pages/Pantry";
import Planner from "./pages/Planner";
import Root from "./pages/Root";
import { pageLoader } from "./utils/pageLoader";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage/>,
		children: [
			{ index: true, element: <Login />, action: FormAction },
			{
				path: "home",
				element: <Home />,
				children: [
					{ path: "cookbook", element: <Cookbook />, loader: () => pageLoader("cookbook") },
					{ index: true, element: <Explore />, loader: () => pageLoader("explore") },
					{ path: "chef", element: <Chef />, loader: () => pageLoader("chef") },
					{ path: "list", element: <List />, loader: () => pageLoader("list") },
					{ path: "pantry", element: <Pantry />, loader: () => pageLoader("pantry") },
					{ path: "planner", element: <Planner />, loader: () => pageLoader("mealplan") },
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
