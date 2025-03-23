import React from "react";
import './Support.css'
import SupportImg from '../../../Images/Support.png'
import { Button } from "@mui/material";
const Support=()=>{
    return(<>
    <div className="support-wrap">
        <div className="header-body">
        <div className="Header">
            <h2>Help And Support</h2>
        </div>
        <div className="form-body">
            <div className="container">

                    <form>
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