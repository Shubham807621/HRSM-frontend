import React, { useState, useRef } from "react";
import "./EmpLeave.css";
import { Table, Form, Modal, Button } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  FaCalendarAlt,
  FaBriefcaseMedical,
  FaUmbrellaBeach,
  FaRegClipboard,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const leaveStats = [
  { title: "Annual Leaves", count: 5, remaining: 7, color: "dark", icon: <FaCalendarAlt /> },
  { title: "Medical Leaves", count: 11, remaining: 1, color: "blue", icon: <FaBriefcaseMedical /> },
  { title: "Casual Leaves", count: 2, remaining: 10, color: "purple", icon: <FaUmbrellaBeach /> },
  { title: "Other Leaves", count: 7, remaining: 5, color: "pink", icon: <FaRegClipboard /> },
];

export default function EmpLeave() {
  const emLeaveRef = useRef();

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      leaveType: "Medical Leave",
      from: "14 Jan 2024",
      to: "15 Jan 2024",
      approvedBy: { name: "Douglas Martini", role: "Manager", img: "https://randomuser.me/api/portraits/men/1.jpg" },
      days: "2 Days",
      status: "Approved",
    },
    {
      id: 2,
      leaveType: "Annual Leave",
      from: "21 Jan 2024",
      to: "25 Jan 2024",
      approvedBy: { name: "Douglas Martini", role: "Manager", img: "https://randomuser.me/api/portraits/men/2.jpg" },
      days: "5 Days",
      status: "Approved",
    },
    {
      id: 3,
      leaveType: "Medical Leave",
      from: "20 Feb 2024",
      to: "22 Feb 2024",
      approvedBy: { name: "Warren Morales", role: "Admin", img: "https://randomuser.me/api/portraits/men/3.jpg" },
      days: "3 Days",
      status: "Declined",
    },
    {
      id: 4,
      leaveType: "Casual Leave",
      from: "12 Apr 2024",
      to: "16 Apr 2024",
      approvedBy: { name: "Douglas Martini", role: "Manager", img: "https://randomuser.me/api/portraits/men/4.jpg" },
      days: "5 Days",
      status: "Pending",
    },
  ]);

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
                    <Form.Control type="date" className="w-auto" />
                    <Form.Select className="w-auto">
                      <option>Leave Type</option>
                      <option>Medical Leave</option>
                      <option>Casual Leave</option>
                    </Form.Select>
                    <Form.Select className="w-auto">
                      <option>Approved By</option>
                      <option>Douglas Martini</option>
                      <option>Warren Morales</option>
                    </Form.Select>
                    <Form.Select className="w-auto">
                      <option>Select Status</option>
                      <option>Approved</option>
                      <option>Declined</option>
                      <option>New</option>
                    </Form.Select>
                    <Form.Control type="search" placeholder="Search" className="w-auto" />
                  </div>
                </div>

                            <div className="table-responsive" ref={emLeaveRef}>
                            <Table hover className="align-middle">
                                <thead className="table-light">
                                <tr>
                                    <th><Form.Check type="checkbox" /></th>
                                    <th>Leave Type</th>
                                    <th>Approved By</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>No of Days</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave) => (
                                        <tr key={leave.id}>
                                        <td><Form.Check type="checkbox" /></td>
                                        <td>{leave.leaveType}</td>
                                        <td className="d-flex align-items-center">
                                            <img
                                            src={leave.approvedBy.img}
                                            alt="Profile"
                                            className="rounded-circle me-2"
                                            width="40"
                                            height="40"
                                            />
                                            <div>
                                            <p className="mb-0 fw-semibold">{leave.approvedBy.name}</p>
                                            <small className="text-muted">{leave.approvedBy.role}</small>
                                            </div>
                                        </td>
                                        <td>{leave.from}</td>
                                        
                                        <td>{leave.to}</td>
                                        <td>{leave.days}</td>
                                        <td>{leave.status}
                                        </td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
                                            <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>

                            </Table>
                            </div>
                    
              </div>

              
                
    </div>
  );
}