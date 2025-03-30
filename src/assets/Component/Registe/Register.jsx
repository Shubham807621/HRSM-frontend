import { Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import './register.css';
import bg from '../../Images/bg.png';
import Verify from './Verify';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { registerUser } from '../APIService/apiservice';



function Register() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const [enableVerify, setEnableVerify] = useState(false);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Values:', values);

        try {
            const response = await registerUser(values);
            console.log(response)
            if (response?.code === 200) {
                setEnableVerify(true);
                setMessage('Registration successful! Please check your email for the verification code.');
            } else {
                setError('Invalid or Email already exists!');
            }
        } catch (err) {
            setError('Invalid or Email already exists!');
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
            {!enableVerify && 
                <div className="register-container">
                <div className="register-box">
                        <div className="right-section">
                            <div className="overlay2">
                                <img src={bg} alt="" />
                            </div>
                        </div>

                        <div className="left-section">
                            <h1 className="title mb-2">HRMS</h1>
                            <h2 className="subtitle">Welcome</h2>
                            <p>Please Create an Account</p>

                            <form onSubmit={handleSubmit} className="d-flex justify-content-between flex-wrap">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter Your First Name"
                                    required
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Your Last Name"
                                    required
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                    style={{ width: '96.5%' }}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    placeholder="Enter your Phone Number"
                                    required
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                />

                                <Button type="submit" className="signin mt-3">
                                    Sign Up
                                </Button>
                            </form>

                            {error && <p className="text-danger mt-3 pb-0">{error}</p>}

                            {/* <Divider textAlign="center" style={{ margin: '20px 0', color: '#555' }}>
                                Or Sign Up With
                            </Divider>

                            <div className="social-buttons d-flex">
                                <div className="google-login-container">
                                    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                                        <GoogleLogin
                                        onSuccess={(response) => console.log(response)}
                                        onError={() => console.log("Login Failed")}
                                        />
                                    </GoogleOAuthProvider>
                                </div>
                            </div> */}

                            <div className="signup-link">
                                Already have an account? <Link to="/"> Log In</Link>
                            </div>
                        </div>
                    </div>
                
            
                    
                </div>
            }
            
            {/* Verification Section */}

            {enableVerify && (
                <Verify email={values.email}/>
            )}
        </>
    );
}

export default Register;