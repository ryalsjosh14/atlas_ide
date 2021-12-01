import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import DnDTemplate from "./DnDTemplate";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import axios from "axios";

let itemsFromBackend = [];

function Recipe() {
	let IF_block = {
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
	let OR_block = {
		["Service"]: {
			name: "Services",
			items: itemsFromBackend,
		},
		["OR"]: {
			name: "OR",
			items: [],
		},
	};
	const baseUrl = "http://localhost:5000";

	useEffect(() => {
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/allServices", options)
			.then((response) => response.json())
			.then((data) => {
				let temp = [];
				console.log(data);
				for (const x of data) {
					temp.push({
						id: uuidv4(),
						Name: x.Name,
						IP_ADDRESS: x.IP_ADDRESS,
						Space_ID: x.Space_ID,
						Thing_ID: x.Thing_ID,
					});
				}
				IF_block["Service"].items = temp;
				OR_block["Service"].items = temp;
				itemsFromBackend = temp;
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	}, []);

	const [columns, setColumns] = useState();
	const [flag, setFlag] = useState("");
	const [AppName, setAppName] = useState("");
	const Clear = () => {
		if (flag == "if") {
			setColumns(IF_block);
		} else if (flag == "or") {
			setColumns(OR_block);
		}
	};
	const setBlock = (block, flag) => {
		setFlag(flag);
		setColumns(block);
	};
	const Finalize = () => {
		if (flag == "if") {
			const param = {
				AppName: AppName,
				if: columns["IF"].items,
				then: columns["THEN"].items,
			};
			axios
				.post("http://localhost:5000/if_then", param)
				.then((response) => console.log(response));
		} else if (flag == "or") {
			const params = {
				AppName: AppName,
				or: columns["OR"].items,
			};
			axios
				.post("http://localhost:5000/or", params)
				.then((response) => console.log(response));
		}

		console.log("Finalize");
	};
	const handleChange = (evt) => {
		setAppName(evt.target.value);
	};
	let DND =
		flag != "" ? (
			<div>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>App Name</Form.Label>
						<Form.Control
							onChange={handleChange}
							type="name"
							placeholder="Enter App Name"
						/>
					</Form.Group>
				</Form>

				<DnDTemplate columns={columns} setColumns={setColumns} />
				<div style={{ padding: 10 }}>
					<Button variant="danger" onClick={Clear} style={{ margin: 10 }}>
						Clear
					</Button>
					<Button variant="success" onClick={Finalize}>
						Finalize
					</Button>
				</div>
			</div>
		) : null;

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
			{DND}
		</div>
	);
}

export default Recipe;
