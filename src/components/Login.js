import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props)=>{
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:6000/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
    
        if (json.success) {
          localStorage.setItem("token", json.authtoken);
          props.showAlert("Logged in Successfully", "success");
          navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        props.showAlert("Failed to connect to the server", "danger");
      }
    };
    
    const handleOnchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      return (
        <div className="container mt-3">
        <h2>Login to continue to Feedbacks</h2>
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
    
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      );
};

export default Login;