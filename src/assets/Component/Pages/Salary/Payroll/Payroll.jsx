import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import "bootstrap/dist/css/bootstrap.min.css";
import File from '../../../../Images/file.png'
import { createSearchParams, Link, useSearchParams, useNavigate } from "react-router-dom";


import './Payroll.css'
import { Button } from "@mui/material";

const Payroll = () => {
  const navigate = useNavigate(); 
  const currentMonth = new Date().getMonth();
  const months = [
    "January", "February", "March", 
    "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedMonth, setSelectedMonth] = useState(null);
  // Button data
  const buttons = [
    "2024",
    "2025",
    ];

  const [searchParams] = useSearchParams();
  const year= searchParams.get("name") || "2024";
  // Handle tab click and navigation
  const handleTabClick = (button) => {
    if (button === "2024") {
      navigate(""); // No search params for default category
    } else {
      navigate({
        pathname: "",
        search: `?${createSearchParams({ name: button })}`,
      });
    }
  };

  return (
    <div className="payroll-wrap">
         <div className="header-container">
              <h3 className="page-title">Payroll</h3>
              <div className="header-right-left">
                     
                             <div className="homeicon-document">
                             <p>
                                <Link to="/" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                                <HomeIcon /> /
                                </Link>
                             </p>
                             <p className="payroll">Payroll</p>
                             </div>
                      
                      <div className="header-container-left">
                         <button className="download-btn">
                <DownloadIcon /> Download
              </button>
                      </div>
                </div>
       </div>
       <div className="year-wrap">
        <h2>Year</h2>
       <ul
              className="list list-inline filterTab"
              style={{ listStyle: "none", padding: 0 }}
            >
              {buttons.map((button, index) => (
                <li
                  key={index}
                  className="list-inline-item"
                  style={{ display: "inline-block" }}
                >
                  <Button
                    onClick={() => handleTabClick(button)}
                    style={{
                      padding: "10px 20px",
                      border: "none",
                      color: "black",
                      textTransform: "capitalize",
                      background: "transparent",
                      fontWeight: "400",
                      borderBottom:
                        year === button
                          ? "2px solid blue"
                          : "2px solid transparent",
                      cursor: "pointer",
                      fontSize: "19px",
                      transition: "border 0.6s",
                      borderRadius: "0",
                    }}
                  >
                    {button}
                  </Button>
                </li>
              ))}
            </ul>
       </div>
    {/* <div className="body-container mt-4">
    <h2 className="mb-4">Monthly Payslips</h2>
      <div className="Month-wrap">
        {months.map((month, index) => (
          <Link to='/payslip'>
          <div key={index} className="Card-wrap mx-4">
            <div 
              className="Card" 
              style={{ cursor: "pointer" }} 
              onClick={() => setSelectedMonth(month)}
            > 
            <img src={File} className="file"/>
            <h5 className="ms-4">{month} </h5>
            </div>
          </div>
          </Link>
        ))}
      </div>

    
    </div> */}
          <div className="body-container mt-4">
        <div className="Month-wrap">
          {months.map((month, index) => (
            <div key={index} className="Card-wrap mx-4">
              {index <= currentMonth ? (
                // If the month is completed, show the payslip file
                <Link to="/payslip">
                  <div className="Card" style={{ cursor: "pointer" }}>
                    <img src={File} className="file" alt="Payslip File" />
                    <h5 className="ms-4">{month}</h5>
                  </div>
                </Link>
              ) : (
                // If the month is ongoing or in the future, show a disabled card
                <div className="Card disabled">
                  {/* <h5 className="ms-4">{month}</h5>
                  <p className="text-muted">Payslip Not Available</p> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payroll;