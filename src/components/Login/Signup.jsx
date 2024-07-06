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

  const handleSubmit = async () => {
    console.log("User Signed up", formData);
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData) {
        // localStorage.setItem("Auth-token", responseData.token);
        window.location.replace("/Login");
        alert("User created");
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      alert(error);
      console.log(error, "frontend me signup me error");
    }
  };

  // const handleSubmit = async () => {
  //   console.log("User Signed up", formData);
  //   try {
  //     let responseData;
  //     await fetch("http://localhost:5000/api/user/signup", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         responseData = data;
  //         console.log(data);
  //       });
  //       console.log(responseData)
  //     if (responseData.success) {
  //       // localStorage.setItem("Auth-token", responseData.token);
  //       window.location.replace("/Login");
  //       console.log("User created");
  //     } else {
  //       alert(responseData.error);
  //     }
  //   } catch (error) {
  //     alert(error);
  //     console.log(error, "frontend me signup me error");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here

  //   console.log("Form submitted:", formData);

  //   try {
  //     await fetch("http://localhost:5000/api/user/signup", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(FormData),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="signup-container">
    <div className="signup-box">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="fullName">Username:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>
        <button type="submit" className="signup-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <div className="login-link">
        Already have an account? <Link to="/Login">Log in</Link>
      </div>
    </div>
  </div>
  );
};

export default Signup;
