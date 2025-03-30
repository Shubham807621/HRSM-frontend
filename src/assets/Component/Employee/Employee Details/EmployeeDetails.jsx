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
import { useParams } from "react-router-dom";
import CustomeModal from "../Modal/CustomeModal";
import { getEmployeeDetailsById, updateBasicInfo, updateEducationInfo, updateExperienceInfo, updateFamilyInfo } from "../../APIService/apiservice";
import { format } from "date-fns";

function EmployeeDetails() {
 

const { empId } = useParams(); 
const empID = localStorage.getItem('empId');
const isOwnProfile = !empId || empId === empID;
const token = localStorage.getItem('token'); 
const [employee, setEmployee]= useState({})
const [educationData, setEducationData]  = useState([])
const [experienceData, setExperienceData] =useState([])
const [familyData, setFamilyData] = useState({});
const [bankData, setBankData] = useState({});
const [showModal, setShowModal] = useState(false);
const [showFamilyModal, setShowFamilyModal] = useState(false);
const [showEducationModal, setShowEducationModal] = useState(false);
const [showExperienceModal, setShowExperienceModal] = useState(false);


  const handleEducationSave = (updatedData) =>{
    setShowEducationModal(false);
    setEducationData(updatedData)
    UpdateEducationInfoDetails(updatedData);
  }
  
  const handleExperienceSave = (updatedData) =>{
    setShowExperienceModal(false);
    setExperienceData(updatedData)
    UpdateExperienceInfoDetails(updatedData);
  }


  const handleFamilySave = (updatedData) => {
    setFamilyData(updatedData);
    setShowFamilyModal(false);
    UpdateFamilyInfoDetails(updatedData);
  };

  const handleSave1 = (updatedData) => {
    setBankData(updatedData);
    setShowModal(false);
    UpdateBasicInfoDetails(updatedData);
  };


  // Get Employee Details
    useEffect(() => {
      const fetchEmployeeDetails = async () => {
          try {
              const idToFetch = empId ? empId : empID; // ✅ Use empId if viewing another employee, otherwise use logged-in empID
              const response = await getEmployeeDetailsById(idToFetch, token);
              
              setEmployee(response);
              setBankData(response.bankInfo);
              setEducationData(response.educationDetails);
              setExperienceData(response.experiences);
              setFamilyData(response.familyInfo);
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchEmployeeDetails();
  }, [empId, empID, token]);
    // console.log(employee);
    
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty date values
    const date = new Date(dateString);
    return format(date, "yyyy / MMM / dd"); // Format as YYYY-Month-DD
  };


  // To update Employee Details
 
    const UpdateBasicInfoDetails = async (updatedData) => {
        try {
             const response = await updateBasicInfo(token, updatedData, empId);
            // console.log(response)
        
        } catch (error) {
            console.log(error);
        }
    };
    const UpdateEducationInfoDetails = async (updatedData) => {
        try {
             const response = await updateEducationInfo(token, updatedData, empId);
            // console.log(response)
        
        } catch (error) {
            console.log(error);
        }
    };
    const UpdateFamilyInfoDetails = async (updatedData) => {
        try {
             const response = await updateFamilyInfo(token, updatedData, empId);
            // console.log(response)
        
        } catch (error) {
            console.log(error);
        }
    };
    const UpdateExperienceInfoDetails = async (updatedData) => {
        try {
             const response = await updateExperienceInfo(token, updatedData, empId);
            // console.log(response)
        
        } catch (error) {
            console.log(error);
        }
    };

  // console.log(employee);
  return (
    <>
      <div className="employeedetails-wrapper">
          <div className="header-container">
            <Button className="back-button" onClick={() => window.history.back()}>
              <ArrowBackIcon />
            </Button>
            <h3 className="page-title">Employee Details</h3>
          </div>

          <div className="container d-flex justify-content-between mt-4">
      
            <div className="main-content">
              {/* Left - Profile Card */}
              <div className="profile-card">
                <div className="profile-header">
                  {/* <img src={employee.profileImg} className="profile-avatar" /> */}
                  <img src='https://randomuser.me/api/portraits/men/32.jpg' className="profile-avatar" alt="profile pic"/>
                </div>

                <div className="profile-content">
                  <h5 className="employee-name">
                    {employee.name} <span className="status-dot"></span>
                  </h5>
                  <div className="badges">
                  <p className="experience">{employee.designation}</p>
                    <p className="experience">{employee.totalExperience}</p>
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
                      <p  className="m-0">{employee.dateOfJoining}</p>
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
                      <p  className="m-0">{employee.reportingOffice}</p>
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
                    <div className="col-md-3 pe-0 bank-info-value">{bankData.accountNumber}</div>
                    <div className="col-md-2 pe-0 bank-info-value">{bankData.ifscCode}</div>
                    <div className="col-md-2 pe-0 bank-info-value">{bankData.branch}</div>
                  </div>
                  {/* ✅ Show Edit Button Only if Viewing Own Profile */}
                    {isOwnProfile && (
                  <div className="mt-3 text-end">
                    <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                      Edit Bank Details
                    </button>
                  </div>
                      
                    )}
                </div>
              </div>
              <CustomeModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                data={bankData} 
                handleSave={handleSave1} 
                title="Edit Bank Information" 
                fields={[
                  { name: "bankName", label: "Bank Name", required: true },
                  { name: "accountNumber", label: "Bank Account No" },
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
                            <div className="col-md-3 pe-0 bank-info-value">{formatDate(familyData.dob)}</div>
                            <div className="col-md-3 pe-0 bank-info-value">{familyData.phoneNumber}</div>
                          </div>
                          {/* ✅ Show Edit Button Only if Viewing Own Profile */}
                          {isOwnProfile && (
                        <div className="mt-3 text-end">
                          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                            Edit Family Details
                          </button>
                        </div>
                            
                          )}
                      </div>
                    </div>
                    <CustomeModal 
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
                                >{edu.yearOfPassing}
                              </p>
                            </div>
                          ))}
                        </div>
                        {isOwnProfile && (
                        <div className="mt-3 text-end">
                          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                            Edit Education Details
                          </button>
                        </div>
                            
                          )}
                        </div>
                      </div>

                      <CustomeModal 
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
                                      {exp.role}
                                  </p>
                                </div>
                                    <p 
                                      className="text-muted m-0" 
                                        style={{
                                          fontSize:"13px"
                                        }}
                                      >{exp.duration}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              {isOwnProfile && (
                        <div className="mt-3 text-end">
                          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                            Edit Experience Details
                          </button>
                        </div>
                            
                          )}
                        </div>
                      </div>
                      <CustomeModal 
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

              {employee.basicInfo && Object.entries(employee.basicInfo)
                .filter(([key]) => key !== "id")
                .map(([key, value], idx) => (
                  <div key={idx} className="info-row d-flex justify-content-between">
                    <p className="info-label">
                      {key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (c) => c.toUpperCase())}:
                    </p>
                    <p className="info-value">{value}</p>
                  </div>
                ))}


            </div>
            <div className="personal-info-card px-3 py-2 my-4">
                  <div className="section-header d-flex justify-content-between pt-2">
                    <h5 >Personal Information</h5>
                    <Button className="edit-icon mb-3">
                      <EditOutlinedIcon />
                    </Button>
                  </div>

                  {employee.personalInfo && Object.entries(employee.personalInfo)
                .filter(([key]) => key !== "id")
                .map(([key, value], idx) => (
                  <div key={idx} className="info-row d-flex justify-content-between">
                    <p className="info-label">
                      {key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (c) => c.toUpperCase())}:
                    </p>
                    <p className="info-value">{value}</p>
                  </div>
                ))}

                  
                </div> 


          </div>
      </div>
    </>
  );
}

export default EmployeeDetails;