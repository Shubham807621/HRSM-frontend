  import React, { useState, useRef, useEffect } from "react";
  import "./EmpLeave.css";
  import { Table, Form, Modal, Button } from "react-bootstrap";
  import HomeIcon from "@mui/icons-material/Home";
  import { Link } from "react-router-dom";
  import FileDownloadIcon from "@mui/icons-material/FileDownload";
  import AddIcon from "@mui/icons-material/Add";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { FaEdit, FaTrash } from "react-icons/fa";
  import {  Pagination} from "react-bootstrap";

  import {
    FaCalendarAlt,
    FaBriefcaseMedical,
    FaUmbrellaBeach,
    FaRegClipboard,
  } from "react-icons/fa";
  import html2canvas from "html2canvas";
  import jsPDF from "jspdf";
  import { getLeaveById } from "../../../APIService/apiservice";

  const leaveStats = [
    { title: "Annual Leaves", count: 5, remaining: 7, color: "dark", icon: <FaCalendarAlt /> },
    { title: "Medical Leaves", count: 11, remaining: 1, color: "blue", icon: <FaBriefcaseMedical /> },
    { title: "Casual Leaves", count: 2, remaining: 10, color: "purple", icon: <FaUmbrellaBeach /> },
    { title: "Other Leaves", count: 7, remaining: 5, color: "pink", icon: <FaRegClipboard /> },
  ];

  export default function EmpLeave() {
    const emLeaveRef = useRef();

    const [leaves, setLeaves] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [leaveFilter, setLeaveFilter] = useState('All');

    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const [leaveData, setLeaveData] = useState({
      employee: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
      status: "Pending",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLeaveData({ ...leaveData, [name]: value });
    };

    const sendLeaveData = async () => {
      console.log("Sending Leave Data:", leaveData);
      try {
        const response = await fetch("/api/leave/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveData),
        });

        const result = await response.json();
        console.log("Response:", result);
        alert("Leave request submitted!");

        setShowLeaveModal(false);
      } catch (error) {
        console.error("Error submitting leave:", error);
        alert("Failed to submit leave request.");
      }
    };

    const downloadPDF = () => {
      if (!emLeaveRef.current) return;

      html2canvas(emLeaveRef.current, { scale: window.devicePixelRatio }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`leave_list.pdf`);
      });
    };

    const token = localStorage.getItem('token');
    const empId = localStorage.getItem('empId');


      useEffect(() => {
        const fetchLeaveList = async () => {
          try {
            const response = await getLeaveById(token , empId);
            console.log(response);
            setLeaves(response);
          } catch (error) {
            console.error("Error fetching documents:", error);
          }
        };
        fetchLeaveList();
      }, [token , empId]);

    
      const rowsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(leaves.length / rowsPerPage);
    
      // Get the current page data
      const currentData = leaves.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    


    return (
      <div className="mainempleave">
        <div className="button-wrapper1 mt-2">
          <h1 className="titleE">Employee Leave</h1>

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

            <Button className="add-employee-btn" onClick={() => setShowLeaveModal(true)}>
              <AddIcon className="icon" />
              Add Leave
            </Button>
          </div>
        </div>

        {/* Add Leave Modal */}
        <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Select name="employee" onChange={handleInputChange}>
                  <option>Select Employee</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Brian Villalobos</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Leave Type</Form.Label>
                <Form.Select name="leaveType" onChange={handleInputChange}>
                  <option>Select Leave Type</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Annual Leave</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-2">
                <Form.Group className="mb-3 w-50">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="date" name="fromDate" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="date" name="toDate" onChange={handleInputChange} />
                </Form.Group>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control as="textarea" name="reason" rows={2} onChange={handleInputChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLeaveModal(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "orange", borderColor: "orange", color: "white" }}
              onClick={sendLeaveData}
            >
              Add Leave
            </Button>
          </Modal.Footer>
        </Modal>


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
                      <Link to="/employee" className="breadcrumb-link">Employee</Link>
                    </li>
                    <li className="breadcrumb-separator">/</li>
                    <li className="breadcrumb-current">Leave</li>
                  </ul>
                </div>

                {/* Leave Stats Cards */}
                <div className="container1 mt-4">
                  <div className="row g-3">
                    {leaveStats.map((stat, index) => (
                      <div className="col-lg-3 col-md-6" key={index}>
                        <div className={`leave-card border rounded shadow-sm d-flex justify-content-between align-items-center`}>
                          <div>
                            <h6 className="fw-bold">{stat.title}</h6>
                            <h3 className="count">{stat.count}</h3>
                            <span className={`badge text-white bg-${stat.color}`}>
                              Remaining Leaves: {stat.remaining}
                            </span>
                          </div>
                          <div className={`icon-container text-white bg-${stat.color}`}>{stat.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leave Table */}
                <div className="container2 mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3 px-4 pt-4">
                    <h5 className="fw-bold">Leave List</h5>
                    <div className="d-flex gap-2">
                      {/* <Form.Control type="date" className="w-auto" /> */}
                      <Form.Select className="w-auto" value={leaveFilter} onChange={(e) => setLeaveFilter(e.target.value)}>
                        <option value="All">Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Causal Leave">Casual Leave</option>
                      </Form.Select>
                      {/* <Form.Select className="w-auto">
                        <option>Approved By</option>
                        <option>Douglas Martini</option>
                        <option>Warren Morales</option>
                      </Form.Select> */}
                     <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">Select Status</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="New">New</option>
                      </Form.Select>
                      {/* <Form.Control type="search" placeholder="Search" className="w-auto" /> */}
                    </div>
                  </div>

                  <div className="table-responsive" ref={emLeaveRef}>
                  <Table hover className="align-middle">
                      <thead className="table-light">
                      <tr>
                       
                          <th>Leave Type</th>
                          <th>From</th>
                          <th>To</th>
                          <th>No of Days</th>
                          <th>Status</th>
                        
                      </tr>
                      </thead>
                      <tbody>
                      {currentData
                        .filter((leave) => 
                          (statusFilter === 'All' || leave.status === statusFilter) &&
                          (leaveFilter === 'All' || leave.leaveType === leaveFilter)
                        )
                        .map((leave) => (
                                <tr key={leave.id}>
                           
                                <td>{leave.leaveType}</td>
                                
                                <td>{leave.startDate}</td>
                                
                                <td>{leave.endDate}</td>
                                <td>{leave.days}</td>
                                <td>{leave.status}
                                </td>
                              
                              </tr>
                          ))}
                          </tbody>

                  </Table>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                      <span>Showing {currentData.length} of {leaveData.length} entries</span>
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
    );
  }