import React, { useState }   from 'react'

import "./trainDash.css";
import { Table, Form, Dropdown, Button, Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { FaBook, FaUser, FaCheckCircle, FaVideo } from "react-icons/fa";
import {  Badge, Pagination,} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";


export default function TrainDash() {
    const [show, setShow] = useState(false);


    const statsData = [
        { title: "Total Training", value: "25+", icon: <FaBook />, bgColor: "#03c95a" },
        { title: "Total Trainee", value: "313", icon: <FaUser />, bgColor: "#1b84ff" },
        { title: "Complete Training", value: "15", icon: <FaCheckCircle />, bgColor: "#ab47bc" },
        { title: "Upcoming Training", value: "5", icon: <FaVideo />, bgColor: "#fd3995" },
      ];
    
      const trainingData = [
        { id: 1, title: "Creating RESTful APIs with PHP", trainer: "Naira Muskan", employees: 15, duration: "Jul 02 2024 - Sep 30 2024", time: "9:00AM - 12:00PM", cost: 299, status: "Upcoming", img: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, title: "PHP for WordPress Development", trainer: "Rimi Islam", employees: 15, duration: "Oct 25 2024 - Nov 15 2024", time: "2:00PM - 4:00PM", cost: 199, status: "Open", img: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 3, title: "Full-Stack Web Development Bootcamp", trainer: "Mason Rodriguez", employees: 15, duration: "Jan 05 2024 - Mar 30 2024", time: "11:00AM - 1:00PM", cost: 199, status: "Complete", img: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, title: "Introduction to Cloud Computing with AWS", trainer: "Lily Campbell", employees: 15, duration: "May 25 2024 - Aug 15 2024", time: "9:00PM - 11:00PM", cost: 199, status: "Open", img: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 5, title: "Version Control with Git and GitHub", trainer: "Sophia Miller", employees: 15, duration: "Feb 14 2024 - Dec 15 2024", time: "7:00PM - 11:00PM", cost: 199, status: "Open", img: "https://randomuser.me/api/portraits/women/5.jpg" },
        { id: 6, title: "Integrating Third-Party APIs with PHP", trainer: "Benjamin Hayes", employees: 15, duration: "Jun 25 2022 - Sep 15 2022", time: "11:00AM - 2:00PM", cost: 99, status: "Open", img: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: 7, title: "PHP and Laravel Security Best Practices", trainer: "Harper Martinez", employees: 15, duration: "Jan 01 2024 - Dec 31 2024", time: "9:00AM - 1:00PM", cost: 299, status: "Cancel", img: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: 8, title: "HTML and CSS: The Complete Guide", trainer: "Samuel Brown", employees: 15, duration: "May 25 2024 - Aug 15 2024", time: "3:30PM - 6:30PM", cost: 59, status: "Complete", img: "https://randomuser.me/api/portraits/men/8.jpg" },
        { id: 9, title: "SEO Best Practices with HTML5", trainer: "Gabriel Sanders", employees: 15, duration: "Dec 05 2024 - Jul 31 2024", time: "10:00AM - 12:00PM", cost: 199, status: "Complete", img: "https://randomuser.me/api/portraits/women/9.jpg" },
        { id: 10, title: "Custom Theme Development in WordPress", trainer: "Addison Nelson", employees: 15, duration: "Aug 05 2024 - Oct 15 2024", time: "10:00AM - 12:00PM", cost: 199, status: "Cancel", img: "https://randomuser.me/api/portraits/men/10.jpg" },
      ];
      
      const statusColors = {
        Upcoming: "warning",
        Open: "primary",
        Complete: "success",
        Cancel: "danger",
      };
    
      const userRole = localStorage.getItem("role");
      console.log(userRole)
      const rowsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(trainingData.length / rowsPerPage);
      
      // Use trainingData instead of leaveData
      const currentData = trainingData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
      ); 

      // ✅ Fix: Separate state for list of training records
    const [trainingDataList, setTrainingDataList] = useState(trainingData);
  
    // Open & Close Modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    // Handle Input Change
    const handleChange = (e) => {
        setTrainingDataList({ ...trainingData, [e.target.name]: e.target.value });
    };
  
    // ✅ Fix: Update the training list when adding new training
    const handleSubmit = () => {
      if (trainingData.trainingType && trainingData.trainer && trainingData.startDate) {
        setTrainingDataList([...trainingDataList, { ...trainingData, id: trainingDataList.length + 1 }]);
        setTrainingDataList({  // Reset form after submission
          trainingType: "",
          trainer: "",
          employees: "",
          trainingCost: "",
          startDate: "",
          endDate: "",
          description: "",
          status: "Active",
        });
        handleClose();
      } else {
        alert("Please fill all required fields!");
      }
    };
//     const [trainingData1, setTrainingData] = useState({
//       trainingType: "",
//       trainer: "",
//       employees: "",
//       trainingCost: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       status: "Active",
//     });
  
  return (
    <>
        <div className="mainTrainDash">
            <div className="button-wrapper1 mt-2">
                <h1 className="titleE">Training Dashboard</h1>
                {/* Right Section: Buttons */}
                <div className="button-wrapper d-flex">

                {userRole === "HR" && (
                      <div className="container">
                      {/* Add Training Button */}
                      <Button className="add-employee-btn" onClick={handleShow}>
                          + Add Training
                      </Button>
  
                      {/* Modal */}
                      <Modal show={show} onHide={handleClose} size="lg" centered>
                          <Modal.Header closeButton>
                          <Modal.Title>Add Training</Modal.Title>
                          </Modal.Header>
  
                          <Modal.Body>
                          <Form>
                              <div className="row">
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Training Type</Form.Label>
                                  <Form.Select name="trainingType" onChange={handleChange}>
                                      <option>Select</option>
                                      <option>React Training</option>
                                      <option>NodeJS Training</option>
                                      <option>Git Training</option>
                                  </Form.Select>
                                  </Form.Group>
                              </div>
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Trainer</Form.Label>
                                  <Form.Select name="trainer" onChange={handleChange}>
                                      <option>Select</option>
                                      <option>John Doe</option>
                                      <option>Jane Smith</option>
                                  </Form.Select>
                                  </Form.Group>
                              </div>
  
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Employees</Form.Label>
                                  <Form.Select name="employees" onChange={handleChange}>
                                      <option>Select</option>
                                      <option>Employee A</option>
                                      <option>Employee B</option>
                                  </Form.Select>
                                  </Form.Group>
                              </div>
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Training Cost</Form.Label>
                                  <Form.Control type="text" name="trainingCost" onChange={handleChange} />
                                  </Form.Group>
                              </div>
  
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Start Date</Form.Label>
                                  <Form.Control type="date" name="startDate" onChange={handleChange} required />
                                  </Form.Group>
                              </div>
                              <div className="col-md-6">
                                  <Form.Group className="mb-3">
                                  <Form.Label>End Date</Form.Label>
                                  <Form.Control type="date" name="endDate" onChange={handleChange} />
                                  </Form.Group>
                              </div>
  
                              <div className="col-12">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} />
                                  </Form.Group>
                              </div>
  
                              <div className="col-12">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Status</Form.Label>
                                  <Form.Control type="text" name="status" value="Active" disabled />
                                  </Form.Group>
                              </div>
                              </div>
                          </Form>
                          </Modal.Body>
  
                          <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                              Cancel
                          </Button>
                          <Button variant="warning" onClick={handleSubmit}>
                              Add Training
                          </Button>
                          </Modal.Footer>
                      </Modal>
                      </div>
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
                    <Link to="/employee" className="breadcrumb-link">Training</Link>
                </li>
                <li className="breadcrumb-separator">/</li>
                <li className="breadcrumb-current">Training</li>
                </ul>
            </div>

            <div className="container1 d-flex justify-content-between mt-4">
                {statsData.map((stat, index) => (
                    <div key={index} className="stats-card shadow-sm d-flex justify-content-between align-items-center">
                    
                    <div className="stats-details">
                        <p className="stats-title">{stat.title}</p>
                        <h4 className="stats-value">{stat.value}</h4>
                    </div>
                    <div className="icon-wrapper " style={{ backgroundColor: stat.bgColor }}>
                        {stat.icon}
                    </div>
                    </div>
                ))}
            </div>

            <div className="container2 mt-4">
                <Table hover responsive className="training-table p-1">
                    <thead className='table-light py-1'>
                    <tr>
                        <th>#</th>
                        <th>Training Title</th>
                        <th>Trainer</th>
                        <th>Training Duration</th>
                        <th>Time</th>
                        <th className='px-4'>Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody >
                        {currentData.map((training, index) => (
                            <tr className='py-3' key={index}>
                            
                            <td>{index + 1}</td>
                            <td>{training.title}</td>
                            <td>
                                {training.trainer}
                            </td>
                            <td>{training.duration}</td>
                            <td>{training.time}</td>
                            <td>{training.cost}</td>
                            <td><Badge bg={statusColors[training.status]}>{training.status}</Badge></td>
                            <td className='action-btn'>
                                <Button variant="outline-success" size="sm" className="me-2"><FaEdit /></Button>
                                <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                
                    <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                        <span>Showing {currentData.length} of {trainingData.length} entries</span>
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