import React, { useState } from 'react'
import './Roles.css'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Roles(){

    const [showModal, setShowModal] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = () => {
        const today = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }); // e.g., "21 Mar 2025"
      
          const newEmployee = {
            role: roleName,
            date: today,
            Status: status,
          };
      
          setEmployees([...employees, newEmployee]);
      
          // Reset form + close modal
          setRoleName("");
          setStatus("");
          setShowModal(false);
    };

    const [employees, setEmployees] = useState([
        {
          role: "HR Management",
          date: "03 Nov 2024",
          Status: "Active",
        },
        // Duplicate entries for display (mock data)
        {
            role: "Admin",
            date: "03 Nov 2024",
            Status: "Inactive",
          },
          {
            role: "HR Management",
            date: "03 Nov 2024",
            Status: "Active",
          },
          {
            role: "HR Management",
            date: "03 Nov 2024",
            Status: "Active",
          },
          {
            role: "HR Management",
            date: "03 Nov 2024",
            Status: "Active",
          },
        ]);

    return(<div className='userdetails'>
                <div className='top'>
                    <div>
                        <div className="titleE">
                            <h1>Roles</h1>
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
                                <Link to="/hrdashboard" className="breadcrumb-link">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-separator">/</li>
                                <li className="breadcrumb-current">Roles</li>
                            </ul>
                        </div>
                    </div>
                    <button className='adduser' onClick={() => setShowModal(true)}><AddCircleOutlineIcon fontSize="inherit"/> Add Users</button>

                    {showModal && (
                    <div className="modal-backdrop">
                    <div className="modal-box">
                        <div className="modal-header">
                        <h4>Add Role</h4>
                        <button className="close-btn" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                        </div>

                        <div className="modal-body">
                        <label>Role Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />

                        <label>Status</label>
                        <select
                            className="form-input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        </div>

                        <div className="modal-footer">
                        <button className="btn btn-light" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-orange" onClick={handleSubmit}>
                            Add Role
                        </button>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                {/*table*/}
                <div className="container row2">
                        <div className='emp-list-contrainer'>
                            <h6>Roles List</h6>
                            {/* Filters & Sorting */}
                            <div className=" mb-3 emp-filters">
                                <select className='form-select w-auto' style={{fontSize:'14px'}}>
                                    <option>Select Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <select className="form-select w-auto" style={{fontSize:'14px'}}>
                                    <option>Role</option>
                                </select>
                                <select className="form-select w-auto" style={{fontSize:'14px'}}>
                                    <option>Sort by: Last 7 Days</option>
                                </select>
                            </div>
                        </div>
            

                       {/* Employee Table */}
                            <div className="table-responsive emp-table">
                            <table className="table table-hover align-middle">
                                <thead>
                                <tr>
                                    <th><input type="checkbox" /></th>
                                    <th>Role</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                            <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td style={{color:'gray'}}>{emp.role}</td>
                                    <td style={{color:'gray'}}>{emp.date}</td>
                                    <td><span style={{backgroundColor: emp.Status === "Active" ? "green" : "red", color: "white", padding:'5px',borderRadius:'5px', fontSize:'13px', fontWeight:'bold'}}>
                                         {emp.Status}</span></td>
                                    <td>
                                        <EditIcon className="fs-5 me-2 cursor-pointer" />
                                        <DeleteIcon className="fs-5 me-2 cursor-pointer"/>
                                    </td>
                                    
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Pagination */}
                    <div className="d-flex justify-content-end align-items-end me-3">
                        <button style={{border:'none',backgroundColor:'white',paddingRight:'10px',color:'gray'}}>&lt;</button>
                        <span style={{backgroundColor:'orangered',
                                    borderRadius:'70px', 
                                    width:'25px',
                                    color:'white',
                                    paddingLeft:'7px'}}> 1</span>
                        <button style={{border:'none',backgroundColor:'white',paddingLeft:'10px',color:'gray'}}>&gt;</button>
                        </div>
                    </div>
            </div>)
}
export default Roles