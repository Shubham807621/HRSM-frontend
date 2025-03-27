import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getPayslip, getEmployeeDetailsById } from "../../../APIService/apiservice";
import "./Payslip.css";

const Payslip = () => {
  const payslipRef = useRef();
  const [payslipData, setPayslipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const token = localStorage.getItem("token");
  const empID = localStorage.getItem("empID");

  const defaultEarnings = [
    { label: "Basic Salary", amount: 3000 },
    { label: "House Rent Allowance (H.R.A.)", amount: 1000 },
    { label: "Conveyance", amount: 200 },
    { label: "Other Allowance", amount: 100 },
  ];

  const defaultDeductions = [
    { label: "Tax Deducted at Source (T.D.S.)", amount: 200 },
    { label: "Provident Fund", amount: 300 },
    { label: "ESI", amount: 150 },
    { label: "Loan", amount: 50 },
  ];

  useEffect(() => {
    if (!token || !empID || !year || !month) {
      setError("Missing required parameters.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [employeeResponse, payslipResponse] = await Promise.all([
          getEmployeeDetailsById(empID, token),
          getPayslip(token, empID, year, month),
        ]);

        setPayslipData({
          employee: employeeResponse,
          earnings: payslipResponse.earnings || defaultEarnings,
          deductions: payslipResponse.deductions || defaultDeductions,
          payslipNo: payslipResponse.payslipNo,
          date: payslipResponse.date,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch payslip data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, empID, year, month]);

  const downloadPDF = () => {
    if (!payslipRef.current) return;

    html2canvas(payslipRef.current, { scale: window.devicePixelRatio }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`payslip_${month}_${year}.pdf`);
    });
  };

  if (loading) return <p>Loading payslip...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!payslipData) return <p>No payslip available for {month} {year}.</p>;

  const totalEarnings = payslipData.earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = payslipData.deductions.reduce((sum, item) => sum + item.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  return (
   <>
   <div className='payslip-wrap'>
   <div className="header-container">
              <h3 className="page-title">Payslip</h3>
              <div className="header-right-left">
                     
                             <div className="homeicon-document">
                             <p>
                                <Link to="/" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                                <HomeIcon /> /
                                </Link>
                             </p>
                             <p className="payslip">Payslip</p>
                             </div>
                      
                      <div className="header-container-left">
                         <button className="download-btn" onClick={downloadPDF}>
                <DownloadIcon /> Download
              </button>
                      </div>
                </div>
       </div>




    <div className="container" ref={payslipRef}>
      {/* Download button */}
      

      {/* Title */}<div className='row'>
      <h2 className="emp-payslip">Employee Payslip</h2>
      </div>
      
      {/* Header row: To (address) on left, Payslip No and Date on right */}
      <div className="row">
        
        <div className="col-md-10 text-md-end">
        <p>Payslip No: <span class="red-text">{payslipData.payslipNo}</span></p>
          <p>Date:{payslipData.date}</p>
        </div>
      </div>

      {/* Billing Address section */}
      
      <div className='bill-address'>
      <div className="row mb-3">
        <div className='col-md-1'></div>
      <div className="col-md-5">
          <p>To:</p>
          <p>{payslipData.employee.address}</p>
          <p>{payslipData.employee.email}</p>
          <p>{payslipData.employee.phone}</p>
        </div>
        <div className="col-md-6">
          <h5>Billing Address</h5>
          <p>{payslipData.employee.name}</p>
          <p>Position: {payslipData.employee.position}</p>
          <p>Department: {payslipData.employee.department}</p>
          <p>Email: {payslipData.employee.email}</p>
          <p>Phone: {payslipData.employee.phone}</p>
        </div>
      </div>
      </div>
    

      {/* Payslip month heading */}
      
      <h5 className="text-center ">Payslip for the month of October 2024</h5>
      
      {/* Earnings and Deductions in two columns */}
      <div className="row">
        {/* Earnings Table */}
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header bg-light">
              <strong>Earnings</strong>
            </div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <tbody>
                  {payslipData.earnings.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td className="text-end">${item.amount}</td>
                    </tr>
                  ))}
                  <tr className="table-end">
                    <td>Total Earnings</td>
                    <td className="text-end">${totalEarnings}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Deductions Table */}
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header bg-light">
              <strong>Deductions</strong>
            </div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <tbody>
                  {payslipData.deductions.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td className="text-end">${item.amount}</td>
                    </tr>
                  ))}
                  <tr className="table-end">
                    <td>Total Deductions</td>
                    <td className="text-end">${totalDeductions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    
      
    </div>
    </div>
  
    </>
  );
};

export default Payslip;