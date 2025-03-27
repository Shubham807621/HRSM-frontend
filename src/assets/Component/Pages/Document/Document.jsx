import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeIcon from "@mui/icons-material/Home";
import './Document.css';
import { getDocument, sendDocument } from "../../APIService/apiservice";
import CustomeModal from "../../Employee/Modal/CustomeModal";

const Document = () => {
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const [documents, SetDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fileName: "",
    documenttype: "",
    role: "",
    description: "",
  });

  useEffect(() => {
    const fetchDocumentList = async () => {
      try {
        const response = await getDocument(token);
        SetDocuments(response);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocumentList();
  }, []);

  const handleShowModal = () => {
    setFormData({ fileName: "", documenttype: "", role: "", description: "" }); // Reset form
    setShowModal(true);
  };

  const handleSave = (updatedData) => {
    setFormData(updatedData);
    setShowModal(false);
    handleSubmit(updatedData);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await sendDocument(data, token);
      setSuccess("Document added successfully!");
      setFormData({ fileName: "", documenttype: "", role: "", description: "" }); // Reset form after submit
      setShowModal(false); // Close modal after submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add document.");
    } finally {
      setLoading(false);
    }
  };

  const userRole = localStorage.getItem("role");


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
          {userRole === "HR" && (
              <button className="document-btn" onClick={handleShowModal}>
              Add Document
            </button>
          )}
            
          </div>
        </div>
      </div>

      <div className="body-container">
        <div className="container mt-4">
          <div className="table-container">
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
                    <td><InsertDriveFileIcon /></td>
                    <td>{doc.role}</td>
                    <td>{doc.description}</td>
                    <td className="action-icon pe-4">
                      <EditIcon />
                      <div className="delete-icon mx-2"><DeleteIcon /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between">
            <span>Showing 1 to {documents.length} of {documents.length} entries</span>
          </div>
        </div>
      </div>

      <CustomeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        data={formData}
        handleSave={handleSave}
        title="Add New Document"
        fields={[
          { name: "fileName", label: "File Name", required: true },
          { name: "documenttype", label: "Document Type", required: true },
          { name: "role", label: "Role", required: true },
          { name: "description", label: "Description", required: true },
        ]}
      />
    </div>
  );
};

export default Document;
