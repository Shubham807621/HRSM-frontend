import React, { useState } from 'react'
import './Roles.css'
import { addRole,updateRole } from "../../../APIService/apiservice";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Roles(){

    const [showModal, setShowModal] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');

    const [roles, setRoles] = useState([
        {
        role: 'HR Manager',
        description: 'Handles HR-related activities',
        date: '01 Mar 2025',
        status: 'Active',
        },
        {
        role: 'Admin',
        description: 'Administrator role',
        date: '05 Mar 2025',
        status: 'Inactive',
        },
    ]);

    const username = 'demo.user@email.com'; // required for API

    const handleSubmit = async () => {
        const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        });

        const newRole = {
        role: roleName,
        description: description,
        date: today,
        status: status,
        };

        try {
        if (editIndex !== null) {
            await updateRole({
            roleName,
            description,
            userName: username,
            toEcode: 'HR',
            });
            const updated = [...roles];
            updated[editIndex] = { ...newRole };
            // setRoles(updated);
        } else {
            await addRole({
            roleName,
            description,
            userName: username,
            });
            setRoles([...roles, newRole]);
        }
        } catch (err) {
        console.error('API Error:', err);
        }

        setRoleName('');
        setDescription('');
        setStatus('');
        setEditIndex(null);
        setShowModal(false);
    };

    const handleEdit = (index) => {
        const role = roles[index];
        setRoleName(role.role);
        setDescription(role.description);
        setStatus(role.status);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const updated = [...roles];
        updated.splice(index, 1);
        setRoles(updated);
    };

    return(
    <div className='userdetails'>
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
                    <button className='adduser px-3' onClick={() => setShowModal(true)}><AddCircleOutlineIcon className="me-2"fontSize="inherit"/> Add Roles</button>

                    {showModal && (
                    <div className="modal-backdrop">
                    <div className="modal-box">
                        <div className="modal-header">
                        <h4>{editIndex !== null ? 'Edit Role' : 'Add Role'}</h4>
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

                        <label>Description</label>
                            <input
                            type="text" className="form-input" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                        <button className="btn btn-light" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-orange" onClick={handleSubmit}>
                        {editIndex !== null ? 'Update Role' : 'Add Role'}
                        </button>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                
                <div className="container row2">
                        <div className='emp-list-contrainer'>
                            <h6>Roles List</h6>
                            {/* Filters & Sorting */}
                            <div className=" mb-3 emp-filters">
                            <select
                                    className='form-select w-auto'
                                    style={{ fontSize: '14px' }}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                    <option value="All">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
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
                            {roles
                                .filter((r) => statusFilter === 'All' || r.status === statusFilter)
                                .map((r, index) => (
                                    <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td style={{ color: 'gray' }}>{r.role}</td>
                                    <td style={{ color: 'gray' }}>{r.date}</td>
                                    <td>
                                        <span
                                        style={{
                                            backgroundColor: r.status === 'Active' ? 'green' : 'red',
                                            color: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        }}
                                        >
                                        {r.status}
                                        </span>
                                    </td>
                                    <td>
                                        <EditIcon className="fs-5 me-2 cursor-pointer" onClick={() => handleEdit(index)} style={{ cursor: 'pointer' }} />
                                        <DeleteIcon className="fs-5 me-2 cursor-pointer" onClick={() => handleDelete(index)} />
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Pagination */}
                    <div className="d-flex justify-content-end align-items-end me-3">
                        <button style={{border:'none',paddingRight:'10px',color:'gray'}}>&lt;</button>
                        <span style={{backgroundColor:'orangered',
                                    borderRadius:'70px', 
                                    width:'25px',
                                    color:'white',
                                    paddingLeft:'7px'}}> 1</span>
                        <button style={{border:'none',paddingLeft:'10px',color:'gray'}}>&gt;</button>
                        </div>
                    </div>
            </div>)
}
export default Roles