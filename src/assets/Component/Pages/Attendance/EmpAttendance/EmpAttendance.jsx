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
import { getAttendanceListById, punchIn, punchOut } from '../../../APIService/apiservice';
import { useAttendance } from "../AttendanceProvider";


function EmpAttendance(){
    const token = localStorage.getItem('token')
    const empId = localStorage.getItem('empId')
    const { isPunchedIn, punchInTime, punchInDate, totalHours, handlePunch } = useAttendance();
    const [localPunchInTime, setLocalPunchInTime] = useState(localStorage.getItem("punchInTime"));
    const [localPunchInDate, setLocalPunchInDate] = useState(localStorage.getItem("punchInDate"));

   // Sync local state with context whenever context updates
   useEffect(() => {
    setLocalPunchInTime(punchInTime || localStorage.getItem("punchInTime"));
    setLocalPunchInDate(punchInDate || localStorage.getItem("punchInDate"));
}, [punchInTime, punchInDate]);

        console.log(isPunchedIn)

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

 useEffect(() => {
        const fetchAttendanceListById = async () => {
        try {
            const response = await getAttendanceListById(token, empId);
            console.log(response);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        };
        fetchAttendanceListById();
    }, []);

    const formatHours = (decimalHours) => {
        const totalMinutes = Math.floor(decimalHours * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
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
                            <p><b>{localPunchInDate  || "Not Punched In"}</b></p>
                            <img src={profilePic} alt='Profile' width={100} height={100} />
                            <p className="production-info">Production: {formatHours(totalHours)} hrs</p>
                            <p style={{ fontSize: '14px', paddingBottom: '5px' }}>
                                {isPunchedIn ? `Punched In at ${localPunchInTime}` : "Not Punched In"}
                            </p>
                            {isPunchedIn ? (
                                <>
                                    <button onClick={handlePunch}>Punch Out</button>
                                </>
                            ) : (
                                <button onClick={handlePunch}>Punch In</button>
                            )}
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
                            <h6>Attendance List</h6>
                            {/* Filters & Sorting */}
                            <div className=" mb-3 emp-filters">
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
                                    <th>Check Out</th>
                                    <th>Status</th>
                                    <th>Production Hours</th>
                                </tr>
                                </thead>
                            <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td style={{color:'gray', paddingTop:'10px'}}>{emp.date}</td>
                                    <td style={{color:'gray'}}>{emp.CheckIn}</td>
                                    <td style={{color:'gray'}}>{emp.CheckOut}</td>

                                    <td><span
                                            className="badge"
                                            style={{ backgroundColor: emp.Status === "Present" ? "#62d59d7f" : "#dc3545", color: emp.Status === "Present" ? "#2c6e4ed5" : "white" }}
                                        >
                                            {emp.Status}
                                        </span>
                                        </td>
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