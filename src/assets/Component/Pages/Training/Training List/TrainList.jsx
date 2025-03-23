import React, { useEffect, useState } from 'react'
import "./trainList.css";
import {Button } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { getAllTraining } from '../../../APIService/apiservice';


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
  ];



  
export default function TrainList() {

  const token = localStorage.getItem('token');

  const [trainingList, setTrainingList] = useState([])

  useEffect(()=>{

    const fetchTrainingList = async () =>{
    
      try{
        const respone = await getAllTraining(token);

        setTrainingList(respone)
      }
      catch (error) {
        console.log(error)
    }

    };
    fetchTrainingList();

  },[])
  return (
        <>
             <div className="mainTrainList">
                <div className="button-wrapper1 mt-2">
                    <h1 className="titleE">Training List</h1>
                    {/* Right Section: Buttons */}
                    <div className="button-wrapper d-flex">
                    <Button className="add-employee-btn">
                        Add New Trainee
                    </Button>
                    <Button className="add-employee-btn">
                        Add New Training
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
                    <li className="breadcrumb-current">Training List</li>
                    </ul>
                </div>

                <div className="container my-4">
                {trainingList.map((course) => (
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
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="mb-0">Showing 1 to {trainingData.length} of {trainingData.length} entries</p>
                    <div>
                    <button className="btn btn-light me-2">← Previous</button>
                    <button className="btn btn-light">Next →</button>
                    </div>
                </div>
                </div>

            </div>



        </>
  )
}