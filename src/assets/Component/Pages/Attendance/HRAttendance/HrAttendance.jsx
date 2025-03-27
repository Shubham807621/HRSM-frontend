import React, { useEffect } from 'react'
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
    const employees = [
        {
          name: "Anthony Lewis",
          role: "Manager",
          email: "anthony@example.com",
          CheckIn: "09:00 AM",
          Status: "Present",
          CheckOut: "09:17 PM",
          Production: "8.35Hrs",
          profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        // Duplicate entries for display (mock data)
        {
            name: "Anthony Lewis",
            role: "Manager",
            email: "anthony@example.com",
            CheckIn: "09:00 AM",
            Status: "Present",
            CheckOut: "09:17 PM",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Anthony Lewis",
            role: "Manager",
            email: "anthony@example.com",
            CheckIn: "09:00 AM",
            Status: "Present",
            CheckOut: "09:17 PM",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Anthony Lewis",
            role: "Manager",
            email: "anthony@example.com",
            CheckIn: "09:00 AM",
            Status: "Present",
            CheckOut: "09:17 PM",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          
      ];

    useEffect(() => {
        const fetchAttendanceList = async () => {
        try {
            const response = await getAttendanceList(token);
            console.log(response);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        };
        fetchAttendanceList();
    }, []);


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
                            <th><input type="checkbox" /></th>
                            <th>Employee</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                            <th>Production Hours</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                    <tbody>
                    {employees.map((emp, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>
                                <div className="d-flex align-items-center">
                                <img
                                    src={emp.profileImg}
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                />
                                <div>
                                    <p className='emp-title my-0'>{emp.name}</p>
                                    <p className="text-muted my-0">{emp.role}</p>
                                </div>
                                </div>
                            </td>
                            <td style={{color:'gray'}}>{emp.CheckIn}</td>
                            <td style={{color:'gray'}}>{emp.CheckOut}</td>
                            <td>
                                <span
                                    className="badge"
                                    style={{ backgroundColor: emp.Status === "Present" ? "#62d59d7f" : "#dc3545", color: emp.Status === "Present" ? "#2c6e4ed5" : "white" }}
                                >
                                    {emp.Status}
                                </span>
                                </td>
                            <td>
                                <span 
                                    style={{backgroundColor:"#03c95a", color: "white", padding:'5px',borderRadius:'5px', fontSize:'13px', fontWeight:'bold'}}>
                                    <AccessTimeIcon fontSize="inhert" style={{paddingBottom:'1px'}}/> {emp.Production}
                                </span></td>
                            <td>
                                <EditIcon className="fs-5 me-2 cursor-pointer" />
                            </td>
                            
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
            </div>
)}
export default HrAttendance