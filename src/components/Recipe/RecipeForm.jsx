import { Form } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const RecipeForm = () => {
	return (
		<Form>
			<h4>Add a Reciped</h4>
			<FormControlLabel control={<Switch inputProps={{ "aria-label": "controlled" }}/>} label="Public" />
		</Form>
	);
};

export default RecipeForm;