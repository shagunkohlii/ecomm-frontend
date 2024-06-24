import React from "react";
import "./Home.css";
// import MyImage from "../assets/heroimg.png";

const Home = () => {
  return (
    <div>
      filters
      <div className="filter-box">
        <button>Mens</button>
        <button>Womens</button>
        <button>Kids</button>
      </div>
      <div className="homepage">
        <h1 className="home-h1">new collection for everyone</h1>
        <img
          src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Home;
