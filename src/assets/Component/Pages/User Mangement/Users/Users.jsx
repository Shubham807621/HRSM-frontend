    import React, { useState,useEffect } from 'react'
    import axios from 'axios';
    import { getEmployeesList, createEmployee, updateEmployee, deleteEmployee, } from "../../..//APIService/apiservice";
    import './Users.css'
    import HomeIcon from '@mui/icons-material/Home';
    import { Link } from "react-router-dom";
    import EditIcon from "@mui/icons-material/Edit";
    import DeleteIcon from "@mui/icons-material/Delete";
    import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

    function Users(){

    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);

    const token = localStorage.getItem('token');

    const fetchEmployees = async () => {
        const data = await getEmployeesList(token);
        setEmployees(data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
    });

    const openAddModal = () => {
        setFormData({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
        });
        setEditMode(false);
        setSelectedEmpId(null);
        setShowModal(true);
    };

    const openEditModal = (emp) => {
        const nameParts = emp.name.split(' ');
        setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        userName: emp.userName || '',
        email: emp.email || '',
        password: '',
        confirmPassword: '',
        phone: emp.phone || '',
        role: emp.role || '',
        });
        setEditMode(true);
        setSelectedEmpId(emp.id);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!editMode && formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
        }

        const employeeData = {
        name: `${formData.firstName} ${formData.lastName}`,
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
        };

        try {
        if (editMode) {
            await updateEmployee(selectedEmpId, employeeData, token);
        } else {
            await createEmployee(employeeData, token);
        }
        fetchEmployees();
        setShowModal(false);
        } catch (error) {
        console.error(error);
        alert('Something went wrong.');
        }
    };

    const handleDelete = async (empId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await deleteEmployee(empId, token);
            fetchEmployees();
        } catch (error) {
            console.error(error);
            alert('Delete failed.');
        }
        }
    };

        return(
            <div className='userdetails'>
                <div className='top'>
                    <div>
                        <div className="titleE">
                            <h1>HR Attendance</h1>
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
                                <li className="breadcrumb-current">Users</li>
                            </ul>
                        </div>
                    </div>
                    <button className='adduser' onClick={() => setShowModal(true)}><AddCircleOutlineIcon fontSize="inherit"/> Add Users</button>

                    {showModal && (
                    <div className="modal-backdrop">
                    <div className="modal-box">
                        <div className="modal-header">
                        <h4>{editMode ? 'Edit User' : 'Add User'}</h4>
                        <button className="close-btn" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                        </div>

                        <div className="form-grid">
                        

                        <div className="form-group">
                            <label>User Name</label>
                            <input name="userName" value={formData.userName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        {!editMode && (
                            <>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Confirm Password</label>
                                <input
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                />
                            </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Employee">Employee</option>
                            </select>
                        </div>
                        </div>


                        <div className="modal-footer">
                        <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="btn btn-orange" onClick={handleSubmit}>{editMode ? 'Save Changes' : 'Add User'}</button>
                        </div>
                    </div>
                    </div>
                    )}
                </div>

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
                                        <p className='emp-title my-0'>{emp.name}</p>
                                </td>
                                <td style={{color:'gray'}}>{emp.email}</td>
                                <td style={{color:'gray'}}>{emp.dateOfJoining}</td>
                                <td><span
                                        className="badge"
                                        style={{ backgroundColor: emp.role === "Client" ? "#9576b046" : "#d95f945d", color: emp.role === "Client" ? "#483b53f4" : "#a9064da5" }}
                                    >
                                        {emp.role}
                                    </span>
                                </td>
                                <td><span style={{backgroundColor: emp.status === "ACTIVE" ? "green" : "red", color: "white", padding:'5px',borderRadius:'5px', fontSize:'13px', fontWeight:'bold'}}>
                                    {emp.status}</span></td>
                                <td>
                                    <EditIcon className="fs-5 me-2 cursor-pointer" onClick={() => openEditModal(emp)} />
                                    <DeleteIcon className="fs-5 me-2 cursor-pointer" onClick={() => handleDelete(emp.id)}/>
                                </td>
                                
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

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