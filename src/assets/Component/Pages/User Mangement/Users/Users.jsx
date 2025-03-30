import React, { useState, useEffect } from 'react';
import { getUserList, updateRole } from "../../../APIService/apiservice";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from "@mui/icons-material/Edit";
import './Users.css';

function Users() {
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null);
    const [formData, setFormData] = useState({ userName: '', roleCode: '' });

    const token = localStorage.getItem('token');

    // Fetch users list
    const fetchUserList = async () => {
        try {
            const response = await getUserList(token);
            setEmployees(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching user list:", error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    // Open modal for editing user
    const openEditModal = (emp) => {
        setFormData({
            userName: emp.userName || '',
            roleCode: emp.roleCode || '', // Ensure correct role mapping
        });
        setEditMode(true);
        setSelectedEmpId(emp.id);
        setShowModal(true);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission for updating user role
    const handleSubmit = async () => {
        if (!formData.userName || !formData.roleCode) {
            alert("Please fill in all fields.");
            return;
        }

        const employeeData = {
            userName: formData.userName,
            roleCode: formData.roleCode,
        };

        try {
           const response =  await updateRole(employeeData);
           console.log(response)
            fetchUserList(); // Refresh the user list after update
            setShowModal(false);
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update role.");
        }
    };

    return (
        <div className='userdetails'>
            <div className='top'>
                <div>
                    <div className="titleE">
                        <h4>User Roles</h4>
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
            </div>

            {/* Modal for Edit Role */}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <div className="modal-header">
                            <h4>{editMode ? 'Edit User Role' : 'Add User'}</h4>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>

                        <div className="form-grid mt-2">
                            <div className="form-group">
                                <label>User Name</label>
                                <input name="userName" value={formData.userName} onChange={handleChange} disabled />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select name="roleCode" value={formData.roleCode} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Employee">Employee</option>
                                    <option value="HR">HR</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Users List Table */}
            <div className="container row2">
                <div className='emp-list-contrainer'>
                    <h6>Users List</h6>
                </div>

                <div className="table-responsive emp-table">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td><p className='emp-title my-0'>{emp.name}</p></td>
                                    <td style={{ color: 'gray' }}>{emp.userName}</td>
                                    <td>
                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor: emp.roleCode === "HR" ? "#9576b046" : "#d95f945d",
                                                color: emp.roleCode === "HR" ? "#483b53f4" : "#a9064da5"
                                            }}
                                        >
                                            {emp.roleCode}
                                        </span>
                                    </td>
                                    <td>
                                        <EditIcon className="fs-5 me-2 cursor-pointer" onClick={() => openEditModal(emp)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-end align-items-end me-3">
                    <button style={{ border: 'none', paddingRight: '10px', color: 'gray' }}>&lt;</button>
                    <span style={{
                        backgroundColor: 'orangered',
                        borderRadius: '70px',
                        width: '25px',
                        color: 'white',
                        paddingLeft: '7px'
                    }}> 1</span>
                    <button style={{ border: 'none', paddingLeft: '10px', color: 'gray' }}>&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default Users;
