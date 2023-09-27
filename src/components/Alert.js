import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertTitle from "@mui/material/AlertTitle";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6c9eba",
		},
	},
});

export const Alert = ({ title, caption, severity }) => {
	return (<ThemeProvider theme={theme}>
		<Alert
			severity={severity}
			variant="filled"
			color="primary"
			sx={{ color: "white" }}
		>
			<AlertTitle>{title}</AlertTitle>
			{caption} —{" "}
			<strong>Go check it out!</strong>
		</Alert>
	</ThemeProvider>);
};