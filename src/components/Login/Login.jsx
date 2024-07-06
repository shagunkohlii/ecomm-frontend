import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("User logging in", formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        localStorage.setItem("token", responseData.token);
        console.log("Login successful");
        // Use navigate instead of window.location.replace
        navigate("/");
        // If you're using a toast library:
        // toast.success("Login successful!");
      } else {
        const errorMessage = responseData.error || "Login failed. Please try again.";
        console.log(errorMessage);
        // If you're using a toast library:
        // toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // If you're using a toast library:
      // toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">
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