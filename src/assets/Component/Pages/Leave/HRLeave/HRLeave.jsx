import React, { useState,useRef, useEffect } from "react";
import './HrLeave.css'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaUserCheck, FaUserTimes, FaUserClock, FaUsers } from "react-icons/fa";
import { Button } from '@mui/material';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Form, Pagination} from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getLeaveList, updateLeaveStatus } from "../../../APIService/apiservice";


export default function HRLeave() 
{
    const hrLeaveRef = useRef();
    const [leaveData, setLeaveData ]= useState([]);

    const stats = [
        { title: "Total Present", count: "180/200", icon: <FaUserCheck />, color: "#03c95a" },
        { title: "Planned Leaves", count: "10", icon: <FaUsers />, color: "#fd3995" },
        { title: "Unplanned Leaves", count: "10", icon: <FaUserTimes />, color: "#ffc107" },
        { title: "Pending Requests", count: "15", icon: <FaUserClock />, color: "#0dcaf0" },
      ];
  
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 3;
      
        const totalPages = Math.ceil(leaveData.length / itemsPerPage);
        const currentData = leaveData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
  

    const downloadPDF = () => {
        if (!hrLeaveRef.current) return;
    
        html2canvas(hrLeaveRef.current, { scale: window.devicePixelRatio }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save('hrLeave_list.pdf');
        });
      };

      const token = localStorage.getItem('token');
    
    
        useEffect(() => {
          const fetchLeaveList = async () => {
            try {
              const response = await getLeaveList(token);
              console.log(response);
              setLeaveData(response);
            } catch (error) {
              console.error("Error fetching documents:", error);
            }
          };
          fetchLeaveList();
        }, [token]);

        const handleAction = async (status, id , empId,) => {
          try{
              const response = await updateLeaveStatus(token, status, id, empId);
              setLeaveData((prevLeaveData) =>
                prevLeaveData.map((leave) =>
                  leave.id === id ? { ...leave, status } : leave
                )
              );
              
          }
          catch (error) {
            console.error("Error fetching documents:", error);
          }
      };
  





    return (
    
    <>
        <div className="mainhrleave">
        <div className="button-wrapper1 mt-2 ">
                <h1 className="titleE">HR Leave</h1>
        
                <div className="button-wrapper d-flex me-3">
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
                    <li className="breadcrumb-current">Leave</li>
                  </ul>
            </div>
            
               <div className="container my-4">
                <div className="row">
                    {stats.map((stat, index) => (
                    <div key={index} className="col-md-3">
                        <div className="stats-card">
                        <div className="stats-icon" style={{ backgroundColor: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stats-content">
                            <p className="stats-title">{stat.title}</p>
                            <h4 className="stats-count">{stat.count}</h4>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

            <div className="container1  mt-4">
                {/* Header Section */}
                    <div className="d-flex justify-content-between align-items-center mb-3 pt-4 px-4">
                        <h5 className="fw-bold">Leave List</h5>
                        <div className="d-flex gap-2">
                        <Form.Control type="date" className="w-auto" />
                        <Form.Select className="w-auto">
                            <option>Leave Type</option>
                            <option>Medical Leave</option>
                            <option>Casual Leave</option>
                        </Form.Select>
                        <Form.Select className="w-auto">
                            <option>Sort By: Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </Form.Select>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="table-responsive" ref={hrLeaveRef}>
                        <Table  hover className="align-middle">
                        <thead>
                            <tr >
                                <th>Employee</th>
                                <th >Leave Type</th>
                                <th >From</th>
                                <th >To</th>
                                <th >No. of Days</th>
                                <th >Status</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                       <tbody>
                          {leaveData.map((leave, index) => (
                              <tr key={index}>
                                      <td className="d-flex align-items-center">
                                        <div>
                                            <p className="mb-0 fw-semibold">{leave.name}</p>
                                            <small className="text-muted">{leave.designation}</small>
                                        </div>
                                      </td>
                                      <td>{leave.leaveType}</td>
                                      <td>{leave.startDate}</td>
                                      <td>{leave.endDate}</td>
                                      <td>{leave.numberOfDays}</td>
                                      <td>{leave.status}</td>
                                  <td>
                                {leave.status === "PENDING" && (
                                    <>
                                        <button 
                                            className="btn btn-outline-success me-4"
                                            onClick={() => handleAction("APPROVED" , leave.id, leave.empId)}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger"
                                            onClick={() => handleAction( "REJECTED" , leave.id,leave.empId)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                       
                        {/* <Table hover className="align-middle">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Employee</th>
                        <th className="border p-2">Leave Type</th>
                        <th className="border p-2">From</th>
                        <th className="border p-2">To</th>
                        <th className="border p-2">No. of Days</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveData.map((leave, index) => (
                        <tr key={index} className="border">
                             <td className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 fw-semibold">{leave.name}</p>
                                    <small className="text-muted">{leave.role}</small>
                                </div>
                                </td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>{leave.numberOfDays}</td>
                                <td>{leave.status}</td>
                            <td className="border p-2">
                                {leave.status === "PENDING" && (
                                    <>
                                        <button 
                                            className="btn btn-outline-success me-4"
                                            onClick={() => handleAction(leave.id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger"
                                            onClick={() => handleAction(leave.id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}

                    
                    </div>

                             {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                        <span>Showing {currentData.length} of {leaveData.length} entries</span>
                        <Pagination className="mb-0">
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                        {[...Array(totalPages)].map((_, i) => (
                            <Pagination.Item
                            key={i}
                            active={i + 1 === currentPage}
                            onClick={() => setCurrentPage(i + 1)}
                            >
                            {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        />
                        </Pagination>
                    </div>
                

                </div>

                        

        </div>

    </>
  )
}