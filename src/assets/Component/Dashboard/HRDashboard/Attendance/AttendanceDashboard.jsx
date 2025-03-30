import React ,{useEffect, useState}from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import profilePic from "../../../../Images/profilePic.jpeg"
import { MdCalendarMonth } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import './attendance.css'
import { getEmployeesList } from "../../../APIService/apiservice";

export default function AttendanceDashboard({}) {

  const profiles = [
    { id: 1, name: "Daniel Esbella", role: "UI/UX Designer", time:"🕒 09:15"},
    { id: 2, name: "Doglas Martini", role: "Project Manager", time:"🕒 09:36" },
  ];
  

  const data = [
    { value: 40, color: "#03c95a" }, // Present
    { value: 21, color: "#14144a" }, // Late
    { value: 2, color: "#FFD700" }, // Permission
    { value: 15, color: "#FF0000" }, // Absent
  ];


  const [activeProfile, setActiveProfile] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const token = localStorage.getItem('token');


   useEffect(()=>{
  
        const fetchEmployeesList = async () =>{
        
            try{
            const respone = await getEmployeesList(token);
            console.log(respone)
            setEmployeeList(respone);
            
          }
          catch (error) {
            console.log(error)
          }
          
        };
        fetchEmployeesList();
        
      },[])
      const departmentBgColors = {
        Backend: "#EBF4FF",
        Development: "#FAE7E7",
        "Quality Assurance": "#F7EEF9",
        DevOps: "#EBF4FF",
        "UI/UX": "pink",
      };
      const departmenttextColors = {
        Backend: "blue",
        Development: "#E70D0D",
        "Quality Assurance": "#AB47BC",
        DevOps: "#1B84FF",
        "UI/UX": "#E70D0D",
      };


  return (
    <>
      <div className="dashboard-container my-3">                
        <div className="cards-container">
          {/* Attendance Overview */}
          <div className="card">
            <div className="card-header">
              <h5>Attendance Overview</h5>
              <button className="date-btn"><MdCalendarMonth/> Today</button>
            </div>
            <div className="pie-container1">
              <PieChart
                className="pie"
                series={[{
                  data,
                  innerRadius: 80,
                  outerRadius: 140,
                  paddingAngle: 2,
                  cornerRadius: 6,
                  startAngle: -99,
                  endAngle: 99,
                  cx: 240,
                  cy: 140,
                }]}
                width={500}
                height={200}
                legend={{ hidden: true }}
              />
              <div className="total-attendance">
                <p>Total Attendance</p>
                <h5>120</h5>
              </div>
            </div>
            <div className="status-list">
              <h5>Status</h5>
              <ul>
                <li><span className="text-success">● Present</span> <span className="percent">59%</span></li>
                <li><span className="text-secondary">● Late</span> <span className="percent">21%</span></li>
                <li><span className="text-warning">● Permission</span> <span className="percent">2%</span></li>
                <li><span className="text-danger">● Absent</span> <span className="percent">15%</span></li>
              </ul>
            </div>
            <div className="card-footer">
              <p>Total Absenties</p>
              <button className="view-details">View Details</button>
            </div>
          </div>

          {/* Clock-In/Out */}
          <div className="card">
            <div className="card-header2">
              <h5 style={{ fontSize:'16px'}}>Clock-In/Out</h5>
              <div className="filters">
                <select className="card-select mb-2">
                  <option>All Departments</option>
                  <option>UI/UX</option>
                  <option>Development</option>
                  <option>Management</option>
                  <option>HR</option>
                  <option>Testing</option>
                  <option>Marketing</option>
                </select>
                <button className="date-btn mb-2"><MdCalendarMonth/> Today</button>
              </div>
            </div>
            <div className="employee-list mt-2">
                    {profiles.map((profile) => (
                      <div className="employee-cards my-2" key={profile.id}
                      onClick={() => setActiveProfile(profile.id === activeProfile ? null : profile.id)}>
                            <div className="employee-card" >
                              <img src={profilePic} alt="Doglas" />
                              <div >
                                <p className="m-0">{profile.name}</p>
                                <p style={{color:'gray', fontSize:'12px'}}>{profile.role}</p>
                              </div>
                              <span className="clock-in-time">{profile.time}</span>
                            </div>
                            {activeProfile === profile.id && (
                            <div className="details">
                              <ul className="click">
                                <li>Clock In<br/>10:30 AM</li>
                                <li>Clock Out<br/>09:45 AM</li>
                                <li>Production<br/>09:21 Hrs</li>
                              </ul>
                            </div>
                          )}
                      </div>
                      
                    ))}

              </div>
              <p style={{marginLeft:'20px',marginTop:'5', fontWeight:'bold'}}>Late</p>
              <div className="employee-list">
                      <div className="employee-card my-1">
                        <img src={profilePic} alt="Daniel" />
                        <div >
                          <p className="m-0">Daniel Esbella <span className="clock-in-time ms-2">🕒 30 min</span></p>
                          <p style={{color:'gray', fontSize:'12px'}}>UI/UX Designer</p>
                        </div>
                        <span className="clock-late-time">🕒 09:15</span>
                      </div>
            
                      <div className="employee-card my-2">
                        <img src={profilePic} alt="Doglas" />
                        <div >
                        <p className="m-0">Doglas Martini <span className="clock-in-time ms-2">🕒 30 min</span></p>
                          <p style={{color:'gray', fontSize:'12px'}}>Project Manager</p>
                        </div>
                        <span className="clock-late-time">🕒 09:36</span>
                      </div>
              </div>
            <button className="view-details mt-1   py-2">View Details</button>
          </div>


          {/* Jobs Applicants */}
          <div className="card" style={{height:"370px"}}>
            <div className="card-header">
              <h6>Job Applicants</h6>
              <button className="view-details-small"> View All</button>
            </div>
            <div className="job-container">
              <div className="job-header mt-3">
                <p className="opening">Opening</p>
                <p className="applicants">Applicants</p>
              </div>
              <div className="job-opening">
                <div className="job-list">
                  <img src={profilePic} alt="Doglas"  style={{width:'40px', height:'40px'}}/>
                  <div>
                    <h5>Junior React Developer</h5>
                    <p style={{fontSize:'12px'}}>No. Of Openings: 30</p>
                  </div>
                </div>
                <div>
                  <MdEditSquare/>
                </div>
              </div>
              <div className="job-opening mt-2">
                <div className="job-list">
                  <img src={profilePic} alt="Doglas"  style={{width:'40px', height:'40px'}}/>
                  <div>
                    <h5>Junior React Developer</h5>
                    <p style={{fontSize:'12px'}}>No. Of Openings: 30</p>
                  </div>
                </div>
                <div>
                  <MdEditSquare/>
                </div>
              </div>
            </div>
          </div>


          {/* Employees */}
          <div className="card mb-5">
            <div className="card-header-emp ">
                <h6>Employees</h6>
                <button className="view-details-small"> View All</button>
            </div>
            <div className="employee-data px-5">
              <p className="name">Employees Name</p>
              <p className="dept">Department</p>
            </div>
        
              
            {employeeList.slice(0, 3).map((emp, index) => (
              <div className="employee-item" key={index}>
                {/* <img src={emp.profilePic} alt={emp.name} className="profile-pic" /> */}
                <div className="employee-details ms-5">
                  <p className="emp-title">{emp.name}</p>
                  <p className="designation">{emp.designation}</p>
                </div>
                <span
                  className="department-badge me-5"
                  style={
                    {
                      backgroundColor: departmentBgColors[emp.team] || "#FFEDF6",
                      color: departmenttextColors[emp.team] || "#FD3995"

                    }}
                >
                  {emp.team}
                </span>
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </>
  )
}
