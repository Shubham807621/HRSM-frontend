import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";
import File from "../../../../Images/file.png";
import "./Payroll.css";
import { Button } from "@mui/material";

const Payroll = () => {
  const navigate = useNavigate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const years = [2023, 2024, 2025];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleViewPayslip = () => {
    if (!selectedMonth) {
      alert("Please select a month!");
      return;
    }
    console.log("Navigating to:", `/payslip?year=${selectedYear}&month=${selectedMonth}`);
    navigate(`/salary/payslip/${selectedYear}/${selectedMonth}`);
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
        </div>
      </div>

      <div className="year-wrap">
        <h2>Year</h2>
        <ul className="list list-inline filterTab">
          {years.map((year) => (
            <li key={year} className="list-inline-item">
              <Button
                onClick={() => handleYearChange(year)}
                style={{
                  padding: "10px 20px",
                  color: "black",
                  textTransform: "capitalize",
                  background: "transparent",
                  fontWeight: "400",
                  borderBottom: selectedYear === year ? "2px solid blue" : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: "19px",
                }}
              >
                {year}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="body-container mt-4">
        <div className="Month-wrap">
          {months.map((month, index) => (
            <div key={month} className="Card-wrap mx-4">
              {selectedYear < currentYear || index <= currentMonth ? (
                <div className="Card" style={{ cursor: "pointer" }} onClick={() => handleMonthChange(month)}>
                  <img src={File} className="file" alt="Payslip File" />
                  <h5 className="ms-4">{month}</h5>
                </div>
              ) : (
                <div className="Card disabled">
                  {/* Disabled months */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="button-container my-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewPayslip}
          disabled={!selectedMonth}
          className="payslip-button"
        >
          View Payslip
        </Button>
      </div>
    </div>
  );
};

export default Payroll;