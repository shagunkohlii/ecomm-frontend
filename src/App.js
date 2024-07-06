// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
// import Allproducts from './components/Products/Allproducts';
// import Productpopup from './components/Popup/Productpopup';
import Cart from './components/Cart/Cart';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/getproducts" element={<Allproducts />} /> */}
          <Route path="/Cart" element={<Cart />} />

        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
