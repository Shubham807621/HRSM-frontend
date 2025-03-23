import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeIcon from "@mui/icons-material/Home";
import './Document.css';
import axios from "axios";
import { getDocument } from "../../APIService/apiservice";


const Document = () => {


  const entries = 10;
    // const documents = [
    //     { fileName: "Training_Schedule.pdf", role: "Training Coordinator", description: "Timetable for employee training sessions and workshops." },
    //     { fileName: "Project_Plan.pdf", role: "Project Manager", description: "Comprehensive plan outlining project objectives, timeline, and deliverables." },
    //     { fileName: "Employee_Handbook.pdf", role: "HR", description: "Guidelines and policies for employees to follow in the workplace." },
    //     { fileName: "Client_Contract.xlsx", role: "Finance", description: "Agreement detailing terms and conditions for client services." },
    //     { fileName: "Annual_Report_2024.pdf", role: "Legal", description: "Financial performance and key milestones achieved in 2024." }
    // ];

    const [documents, SetDocuments] = useState([]);
      const [error, setError] = useState('');
    

 const token = localStorage.getItem('token');

  useEffect(()=>{

    const fetchDocumentList = async () =>{
    
      try{
        const respone = await getDocument(token);

        SetDocuments(respone);
      }
      catch (error) {
        console.log(error)
    }

    };
    fetchDocumentList();

  },[])

  return (
    <div className="document-wrap">
       <div className="header-container">
              <h3 className="page-title">Document</h3>
              <div className="header-right-left">
                      <div className="header-container-right">
                             <div className="homeicon-document">
                             <p>
                                <Link to="/" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                                <HomeIcon /> /
                                </Link>
                             </p>
                             <p className="document">Document</p>
                             </div>
                      </div>
                      <div className="header-container-left">
                        <button className="document-btn">Add Document</button>
                      </div>
                </div>
       </div>
    <div className="body-container">
        <div className="container mt-4">
            <div className="table-container">
                       <div colSpan={5} className="document-table-controls p-4">
                            <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                             <label htmlFor="entries" className="form-label me-2 mb-0">Show</label>
                                <select id="entries" className="form-select w-auto me-2" defaultValue={entries}>
                                  <option>10</option>
                                  <option>25</option>
                                  <option>50</option>
                                 </select>
                               <span>Entries</span>
                            </div>   
                                 <div className="document-table-search d-flex align-items-center">
                                 <label htmlFor="search" className="form-label me-2">Search:</label>
                                 <input id="search" type="text" className="form-control w-auto" placeholder="Search" />
                                </div>
                            </div>
                        </div>
            <table className="table">

                    <thead className="table-light">
                    <tr>
                        <th>File Name</th>
                        <th>Document</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                   </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={index}>
                            <td>{doc.fileName}</td>
                            <td><InsertDriveFileIcon/></td>
                            <td>{doc.role}</td>
                            <td>{doc.description}</td>
                            <td className="action-icon pe-4">
                                <EditIcon/>
                                <div className="delete-icon mx-2"><DeleteIcon/></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div className="d-flex justify-content-between">
                <span>Showing 1 to {documents.length} of {documents.length} entries</span>
                <div className="prev-next-btn">
                    <button className="btn">← Previous</button>
                    <button className="btn">Next →</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Document;