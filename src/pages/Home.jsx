import { Outlet, useNavigation } from "react-router-dom";
import { Sidebar, Loader } from "../components";
import "./Home.css";

const Home = () => {
	const navigation = useNavigation();
	const isNavigating = navigation.state == "loading";
	return (
		<div className="Home">
			<Sidebar/>
			<div className="Home__contents">
				{!isNavigating && <Outlet/>}
				{isNavigating && <div className="Loader"><Loader/></div>}
			</div>
		</div>
	);
};
export default Home;
