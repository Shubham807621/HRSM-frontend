import React, { useEffect, useState } from 'react'
import Department from './Department/Department.jsx'
import HomeIcon from '@mui/icons-material/Home';
import "./hrStyle.css"
import AttendanceDashboard from './Attendance/AttendanceDashboard.jsx';
import { Link } from 'react-router-dom';
import { getEmployeeDashboardDetails } from '../../APIService/apiservice.jsx';

export default function HrDashboard() {


  const token = localStorage.getItem('token');
  const empId = localStorage.getItem('empId');
  const [employee ,SetEmployee] = useState({})

   useEffect(()=>{
  
          const fetchEmployeeDetails = async () =>{
      
              try{
                  const respone = await getEmployeeDashboardDetails(empId, token);
                 
                  SetEmployee(respone)
                  
  
              }
              catch (error) {
                  console.log(error)
              }
  
          };
          fetchEmployeeDetails();
  
      },[empId, token])


      // console.log(employee);
  return (
    <>
           <div className='HR-dashboard-wrapper'>
              <h2 className="titleE text-primary">HR Dashboard</h2>
              <div className="breadcrumb-wrapper">
                <ul className="breadcrumb">
                  <li className='me-2'>
                    <Link to='/' className="breadcrumb-link">
                    <HomeIcon className="home-icon" />
                        </Link>
                  </li>
                  <li className="breadcrumb-separator mx-2">/</li>
                  <li>
                    <Link to="/employee" className="breadcrumb-link">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-separator mx-2">/</li>
                  <li className="breadcrumb-current">HR Dasboard</li>
                </ul>
              </div>

              <div className=' d-flex align-items-center emp-info-box' >
                  <div className="img-wrapper">
                    <img src='https://randomuser.me/api/portraits/men/32.jpg' alt="profile pic" width={50} height={50}/>
                  </div>
                  <div className='info-wrapper'>
                      <h5 >Welcome Back, {employee.name}</h5>
                      <p >You have  pending Approvals &  Leave Requests</p>
                  </div>
              </div>
                <Department/>
                <AttendanceDashboard />
           </div>
    </>
  )
}

