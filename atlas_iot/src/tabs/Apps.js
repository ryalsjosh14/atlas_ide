import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import "./Apps.css";
import DnDTemplate from "./DnDTemplate";
import Dropdown from "react-bootstrap/Dropdown";

const itemsFromBackend = [
	{ id: uuidv4(), content: "Service 1" },
	{ id: uuidv4(), content: "Service 2" },
	{ id: uuidv4(), content: "Service 3" },
	{ id: uuidv4(), content: "Service 4" },
	{ id: uuidv4(), content: "Service 5" },
	{ id: uuidv4(), content: "Service 6" },
	{ id: uuidv4(), content: "Service 7" },
	{ id: uuidv4(), content: "Service 8" },
	{ id: uuidv4(), content: "Service 9" },
	{ id: uuidv4(), content: "Service 10" },
];

const IF_block = {
	["Service"]: {
		name: "Services",
		items: itemsFromBackend,
	},
	["IF"]: {
		name: "IF",
		items: [],
	},
	["THEN"]: {
		name: "THEN",
		items: [],
	},
};
const OR_block = {
	["Service"]: {
		name: "Services",
		items: itemsFromBackend,
	},
	["OR"]: {
		name: "OR",
		items: [],
	},
};

function App() {
	const [columns, setColumns] = useState(IF_block);
	const [flag, setFlag] = useState("if");

	const Clear = () => {
		if (flag == "if") {
			setColumns(IF_block);
		} else {
			setColumns(OR_block);
		}
	};
	const setBlock = (block, flag) => {
		setFlag(flag);
		setColumns(block);
	};
	const Finalize = () => {
		console.log("Finalize");
	};

	return (
		<div>
			<Dropdown style={{ padding: 30 }}>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Select Template
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={() => setBlock(IF_block, "if")}>
						IF THEN BLOCK
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setBlock(OR_block, "or")}>
						OR BLOCK
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<DnDTemplate columns={columns} setColumns={setColumns} />
			<div style = {{padding:10}}>
				<Button variant="danger" onClick={Clear}>
					Clear
				</Button>
			</div>
			<div>
				<Button variant="success" onClick={Finalize}>
					Finalize
				</Button>
			</div>
		</div>
	);
}

export default App;
