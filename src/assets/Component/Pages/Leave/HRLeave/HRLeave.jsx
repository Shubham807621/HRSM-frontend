import React, { useState,useRef } from "react";
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


export default function HRLeave() 
{
    const hrLeaveRef = useRef();
    const stats = [
        { title: "Total Present", count: "180/200", icon: <FaUserCheck />, color: "#03c95a" },
        { title: "Planned Leaves", count: "10", icon: <FaUsers />, color: "#fd3995" },
        { title: "Unplanned Leaves", count: "10", icon: <FaUserTimes />, color: "#ffc107" },
        { title: "Pending Requests", count: "15", icon: <FaUserClock />, color: "#0dcaf0" },
      ];
  
      const leaveData = [
        {
          id: 1,
          name: "Anthony Lewis",
          role: "Finance",
          leaveType: "Medical Leave",
          from: "14 Jan 2024",
          to: "15 Jan 2024",
          days: "2 Days",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: 2,
          name: "Brian Villalobos",
          role: "Developer",
          leaveType: "Casual Leave",
          from: "21 Jan 2024",
          to: "25 Jan 2024",
          days: "5 Days",
          profileImg: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
          id: 3,
          name: "Harvey Smith",
          role: "Developer",
          leaveType: "Medical Leave",
          from: "20 Feb 2024",
          to: "22 Feb 2024",
          days: "3 Days",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
        },
    
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
    return (
    
    <>
        <div className="mainhrleave">
        <div className="button-wrapper1 mt-2">
                <h1 className="titleE">HR Leave</h1>
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
                    <Button className="add-employee-btn">
                      <AddIcon className="icon" />
                      Add Leave
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

            <div className="container1 bg-light mt-4">
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
                        <thead className="table-light">
                            <tr>
                            <th>
                                <Form.Check type="checkbox" />
                            </th>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>No of Days</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveData.map((leave, index) => (
                            <tr key={index}>
                                <td>
                                <Form.Check type="checkbox" />
                                </td>
                                <td className="d-flex align-items-center">
                                <img
                                    src={leave.profileImg}
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                />
                                <div>
                                    <p className="mb-0 fw-semibold">{leave.name}</p>
                                    <small className="text-muted">{leave.role}</small>
                                </div>
                                </td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.from}</td>
                                <td>{leave.to}</td>
                                <td>{leave.days}</td>
                                <td>
                                <Button variant="outline-primary" size="sm" className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                    <FaTrash />
                                </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    
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