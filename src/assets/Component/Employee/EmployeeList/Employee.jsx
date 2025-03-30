import React, { useEffect, useState,useRef } from 'react'
import './employee.css';  
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import { Form,Modal,Pagination } from "react-bootstrap";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';
import { createEmployee, getEmployeesCount, getEmployeesList } from '../../APIService/apiservice';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function   Employee() {
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
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  joiningDate: "",
  username: "",
  clientId: "",
  totalExperience: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  reportingOffice: "",
  department: "",
  designation: "",
  about: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await createEmployee(formData, token);
      console.log(response);

    }
    catch (err) {
      console.log(err.response?.data?.message || "Failed to send message.");
    } 

 
  // You can send formData to backend API here
};
    
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

      const rowsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(employeeList.length / rowsPerPage);
      
      const currentData = employeeList.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

  const [show, setShow] = useState(false);

  // Functions to show/hide modal
  const handleShow = () => setShow(true);
  const handleClose = () =>{ 
    
    console.log()
    setShow(false)};


  return (
    <>
     <div className="maindiv">
     <div className="button-wrapper1 mt-2">
        <h1 className="titleE text-primary">Employee </h1>

        <div className="button-wrapper d-flex">
          <div>
            <Form.Select
              onChange={(e) => {
                if (e.target.value === "pdf") {
                  downloadPDF();
                  e.target.value = "";
                }
              }}
            >
              <option value="">Export</option>
              <option value="pdf">PDF</option>
            </Form.Select>
          </div>

          <div className="container-addemp">
                        {/* Add Employee Button */}
                        <Button  className="add-employee-btn" variant="warning" onClick={handleShow}>
                          + Add Employee
                        </Button>

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose} size="lg" centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Add New Employee</Modal.Title>
                          </Modal.Header>
                          
                          <Modal.Body>
                          <Form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>First Name *</Form.Label>
                                  <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Last Name *</Form.Label>
                                  <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Joining Date *</Form.Label>
                                  <Form.Control type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Username *</Form.Label>
                                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Client Id</Form.Label>
                                  <Form.Control type="text" name="clientId" value={formData.clientId} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Total Experience</Form.Label>
                                  <Form.Control type="text" name="totalExperience" value={formData.totalExperience} onChange={handleChange} />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Password *</Form.Label>
                                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Confirm Password *</Form.Label>
                                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Phone Number</Form.Label>
                                  <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Reporting Office *</Form.Label>
                                  <Form.Control type="text" name="reportingOffice" value={formData.reportingOffice} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Department</Form.Label>
                                  <Form.Select name="department" value={formData.department} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="HR">HR</option>
                                    <option value="Engineering">Development</option>
                                    <option value="Sales">UI/UX</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label>Designation</Form.Label>
                                  <Form.Select name="designation" value={formData.designation} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Analyst">Analyst</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>
                              <div className="col-12">
                                <Form.Group className="mb-3">
                                  <Form.Label>About *</Form.Label>
                                  <Form.Control as="textarea" rows={3} name="about" value={formData.about} onChange={handleChange} required />
                                </Form.Group>
                              </div>
                              <div className="col-12 text-center">
                              <Button variant="secondary" onClick={handleClose}>
                              Cancel
                            </Button>
                                <Button type="submit">Submit</Button>
                              </div>
                            </div>
                          </Form>
                          </Modal.Body>

                          {/* <Modal.Footer>
                           
                            <Button variant="warning">Save</Button>
                          </Modal.Footer> */}
                        </Modal>
                      </div>
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

            </div>
          </div>
          <div className="table-responsive emp-table" ref={employeeRef}>
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Email ID</th>
                    {/* <th>Phone</th> */}
                    <th>Designation</th>
                    <th>Status</th>
                    {userRole === "HR" && (

                    <th>Actions</th>
                    )}
                  </tr>
                </thead>
            <tbody>
            {currentData
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
                  {/* <td>{emp.phone}</td> */}
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
          <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                        <span>Showing {currentData.length} of {employeeList.length} entries</span>
                        <Pagination className="mb-0">
                            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                        </Pagination>
                    </div>

        </div>
    </div>

      </>
)
}