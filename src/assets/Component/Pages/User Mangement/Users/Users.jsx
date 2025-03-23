import React, { useState } from 'react'
import './Users.css'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Users(){

    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([
        {
          name: "Anthony Lewis",
          role: "Client",
          email: "anthony@example.com",
          date: "03 Nov 2024",
          Status: "Active",
          Production: "8.35Hrs",
          profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        // Duplicate entries for display (mock data)
        {
            name: "Anthony Lewis",
            role: "Employee",
            email: "anthony@example.com",
            date: "03 Nov 2024",
            Status: "Active",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Anthony Lewis",
            role: "Client",
            email: "anthony@example.com",
            date: "03 Nov 2024",
            Status: "Active",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Anthony Lewis",
            role: "Client",
            email: "anthony@example.com",
            date: "03 Nov 2024",
            Status: "Active",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Anthony Lewis",
            role: "Client",
            email: "anthony@example.com",
            date: "03 Nov 2024",
            Status: "Active",
            Production: "8.35Hrs",
            profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          
      ]);


      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleAddUser = () => {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        const fullName = `${formData.firstName} ${formData.lastName}`;
        const today = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
    
        const newUser = {
          name: fullName,
          role: formData.role,
          email: formData.email,
          date: today,
          Status: "Active",
          Production: "0.00Hrs",
          profileImg: "https://randomuser.me/api/portraits/men/75.jpg", // dummy
        };
    
        setEmployees((prev) => [...prev, newUser]);
        setShowModal(false);
        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
        });
      };

    return(
    
    <div className='userdetails'>
        <div className='top'>
            <div>
                <div className="titleE">
                    <h1>User Roles</h1>
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
                        <Link to="/hrdashboard" className="breadcrumb-link">User Management</Link>
                        </li>
                        <li className="breadcrumb-separator">/</li>
                        <li className="breadcrumb-current">Users Roles</li>
                    </ul>
                </div>
            </div>
            <button className='adduser' onClick={() => setShowModal(true)}><AddCircleOutlineIcon fontSize="inherit"/> Add Users</button>

            {showModal && (
                <div className="modal-backdrop">
                <div className="modal-box">
                    <div className="modal-header">
                    <h4>Add User</h4>
                    <button className="close-btn" onClick={() => setShowModal(false)}>
                        &times;
                    </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>User Name</label>
                            <input name="userName" value={formData.userName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Client">Client</option>
                            <option value="Employee">Employee</option>
                            </select>
                        </div>
                        </div>


                    <div className="modal-footer">
                    <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn btn-orange" onClick={handleAddUser}>Add User</button>
                    </div>
                </div>
                </div>
            )}
        </div>

        {/*table*/}
        <div className="container row2">
                <div className='emp-list-contrainer'>
                    <h6>Users List</h6>
                    {/* Filters & Sorting */}
                    <div className=" mb-3 emp-filters">
                        <select className='form-select w-auto' style={{fontSize:'14px'}}>
                            <option>Select Status</option>
                            <option>Present</option>
                            <option>Absent</option>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                    <tbody>
                    {employees.map((emp, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>
                                <div className="d-flex align-items-center">
                                <img
                                    src={emp.profileImg}
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="35"
                                    height="35"
                                />
                                <div>
                                    <p className='emp-title my-0'>{emp.name}</p>
                                </div>
                                </div>
                            </td>
                            <td style={{color:'gray'}}>{emp.email}</td>
                            <td style={{color:'gray'}}>{emp.date}</td>
                            <td><span
                                    className="badge"
                                    style={{ backgroundColor: emp.role === "Client" ? "#9576b046" : "#d95f945d", color: emp.role === "Client" ? "#483b53f4" : "#a9064da5" }}
                                >
                                    {emp.role}
                                </span>
                            </td>
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
    </div>
    )
}
export default Users