import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
// import Stack from '@mui/material/Stack';

const Navbar = () => {
  return (
    <div className="nav">
      <Link to='/'>
      <div className="left">SHOPIFY</div>
      </Link>
      <div className="right">
        <input type="text" placeholder="search" />
        <Link to="/Login">
          <Avatar
            alt="Remy Sharp"
            className="avatar"
            src="/static/images/avatar/1.jpg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
