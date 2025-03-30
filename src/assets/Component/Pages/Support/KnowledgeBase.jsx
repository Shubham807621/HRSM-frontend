import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@mui/icons-material/Home";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import './KnowledgeBase.css';

const KnowledgeBase = () => {
  const categories = [
    { title: "Introduction to HRMS", count: 6, topics: [
        "What is an HRMS and Why is it Important?",
        "The Key Features of an HRMS Explained",
        "How HRMS Helps Automate HR Tasks",
        "HRMS Terminology: A Beginner’s Guide",
        "Cloud vs On-Premise HRMS vs Hybrid",
      ]
    },
    { title: "Employee Self-Service (ESS)", count: 10, topics: [
        "How to view & update your personal information",
        "Steps to Apply for Leave via the Employee Portal",
        "How to access and download your payslips",
        "Submitting & Tracking Expense Reimbursements",
        "How to track your attendance and work hours",
      ]
    },
    { title: "Manager Self-Service (MSS)", count: 12, topics: [
        "How to Approve or Reject Employee Requests",
        "Viewing and managing team attendance",
        "How to conduct performance reviews",
        "Approving expense claims for your team",
        "How to update & view team’s work schedules",
      ]
    },
    { title: "Payroll Management", count: 8, topics: [
        "How Payroll is Processed: A Step-by-Step Guide",
        "Deductions, Overtime, and Bonuses",
        "What to Do if There’s a Payroll Discrepancy",
        "How to Access Historical Payroll Information",
        "Managing Employee Tax Information and Filing",
      ]
    },
    { title: "Attendance & Time Tracking", count: 7, topics: [
        "How to clock in/out using the HRMS portal",
        "Submitting timesheets for approval",
        "Tracking overtime & managing work hours in HRMS",
        "How to view and manage shifts and schedules",
        "Generating attendance reports for your team",
      ]
    },
    { title: "Leave Management", count: 6, topics: [
        "How to Request Casual or Medical Leave",
        "How Leave Balances Are Calculated in HRMS",
        "Leave Approval Workflow: Guide for Managers",
        "Viewing Your Leave History & Pending Requests",
        "Understanding Different Types of Leaves",
      ]
    },
  ];

  return (
    <div className="Knowledge-base-wrap">
        <div className="page mb-4">
      <div className="header-container">
        <h3 className="page-title">Knowledgebase</h3>
        <div className="header-left-right">
          <div className="header-left">
            <p><HomeIcon/></p>
            <p>/</p>
            <p>Administration</p>
            <p>/</p>
            <p>Knowledgebase</p>
          </div>
          <div className="header-right">
            <button className="export"><SimCardDownloadIcon/>  Export  <ExpandMoreIcon/></button>
            <button className="more"><KeyboardDoubleArrowUpIcon/></button>
          </div>
        </div>
      </div>
      <div className="filter">
      <div className="card p-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-0 fw-bold">Knowledgebase</h5>
          </div>
          <div className="col-md-6 text-end">
            <input type="text" className="form-control d-inline w-auto me-2" value="03/14/2025 - 03/20/2025" readOnly />
            <select className="form-select d-inline w-auto">
              <option>Sort By: Last 7 Days</option>
              <option>Sort By: Last 30 Days</option>
              <option>Sort By: This Month</option>
            </select>
          </div>
        </div>
      </div>
    </div>
      <div className="body-container-wrap">
        <div className="body-container">
          {categories.map((category, index) => (
            <div key={index} className="card-wrap">
              <div className="Card">
                <div className="Header mb-2">
                <FolderOpenIcon className="red-icon" />
                {category.title} <span className="red-text">({category.count})</span>
                </div>
                <div className="List">
                  {category.topics.map((topic, idx) => (
                    <li key={idx} className="list-group-item mb-2"><InsertDriveFileOutlinedIcon className="file-icon"/>{topic}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;