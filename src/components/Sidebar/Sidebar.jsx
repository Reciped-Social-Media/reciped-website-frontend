import logo from "../../assets/logo.svg";
import cookbook from "../../assets/icons/cookbook.svg";
import explore from "../../assets/icons/search.svg";
import chef from "../../assets/icons/personal_chef.svg";
import pantry from "../../assets/icons/pantry.svg";
import planner from "../../assets/icons/calendar.svg";
import logout from "../../assets/icons/logout.svg";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SidebarButton = ({ icon, path, text, selected }) => {
	return (
		<Link to={path} className={selected ? "Sidebar__button Sidebar__button-selected" : "Sidebar__button"}>
			<img src={icon} height="15px" alt="icon" />
			<text className="Sidebar__button-text">{text}</text>
		</Link>
	);
};

const Sidebar = () => {
	async function handleLogout() {
		const refreshToken = localStorage.getItem("refreshToken");
		await axios.post("http://localhost:4000/logout", { refreshToken });
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}
	return (
		<div className="Sidebar">
			<div>
				<img className="Sidebar__logo" src={logo} alt="logo" />
			</div>
			<div className="Sidebar__buttons">
				<div className="Sidebar__buttons-pages">
					<SidebarButton
						icon={cookbook}
						path="/home/cookbook"
						text="Cookbook"
						selected={window.location.pathname === "/home/cookbook"}
					/>
					<SidebarButton
						icon={explore}
						path="/home"
						text="Explore"
						selected={window.location.pathname === "/home"}
					/>
					<SidebarButton
						icon={chef}
						path="/home/chef"
						text="Chef"
						selected={window.location.pathname === "/home/chef"}
					/>
					<SidebarButton
						icon={pantry}
						path="/home/pantry"
						text="Pantry"
						selected={window.location.pathname === "/home/pantry"}
					/>
					<SidebarButton
						icon={planner}
						path="/home/planner"
						text="Meal Planner"
						selected={window.location.pathname === "/home/planner"}
					/>
				</div>
				<div className="Sidebar__buttons-logout">
					<a href="/" className="Sidebar__button-logout">
						<img src={logout} alt="icon" />
						<text className="Sidebar__button-logout-text" onClick={handleLogout}>Logout</text>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;