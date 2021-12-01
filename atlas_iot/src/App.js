import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Home  from './screens/Home';
import React, { useState } from 'react';
import Menu from './Menu'
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Menu></Menu>
		</div>
	);
}

export default App;
