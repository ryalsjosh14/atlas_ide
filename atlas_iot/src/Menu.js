import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Recipe from "./tabs/Recipe";
import Services from "./tabs/Services";
import Things from "./tabs/Things";
import Relationships from "./tabs/Relationships";
import Apps from "./tabs/Apps";

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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Things" {...a11yProps(0)} />
					<Tab label="Services" {...a11yProps(1)} />
					<Tab label="Relationships" {...a11yProps(2)} />
					<Tab label="Recipe" {...a11yProps(3)} />
					<Tab label="Apps" {...a11yProps(4)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Things></Things>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Services></Services>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Relationships></Relationships>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Recipe></Recipe>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Apps></Apps>
			</TabPanel>
		</Box>
	);
}
