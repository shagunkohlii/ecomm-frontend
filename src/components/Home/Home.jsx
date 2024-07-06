import React from "react";
import "./Home.css";
import Allproducts from "../Products/Allproducts";

const Home = () => {
  return (
    <div className="home-container">
      <div className="homepage">
        <div className="hero-content">
          <h1 className="home-h1">new collection for everyone</h1>
          <img
            src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            className="hero-image"
          />
        </div>
      </div>

      <div className="products-section">
        <Allproducts />
      </div>
    </div>
  );
};

export default Home;