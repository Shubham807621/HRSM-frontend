import React, { useEffect, useState } from 'react'
import "./EmpAttendance.css"
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import profilePic from "../../../../Images/profilePic.jpeg"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TodayIcon from '@mui/icons-material/Today';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { punchIn, punchOut } from '../../../APIService/apiservice';

function EmpAttendance(){

const token = localStorage.getItem('token');
const empId = localStorage.getItem('empId')
const [punchInDate, setPunchInDate] = useState(null);

const [isPunchedIn, setIsPunchedIn] = useState(false);
const [punchInTime, setPunchInTime] = useState(null);
const [productionHours, setProductionHours] = useState(0);

const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);

    // Convert to DD-Month-YYYY format
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    // Extract time in HH:MM AM/PM format
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return { formattedDate, formattedTime };
};

const employees = [
    {
    date: "02 Sep 2024",
    CheckIn: "09:00 AM",
    Status: "Present",
    CheckOut: "09:17 PM",
    Production: "8.35Hrs",
    },
    // Duplicate entries for display (mock data)
    {
        date: "02 Sep 2024",
        CheckIn: "09:00 AM",
        Status: "Present",
        CheckOut: "09:17 PM",
        Production: "8.35Hrs",
    },
    {
        date: "02 Sep 2024",
        CheckIn: "09:00 AM",
        Status: "Present",
        CheckOut: "09:17 PM",
        Production: "8.35Hrs",
    },
];

const handlePunch = async () => {
    try {
        if(!isPunchedIn){
            const response = await punchIn(token, empId);
           // Format response timestamp
           const { formattedDate, formattedTime } = formatDateTime(response.message);
           setPunchInDate(formattedDate); // Store date separately
           setPunchInTime(formattedTime); // Store time separately
           setIsPunchedIn(true);

        }else {
            const response = await punchOut(token, empId);
            console.log(response);
            setProductionHours(response.totalHours);
            setIsPunchedIn(false);
        }

    } catch (error) {
        console.error("Punch In failed", error);
    }
};

    return(
    <div className='emp-attendance'>
                <div className="titleE">
                    <h1>Employee</h1>
                </div>
                <div className="breadcrumb-wrapper">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="breadcrumb-link">
                            <HomeIcon className="home-icon" />
                            </Link>
                        </li>
                        <li className="breadcrumb-separator">/</li>
                        <li>
                        <Link to="/empDashboard" className="breadcrumb-link">Employee</Link>
                        </li>
                        <li className="breadcrumb-separator">/</li>
                        <li className="breadcrumb-current">Employee Attendance</li>
                    </ul>
                </div>
                <div className='emp-container'>
                    <div className='row1'>
                    <div className='emp-card'>
                        <div className="attendance-card">
                            <h6>Good Morning, Adrian</h6>
                            <p><b>{punchInDate || "Not Punched In"}</b></p>
                            <img src={profilePic} alt='Profile' width={100} height={100} />
                            <p className="production-info">Production: {productionHours} hrs</p>
                            <p style={{ fontSize: '14px', paddingBottom: '5px' }}>
                                {isPunchedIn ? `Punched In at ${punchInTime}` : "Not Punched In"}
                            </p>
                            <button className="punch-out-btn" onClick={handlePunch}>
                                {isPunchedIn ? "Punch Out" : "Punch In"}
                            </button>
                        </div>
                    </div>

                        {/*row1 col2*/}
                        <div className='r1-c2'>
                            {/*4 boxes*/}
                            <div className='insiderow'>
                                <div className='emp-card'>
                                    <p><AccessTimeFilledIcon/> &nbsp; <b>8.36/9</b></p>
                                    <p>Total Hours Today</p>
                                    <p><ArrowUpwardIcon sx={{ color: 'green' }}/><b>5% Last Week</b></p>
                                </div>
                                <div className='emp-card'>
                                    <p><AccessTimeFilledIcon/> &nbsp; <b>10/40</b></p>
                                    <p>Total Hours Week</p>
                                    <p><ArrowUpwardIcon sx={{ color: 'green' }}/><b>7% Last Week</b></p>
                                </div>
                                <div className='emp-card'>
                                    <p><TodayIcon/> &nbsp; <b>75/90</b></p>
                                    <p>Total Hours Today</p>
                                    <p><ArrowDownwardIcon sx={{ color: 'red' }}/><b>5% Last Week</b></p>
                                </div>
                                <div className='emp-card'>
                                    <p><TodayIcon/> &nbsp; <b>16/28</b></p>
                                    <p>OverTime this Month</p>
                                    <p><ArrowDownwardIcon sx={{ color: 'red' }}/><b>6% Last Week</b></p>
                                </div>
                            </div>

                            {/*timeline*/}
                            <div className="container mt-4 p-3 timeline">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                        <span className="text-muted">● Total Working hours</span>
                                        <h6 className="fw-bold ps-3">12h 36m</h6>
                                        </div>
                                        <div>
                                        <span className="text-success">● Productive Hours</span>
                                        <h6 className="fw-bold text-success ps-3">08h 36m</h6>
                                        </div>
                                        <div>
                                        <span className="text-warning">● Break hours</span>
                                        <h6 className="fw-bold text-warning ps-3">22m 15s</h6>
                                        </div>
                                        <div>
                                        <span className="text-primary">● Overtime</span>
                                        <h6 className="fw-bold text-primary ps-3">02h 15m</h6>
                                        </div>
                                </div>
                                    
                                <div className="d-flex align-items-center mt-3">
                                        <div className="progress w-100" style={{ height: "20px" }}>
                                        <div
                                            className="progress-bar bg-success bordered"
                                            style={{ width: "55%" }}
                                        ></div>
                                        <div
                                            className="progress-bar bg-body-secondary "
                                            style={{ width: "5%" }}
                                        ></div>
                                        <div
                                            className="progress-bar bg-warning"
                                            style={{ width: "10%" }}
                                        ></div>
                                        <div
                                            className="progress-bar bg-success"
                                            style={{ width: "20%" }}
                                        ></div>
                                        <div
                                            className="progress-bar bg-warning"
                                            style={{ width: "5%" }}
                                        ></div>
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{ width: "5%" }}
                                        ></div>
                                        </div>
                                </div>

                                <div className="d-flex justify-content-between mt-2 text-muted">
                                        {Array.from({ length: 6 }, (_, i) => (
                                        <span key={i}>{6 + i}:00</span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*row2*/}
            
                    <div className="container row2  mt-4">
                        <div className='emp-list-contrainer'>
                            <h6>Leave List</h6>
                            {/* Filters & Sorting */}
                            <div className=" mb-3 emp-filters">
                            
                            <select className="form-select w-auto" style={{fontSize:'14px'}}>
                                <option>Designation</option>
                            </select>
                            <select className="form-select w-auto" style={{fontSize:'14px'}}>
                                <option>Sort by: Last 7 Days</option>
                            </select>
                            </div>
                        </div>
            

                       {/* Employee Table */}
                            <div className="table-responsive emp-table">
                            <table className="table table-hover align-middle">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Check In</th>
                                    <th>Status</th>
                                    <th>Check Out</th>
                                    <th>Production Hours</th>
                                </tr>
                                </thead>
                            <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td style={{color:'gray', paddingTop:'10px'}}>{emp.date}</td>
                                    <td style={{color:'gray'}}>{emp.CheckIn}</td>
                                    <td><span
                                            className="badge"
                                            style={{ backgroundColor: emp.Status === "Present" ? "#62d59d7f" : "#dc3545", color: emp.Status === "Present" ? "#2c6e4ed5" : "white" }}
                                        >
                                            {emp.Status}
                                        </span>
                                        </td>
                                    <td style={{color:'gray'}}>{emp.CheckOut}</td>
                                    <td><span style={{backgroundColor:"#03c95a", color: "white", padding:'5px',borderRadius:'5px', fontSize:'13px', fontWeight:'bold'}}>
                                        <AccessTimeIcon fontSize="inhert" style={{paddingBottom:'1px'}}/> {emp.Production}</span></td>
                                
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Pagination */}
                    <div className="d-flex justify-content-end align-items-end me-3">
                        <button style={{border:'none',backgroundColor:'white',paddingRight:'10px',color:'gray'}}>&lt;</button>
                        <span style={{backgroundColor:'orangered',
                                    borderRadius:'70px', 
                                    width:'25px',
                                    color:'white',
                                    paddingLeft:'7px'}}> 1</span>
                        <button style={{border:'none',backgroundColor:'white',paddingLeft:'10px',color:'gray'}}>&gt;</button>
                    </div>
                    </div>
                    

                </div>
            </div>)
}
export default EmpAttendance