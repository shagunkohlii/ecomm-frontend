// import logo from './logo.svg';
import './App.css';
// import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';

function App() {
  // const [data, setData] = useState(null);

  // const connect = async () => {
  //   await fetch("http://localhost:3000")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  //     .catch((error) => console.log("error", error));
  // }

  // console.log('data', data);
  return (
    <div className="App">
      <Router>
      <Navbar />

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Home/>} />
      </Routes>

{/*       
      <h1>shopify applications </h1>
      <button onClick={connect}>connection </button> */}
      </Router>
    </div>
  );
}

export default App;
