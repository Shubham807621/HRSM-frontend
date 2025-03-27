import React, { useEffect, useState,useRef } from 'react'
import './employee.css';  
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import { Form } from "react-bootstrap";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';
import { getEmployeesCount, getEmployeesList } from '../../APIService/apiservice';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function Employee() {
  const employeeRef = useRef();

  const [employeeList, setEmployeeList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [totalEMP , setTotalEMP] = useState();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem("role");

const activeEmployees = employeeList.filter(emp => emp.status === "ACTIVE").length;
const inactiveEmployees = employeeList.filter(emp => emp.status === "INACTIVE").length;

 // Employee Data for Cards
 const stats = [
  { 
    title: "Total Employees", 
    count: totalEMP, 
    icon: <PeopleAltIcon style={{ color: "blue", fontSize: "30px", marginLeft: "10px" }} /> 
  },
  { 
    title: "Active", 
    count: activeEmployees, 
    icon: <PersonIcon style={{ color: "green", fontSize: "30px", marginLeft: "10px" }} /> 
  },
  { 
    title: "Inactive", 
    count: inactiveEmployees, 
    icon: <PersonOffIcon style={{ color: "red", fontSize: "30px", marginLeft: "10px" }} /> 
  },
  { 
    title: "New Joiners", 
    count: 33, 
    icon: <PersonAddIcon style={{ color: "purple", fontSize: "30px", marginLeft: "10px" }} /> 
  },
];


    
    useEffect(()=>{

      const fetchEmployeesList = async () =>{
      
          try{
          const respone = await getEmployeesList(token);
          setEmployeeList(respone);
          
        }
        catch (error) {
          console.log(error)
        }
        
      };
      fetchEmployeesList();
      
    },[])


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
    
    
    // console.log(employeeList);
      const downloadPDF = () => {
        if (!employeeRef.current) return;
    
        html2canvas(employeeRef.current, { scale: window.devicePixelRatio }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save('employee_list.pdf');
        });
      };


  return (
    <>
     <div className="maindiv">
        <div className="button-wrapper1 mt-2">
          <h1 className="titleE">Employee</h1>
            {/* Right Section: Buttons */}
          
            <div className="button-wrapper d-flex">
            <Form.Select
              onChange={(e) => {
                if (e.target.value === 'pdf') {
                  downloadPDF();
                  e.target.value = '';
                }
              }}
            >
              <option value="">Export</option>
              <option value="pdf">PDF</option>
            </Form.Select>

              {userRole === "HR" && (
                <Button className="add-employee-btn">
                <AddIcon className="icon" />
                Add Employee
              </Button>
              )}
            
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
          <div className=" mb-3 emp-filters">
            <div className='ms-4'><h4>Employee list</h4></div>
            <div className='d-flex align-items-center justify-content-between'>
              <input type="date" className="form-control w-auto m-0 me-3" />
              <select className="form-select w-auto me-3">
                <option>Designation</option>
              </select>

              {/* <select className="form-select w-auto me-3">
                <option>Select Status</option>
              </select> */}
              <select
                    className='form-select w-auto me-3'
                    style={{ fontSize: '14px' }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    >
                    <option value="All">Select Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="Inactive">Inactive</option>
              </select>


              
              <select className="form-select w-auto me-3 ">
                <option>Sort by: Last 7 Days</option>
              </select>
            </div>
          </div>
          <div className="table-responsive emp-table" ref={employeeRef}>
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Phone</th>
                    <th>Designation</th>
                    <th>Status</th>
                    {userRole === "HR" && (

                    <th>Actions</th>
                    )}
                  </tr>
                </thead>
            <tbody>
              {employeeList
                .filter((emp) => statusFilter === 'All' || emp.status === statusFilter)
                .map((emp, index) => (
                <tr key={index}>
               
                  <td>
                  <Link to={`/employee-details/${emp.empId}`}>
                    {emp.empId}
                  </Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
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
                        style={
                          { backgroundColor: emp.status === "ACTIVE" ? "#03c95a" : "#dc3545", color: "white",
                            
                          }}
                      >
                        {emp.status}
                      </span>
                  </td>
                  {userRole === "HR" && (

                  <td>
                    <EditIcon className="fs-5 me-2 cursor-pointer" />
                    <DeleteIcon className=" fs-5 cursor-pointer" />
                  </td>

                  )}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
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