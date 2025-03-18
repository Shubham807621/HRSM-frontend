import React from "react";
import { PieChart, Pie, Cell } from "recharts";
// import profilePic from "./profilePic.jpeg"
import { MdCalendarMonth } from "react-icons/md";
import './attendance.css'

export default function AttendanceDashboard() {

    const data = [
        { name: "Dark Blue", value: 40, color: "#0d3b66" },
        { name: "Green", value: 20, color: "#00a676" },
        { name: "Yellow", value: 30, color: "#ffcc00" },
        { name: "Red", value: 10, color: "#ff3d3d" },
      ];
  return (
    <>
    <div className="attendance-container">

{/* Attendance Overview */}
<div className="card1">
  <div className="card-header">
    <h6>Attendance Overview</h6>
    <button className="date-btn"><MdCalendarMonth/> Today</button>
  </div><hr/>
  <div className="gauge-container">
      <PieChart width={250} height={130}>
          <Pie
            data={data}
            startAngle={180} // Start from the left side
            endAngle={0} // End at the right side
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            cx="50%" // Center X position
            cy="100%" // Move center downward to clip the lower half
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
      </PieChart>
          <div className="gauge-center">
              <p>Total Attendance</p>
              <h2>120</h2>
          </div>
  </div>
</div>

<div className="card2">
  <div className="card-header">
    <h5>Clock-In/Out</h5>
    <div className="filters">
      <select className="card-select">
        <option>All Departments</option>
        <option>UI/UX</option>
        <option>Development</option>
        <option>Management</option>
        <option>HR</option>
        <option>Testing</option>
        <option>Marketing</option>
      </select>
      <button className="date-btn"><MdCalendarMonth/> Today</button>
    </div>
  </div>
  <hr/>

  <div className="employee-list">
    <div className="employee-card">
      <img src='#' alt="Daniel" />
      <div className="employee-info">
        <h4>Daniel Esbella</h4>
        <p>UI/UX Designer</p>
      </div>
      <span className="clock-in-time">🕒 09:15</span>
    </div>

    <div className="employee-card">
      <img src='#' alt="Doglas" />
      <div className="employee-info">
        <h4>Doglas Martini</h4>
        <p>Project Manager</p>
      </div>
      <span className="clock-in-time">🕒 09:36</span>
    </div>
  </div>
</div>
</div>
    </>
  )
}
