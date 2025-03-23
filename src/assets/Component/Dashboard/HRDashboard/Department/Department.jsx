import { FaFolder,FaPeopleGroup } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { HiBriefcase } from "react-icons/hi2";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarMonth } from "react-icons/md";
import './department.css'
import { Link } from "react-router-dom";




export default function Department() {
    
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

const data = [
    { department: "UI/UX", employees: 50 },
    { department: "Development", employees: 110 },
    { department: "Management", employees: 90 },
    { department: "HR", employees: 20 },
    { department: "Testing", employees: 60 },
    { department: "Marketing", employees: 100 },
  ];
  
  const stats = [
    { title: "Total Employee", value: 100 },
    { title: "On Leave Employee", value: 10 },
    { title: "Total Project", value: 20 },
    { title: "Total Jobs", value: 55 },
    { title: "Total Client", value: 20 },
    { title: "Total Employee", value: 100 },
  ];
  return (
    <>
    <div className="department-container">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="icons" >
              {(index==0 ||index==1 || index==5) && <MdGroups className="icon" ></MdGroups>}
              {index==2 && <FaFolder className="icon" />}
              {index==3 && <HiBriefcase className="icon" />}
              {index==4 && <FaPeopleGroup className="icon" />}
            </div>
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
            <Link to="#">View Details</Link>
          </div>
        ))}
      </div>
      
      <div className="chart-container">
        <div className="chart-head">
          <h3>Employees By Department</h3>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid lightgray',
                borderRadius: '4px',
                padding: '8px 12px',
                paddingTop: 'None',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                height:'20px' ,
                fontSize:'small'
              }}
            >
              <MdCalendarMonth style={{ marginRight: '8px' }} />
              {selectedDate ? selectedDate.toLocaleDateString() : 'week'}
          </button>
            {isOpen && (
              <div className="Calendar">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                />
              </div>
            )}
        </div>
        </div>
        {/*Barchart*/}

        <ResponsiveContainer className="bar-chart p-0" width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
              <XAxis  
                  type="number" 
                  tick={{ fontSize: 12 }}  />
              <YAxis 
                  type="category" 
                  dataKey="department" 
                  width={80}  // Increase width for better visibility
                  tick={{ fontSize: 12 }} 
                />
              <Tooltip />
              <Bar 
                dataKey="employees" 
                fill="#ff7300" 
                barSize={10} 
                isAnimationActive={false} 
                
                radius={[5, 5, 5, 5]}  />
          </BarChart>
        </ResponsiveContainer>

        <p className="increase-text">
          <span className="text-warning">●</span> No of Employees increased by <span className="percentage-text">+20%</span> from last Week
        </p>
      </div>

    </div>
    
    </>
  )
}

