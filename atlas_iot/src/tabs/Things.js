//imports
import { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
export default function Things() {
	const baseUrl = "http://localhost:5000";

	const [things, setThings] = useState([]);
	const [progressBarValue, setProgressBarValue] = useState(0);

	useEffect(() => {
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/", options)
			.then((response) => console.log(response))
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
		const intervalId = setInterval(() => {
			setProgressBarValue((prev) => {
				if (prev > 100) {
					clearInterval(intervalId);
				}

				return prev + 1.5;
			});
		}, 1000);
	}, []);
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

	return (
		<div>
			<ProgressBar animated now={progressBarValue} />
			<h1>This is the Things Tab</h1>
			<button onClick={getThings}>get things</button>
			{things.map((x) => {
				console.log(x);
				return <h1> {x.Thing_ID}</h1>;
			})}
			<p> Here is where more info about each thing will go</p>
		</div>
	);
}
