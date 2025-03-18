  import React, { useState } from 'react';
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



  export default function Navbar({ variant = "default" }) {

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: 7,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "red"
      },
    }));

    const location = useLocation();
    const hideElement = ["/", "/register", "/reset-password", "/verify", "/NewPassword"].includes(location.pathname);

    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    };

    const menuItems = [
      {
        title: "Dashboard",
        icon: <HomeIcon className="fs-5 me-2" />,
        badge: "Hot",
        submenu: [
          { title: "HR Dashboard", path: "/hrdashboard" },
          { title: "Employee Dashboard", path: "/employeedashboard" },
        ],
      },
      {
        title: "Employee",
        icon: <PeopleIcon className="fs-5 me-2" />,
        submenu: [
          { title: "Employee List", path: "/employee" },
          { title: "Employee Details", path: "/employeedetails" },
        ],
      },
      {
        title: "Attendance",
        icon: <PeopleIcon className="fs-5 me-2" />,
        submenu: [
          { title: "Leaves" },
          { title: "Attendance" },
        ],
      },
      {
        title: "Training",
        icon: <AssignmentIcon className="fs-5 me-2" />,
        submenu: [
          { title: "Training List" },
          { title: "Training" },
        ],
      },
      {
        title: "Performance",
        icon: <SchoolIcon className="fs-5 me-2" />,
        submenu: [
          { title: "Performance Report" },
          { title: "Card" },
        ],
      },
      {
        title: "Payroll",
        icon: <AccountBalanceWalletIcon className="fs-5 me-2" />,
        submenu: [
          { title: "Payroll" },
          { title: "Payslip" },
        ],
      },
    ];

    return (
      <>
        {variant === "default" && !hideElement && (
          <div className="container-fluid header">
            <div className="search-box">
              <input type="text" placeholder="Search for Employee..." />
              <span><SearchIcon className="search-icon" /></span>
            </div>
            <div className="user-profile">
              <div className="notification mx-4">
                <StyledBadge badgeContent=" ">
                  <NotificationsNoneIcon className="bell-icon" />
                </StyledBadge>
              </div>
    
              <Dropdown align="end">
          {/* Profile Image Button */}
              <Dropdown.Toggle variant="light" id="profile-dropdown" className="d-flex align-items-center border-0">
              <img
              src="https://randomuser.me/api/portraits/women/44.jpg" // Replace with user image
              alt="User"
              className="rounded-circle me-2"
              width="40"
              height="40"
              />
                  <p className="d-none d-md-inline fw-bold">Kevin Larry</p>
        </Dropdown.Toggle>

        {/* Dropdown Menu */}
        <Dropdown.Menu className="shadow-sm p-2">
          {/* User Info */}
          <div className="d-flex align-items-center p-3 border-bottom">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div>
              <h6 className="mb-0 fw-bold">Kevin Larry</h6>
              <p className="text-muted small mb-0">warren@example.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <Dropdown.Item href="#">
            <AccountCircleOutlinedIcon className="me-2" /> My Profile
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <SettingsOutlinedIcon className="me-2" /> Settings
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <MoveUpOutlinedIcon className="me-2" /> Status
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <ArrowCircleUpOutlinedIcon className="me-2" /> My Account
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <QuestionMarkOutlinedIcon className="me-2" /> Knowledge Base
          </Dropdown.Item>

          {/* Logout */}
          <Dropdown.Divider />
          <Dropdown.Item href="#" className="text-danger">
            <ExitToAppOutlinedIcon className="me-2" /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
            </div>
          </div>
        )}

        {/* Sidebar */}
        {variant === "default" && !hideElement && (
         <div className="sidebar p-3">
         <h1 className="text-uppercase fw-bold">HRSM</h1>
         <div  className='main-item1 pt-4'>
           <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-5">Main</h3>
             <div
               className="d-flex align-items-center justify-content-between p-2 cursor-pointer"
               
             >
               <div className="d-flex align-items-center ">
                 <HomeIcon className="fs-5 me-2" />
                 <p className="fw-semibold main-title">Dashboard</p>
                 <span className="badge bg-danger text-white ms-2">Hot</span>
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
                     
                   <Link to='/hrdashboard'
                         className={`submenu-item ${location.pathname === "/hrdashboard" ? "active" : ""}`}
                   >
                     <p className="py-1">HR Dashboard</p>
                   </Link>
                   <Link to='/employeedashboard'
                         className={`submenu-item ${location.pathname === "/employeedashboard" ? "active" : ""}`}
                   >
                     <p className="py-1">Employee Dashboard</p>
                   </Link>
                 </div>
             )}
         </div>
   
     <div className='main-item1'>
         <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-4 mb-3">HRSM</h3>
         <div>
           <div
             className="d-flex align-items-center justify-content-between p-2 cursor-pointer"
             
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
               <Link to='/employeedetails'
                   className={`submenu-item ${location.pathname === "/employeedetails" ? "active" : ""}`}
               >
                 <p className="py-1">Employee Details</p>
               </Link>
             
             </div>
           )}
         </div>
         <div className='main-item1'>
           <div
             className="d-flex align-items-center justify-content-between p-2 cursor-pointer "
             
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
               <p className="py-1">Leaves</p>
               <p className="py-1">Attendance</p>
             
             </div>
           )}
         </div>
         <div className='main-item1'>
           <div
             className="d-flex align-items-center justify-content-between p-2 cursor-pointer"
         
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
               <p className="py-1">Training List</p>
               <p className="py-1">Training</p>   
             </div>
           )}
         </div>
         <div className='main-item1'>
           <div
             className="d-flex align-items-center justify-content-between p-2 cursor-pointer"
             
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
         </div>
         <div className='main-item1'>
           <div
             className="d-flex align-items-center justify-content-between p-2 cursor-pointer"
             
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
               <p className="py-1">Payroll</p>
               <p className="py-1">Payslip</p>   
             </div>
           )}
         </div >
           <div className="d-flex align-items-center p-2 cursor-pointer">
             <DocumentScannerIcon className="fs-5 me-2" />
             <Link to='/document'>
               <p className="fw-semibold main-title">Document</p>
             </Link>
           </div>   
         </div>

         <div className='main-item1'>
         <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-4">ADMININSTRATION</h3>
         <div className="d-flex align-items-center p-2 cursor-pointer">
           <ManageAccountsIcon className="fs-5 me-2" />
           <p className="fw-semibold main-title">User Management</p>
         </div>
         <div className="d-flex align-items-center p-2 cursor-pointer">
             <HeadphonesIcon className="fs-5 me-2" />
             <p className="fw-semibold main-title">Helps & Support</p>
           </div>
           <div className="d-flex align-items-center p-2 cursor-pointer">
             <ManageAccountsIcon className="fs-5 me-2" />
             <p className="fw-semibold main-title">Reports</p>
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
           
         </div>


       </div> 

        )}
      </>
    );
  }