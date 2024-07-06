import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData.token);

      if (response.ok && responseData.token) {
        localStorage.setItem("token", responseData.token);
        window.location.replace("/");
        console.log("inside if");
        alert("User login");  
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      alert(error);
      console.log(error, "frontend me signup me error");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/Signup">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
