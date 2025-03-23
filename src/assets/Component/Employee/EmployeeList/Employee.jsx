import React, { useEffect } from 'react'
import './employee.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';
import { getEmployeesList } from '../../APIService/apiservice';


export default function Employee() {

 // Employee Data for Cards
 const stats = [
  { title: "Total Employee", count: 1000, icon: <PeopleAltIcon style={{ color: "blue", fontSize: "30px", marginLeft: "10px" }} /> },
  { title: "Active", count: 1000, icon: <PersonIcon style={{ color: "green", fontSize: "30px" , marginLeft: "10px" }} /> },
  { title: "Inactive", count: 10, icon: <PersonOffIcon style={{ color: "red", fontSize: "30px" , marginLeft: "10px" }} /> },
  { title: "New Joiners", count: 33, icon: <PersonAddIcon style={{ color: "purple", fontSize: "30px" , marginLeft: "10px" }} /> },
];


const employees = [
  {
    id: "EMP - 123456",
    name: "Anthony Lewis",
    role: "Manager",
    email: "anthony@example.com",
    phone: "+911234567890",
    designation: "Development",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  // Duplicate entries for display (mock data)
  {
    id: "EMP - 123456",
    name: "Anthony Lewis",
    role: "Manager",
    email: "anthony@example.com",
    phone: "+911234567890",
    designation: "Development",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP - 123456",
    name: "Anthony Lewis",
    role: "Manager",
    email: "anthony@example.com",
    phone: "+911234567890",
    designation: "Development",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];


    // const empID = localStorage.getItem('empId');
    // console.log(empID);

    const token = localStorage.getItem('token');
    
    useEffect(()=>{

    const fetchEmployeesList = async () =>{
    
        try{
        const respone = await getEmployeesList(token);
        console.log(respone);
          
        }
        catch (error) {
        console.log(error)
    }

    };
    fetchEmployeesList();

    },[])



  return (
    <>

  
  <div className="maindiv">
              <div className="button-wrapper1 mt-2">
                <h1 className="titleE">Employee</h1>
                 {/* Right Section: Buttons */}
                
                 <div className="button-wrapper d-flex">
                   <Button className="export-btn">
                      <FileDownloadIcon className="icon" />
                      Export <ExpandMoreIcon className="expand-icon"/>
                    </Button>
                    <Button className="add-employee-btn">
                      <AddIcon className="icon" />
                      Add Employee
                    </Button>
                 </div>
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
                      <Link to="/employee" className="breadcrumb-link">Employee</Link>
                    </li>
                    <li className="breadcrumb-separator">/</li>
                    <li className="breadcrumb-current">Employee List</li>
                  </ul>
            </div>
            <div className="infoE">
              <div className="employee-stats">
                  {stats.map((item, index) => (
                    <div key={index} className="stat-card">
                      <div className="icon1">{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p className="ptag">{item.count}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
      

          <div className="container emp-list-contrainer mt-4">
            {/* Filters & Sorting */}
            <div className=" mb-3 emp-filters">
              <input type="date" className="form-control w-auto" />
              <select className="form-select w-auto">
                <option>Designation</option>
              </select>
              <select className="form-select w-auto">
                <option>Select Status</option>
              </select>
              <select className="form-select w-auto">
                <option>Sort by: Last 7 Days</option>
              </select>
            </div>

      {/* Employee Table */}
            <div className="table-responsive emp-table">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Phone</th>
                    <th>Designation</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{emp.id}</td>
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
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <span
                        className="badge"
                        style={{ backgroundColor: emp.status === "Active" ? "#03c95a" : "#dc3545", color: "white" }}
                      >
                        {emp.status}
                      </span>
                  </td>
                  <td>
                    <EditIcon className="fs-5 me-2 cursor-pointer" />
                    <DeleteIcon className=" fs-5 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-outline-secondary mx-1">&lt;</button>
              <span className="btn btn-primary mx-1">1</span>
              <button className="btn btn-outline-secondary mx-1">&gt;</button>
            </div>
          </div>
  
    </div>

      </>
)
}


