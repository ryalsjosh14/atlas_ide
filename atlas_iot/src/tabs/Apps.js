import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const itemsFromBackend = [
	{ Name: "App1", Status: "success", Action: "Activate" },
	{ Name: "App2", Status: "success", Action: "Activate" },
	{ Name: "App3", Status: "success", Action: "Activate" },
	{ Name: "App4", Status: "success", Action: "Activate" },
	{ Name: "App5", Status: "success", Action: "Activate" },
	{ Name: "App6", Status: "success", Action: "Activate" },
	{ Name: "App7", Status: "success", Action: "Activate" },
];

function Apps() {
	const [Apps, setApps] = useState(itemsFromBackend);
	const [show, setShow] = useState(false);

	const handleActivateClick = (Action, index) => {
		const tempApps = [...Apps];
		console.log(Array.isArray(tempApps));
		if (Action == "Activate") {
			tempApps[index].Status = "warning";
			tempApps[index].Action = "Stop";
			console.log(Array.isArray(tempApps));

			setApps(tempApps);
		} else {
			tempApps[index].Status = "success";
			tempApps[index].Action = "Activate";
			setApps(tempApps);
		}
		console.log(typeof Apps);
	};
	console.log(Apps);
	const handleDeleteClick = (index) => {
		const tempApps = [...Apps];
		tempApps.splice(index, 1);
		setApps(tempApps);

		console.log("write acios request");
		// TODO: Write axios request
	};
	const handleSaveClick = (index) => {
		console.log("write acios request");
		// TODO: Write axios request
	};

	const x = Apps.map((el, index) => {
		return (
			<div key={el.name}>
				<Card>
					<Card.Body style={{ display: "flex", flexDirection: "row" }}>
						<Card.Title style={{ flex: 1, margin: 10 }}>{el.Name}</Card.Title>

						<Button
							variant={el.Status}
							style={{ flex: 1, margin: 10 }}
							onClick={() => handleActivateClick(el.Action, index)}
						>
							{el.Action}
						</Button>

						<Button
							variant="danger"
							style={{ flex: 1, margin: 10 }}
							onClick={() => handleDeleteClick(el)}
						>
							Delete
						</Button>
						<Button
							variant="primary"
							style={{ flex: 1, margin: 10 }}
							onClick={() => handleSaveClick(el)}
						>
							Save
						</Button>
						<Button
							variant="secondary"
							style={{ flex: 1, margin: 10 }}
							onClick={() => handleLogClick(el)}
						>
							Log
						</Button>
						<Button
							variant="dark"
							style={{ flex: 1, margin: 10 }}
							onClick={() => handleSaveClick(el)}
						>
							Output
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	});
	const handleClose = () => setShow(false);
	const handleLogClick = () => setShow(true);
	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Log</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ol>
						<li>1:07: Started App1</li>
						<li>1:10: Started App2</li>
						<li>1:11: Started App3</li>
						<li>1:12: Started App4</li>
						<li>1:13: Started App5</li>
						<li>1:17: Ended App1</li>
						<li>1:20: Ended App2</li>
						<li>1:21: Ended App3</li>
						<li>1:22: Ended App4</li>
						<li>1:23: Ended App5</li>
					</ol>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>Upload File</Form.Label>
				<Form.Control type="file" />
			</Form.Group>
			{x}
		</div>
	);
}

export default Apps;
