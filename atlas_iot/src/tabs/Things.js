//imports
import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

export default function Things() {
	const baseUrl = "http://localhost:5000";

	const [things, setThings] = useState([]);

	const getThings = (event) => {
		event.preventDefault();
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/getThings", options)
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				setThings(JSON.parse(data));
				console.log(JSON.parse(data));
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	};
	const cards = things.map((t) => {
		return (
			<div style={{ padding: 10 }}>
				<Card
					style={{
						width: "20rem",
						padding: 20,
						borderRadius: 50,
					}}
				>
					<Card.Body>
						<Card.Title>{t.Thing_ID}</Card.Title>
					</Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroupItem>Space_ID: {t.Space_ID}</ListGroupItem>
						<ListGroupItem>Name: {t.Name}</ListGroupItem>
						<ListGroupItem>Vendor: {t.Vendor}</ListGroupItem>
						<ListGroupItem>Owner: {t.Owner}</ListGroupItem>
						<ListGroupItem>OS: {t.OS}</ListGroupItem>
						<ListGroupItem>Model: {t.Model}</ListGroupItem>
						<ListGroupItem>Description: {t.Description}</ListGroupItem>
					</ListGroup>
				</Card>
			</div>
		);
	});
	return (
		<div>
			<div style={{ padding: 10 }}>
				<Button onClick={getThings} style={{ padding: 10 }}>
					Get Things
				</Button>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				{cards}
			</div>
		</div>
	);
}
