import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const port ='http://localhost:5000'
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      props.showAlert("Please fill in all fields", "warning");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await fetch(`${port}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      const json = await response.json(); // Parse JSON response
  
      if (!response.ok) {
        throw new Error(json.message || "Failed to authenticate. Please try again.");
      }
  
      if (json.success) {
        // Save the token to localStorage
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
  
        // Fetch user details after successful login
        const userResponse = await fetch(`${port}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token') 
          },
        });
  
        const userJson = await userResponse.json();
        localStorage.setItem("type", userJson.type);
        localStorage.setItem("name", userJson.name);

  
        if (!userResponse.ok) {
          throw new Error(userJson.message || "Failed to fetch user details.");
        }
  
        
        if (userJson && userJson.type) {
         
          
          if (userJson.type === "A") {
            
            navigate("/admin"); 
          } else {
            navigate("/"); 
          }
        } else {
          throw new Error("User type is undefined or invalid.");
        }
      } else {
        props.showAlert("Invalid credentials. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error during login process:", error.message);
      props.showAlert(error.message || "Something went wrong. Please try again.", "danger");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleOnchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2>Login to continue to Client Feedbacks</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={credentials.email}
            onChange={handleOnchange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            onChange={handleOnchange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
