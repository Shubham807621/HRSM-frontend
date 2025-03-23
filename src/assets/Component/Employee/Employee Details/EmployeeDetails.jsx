import React, { useEffect } from "react";
import { useState } from "react";

import BadgeIcon from "@mui/icons-material/Badge";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ModeIcon from '@mui/icons-material/Mode';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import MessageIcon from "@mui/icons-material/Message";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import "./EmployeeDetails.css";
import { Button } from "@mui/material";
import BankInfoModal from "../Modal/CustomeModal";
import { getEmployeeDetailsById } from "../../APIService/apiservice";

function EmployeeDetails() {
  const employee = {
    Name: "Nutan Kurkute",
    role: "Java Developer",
    experience: "10+ years of experience",
    clientId: "CLT-0024",
    team: "UI/UX Design",
    dateOfJoin: "1st Jan 2023",
    reportOffice: "Doglas Martini",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",

    basicInfo: {
      Phone: "+91 9876543210",
      Email: "nutan.kurkute@example.com",
      Gender: "Female",
      Birdthday: "24th July 2002",
      Address: "123 Street, Hyderabad, India",
    },
    personalInfo: {
      PassportNo: "1234568979879",
      Nationality: "Indian",
      Religion: "Hindu",
      MaritalStatus: "Married",
      EmploymentOfSpouse: "Yes",

    },
  };

  const [educationData, setEducationData]  = useState(
    [
      {
        institution: "Oxford University",
        degree: "Computer Science",
        years: "2020 - 2022",
      },
      {
        institution: "Cambridge University",
        degree: "Computer Network & Systems",
        years: "2016 - 2019",
      },
      {
        institution: "Oxford School",
        degree: "Grade X",
        years: "2012 - 2016",
      },
    ]
  ) 

  const [experienceData, setExperienceData] =useState(
    [
      {
        companyName: "Google",
        position: "UI/UX Developer",
        years: "Jan 2024 - Present",
      },
      
      {
        companyName: "Salesforce",
        position: "Web Developer",
        years: "Dec 2022- Jan 2024",
      },
      
      {
        companyName: "HubSpot",
        position: "Software Developer",
        years: "Dec 2019- Jan 2022",
      },
      
    ]
  ) 

  const [showModal, setShowModal] = useState(false);
  const [bankData, setBankData] = useState({
    bankName: "Swiz International Bank",
    accountNo: "159843014641",
    ifscCode: "ICI24504",
    branch: "Alabama USA",
  });

  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [familyData, setFamilyData] = useState({
    name: "Jay Kurkute",
    relationship: "Brother",
    dob: "25 May 2014",
    phone: "0123456789",
  });


  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);


  const handleEducationSave = (updatedData) =>{
    setShowEducationModal(false);
    setEducationData(updatedData)
  }
  
  const handleExperienceSave = (updatedData) =>{
    setShowExperienceModal(false);
    setExperienceData(updatedData)
  }


  const handleFamilySave = (updatedData) => {
    setFamilyData(updatedData);
    setShowFamilyModal(false);
  };

  const handleSave1 = (updatedData) => {
    setBankData(updatedData);
    setShowModal(false);
  };


  const empID = localStorage.getItem('empId');
    console.log(empID);

    const token = localStorage.getItem('token');
    
    useEffect(()=>{

    const fetchEmployeeDetails = async () =>{
    
        try{
        const respone = await getEmployeeDetailsById(empID, token);
        console.log(respone);
          
        }
        catch (error) {
        console.log(error)
    }

    };
    fetchEmployeeDetails();

    },[])
  

  return (
    <>
    
    <div className="employeedetails-wrapper">
     
      
        <div className="header-container">
          <Button className="back-button" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </Button>
          <h3 className="page-title">Employee Details</h3>
        </div>
      
        <div className="button-container">
          <button className="bank-button">
            <AddCircleOutlineIcon /> Bank & Statutory
          </button>
        </div>

        <div className="container d-flex justify-content-between mt-2">
      
      
        <div className="main-content">
          {/* Left - Profile Card */}
          <div className="profile-card">
            <div className="profile-header">
              <img src={employee.profileImg} className="profile-avatar" />
            </div>

            <div className="profile-content">
              <h5 className="employee-name">
                {employee.Name} <span className="status-dot"></span>
              </h5>
              <div className="badges">
              <p className="experience">{employee.role}</p>
                <p className="experience">{employee.experience}</p>
              </div>


              {/* Basic Details */}
              <div className="employee-details">
                <div className="detail-box d-flex align-items-center justify-content-between"
                  style={{width:"370px"}}
                >
                  <div className="box-left">
                  <p className="m-0">
                    <BadgeIcon className="icon" />
                    Client ID:
                  </p>
                  </div>
                  <div className="box-right">
                  <p  className="m-0">{employee.clientId}</p>
                  </div>
                </div>

                <div className="detail-box d-flex align-items-center justify-content-between"
                  style={{width:"370px"}}
                >
                  <div className="box-left">
                  <p className="m-0">
                    <StarOutlineIcon className="icon" />
                      Team :
                  </p>
                  </div>
                  <div className="box-right">
                  <p  className="m-0">{employee.team}</p>
                  </div>
                </div>
                
                <div className="detail-box d-flex align-items-center justify-content-between"
                  style={{width:"370px"}}
                >
                  <div className="box-left">
                  <p className="m-0">
                    <CalendarTodayIcon className="icon" />
                    Date Of Join :
                  </p>
                  </div>
                  <div className="box-right">
                  <p  className="m-0">{employee.dateOfJoin}</p>
                  </div>
                </div>
                <div className="detail-box d-flex align-items-center justify-content-between"
                  style={{width:"370px"}}
                >
                  <div className="box-left">
                  <p className="m-0">
                    <CalendarTodayIcon className="icon" />
                    Report Office:
                  </p>
                  </div>
                  <div className="box-right">
                  <p  className="m-0">{employee.reportOffice}</p>
                  </div>
                </div>
        
                
              </div>
              
              {/* Buttons */}
              <div className="button-group mt-3">
                <Button className="edit-button" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button className="message-button" startIcon={<MessageIcon />}>
                  Message
                </Button>
              </div>
            </div>

          </div>
        </div>


        <div className="right-side">
         <div className="right-custom">
    
        <div className="accordion" id="accordionExample">
          <div className="accordion-item mb-3 p-2">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              About Employee
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              As an award-winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide, I developed a 360° brand approach, creating brands that are meaningful and loved.
              </div>
            </div>
          </div>  

          <div className="accordion-item mb-3 p-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Bank Information
              </button>
            </h2>
      <div id="collapseTwo" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="row mb-2">
            <div className="col-md-4 pe-0 bank-info">Bank Name</div>
            <div className="col-md-3 pe-0 bank-info">Bank Account No</div>
            <div className="col-md-2 pe-0 bank-info">IFSC Code</div>
            <div className="col-md-2 pe-0 bank-info">Branch</div>
          </div>
          <div className="row">
            <div className="col-md-4 pe-0 bank-info-value">{bankData.bankName}</div>
            <div className="col-md-3 pe-0 bank-info-value">{bankData.accountNo}</div>
            <div className="col-md-2 pe-0 bank-info-value">{bankData.ifscCode}</div>
            <div className="col-md-2 pe-0 bank-info-value">{bankData.branch}</div>
          </div>
          <div className="mt-3 text-end">
            <button className="btn btn-warning btn-sm" onClick={() => setShowModal(true)}>
              Edit Bank Details
            </button>
          </div>
        </div>
      </div>
      <BankInfoModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        data={bankData} 
        handleSave={handleSave1} 
        title="Edit Bank Information" 
        fields={[
          { name: "bankName", label: "Bank Name", required: true },
          { name: "accountNo", label: "Bank Account No" },
          { name: "ifscCode", label: "IFSC Code" },
          { name: "branch", label: "Branch Address" }
        ]}
      />
          </div>
          <div className="accordion-item mb-3 p-2">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Family Information
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                  <div className="row mb-2">
                    <div className="col-md-3 pe-0 bank-info">Name</div>
                    <div className="col-md-3 pe-0 bank-info">Relationship</div>
                    <div className="col-md-3 pe-0 bank-info">Date of Birth</div>
                    <div className="col-md-3 pe-0 bank-info">Phone</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-3 pe-0 bank-info-value">{familyData.name}</div>
                    <div className="col-md-3 pe-0 bank-info-value">{familyData.relationship}</div>
                    <div className="col-md-3 pe-0 bank-info-value">{familyData.dob}</div>
                    <div className="col-md-3 pe-0 bank-info-value">{familyData.phone}</div>
                  </div>
                  <div className="mt-3 text-end">
                    <button className="btn btn-warning btn-sm" onClick={() => setShowFamilyModal(true)}>
                      Edit  Family Information
                    </button>
                  </div>
              </div>
            </div>
            <BankInfoModal 
              show={showFamilyModal} 
              handleClose={() => setShowFamilyModal(false)} 
              data={familyData} 
              handleSave={handleFamilySave} 
              title="Edit Family Information" 
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "relationship", label: "Relationship", required: true },
                { name: "dob", label: "Date of Birth" },
                { name: "phone", label: "Phone" }
              ]}
            />


          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="accordion" id="accordionExample1">
            <div className="accordion-item  p-2" style={{ width: '360px' }}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Education Information
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                <div className="accordion-body">
                <div className="container px-0">
                  {educationData.map((edu, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <p 
                          className="text-muted m-0"
                          style={{
                            fontSize:"13px"
                          }}
                        >
                          {edu.institution}
                        </p>
                        <p 
                          className="fw-bold m-0"
                          style={{
                            fontSize:"13px"
                          }}
                        >
                            {edu.degree}
                        </p>
                      </div>
                      <p 
                        className="text-muted m-0" 
                          style={{
                            fontSize:"13px"
                          }}
                        >{edu.years}
                      </p>
                    </div>
                  ))}
                </div>
                  <button className="btn btn-warning btn-sm" onClick={() => setShowEducationModal(true)}>
                      Edit Education Information
                  </button>
                </div>
              </div>

              <BankInfoModal 
              show={showEducationModal} 
              handleClose={() => setShowEducationModal(false)} 
              data={educationData} 
              handleSave={handleEducationSave} 
              title="Edit Education Information" 
              fields={[
                { name: "institution", label: "Institution", required: true },
                { name: "degree", label: "Degree", required: true },
                { name: "year", label: "Year" },
               
              ]}
            />
            </div>
          </div>
          
          <div className="accordion" id="accordionExample2">
            <div className="accordion-item  p-2" style={{ width: '360px' }}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  Experience
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                <div className="accordion-body">
                <div className="container px-0">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p 
                            className="text-muted m-0"
                            style={{
                              fontSize:"13px"
                            }}
                          >
                            {exp.companyName}
                          </p>
                          <p 
                            className="fw-bold m-0"
                            style={{
                              fontSize:"13px"
                            }}
                          >
                              {exp.position}
                          </p>
                        </div>
                            <p 
                              className="text-muted m-0" 
                                style={{
                                  fontSize:"13px"
                                }}
                              >{exp.years}
                            </p>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-warning btn-sm" onClick={() => setShowExperienceModal(true)}>
                          Edit Experience Information
                      </button>
                </div>
              </div>
              <BankInfoModal 
              show={showExperienceModal} 
              handleClose={() => setShowExperienceModal(false)} 
              data={experienceData} 
              handleSave={handleExperienceSave} 
              title="Edit Experience Information" 
              fields={[
                { name: "companyName", label: "Company Name", required: true },
                { name: "position", label: "Position", required: true },
                { name: "year", label: "Year" },
               
              ]}
            />
            </div>
          </div>
        </div>


      </div>


        </div>         
        </div>

      <div className="d-flex justify-content-between mt-5">
        <div className="personal-info-card px-3 py-2 my-4 mx-3">
          <div className="section-header d-flex justify-content-between pt-2">
            <h5 >Basic Information</h5>
            <Button className="edit-icon mb-3">
                <EditOutlinedIcon />
            </Button>
          </div>

          <div className="personal-info px-2 mt-3">
            {Object.entries(employee.basicInfo).map(([key, value], idx) => (
              <div key={idx} className="info-row d-flex justify-content-between">
                  <p variant="body2" className="info-label">
                      {key.replace(/([A-Z])/g, " $1")}:
                  </p>
                  <p  className="info-value">
                    {value}
                  </p>
              </div>
            ))}
          </div>
        </div>
         <div className="personal-info-card px-3 py-2 my-4">
              <div className="section-header d-flex justify-content-between pt-2">
                <h5 >Personal Information</h5>
                <Button className="edit-icon mb-3">
                  <EditOutlinedIcon />
                </Button>
              </div>

              <div className="personal-info px-2 mt-3">

                {Object.entries(employee.personalInfo).map(([key, value], idx) => (
                  <div key={idx} className="info-row d-flex justify-content-between">
                    <p  className="info-label">
                    
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="info-value">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div> *


      </div>
  


    </div>
    </>
  );
}

export default EmployeeDetails;