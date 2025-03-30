import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeIcon from "@mui/icons-material/Home";
import './Document.css';
import { Button, Form,Pagination } from "react-bootstrap";
import { getDocument, sendDocument } from "../../APIService/apiservice";
import CustomeModal from "../../Employee/Modal/CustomeModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Document = () => {
  const documentRef = useRef();
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

        const rowsPerPage = 5;
          const [currentPage, setCurrentPage] = useState(1);
          const totalPages = Math.ceil(documents.length / rowsPerPage);
          
          // Get the current page data
          const currentData = documents.slice(
              (currentPage - 1) * rowsPerPage,
              currentPage * rowsPerPage
          );

  const userRole = localStorage.getItem("role");
               const downloadPDF = () => {
                  if (!documentRef.current) return;
              
                  html2canvas(documentRef.current, { scale: window.devicePixelRatio }).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                    pdf.save(document.pdf);
                  });
                };


  return (
    <div className="document-wrap">
     
      <div className="button-wrapper1 mt-2 d-flex justify-content-between">
              <h1 className="titleE text-primary">Document </h1>
      
              <div className="button-wrapper d-flex">
                <div>
                  <Form.Select
                    onChange={(e) => {
                      if (e.target.value === "pdf") {
                        downloadPDF();
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Export</option>
                    <option value="pdf">PDF</option>
                  </Form.Select>
                </div>
      
                <div className="container-addemp ms-4">
                    {/* Add Employee Button */}
                    <Button  className="add-document-btn" variant="warning" >
                      + Add Document
                    </Button>

                  </div>
              </div>
            </div>

      <div className="body-container" ref={documentRef}>
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
                {currentData.map((doc, index) => (
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

          <div className="d-flex justify-content-between align-items-center px-4 pb-2">
                        <span>Showing {currentData.length} of {documents.length} entries</span>
                        <Pagination className="mb-0">
                            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                        </Pagination>
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