import { FaFolder,FaPeopleGroup } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { HiBriefcase } from "react-icons/hi2";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarMonth } from "react-icons/md";
import './department.css'
import { Link } from "react-router-dom";
import { getEmployeesCount, getEmployeesCountByDepartment, getProjectAndClientCount } from "../../../APIService/apiservice";




export default function Department() {
    const [totalEMP , setTotalEMP] = useState();
    const [count, setCount] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };


  const [empCount, setEmpCount] = useState([]);
  const token = localStorage.getItem('token');


const data = [
    { department: "UI/UX", employees: 50 },
    { department: "Development", employees: 110 },
    { department: "Management", employees: 90 },
    { department: "HR", employees: 20 },
    { department: "Testing", employees: 60 },
    { department: "Marketing", employees: 100 },
  ];
  
  const stats = [
    { title: "Total Employee", value: totalEMP },
    { title: "On Leave Employee", value: 3 },
    { title: "Total Project", value: count.totalProjectCount},
    { title: "Total Jobs", value: 5 },
    { title: "Total Client", value: count.totalClientCount },
    { title: "Total Training", value: count.totalTrainingCount},
  ];

    useEffect(()=>{

      const fetchEmployeesCount = async () =>{
      
          try{
          const respone = await getEmployeesCount(token);
          setTotalEMP(respone)
          
        }
        catch (error) {
          console.log(error)
        }
        
      };
      fetchEmployeesCount();
      
    },[])

    useEffect(()=>{
  
      const fetchEmpCount = async () =>{
      
        try{
          const respone = await getEmployeesCountByDepartment(token);
          console.log(respone)
          setEmpCount(respone);
        }
        catch (error) {
          console.log(error)
      }
  
      };
      fetchEmpCount();
  
    },[])

    useEffect(()=>{

      const fetchProjectAndClient = async () =>{
      
          try{
          const respone = await getProjectAndClientCount(token);
          setCount(respone)
          console.log(respone)
        }
        catch (error) {
          console.log(error)
        }
        
      };
      fetchProjectAndClient();
      
    },[])



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
            data={empCount}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
             <defs>
    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="11%" stopColor="rgba(0,116,255,1)" />
      <stop offset="35%" stopColor="rgba(22,150,253,1)" />
      <stop offset="80%" stopColor="rgba(39,138,250,1)" />
    </linearGradient>
  </defs>
              <XAxis  
                  type="number" 
                  tick={{ fontSize: 12 }}  />
              <YAxis 
                  type="category" 
                  dataKey="team" 
                  width={80}  // Increase width for better visibility
                  tick={{ fontSize: 12 }} 
                />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="url(#barGradient)" 
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

