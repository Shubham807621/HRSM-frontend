  import React, { useState, useRef , useEffect } from 'react';
  import './navbar.css';
  import SearchIcon from "@mui/icons-material/Search";
  import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import Badge from '@mui/material/Badge';
  import { styled } from '@mui/material/styles';
  import HomeIcon from '@mui/icons-material/Home';
  import PeopleIcon from '@mui/icons-material/People';
  import AssignmentIcon from '@mui/icons-material/Assignment';
  import SchoolIcon from '@mui/icons-material/School';
  import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
  import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
  import HeadphonesIcon from '@mui/icons-material/Headphones';
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  import { Link, useLocation } from 'react-router-dom';
  import { Dropdown } from "react-bootstrap";
  import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
  import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
  import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined';
  import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
  import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
  import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
  import ExpandLessIcon from '@mui/icons-material/ExpandLess';
  import LoginIcon from '@mui/icons-material/Login';
  import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
  import LockResetIcon from '@mui/icons-material/LockReset';
  import { FaCircle } from "react-icons/fa";
import { getEmployeeDashboardDetails } from '../APIService/apiservice';
import { useNavigate } from "react-router-dom"



  export default function Navbar({ variant = "default" }) {


    const [selectedStatus, setSelectedStatus] = useState("Available");
    const [menuOpen, setMenuOpen] = useState(false);
    const [statusMenuOpen, setStatusMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const location = useLocation();
    const sidebarRef = useRef(null);
    const hideElement = ["/", "/register", "/reset-password", "/verify", "/NewPassword"].includes(location.pathname);
    const userRole = localStorage.getItem("role");

    const empId = localStorage.getItem("empId"); // Get logged-in employee ID
    const token = localStorage.getItem("token"); // Get logged-in employee ID
    const navigate = useNavigate();
    
    const toggleMenu = (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    };
    
    
    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: 7,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "red"
      },
    }));

    const handleScroll = () => {
        setIsScrolling(true);

        // Clear the previous timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set a timeout to hide the scrollbar after 1.5 seconds
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1500);
    };

    useEffect(() => {
        const sidebarElement = sidebarRef.current;
        if (sidebarElement) {
            sidebarElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (sidebarElement) {
                sidebarElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);


  const statuses = [
    { label: "Available", color: "success" },
    { label: "Busy", color: "danger" },
    { label: "Do not disturb", color: "dark" },
    { label: "Be right back", color: "warning" },
    { label: "Appear away", color: "secondary" },
    { label: "Appear offline", color: "muted" },
  ];

const [employee ,SetEmployee] = useState({})

   useEffect(()=>{
  
          const fetchEmployeeDetails = async () =>{
      
              try{
                  const respone = await getEmployeeDashboardDetails(empId, token);
                 
                  // console.log(respone)
                  SetEmployee(respone)
                  
  
              }
              catch (error) {
                  console.log(error)
              }
  
          };
          fetchEmployeeDetails();
  
      },[empId, token])

    return (
      <>
        {variant === "default" && !hideElement && (
          <div className="container-fluid header">
            <div className="search-box">
              <input type="text" placeholder="Search for Employee..." />
              <span><SearchIcon className="search-icon" /></span>
            </div>
            <div className="user-profile">
              <div className="notification mx-4 mt-2">
                <StyledBadge badgeContent=" ">
                  <NotificationsNoneIcon className="bell-icon" />
                </StyledBadge>
              </div>
              <div className="profile-dropdown">
                      {/* Profile Button */}
                      <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <img
                          src='https://randomuser.me/api/portraits/men/32.jpg'
                          alt="User"
                          className="profile-img"
                        />
                        <div className="profile-info">
                          <p className="fw-bold mb-0 d-none d-md-inline">{employee.name}</p>
                          <div className="d-flex align-items-center">
                            <FaCircle className={`text-${statuses.find(s => s.label === selectedStatus)?.color} me-2`} />
                            <span>{selectedStatus}</span>
                          </div>
                        </div>
                      </button>

                      {/* Profile Dropdown Menu */}
                      {menuOpen && (
                        <div className="dropdown-menu show">
                          <div className="user-info">
                            {/* <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="user-img" /> */}
                            <img src='https://randomuser.me/api/portraits/men/32.jpg'  className="user-img" alt="profile pic"/>
                            <div>
                              <h6 className="mb-0 fw-bold">{employee.name}</h6>
                              <p className="text-muted small mb-0">{employee.email}</p>
                            </div>
                          </div>

                          <Link className="dropdown-item">
                            <AccountCircleOutlinedIcon className="me-2" /> My Profile
                          </Link>
                          <button className="dropdown-item">
                            <SettingsOutlinedIcon className="me-2" /> Settings
                          </button>

                          {/* Status Dropdown */}
                          <div className="dropdown-item" onClick={() => setStatusMenuOpen(!statusMenuOpen)}>
                            <MoveUpOutlinedIcon className="me-2" /> Status
                          </div>

                          {statusMenuOpen && (
                            <ul className="status-menu">
                              {statuses.map(({ label, color }) => (
                                <li key={label} onClick={() => { setSelectedStatus(label); setStatusMenuOpen(false); }}>
                                  <FaCircle className={`text-${color} me-2`} /> {label}
                                </li>
                              ))}
                            </ul>
                          )}

                          <button className="dropdown-item">
                            <ArrowCircleUpOutlinedIcon className="me-2" /> My Account
                          </button>
                            <Link to='/support/konwledgeBase' className="dropdown-item">
                              <QuestionMarkOutlinedIcon className="me-2" /> Knowledge Base
                            </Link>

                            <hr />
                            <button
                            className="dropdown-item text-danger"
                            onClick={() => {
                            localStorage.clear(); // ✅ Clears all stored data (token, empId, etc.)
                            navigate("/"); // ✅ Redirect to Login page
                            }}
                            >
                            <ExitToAppOutlinedIcon className="me-2" /> Logout
                          </button>
                        </div>
                      )}
                    </div>
    
            </div> 
          </div>
        )}

        {/* Sidebar */}
        {variant === "default" && !hideElement && (
         <div className={`sidebar px-4 ${isScrolling ? "scrolling" : ""}`} ref={sidebarRef}>
          <h1 className="text-uppercase fw-bold">HRSM</h1>
          <div  className='main-item1 pt-4'>
            <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-5">Main</h3>
              <div
                className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "dashboard" ? "bg-primary text-light" : ""}`}  
              >
                <div className="d-flex align-items-center ">
                  <HomeIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Dashboard</p>
                </div>
                {/* Expand Icon Clickable Only */}
                <div onClick={() => toggleMenu("dashboard")} className="cursor-pointer">
                  {openMenu === "dashboard" ? (
                    <ExpandLessIcon className="transition" />
                  ) : (
                    <ExpandMoreIcon className="transition" />
                  )}
                </div>
                </div>
                {openMenu === "dashboard" && (
                  <div className="ms-5 sub-menu open">
                      
                      {userRole === "HR" && (
                        <Link
                          to="/hrdashboard"
                          className={`submenu-item ${
                            location.pathname === "/hrdashboard" ? "active" : ""
                          }`}
                        >
                          <p className="py-1">HR Dashboard</p>
                        </Link>
                      )}
                    <Link to='/employeedashboard'
                          className={`submenu-item ${location.pathname === "/employeedashboard" ? "active" : ""}`}
                    >
                      <p className="py-1 mt-2">Employee Dashboard</p>
                    </Link>
                  </div>
              )}
          </div>
    
          <div className='main-item1'>
          <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-4 mb-3">HRSM</h3>
            <div>
              <div
                className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "employee" ? "bg-primary text-light" : ""}`}  
                
              >
                <div className="d-flex align-items-center">
                  <PeopleIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Employee</p>
                </div>
                <div onClick={() => toggleMenu("employee")} className="cursor-pointer">
                    {openMenu === "employee" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "employee" && (
                <div className="ms-5 sub-menu open">
                        
                  <Link to='/employee'
                    className={`submenu-item ${location.pathname === "/employee" ? "active" : ""}`}
                  >
                    <p className="py-1">Employee List</p>
                  </Link>
                  <Link to={`/employee-details/${empId}`} 
                      className={`submenu-item ${location.pathname === `/employee-details/${empId}`  ? "active" : ""}`}
                  >
                    <p className="py-1">Employee Details</p>
                  </Link>
                
                </div>
              )}
            </div>
            <div className='main-item1'>
              <div
                className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "attendance" ? "bg-primary text-light" : ""}`} 
                
              >
                <div className="d-flex align-items-center">
                <PeopleIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Attendance</p>
                </div>
                <div onClick={() => toggleMenu("attendance")} className="cursor-pointer">
                    {openMenu === "attendance" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "attendance" && (
                <div className="ms-5 sub-menu open">

                      {userRole === "HR" && (
                        <Link to='/attendance/hr-attendance'
                                        className={`submenu-item ${location.pathname === "/attendance/hr-attendance" ? "active" : ""}`}
                                      >
                                        <p className="py-1 ps-0">HR Attendance</p>
                                      </Link>
                      )}
                
                  <Link to='/attendance/emp-attendance'
                    className={`submenu-item ${location.pathname === "/attendance/emp-attendance" ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">Employee Attendance</p>
                  </Link>
                
                </div>
              )}
            </div>
            <div className='main-item1'>
              <div className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "Leave" ? "bg-primary text-light" : ""}`} 
              >
                <div className="d-flex align-items-center">
                <PeopleIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Leave</p>
                </div>
                <div onClick={() => toggleMenu("Leave")} className="cursor-pointer">
                    {openMenu === "Leave" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "Leave" && (
                <div className="ms-5 sub-menu open">

                    {userRole === "HR" && (
                      <Link to='/leave/hr-Leave'
                                      className={`submenu-item ${location.pathname === "/leave/hr-Leave" ? "active" : ""}`}
                                    >
                                      <p className="py-1 ps-0">HR Leave</p>
                                    </Link>
                    )}
              
                  
                  <Link to='/leave/emp-Leave'
                    className={`submenu-item ${location.pathname === "/leave/emp-Leave" ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">Employee Leave</p>
                  </Link>
                
                </div>
              )}
            </div>
            <div className='main-item1'>
            <div className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "training" ? "bg-primary text-light" : ""}`} 
              >
                <div className="d-flex align-items-center">
                <AssignmentIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Training</p>
                </div>
                <div onClick={() => toggleMenu("training")} className="cursor-pointer">
                    {openMenu === "training" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "training" && (
                <div className="ms-5 sub-menu open">
                      <Link to='/training-dashboard'
                    className={`submenu-item ${location.pathname === "/training-dashboard" ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">Training Dashboard</p>
                  </Link>
                  <Link to='/trainings-list'
                    className={`submenu-item ${location.pathname === "/trainings-list" ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">Training List</p>
                  </Link>
                </div>
              )}
            </div>
            {/* <div className='main-item1'>
            <div className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "performance" ? "bg-primary text-light" : ""}`} 
              >
                <div className="d-flex align-items-center">
                <SchoolIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Performance</p>
                </div>
                <div onClick={() => toggleMenu("performance")} className="cursor-pointer">
                    {openMenu === "performance" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "performance" && (
                <div className="ms-5 sub-menu open">
                  <p className="py-1">Performance report</p>
                  <p className="py-1">Card</p>   
                </div>
              )}
            </div> */}
            <div className='main-item1'>
            <div className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "payroll" ? "bg-primary text-light" : ""}`} 
              >
                <div className="d-flex align-items-center">
                <AccountBalanceWalletIcon className="fs-5 me-2" />
                  <p className="fw-semibold main-title">Payroll</p>
                </div>
                <div onClick={() => toggleMenu("payroll")} className="cursor-pointer">
                    {openMenu === "payroll" ? (
                      <ExpandLessIcon className="transition" />
                    ) : (
                      <ExpandMoreIcon className="transition" />
                    )}
                  </div>
              </div>
              {openMenu === "payroll" && (
                <div className="ms-5 sub-menu open">
                    <Link to='/salary/payslip/:year/:month'
                    className={`submenu-item ${location.pathname.startsWith("/salary/payslip") ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">PaySlip</p>
                  </Link>
                  
                  <Link to='/salary/payroll'
                    className={`submenu-item ${location.pathname === "/salary/payroll" ? "active" : ""}`}
                  >
                    <p className="py-1 ps-0">Payrolls</p>
                  </Link>   
                </div>
              )}
            </div >
            <div className={`d-flex align-items-center justify-content-start p-2 cursor-pointer`} 
              >
                <DocumentScannerIcon className="fs-5 me-2" />
                <Link to='/document'>
                  <p className="fw-semibold main-title">Document</p>
                </Link>
            </div>   
          </div>

          <div className='main-item1'>
          <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-4">ADMININSTRATION</h3>

          {userRole === "HR" && (
            <div className='main-item1'>
            <div
              className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "user-management" ? "bg-primary text-light" : ""}`} >
              <div className="d-flex align-items-center">
              <ManageAccountsIcon className="fs-5 me-2" />
                <p className="fw-semibold main-title">User Management</p>
              </div>
              <div onClick={() => toggleMenu("user-management")} className="cursor-pointer">
                  {openMenu === "user-management" ? (
                    <ExpandLessIcon className="transition" />
                  ) : (
                    <ExpandMoreIcon className="transition" />
                  )}
                </div>
            </div>
            {openMenu === "user-management" && (
              <div className="ms-5 sub-menu open my-2">
                <Link to='/user-management/update-role'
                  className={`submenu-item ${location.pathname === "/user-management/update-role" ? "active" : ""}`}
                >
                  <p className="py-1 ps-0">Update Role </p>
                </Link>
                <Link to='/user-management/update-user-role'
                  className={`submenu-item ${location.pathname === "/user-management/update-user-role" ? "active" : ""}`}
                >
                  <p className="py-1 ps-0">Update User Role </p>
                </Link>
              </div>
            )}
          </div>

          )}
          
          <div className='main-item1'>
            <div
              className={`d-flex align-items-center justify-content-between p-2 cursor-pointer rounded-3 ${openMenu === "support" ? "bg-primary text-light" : ""}`} 
              
            >
              <div className="d-flex align-items-center">
              <HeadphonesIcon className="fs-5 me-2" />
                <p className="fw-semibold main-title">Support</p>
              </div>
              <div onClick={() => toggleMenu("support")} className="cursor-pointer">
                  {openMenu === "support" ? (
                    <ExpandLessIcon className="transition" />
                  ) : (
                    <ExpandMoreIcon className="transition" />
                  )}
                </div>
            </div>
            {openMenu === "support" && (
              <div className="ms-5 sub-menu open my-2">
                <Link to='/support/add-report'
                  className={`submenu-item ${location.pathname === "/support/add-report" ? "active" : ""}`}
                >
                  <p className="py-1 ps-0">Add Report</p>
                </Link>
                <Link to='/support/konwledgeBase'
                  className={`submenu-item ${location.pathname === "/support/konwledgeBase" ? "active" : ""}`}
                >
                  <p className="py-1 ps-0">Konwledge Base</p>
                </Link>



              
              </div>
            )}
          </div>
          
          </div>

          <div className='main-item1'>
          <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-4">AUTHENTICATION</h3>
          <div className="d-flex align-items-center p-2 cursor-pointer">
            <LoginIcon className="fs-5 me-2" />
            <Link to='/'>
              <p className="fw-semibold main-title">Login</p>
            </Link>
          </div>
          <div className="d-flex align-items-center p-2 cursor-pointer">
              <AppRegistrationIcon className="fs-5 me-2" />
              <Link to='/register'>
                <p className="fw-semibold main-title">Register</p>
              </Link>
            </div>
          <div className="d-flex align-items-center p-2 cursor-pointer">
              <LockResetIcon className="fs-5 me-2" />
              <Link to='/reset-password'>
                <p className="fw-semibold main-title">Reset Password</p>
              </Link>
            </div>
            
          </div>
       </div> 

        )}
      </>
    );
  }