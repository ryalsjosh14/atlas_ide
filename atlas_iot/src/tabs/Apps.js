import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// const itemsFromBackend = [
// 	{ Name: "App1", Status: "success", Action: "Activate" },
// 	{ Name: "App2", Status: "success", Action: "Activate" },
// 	{ Name: "App3", Status: "success", Action: "Activate" },
// 	{ Name: "App4", Status: "success", Action: "Activate" },
// 	{ Name: "App5", Status: "success", Action: "Activate" },
// 	{ Name: "App6", Status: "success", Action: "Activate" },
// 	{ Name: "App7", Status: "success", Action: "Activate" },
// ];

function Apps() {
	const [Apps, setApps] = useState();
	const [selectedFile, setSelectedFile] = useState();
	const baseUrl = "http://localhost:5000";

	useEffect(() => {
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/getApps", options)
			.then((response) => response.json())
			.then((data) => {
				let temp = [];
				let apps = data.Applications;
				for (const x of apps) {
					temp.push({
						Name: x,
						Status: "success",
						Action: "Activate",
					});
				}
				console.log(temp);
				setApps(temp);
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	}, []);
	const handleUploadClick = (index) => {
		const formData = new FormData();
		formData.append("file", selectedFile);

		axios
			.post("http://localhost:5000/upload_file", formData)
			.then((response) => console.log(response));
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/getApps", options)
			.then((response) => response.json())
			.then((data) => {
				let temp = [];
				let apps = data.Applications;
				for (const x of apps) {
					temp.push({
						Name: x,
						Status: "success",
						Action: "Activate",
					});
				}
				console.log(temp);
				setApps(temp);
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	};

	const handleActivateClick = (Action, index) => {
		const tempApps = [...Apps];
		if (Action === "Activate") {
			tempApps[index].Status = "warning";
			tempApps[index].Action = "Stop";

			setApps(tempApps);
			const param = {
				AppName: tempApps[index].Name,
			};
			console.log(param);

			axios.post("http://localhost:5000/executeApp", param).then((response) => {
				tempApps[index].Log = response.data.log;
				tempApps[index].Result = response.data.Result;

				setApps(tempApps);
			});
		}
	};
	const handleDeleteClick = (index) => {
		const tempApps = [...Apps];
		const name = tempApps.splice(index, 1)[0].Name;
		console.log(name);
		setApps(tempApps);

		const param = {
			AppName: name,
		};
		console.log(param);
		axios
			.post("http://localhost:5000/deleteApp", param)
			.then((response) => console.log(response));
	};
	const handleSaveClick = (name) => {
		axios({
			url: "http://localhost:5000/save_file/" + name, //your url
			method: "GET",
			responseType: "blob", // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", name + ".json"); //or any other extension
			document.body.appendChild(link);
			link.click();
		});
		// axios.get().then((data) => {
		// 	console.log("this is data: ", data.data);
		// 	const link = document.createElement("a");
		// 	const url = URL.createObjectURL(data.data); //<---- this should be data.data
		// 	link.download = true;
		// 	link.href = url;
		// 	document.body.appendChild(link);
		// 	link.click();
		// 	document.body.removeChild(link);
		// });
	};
	const handleClose = (index) => {
		const tempApps = [...Apps];

		if (tempApps[index].Action === "Stop") {
			tempApps[index].Status = "success";
			tempApps[index].Action = "Activate";
			tempApps[index].Show = false;

			setApps(tempApps);
		}
	};
	const handleLogClick = (index) => {
		const tempApps = [...Apps];

		if (tempApps[index].Action === "Stop") {
			tempApps[index].Show = true;

			setApps(tempApps);
		}
	};

	const fileHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const x =
		Apps &&
		Apps.map((el, index) => {
			return (
				<div key={el.Name}>
					{el.Log && el.Result && (
						<Modal show={el.Show} onHide={() => handleClose(index)}>
							<Modal.Header closeButton>
								<Modal.Title>Output</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>{el.Result}</p>
							</Modal.Body>
							<Modal.Header>
								<Modal.Title>Log</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{el.Log.map((el) => (
									<p>{el}</p>
								))}
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={() => handleClose(index)}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					)}
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
								onClick={() => handleDeleteClick(index)}
							>
								Delete
							</Button>
							<Button
								variant="primary"
								style={{ flex: 1, margin: 10 }}
								onClick={() => handleSaveClick(el.Name)}
							>
								Save
							</Button>
							<Button
								variant="dark"
								style={{ flex: 1, margin: 10 }}
								onClick={() => handleLogClick(index)}
							>
								Output
							</Button>
						</Card.Body>
					</Card>
				</div>
			);
		});

	return (
		<div>
			<Form.Group controlId="formFile" className="mb-3" onChange={fileHandler}>
				<Form.Label>Upload File</Form.Label>
				<Form.Control type="file" />
				<Button variant="primary" type="submit" onClick={handleUploadClick}>
					Upload
				</Button>
			</Form.Group>
			{x}
		</div>
	);
}

export default Apps;
