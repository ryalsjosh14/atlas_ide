import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

let itemsFromBackend = {
	App1: { Status: "success", Action: "Activate" },
	App2: { Status: "success", Action: "Activate" },
	App3: { Status: "success", Action: "Activate" },
	App4: { Status: "success", Action: "Activate" },
	App5: { Status: "success", Action: "Activate" },
	App6: { Status: "success", Action: "Activate" },
	App7: { Status: "success", Action: "Activate" },
};

function Apps() {
	const [Apps, setApps] = useState(itemsFromBackend);

	const handleActivateClick = (e) => {
		console.log(e);
		// x = { _name: { Status: "warning", Action: "Stop" } };
		// setApps({ ...Apps, {x} });
	};
	let x = Object.entries(Apps).map(([el, val], index) => {
		return (
			<div key={el}>
				<Card>
					<Card.Body style={{ display: "flex", flexDirection: "row" }}>
						<Card.Title style={{ flex: 1, margin: 10 }}>{el}</Card.Title>

						<Button
							variant={val.Status}
							style={{ flex: 1, margin: 10 }}
							onClick={handleActivateClick}
						>
							{val.Action}
						</Button>

						<Button variant="danger" style={{ flex: 1, margin: 10 }}>
							Delete
						</Button>
						<Button variant="primary" style={{ flex: 1, margin: 10 }}>
							Save
						</Button>
						<Button variant="secondary" style={{ flex: 1, margin: 10 }}>
							Log
						</Button>
						<Button variant="dark" style={{ flex: 1, margin: 10 }}>
							Output
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	});
	return (
		<div>
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>Upload File</Form.Label>
				<Form.Control type="file" />
			</Form.Group>
			{x}
		</div>
	);
}

export default Apps;
