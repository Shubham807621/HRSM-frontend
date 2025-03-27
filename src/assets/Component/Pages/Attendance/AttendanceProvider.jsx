import React, { createContext, useContext, useState } from "react";
import { punchIn, punchOut } from "../../APIService/apiservice";

// Create a Context
const AttendanceContext = createContext();

// Create a Provider component
export const AttendanceProvider = ({ children }) => {
    const [isPunchedIn, setIsPunchedIn] = useState(() => {
        const storedValue = localStorage.getItem("isPunchedIn");
        return storedValue ? JSON.parse(storedValue) : false;
    });
    const [punchInTime, setPunchInTime] = useState(() => {
        const storedTime = localStorage.getItem("punchInTime");
        return storedTime && storedTime !== "null" ? storedTime : null;
    });
    
    const [punchInDate, setPunchInDate] = useState(() => {
        const storedDate = localStorage.getItem("punchInDate");
        return storedDate && storedDate !== "null" ? storedDate : null;
    });

    const [totalHours, setTotalHours] = useState(() => {
        const storedHours = localStorage.getItem("totalHours");
        return storedHours ? storedHours : null;
    });
    
    
    const token = localStorage.getItem('token')
    const empId = localStorage.getItem('empId')
    

    const formatDateTime = (timestamp) => {
        const dateObj = new Date(timestamp);
    
        // Convert to DD-Month-YYYY format
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    
        // Extract time in HH:MM AM/PM format
        const formattedTime = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    
        return { formattedDate, formattedTime };
    };

    // Function to handle Punch In / Punch Out
    const handlePunch = async () => {
        console.log(empId)
        try {
            if (!isPunchedIn) {
                const response = await punchIn(token, empId);
                console.log(response);
                const { formattedDate, formattedTime } = formatDateTime(response.message);
    
                // ✅ Update state
                setIsPunchedIn(true);
                setPunchInDate(formattedDate);
                setPunchInTime(formattedTime);
                setTotalHours(null); // Reset total hours on new punch-in
    
                // ✅ Save in localStorage      
                localStorage.setItem("isPunchedIn", "true");
                localStorage.setItem("punchInTime", formattedTime);
                localStorage.setItem("punchInDate", formattedDate);
                localStorage.removeItem("totalHours");


            } else {
                const response = await punchOut(token, empId);
                console.log(response);
                 const { totalHours, punchIn } = response;

                // ✅ Store total hours after punch-out
                setIsPunchedIn(false);
                setTotalHours(totalHours);

                // ✅ Keep punch-in time visible even after punch-out
                const { formattedTime } = formatDateTime(punchIn);
                setPunchInTime(formattedTime);

                // ✅ Save to localStorage
                localStorage.setItem("isPunchedIn", "false");
                localStorage.setItem("totalHours", totalHours);
            }
        } catch (error) {
            console.error("Punch In/Out failed", error);
        }
    };
    

    return (
        <AttendanceContext.Provider value={{ isPunchedIn, punchInTime, punchInDate, totalHours,  handlePunch }}>
            {children}
        </AttendanceContext.Provider>
    );
};

// Custom Hook to use context in components
export const useAttendance = () => useContext(AttendanceContext);
