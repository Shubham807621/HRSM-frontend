import "./EmployeeDashboard.css"
import React, { useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
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
import { useAttendance } from "../../Pages/Attendance/AttendanceProvider";
import { getEmployeeDetails, getLeaveCount } from "../../APIService/apiservice";


function EmployeeDashboard(){

    const { isPunchedIn, punchInTime, punchInDate, totalHours1, handlePunch } = useAttendance();
 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2024);
    const years = Array.from({ length: 5 }, (_, i) => 2023 + i); // Years from 2020 to 2029
    
    
    const totalHours = 9;
    const workedHours = 5.45;

    const [data, setData] = useState([]);
    
    const data1 = [
        { name: "Worked", value: workedHours },
        { name: "Remaining", value: totalHours - workedHours },
    ];

    const COLORS = ["#002D3C", "#E0E0E0"]; // Blue for worked hours, grey for remaining

    const [skills, setSkills]=useState([]);

  
    const [tasks, setTasks] = useState([
        { name: "Patient appointment", status: "On hold", statusColor: "#E1BEE7"},
        { name: "Appointment booking", status: "In progress", statusColor: "#FFCCBC"},
        { name: "Patient and Doctor video", status: "Completed", statusColor: "#C8E6C9" },
        { name: "Private chat module", status: "Pending", statusColor: "#FFF9C4" },
        { name: "Go-live and post support", status: "In Progress", statusColor: "#FFAB91" },
        { name: "Private chat", status: "On hold", statusColor: "#E1BEE7"},
    ]);

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
  

    const navigate = useNavigate();

    useEffect(()=>{

        const fetchleaveCount = async () =>{
    
            try{
                const respone = await getLeaveCount(empId, token);
                console.log(respone);
                  // Map API response to PieChart data format
                const formattedData = [
                    { name: "Causal Leave", value: respone.causalLeave, color: "#002D3C" },
                    { name: "Earned Leave", value: respone.earnedLeave, color: "#00C853" },
                    { name: "Planned Leave", value: respone.plannedLeave, color: "#F57C00" },
                    { name: "Sick Leave", value: respone.sickLeave, color: "#D50000" },
                    { name: "Flexi Leave", value: respone.flexiLeave, color: "#FFC107" },
                ];

                setData(formattedData);
            }
            catch (error) {
                console.log(error)
            }

        };
        fetchleaveCount();

    },[empId, token])

    useEffect(()=>{

        const fetchEmployeeDetails = async () =>{
    
            try{
                const respone = await getEmployeeDetails(empId, token);
                console.log(respone);
                setSkills(respone.skills)
                setTasks(respone.tasks)
                SetEmployee(respone);

            }
            catch (error) {
                console.log(error)
            }

        };
        fetchEmployeeDetails();

    },[empId, token])

  
    

    const handleButtonSubmit = ()=>{
        navigate('/leave/emp-Leave')
    }

    return(
        <div className="empDashboard ">
            <div className="titleE ">
                <h1 className="text-primary">Employee Dashboard</h1>
            </div>

            <div className="breadcrumb-wrapper mb-2">
                <ul className="breadcrumb">
                    <li>
                        <Link to="/" className="breadcrumb-link">
                        <HomeIcon className="home-icon" />
                        </Link>
                    </li>
                    <li className="breadcrumb-separator">/</li>
                    <li>
                    <Link to="/empDashboard" className="breadcrumb-link">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-separator">/</li>
                    <li className="breadcrumb-current">Employee Dashboard</li>
                </ul>
            </div>
            <div className="emp-container mb-4">
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
                            <button className="apply-leave-btn" onClick={handleButtonSubmit}>Apply New Leave</button>
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
                            <p className="production-info">Production: {totalHours1} hrs</p>
                            <p style={{ fontSize: '14px', paddingBottom: '5px' }}>
                                {isPunchedIn ? `Punched In at ${punchInTime}` : "Not Punched In"}
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
                   
                    <div className="r2-c2">
                        <div className="insiderow">
                            <div className="emp-card">
                                <p className="mt-4 ms-3"><AccessTimeFilledIcon/> &nbsp; <b>8.36/9</b></p>
                                <p>Total Hours Today</p>
                        
                            </div>
                            <div className="emp-card">
                                <p className="mt-4 ms-3"><AccessTimeFilledIcon/> &nbsp; <b>10/40</b></p>
                                <p>Total Hours Week</p>
                
                            </div>
                            <div className="emp-card">
                                <p className="mt-4 ms-3"><TodayIcon/> &nbsp; <b>75/90</b></p>
                                <p>Total Hours Today</p>
        
                            </div>
                            <div className="emp-card">
                                <p className="mt-4 ms-3"><TodayIcon/> &nbsp; <b>16/28</b></p>
                                <p>OverTime this Month</p>
   
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
                        <div className="leave-header my-2">
                                <h5 >My Skills</h5>
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
                                            { value: entry.percentage },
                                            { value: 100 - entry.percentage },
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
                                    }}>{entry.percentage}%</b>
                                </div>                                    
                            </div>
                        ))}
                    </div>
                    
                    <div className="task-table">
                    
                        <div className="task-heading d-flex align-items-center justify-content-between">
                            <h5 className="ps-5">Tasks</h5>
                            <h5 className="pe-5">All Projects</h5>
                        </div>
                            {tasks.map((task, index) => (
                                <div key={index}className="d-flex align-items-center justify-content-between px-3 task-body" >
                                    <div className="task-name ps-2 ">
                                        {task.name}
                                    </div>
                                    <div className="task-status ">
                                        <span className="status-label" style={{ backgroundColor: task.statusColor }}>
                                            {task.status}
                                        </span>
                                       
                                    </div>
                                </div>
                            ))}
                      
                    </div>


                    <div className="team-member">
                        <div className="leave-header my-2">
                                    <h5>Team Members</h5>
                                    
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