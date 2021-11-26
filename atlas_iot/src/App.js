import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Home  from './screens/Home';
import React, { useState } from 'react';

function App() {

    




  return (
    <div>
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
