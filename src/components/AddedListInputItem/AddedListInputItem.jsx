import React from "react";
import { Close } from "@mui/icons-material";
import "./AddedListInputItem.css";


const AddedListInputItem = ({ item, index, removeItem }) => {
	return (
		<div className="AddedListInputItem__ListInputItem">
			<div className="AddedListInputItem__ListInputItem-value">{item}</div>
			{index >= 0 && (
				<Close onClick={() => removeItem(index)} style={{ cursor: "pointer", color: "lightcoral" }}/>
			)}
		</div>
	);
};

export default AddedListInputItem;