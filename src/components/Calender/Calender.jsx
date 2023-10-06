import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./Calender.css";


const Calender = (props) => {

	const customStyles = {
		width: "fit-content",
		height: "fit-content",
		padding: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& .MuiPickersCalendarHeader-label": {
			color: "white",
			fontSize: "24px",
		},
		"& .MuiPickersDay-root": {
			color: "white",
			fontSize: "18px",
		},
		"& .Mui-selected": {
			color: "#6c9eba",
			backgroundColor: "white",
		},
		"& .Mui-selected:focus": {
			backgroundColor: "white",
		},
		"& .Mui-selected:hover": {
			backgroundColor: "white",
		},
		"& .MuiPickersWeekDay-dayLabel": {
			color: "white",
			fontSize: "18px",
		},
		"& .MuiTypography-root": {
			color: "white",
			fontSize: "20px",
		},
	};
	return (<div className="cal-container">
		<div className="cal-background">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar views={["day"]} sx={customStyles} value={props.value} onChange={(newVal) => props.handleChange(newVal)}/>
			</LocalizationProvider>
		</div>
	</div>);
};

export default Calender;