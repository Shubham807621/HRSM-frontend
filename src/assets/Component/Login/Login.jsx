import React, { useState } from "react";   
import loginImg from "../../Images/login.png"
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginUser } from "../APIService/apiservice";

export default function Login() {

    const [values, setValues] = useState({
      userName: '',
      password: '',
         
        });
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Clear previous errors
  
      try {
          const response = await loginUser(values);
  
          // If login is successful, store token and role, then navigate
          if (response?.token && response?.role) {
     
              localStorage.setItem("token", response.token);
              localStorage.setItem("role", response.role);
              localStorage.setItem('empId', response.empId);
              
              console.log("Login Successful:", response);
  
              // Navigate based on role
              if (response.role === "HR") {
                  navigate("/hrdashboard");
              } else {
                  navigate("/employeedashboard");
              }
          } else {
              setError(response.message || "Invalid credentials");
          }
      } catch (error) {
          setError(error.response?.data?.message || "Login failed. Please try again.");
      }
    };


       const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <div className="left-section-login">
          <h1 className="title">HRMS</h1>
          <h2 className="subtitle">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="username" name="userName" value={values.userName} onChange={handleChange} required/>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="password" name="password" value={values.password}  onChange={handleChange} required />
            </div>

            <div className="remember-forgot">
                {/* <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="mt-2">Remember Me</label>
                </div> */}
                <Link to="/reset-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <Button type="submit" className="login-btn">Log In</Button>
            </form>
            <p className="register-link">Don't have an account? <Link to="/register">Create an account</Link></p>
        </div>
        <div className="right-section-login">
          <img src={loginImg} alt="Illustration" className="login-image" />
        </div>
      </div>
    </div>
    </>
    
  )
}
