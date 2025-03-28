import React, { useEffect, useState } from 'react'
import "./trainList.css";
import {Button,Pagination } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { getAllTraining } from '../../../APIService/apiservice';




  
export default function TrainList() {
  const trainingData = [
    {
      id: 1,
      title: "Full-Stack Web Development Bootcamp",
      trainer: "Nutan Kurkute",
      duration: "Jan 01 2024 - Dec 31 2024",
      price: "$199.00",
    },
    {
      id: 2,
      title: "SEO Best Practices with HTML5",
      trainer: "Dhanu Babar",
      duration: "April 02 2025 - Sep 30 2025",
      price: "Free",
    },
    {
      id: 3,
      title: "Version Control with Git and GitHub",
      trainer: "Shubham Musale",
      duration: "Oct 05 2024 - April 30 2025",
      price: "$299.00",
    },
    {
      id: 4,
      title: "PHP for WordPress Development",
      trainer: "Varshita Reddy",
      duration: "Aug 05 2024 - Oct 15 2024",
      price: "Free",
    },
    {
      id: 5,
      title: "SEO Best Practices with HTML5",
      trainer: "Dhanu Babar",
      duration: "April 02 2025 - Sep 30 2025",
      price: "Free",
    },
    {
      id: 6,
      title: "Version Control with Git and GitHub",
      trainer: "Shubham Musale",
      duration: "Oct 05 2024 - April 30 2025",
      price: "$299.00",
    },
    {
      id: 7,
      title: "PHP for WordPress Development",
      trainer: "Varshita Reddy",
      duration: "Aug 05 2024 - Oct 15 2024",
      price: "Free",
    },
  ];


  const userRole = localStorage.getItem("role");

  const token = localStorage.getItem('token');

  const [trainingList, setTrainingList] = useState([])

  useEffect(()=>{

    const fetchTrainingList = async () =>{
    
      try{
        const respone = await getAllTraining(token);
        console.log(respone)
        setTrainingList(respone)
      }
      catch (error) {
        console.log(error)
    }

    };
    fetchTrainingList();

  },[])

      const rowsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(trainingList.length / rowsPerPage);
      
      const currentData = trainingList.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );


  return (
        <>
             <div className="mainTrainList">
                <div className="button-wrapper1 mt-2">
                    <h1 className="titleE">Training List</h1>
                    {/* Right Section: Buttons */}
        
{/* 
                    {userRole === "HR" && (
                      <div  className="button-wrapper d-flex">
                        <Button className="add-employee-btn">Add New Trainee</Button>
                        <Button className="add-employee-btn">Add New Training</Button>
                      </div>
                    )}  */}
                    
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
                    <li className="breadcrumb-current">Training List</li>
                    </ul>
                </div>

                <div className="container my-4">
                {currentData.map((course) => (
                    <div key={course.id} className="card  mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                        <h5 className="text-orange">{course.title}</h5>
                        <p className="text-muted train">By {course.trainer}</p>
                        <p className=" duration mb-0">{course.duration} <span className="fw-bold ">{course.price}</span></p>
                        </div>
                        <button className="btn btn-orange">Enroll</button>
                    </div>
                    </div>
                ))}

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                        <span>Showing {currentData.length} of {trainingList.length} entries</span>
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