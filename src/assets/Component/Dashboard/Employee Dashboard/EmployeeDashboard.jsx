import "./EmployeeDashboard.css"
import React, { useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import profilePic from "../../../Images/profilePic.jpeg"
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell,Sector } from "recharts";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TodayIcon from '@mui/icons-material/Today';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PushPinIcon from '@mui/icons-material/PushPin';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { getEmployeeDetails, getEmployeeDetailsById, getLeaveCount, punchIn, punchOut } from "../../APIService/apiservice";


function EmployeeDashboard(){
    
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2024);
    const years = Array.from({ length: 5 }, (_, i) => 2023 + i); // Years from 2020 to 2029
    
    
    const totalHours = 9;
    const workedHours = 5.45;
    
    const [data, setData]  = useState([
        { name: "Causal Leave", value: 12, color: "#002D3C" },
        { name: "Earned Leave", value: 15, color: "#00C853" },
        { name: "Planned Leave", value: 18, color: "#F57C00" },
        { name: "Sick Leave", value: 14, color: "#D50000" },
        { name: "Flexi Leave", value: 8, color: "#FFC107" },
      ]);
    
    const data1 = [
        { name: "Worked", value: workedHours },
        { name: "Remaining", value: totalHours - workedHours },
    ];

    const COLORS = ["#002D3C", "#E0E0E0"]; // Blue for worked hours, grey for remaining


    /*my skills data*/
    const skills=[
        {name:"Figma", date:"Updated : 15May2025", percent:95, color:"#002D3C"},
        {name:"HTML", date:"Updated : 12May2025", percent:95, color:"#00C853"},
        {name:"CSS", date:"Updated : 13May2025", percent:95, color:"#F57C00"},
        {name:"Word Press", date:"Updated : 13May2025", percent:65, color:"#D50000"},
        {name:"Java Script", date:"Updated : 15May2025", percent:75, color:"#FFC107"},
    ]

    /*task data*/
    const tasks = [
        { name: "Patient appointment", status: "On hold", statusColor: "#E1BEE7", pinned: true },
        { name: "Appointment booking", status: "In progress", statusColor: "#FFCCBC", pinned: false },
        { name: "Patient and Doctor video", status: "Completed", statusColor: "#C8E6C9", pinned: false },
        { name: "Private chat module", status: "Pending", statusColor: "#FFF9C4", pinned: false },
        { name: "Go-live and post support", status: "In Progress", statusColor: "#FFAB91", pinned: false },
        { name: "Private chat", status: "On hold", statusColor: "#E1BEE7", pinned: false },
    ];

    const empList=[
        {name:"Alexander Jermai", role:"UI/UX Designer",img:"https://randomuser.me/api/portraits/men/32.jpg"},
        {name:"Alexander Jermai", role:"UI/UX Designer",img:"https://randomuser.me/api/portraits/men/32.jpg"},
        {name:"Alexander Jermai", role:"UI/UX Designer",img:"https://randomuser.me/api/portraits/men/32.jpg"},
        {name:"Alexander Jermai", role:"UI/UX Designer",img:"https://randomuser.me/api/portraits/men/32.jpg"},
        {name:"Alexander Jermai", role:"UI/UX Designer",img:"https://randomuser.me/api/portraits/men/32.jpg"},
    ];

    const [employee , SetEmployee] = useState({})

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

    useEffect(()=>{

        const fetchEmployeeDetails = async () =>{
    
            try{
                const respone = await getEmployeeDetails(empId, token);
                SetEmployee(respone);

            }
            catch (error) {
                console.log(error)
            }

        };
        fetchEmployeeDetails();

    },[empId, token])
    

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
                // const response = await punchOut(token, empId);
                // console.log(response);
                // setProductionHours(response.totalHours);
                // setIsPunchedIn(false);
            }
    
        } catch (error) {
            console.error("Punch In failed", error);
        }
    };

    useEffect(()=>{

        const fetchLeaveCountDetails = async () =>{
    
            try{
                const respone = await getLeaveCount(empId, token);
                // setData(respone);
                console.log(respone);

            }
            catch (error) {
                console.log(error)
            }

        };
        fetchLeaveCountDetails();

    },[empId, token])


    return(
        <div className="empDashboard">
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
                    <li className="breadcrumb-current">Employee</li>
                </ul>
            </div>
            <div className="emp-container">
                <div className="emp-cards">

                    {/* first card*/}
                    <div className="emp-card">
                        <div className="emp-header">
                            <img src={profilePic} alt="error" width={70} height={70} style={{borderRadius:'50px'}}></img>
                            <div>
                                <h5 style={{marginBottom:'1px'}}>{employee.name}</h5>
                                <p>{employee.designation} <br/>{employee.team}</p>
                            </div>
                        </div>
                        <div className="emp-body">
                            <h6>Phone Number</h6>
                            <p>{employee.phoneNumber}</p>
                            <h6>Email Address</h6>
                            <p>{employee.email}</p>
                            <h6>Report Office</h6>
                            <p>{employee.reportingOffice}</p>
                            <h6>Joined on</h6>
                            <p>{employee.dateOfJoining}</p>
                        </div>
                    </div>

                    {/* second card*/}
                    <div className="emp-card">
                        <div className="leave-header">
                            <p>Leave Details</p>
                            {/*calender*/}
                            <div className="dropdown">
                                <button
                                    className="btn btn-light rounded-2 custom-dropdown pt-0 pb-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i><CalendarIcon size={14}/>&nbsp;  </i>
                                    {selectedYear}
                                </button>
                                {/*dropdown*/}
                                <ul className="dropdown-menu">
                                    {years.map((year) => (
                                    <li key={year}>
                                        <button className="dropdown-item" onClick={() => setSelectedYear(year)}>
                                        {year}
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/*piechart*/}
                        <div className="chart-container">
                            {/* Custom Legend */}
                            <div className="custom-legend">
                                {data.map((entry, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-dot" style={{ backgroundColor: entry.color }}></span>
                                    <span>
                                    <strong>{entry.value}</strong> {entry.name}

                                    </span>
                                </div>
                                ))}
                            </div>

                            {/* Pie Chart */}
                            <PieChart width={180} height={200}>
                                <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40} // Inner radius to create a donut effect
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                                paddingAngle={4} // Adds spacing between slices
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                </Pie>
                            </PieChart>
                        </div>                            
                    </div>

                    {/*third card*/}
                    <div className="emp-card">
                        <div className="leave-header">
                            <p>Leave Details</p>
                            {/*calender*/}
                            <div className="dropdown">
                                <button
                                    className="btn btn-light rounded-2 custom-dropdown pt-0 pb-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                        <i><CalendarIcon size={14}/>&nbsp;  </i>
                                        {selectedYear}
                                </button>
                                    {/*dropdown*/}
                                <ul className="dropdown-menu">
                                    {years.map((year) => (
                                    <li key={year}>
                                        <button className="dropdown-item" onClick={() => setSelectedYear(year)}>
                                        {year}
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/*details*/}
                        
                        <div className="leave-summary">
                            {/* Leave Summary Grid */}
                            <div className="summary-grid">
                                <div>
                                <p>Total Leaves<br/> <strong>16</strong></p>
                                <p>Taken<br/> <strong>10</strong></p>
                                <p>Absent<br/> <strong>2</strong></p>
                                </div>
                                <div>
                                <p>Request<br/> <strong>0</strong></p>
                                <p>Worked Days<br/> <strong>240</strong></p>
                                <p>Loss of Pay<br/> <strong>2</strong></p>
                                </div>
                            </div>

                            {/* Apply Leave Button */}
                            <button className="apply-leave-btn" >Apply New Leave</button>
                        </div>                            
                    </div>
                </div>

                <div className="roww-2">
                    <div className="emp-card">
                    <div className="attendance-card">
                        <h6>Attendance</h6>
                        <h6 className="my-2">Good Morning, <b>{employee.name}</b></h6>
                        <p><b>{punchInDate || "Not Punched In"}</b></p>
                        <div className="chart-container1" >
                        <PieChart width={220} height={180} className="piecha" >
                            <Pie data={data1} cx="63%" cy="50%" innerRadius={70} outerRadius={80} 
                                startAngle={90} endAngle={-270} fill="#8884d8" dataKey="value"  >
                                {data1.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                        
                            <p style={{
                            transform: "translate(-139%, -0%)",
                            fontSize: "14px",
                            
                        }}>Total Hours<br/><b>5:45:32</b></p>
                        
                            
                        </div>
                        <p className="production-info">Production: {productionHours} hrs</p>
                        <p style={{ fontSize: '14px', paddingBottom: '5px' }}>
                            {isPunchedIn ? `Punched In at ${punchInTime}` : "Not Punched In"}
                        </p>
                        <button className="punch-out-btn" onClick={handlePunch}>
                            {isPunchedIn ? "Punch Out" : "Punch In"}
                        </button>
                    </div>
                    </div>
                    {/*row2 col2*/}
                    <div className="r2-c2">
                        <div className="insiderow">
                            <div className="emp-card">
                                <p><AccessTimeFilledIcon/> &nbsp; <b>8.36/9</b></p>
                                <p>Total Hours Today</p>
                                <p><ArrowUpwardIcon sx={{ color: 'green' }}/><b>5% Last Week</b></p>
                            </div>
                            <div className="emp-card">
                                <p><AccessTimeFilledIcon/> &nbsp; <b>10/40</b></p>
                                <p>Total Hours Week</p>
                                <p><ArrowUpwardIcon sx={{ color: 'green' }}/><b>7% Last Week</b></p>
                            </div>
                            <div className="emp-card">
                                <p><TodayIcon/> &nbsp; <b>75/90</b></p>
                                <p>Total Hours Today</p>
                                <p><ArrowDownwardIcon sx={{ color: 'red' }}/><b>5% Last Week</b></p>
                            </div>
                            <div className="emp-card">
                                <p><TodayIcon/> &nbsp; <b>16/28</b></p>
                                <p>OverTime this Month</p>
                                <p><ArrowDownwardIcon sx={{ color: 'red' }}/><b>6% Last Week</b></p>
                            </div>
                        </div>


                        {/* <div className="timeline"> */}                            
                        <div className="container mt-4 p-3 " id="timeline">
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
                                    style={{ width: "2%" }}
                                ></div>
                                <div
                                    className="progress-bar bg-warning"
                                    style={{ width: "10%" }}
                                ></div>
                                    <div
                                    className="progress-bar bg-body-secondary "
                                    style={{ width: "2%" }}
                                ></div>
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: "20%" }}
                                ></div>
                                    <div
                                    className="progress-bar bg-body-secondary "
                                    style={{ width: "2%" }}
                                ></div>
                                <div
                                    className="progress-bar bg-warning"
                                    style={{ width: "5%" }}
                                ></div>
                                    <div
                                    className="progress-bar bg-body-secondary "
                                    style={{ width: "2%" }}
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

                <div className="roww-3">
                    <div className="myskills">
                        <div className="leave-header">
                                <p>My Skills</p>
                                {/*calender*/}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light rounded-2 custom-dropdown pt-0 pb-0 "
                                        style={{border:'1px solid rgba(128, 128, 128, 0.514)'}}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i><CalendarIcon size={14}/>&nbsp;  </i>
                                        {selectedYear}
                                    </button>
                                    {/*dropdown*/}
                                    <ul className="dropdown-menu">
                                        {years.map((year) => (
                                        <li key={year}>
                                            <button className="dropdown-item" onClick={() => setSelectedYear(year)}>
                                            {year}
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                        </div>
                        {/*skill-body*/}
                        {skills.map((entry, index) => (
                            <div className="custom-legend" key={index}>
                                
                                <div key={index} className="legend-item">
                                    <span className="legend-dot" style={{ backgroundColor: entry.color }}></span>                                        
                                    <div>
                                            <strong>{entry.name}</strong>
                                            <br />
                                            <small className="text-muted">{entry.date}</small>
                                    </div>                                        
                                </div>
                                <div className="chart-container1" >
                                    <PieChart width={80} height={90} className="piecha" >
                                        <Pie data={[
                                            { value: entry.percent },
                                            { value: 100 - entry.percent },
                                            ]} 
                                            cx="50%" cy="60%" innerRadius={20} outerRadius={28} 
                                            startAngle={90} endAngle={-270} fill="#8884d8" dataKey="value"  
                                            stroke="none">
                                                    
                                            <Cell fill={entry.color} /> 
                                            <Cell fill="#D3D3D3" />
                                                    
                                        </Pie>
                                    </PieChart>       
                                    <b style={{
                                        transform: "translate(-180%, 40%)",
                                        fontSize: "11px",                                                                                          
                                    }}>{entry.percent}%</b>
                                </div>                                    
                            </div>
                        ))}
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Tasks</th>
                                <th>All Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>
                                        {task.name}
                                    </td>
                                    <td>
                                        <span className="status" style={{ backgroundColor: task.statusColor }}>
                                            {task.status}
                                        </span>
                                        {/* <span className="avatars ms-2">
                                            <img src={profilePic} alt="User 1" />
                                            <img src={profilePic} alt="User 2" />
                                            <img src={profilePic} alt="User 3" />
                                        </span> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="team-member">
                        <div className="leave-header">
                                    <p>Team Members</p>
                                    
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-light rounded-2 custom-dropdown pt-0 pb-0 "
                                            style={{border:'1px solid rgba(128, 128, 128, 0.514)'}}
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            View All
                                        </button>
                                    </div>
                        </div>
                        
                        {empList.map((entry, index) => (
                            <div key={index} className="custom-legend">
                                
                                <div key={index} className="legend-item">
                                    <img src={entry.img} alt="error" width={40} height={40} style={{borderRadius:'40px',marginRight:'10px'}}/>                                        
                                    <div>
                                        <strong>{entry.name}</strong>
                                        <br />
                                        <small className="text-muted">{entry.role}</small>
                                    </div>                                        
                                </div>
                                <div className="chart-container1" >
                                    <CallOutlinedIcon fontSize="medium" className="icon"/>
                                    <EmailOutlinedIcon fontSize="medium" className="icon"/>
                                    <QuestionAnswerOutlinedIcon fontSize="medium" className="icon"/>
                                </div>                                    
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeDashboard