//imports
import { useState, useEffect } from "react";
import MultiSelect from "../components/MultiSelect";
import Card from "react-bootstrap/Card";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

export default function Services() {
	const baseUrl = "http://localhost:5000";

	const [services, setServices] = useState([]);
	const [things, setThings] = useState([]);
	const [selectedThings, setSelectedThings] = useState([]);

	const getAllServices = () => {
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/allServices", options)
			.then((response) => response.text())
			.then((data) => {
				let currentServices = JSON.parse(data);
				//setServices(JSON.parse(data))
				let thingSet = new Set();
				currentServices.forEach((service) => {
					if (!thingSet.has(service.Thing_ID)) {
						console.log("in if");
						console.log(service.Thing_ID);
						thingSet.add(service.Thing_ID);
					}
				});
				const temp = [...thingSet];
				setThings(temp);
			})
			.catch((error) => {
				console.log("there is an error getting all services");
				console.log(error);
			});
	};

	const getService = (event) => {
		event.preventDefault();
		//await fetch(baseUrl);
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/allServices", options)
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				let currentServices = JSON.parse(data);
				let selectedServices = [];

				currentServices.forEach((service) => {
					if (selectedThings.includes(service.Thing_ID)) {
						console.log("in if");
						console.log(service.Thing_ID);
						selectedServices.push(service);
					}
				});
				setServices(selectedServices);
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	};

	useEffect(() => {
		getAllServices();
	}, []);
	const cards = services.map((s) => {
		return (
			<div style={{ padding: 10 }}>
				<Card
					style={{
						width: "18rem",
						padding: 20,
						borderRadius: 50,
					}}
				>
					<Card.Body>
						<Card.Title>{s.Name}</Card.Title>
					</Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroupItem>Space_ID: {s.Space_ID}</ListGroupItem>
						<ListGroupItem>Thing_ID: {s.Thing_ID}</ListGroupItem>
						<ListGroupItem>Entity_ID: {s.Entity_ID}</ListGroupItem>
						<ListGroupItem>API: {s.API}</ListGroupItem>
						<ListGroupItem>Vendor: {s.Vendor}</ListGroupItem>
						<ListGroupItem>Type: {s.Type}</ListGroupItem>
						<ListGroupItem>KeyWords: {s.keywords}</ListGroupItem>
						<ListGroupItem>AppCategory: {s.AppCategory}</ListGroupItem>
						<ListGroupItem>Description: {s.Description}</ListGroupItem>
					</ListGroup>
				</Card>
			</div>
		);
	});
	return (
		<div>
			<MultiSelect
				things={things}
				setSelected={setSelectedThings}
			></MultiSelect>
			<div style={{ padding: 10 }}>
				<Button onClick={getService} style={{ padding: 10 }}>
					Get Services
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
