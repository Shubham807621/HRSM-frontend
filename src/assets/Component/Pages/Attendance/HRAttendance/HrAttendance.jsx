import React, { useEffect, useState } from 'react'
import "./HrAttendance.css"
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from "@mui/icons-material/Edit";
import { getAttendanceList } from '../../../APIService/apiservice';

function HrAttendance(){
    const token = localStorage.getItem('token')
    const [employees, setEmployees ]= useState([]);

    useEffect(() => {
        const fetchAttendanceList = async () => {
        try {
            const response = await getAttendanceList(token);
            console.log(response);
            setEmployees(response);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        };
        fetchAttendanceList();
    }, []);

    const totalMinutes = Math.round(employees.totalHours * 60); // Convert to minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // Format as HH:MM

    return(
    <div className='hr-attendance'>
        <div className="titleE">
            <h1>HR Attendance</h1>
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
                <Link to="/hrdashboard" className="breadcrumb-link">Dashboard</Link>
                </li>
                <li className="breadcrumb-separator">/</li>
                <li className="breadcrumb-current">HR Attendance</li>
            </ul>
        </div>
        <div className='hr-container'>
            <div className='row1'>
                {/* <h6>Attendance Details Today</h6>
                <p style={{fontSize:'14px'}}>Data from the 800+ total no of employees</p> */}
                <div className='cards'>
                    <div className='card1'>
                        <h6>Present</h6>
                        <div className='insideCard1'>
                            <b>250</b>
                            <span style={{backgroundColor:'#03c95a'}}><TrendingUpIcon fontSize="inhert" /> +1%</span>
                        </div>
                    </div>
                    <div className='card1'>
                        <h6>Late Login</h6>
                        <div className='insideCard1'>
                            <b>45</b>
                            <span style={{backgroundColor:'#ff0000cf'}}><TrendingDownIcon fontSize="inhert" /> +1%</span>
                        </div>
                    </div>
                    <div className='card1'>
                        <h6>Uninformed</h6>
                        <div className='insideCard1'>
                            <b>15</b>
                            <span style={{backgroundColor:'#ff0000cf'}}><TrendingDownIcon fontSize="inhert" /> +12%</span>
                        </div>
                    </div>
                    <div className='card1'>
                        <h6>Permisson</h6>
                        <div className='insideCard1'>
                            <b>03</b>
                            <span style={{backgroundColor:'#03c95a'}}><TrendingUpIcon fontSize="inhert" /> +1%</span>
                        </div>
                    </div>
                    <div className='card1'>
                        <h6>Absent</h6>
                        <div className='insideCard1'>
                            <b>12</b>
                            <span style={{backgroundColor:'#ff0000cf'}}><TrendingDownIcon fontSize="inhert" /> +19%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/*row2*/}
            <div className="container row2  mt-4">
                <div className='emp-list-contrainer'>
                    <h6>HR Attendance</h6>
                    {/* Filters & Sorting */}
                    <div className=" mb-3 emp-filters">
                        <select className='form-select w-auto' style={{fontSize:'14px'}}>
                            <option>Select Status</option>
                            <option>Present</option>
                            <option>Absent</option>
                        </select>
                        {/* <select className="form-select w-auto" style={{fontSize:'14px'}}>
                            <option>Designation</option>
                        </select> */}
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
                
                            <th className='ps-4'>Employee</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                            <th>Production Hours</th>
                        </tr>
                        </thead>
                        <tbody>
                    {employees.map((emp, index) => {
                        // Convert totalHours to HH-MM format
                        const totalMinutes = Math.round(emp.totalHours * 60); // Convert to minutes
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // Format as HH:MM

                        return (
                        <tr key={index}>
                            <td className='ps-4'>
                            <div className="d-flex align-items-center">
                                <div>
                                <p className='emp-title my-0'>{emp.name}</p>
                                <p className="text-muted my-1" style={{ fontSize: '13px' }}>{emp.designation}</p>
                                </div>
                            </div>
                            </td>
                            <td style={{ color: 'gray' }}>
                                {new Date(emp.punchIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ color: 'gray' }}>
                                {new Date(emp.punchOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>
                            <span
                                className="badge"
                                style={{
                                backgroundColor: emp.present ? "#62d59d7f" : "#dc3545",
                                color: emp.present ? "#2c6e4ed5" : "white"
                                }}
                            >
                                {emp.present ? "Present" : "Absent"}
                            </span>
                            </td>
                            <td>
                            <span
                                style={{
                               
                                padding: '5px',
                                borderRadius: '5px',
                                fontSize: '13px',
                                fontWeight: 'bold'
                                }}
                            >
                                <AccessTimeIcon fontSize="inherit" style={{ paddingBottom: '1px' }} /> {formattedTime} hrs
                            </span>
                            </td>
                        </tr>
                        );
                    })}
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
            </div>
)}
export default HrAttendance