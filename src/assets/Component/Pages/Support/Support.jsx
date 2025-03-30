import React, { useState } from "react";
import './Support.css'
import SupportImg from '../../../Images/Support.png'
import { Button } from "@mui/material";
import { sendSupportRequest } from "../../APIService/apiservice";



const Support=()=>{

    const [formData, setFormData] = useState({
        empId: "",
        name: "",
        email: "",
        subjectLine:"",
        message: "",
    });
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

      // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response=await sendSupportRequest(formData, token); // Call the API function
            setSuccess("Message sent successfully!");
            setFormData({ empId: "", name: "", email: "",  subjectLine:"", message: "" }); // Reset form
            } catch (err) {
                setError(err.response?.data?.message || "Failed to send message.");
            } finally {
                setLoading(false);
            }
    };
    return(<>
    <div className="support-wrap">
        <div className="header-body">
        <div className="Header">
            <h2>Help And Support</h2>
        </div>
        <div className="form-body">
            <div className="container">
{/* 
                <form onSubmit={handleSubmit}>
                   <div className="value">
                   <label>EmpID</label>
                   <input type="text" placeholder="Enter your EmpID" className="txt"/>
                   </div>
                   <div className="value">
                   <label>Name</label>
                   <input type="text" placeholder="Enter your Full Name" className="txt"/>
                   </div>
                   <div className="value">
                   <label>Email</label>
                   <input type="email" placeholder="Enter your Eamil" className="txt"/>
                   </div>
                   <div>
                   <label className="form-label">Message</label>
                   <textarea className="form-control" rows="4" placeholder="Enter your message" style={{border: "1px solid rgba(0, 0, 0, 0.304)"}}></textarea>
                   </div>
                   <Button type="submit" className="submit-button">Submit</Button>
                </form> */}
                 <form onSubmit={handleSubmit}>
                            <div className="value mb-3">
                                <label>EmpID</label>
                                <input
                                    type="text"
                                    name="empId"
                                    placeholder="Enter your EmpID"
                                    className="txt"
                                    value={formData.empId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="value mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your Full Name"
                                    className="txt"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="value">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    className="txt"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="value my-3">
                                <label>Subject Line</label>
                                <input
                                    type="text"
                                    name="subjectLine"
                                    placeholder="Enter the Subject Line"
                                    className="txt"
                                    value={formData.subjectLine}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter your message"
                                    style={{ border: "1px solid rgba(0, 0, 0, 0.304)" }}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" className="submit-button" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </form>

            </div>
            <div className="right">
                    <img src={SupportImg} className="image"/>
                </div>
        </div>
        </div>
    </div>
    </>);

}
export default Support;