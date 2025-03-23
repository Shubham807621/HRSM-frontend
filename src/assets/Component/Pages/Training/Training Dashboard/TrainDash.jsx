import React from 'react'
import "./trainDash.css";
import { Table, Form, Dropdown, Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { FaBook, FaUser, FaCheckCircle, FaVideo } from "react-icons/fa";
import {  Badge, Pagination,} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";


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

export default function TrainDash() {
  return (
    <>
        <div className="mainTrainDash">
            <div className="button-wrapper1 mt-2">
                <h1 className="titleE">Training Dashboard</h1>
                {/* Right Section: Buttons */}
                <div className="button-wrapper d-flex">
                <Button className="add-employee-btn">
                    <AddIcon className="icon" />
                    Add Training
                </Button>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
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
                        {trainingData.map((training, index) => (
                            <tr className='py-3' key={training.id}>
                           
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

                   
                    <Pagination className="justify-content-end">
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                    </div>





         </div>
    
    
    
    
    
    
    </>
  )
}