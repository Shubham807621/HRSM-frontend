import { useState, useEffect } from "react";
import "./Verify.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import bg from '../../Images/reset-password.png'
import { verifyUserCode } from "../APIService/apiservice";
import { useNavigate } from "react-router-dom";

export default function Verify({ email }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: email || "",
    code: "",
  });

  useEffect(() => {
    setValues((prev) => ({ ...prev, userName: email || "" }));
  }, [email]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto move to next input
    if (value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus(); // Move back on delete
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData.split(""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = code.join(""); // Get entered OTP
    const updatedValues = { ...values, code: otp }; // Update values with the entered code

    console.log("Payload for API:", updatedValues);

    try {
      const response = await verifyUserCode(updatedValues); // Pass updatedValues
      console.log(response);
      if (response?.code === 200) {
        setMessage("✅ Verification Successful!");
        navigate('/employeedashboard')
        
      } else {
        setMessage("❌ Incorrect OTP. Please try again.");
      }
    } catch (err) {
      setMessage("❌ Verification failed. Please try again.");
    }
  };

  return (
    <>
      <div className="verification-container">
        <div className="reset-wrapper">
          <div className="company-title">HRMS</div>

          <div className="verification-box">
            <div className="d-flex justify-content-center align-items-center">
              <div className="profile-icon d-flex justify-content-center align-items-center mb-4">
                <div
                  className="inner-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <PersonOutlineIcon className="logo" color="black" />
                </div>
              </div>
            </div>
            <h1>Enter Verification Code</h1>
            <p>We've sent a code to <b>username@gmail.com</b></p>
            <div className="container mt-3">
              <hr
                style={{
                  borderTop: "2px dashed gray",
                  width: "100%",
                }}
              />
            </div>
            <div className="code-inputs">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={handlePaste}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                />
              ))}
            </div>
            <button className="submit-btn my-2" onClick={handleSubmit}>Submit</button>
            <p className="resend-text">
              Experiencing issues receiving the code? <span>Resend Code</span>
            </p>
            {message && <p className="message">{message}</p>}
          </div>
        </div>

        <div className="img-wrapper">
          <img src={bg} alt="" />
        </div>
      </div>
    </>
  );
}
  