import * as React from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Recipe from "./tabs/Recipe";
import Services from "./tabs/Services";
import Things from "./tabs/Things";
import Apps from "./tabs/Apps";
import ProgressBar from "react-bootstrap/ProgressBar";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Menu() {
	const [value, setValue] = React.useState(0);
	const baseUrl = "http://localhost:5000";

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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<ProgressBar animated now={progressBarValue} />
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="Things" {...a11yProps(0)} />
						<Tab label="Services" {...a11yProps(1)} />
						<Tab label="Recipe" {...a11yProps(2)} />
						<Tab label="Apps" {...a11yProps(3)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Things></Things>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Services></Services>
				</TabPanel>

				<TabPanel value={value} index={2}>
					<Recipe></Recipe>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Apps></Apps>
				</TabPanel>
			</Box>
		</div>
	);
}
