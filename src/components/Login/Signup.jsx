import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log("Form submitted:", formData);

    try{
      await fetch('http://localhost:5000/api/user/signup', {
        method: "POST",
        headers : {
          Accept : "application/json" ,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(FormData)
    
      }).then((res)=> res.json())
      .then((data)=> console.log(data))
    }catch(error){

    }
  };

  return (
    <div>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <Link to="/Login">already have an account..</Link>
    </div>
  );
};

export default Signup;
