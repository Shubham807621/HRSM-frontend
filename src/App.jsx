import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './assets/Component/Login/Login'
import Register from './assets/Component/Registe/Register'
import Navbar from './assets/Component/Header/navbar'
import Employee from './assets/Component/Employee/EmployeeList/Employee'
import Verify from './assets/Component/Registe/Verify'
import ResetPassword from './assets/Component/Login/ResetPassword'
import NewPassword from './assets/Component/Login/NewPassword'
import HrDashboard from './assets/Component/Dashboard/HRDashboard/hrDashboard'
import EmployeeDetails from './assets/Component/Employee/Employee Details/EmployeeDetails'
import Document from './assets/Component/Pages/Document/Document'
import HRLeave from './assets/Component/Pages/Leave/HRLeave/HRLeave'
import EmpLeave from './assets/Component/Pages/Leave/EmployeeLeave/EmpLeave'
import Payslip from './assets/Component/Pages/Salary/PaySlip/Payslip'
import Support from './assets/Component/Pages/Support/Support'
import HrAttendance from './assets/Component/Pages/Attendance/HRAttendance/HrAttendance'
import EmpAttendance from './assets/Component/Pages/Attendance/EmpAttendance/EmpAttendance'
import Roles from './assets/Component/Pages/User Mangement/Role Mangement/Roles'
import EmployeeDashboard from './assets/Component/Dashboard/Employee Dashboard/EmployeeDashboard'
import TrainDash from './assets/Component/Pages/Training/Training Dashboard/TrainDash'
import TrainList from './assets/Component/Pages/Training/Training List/TrainList'
import Payroll from './assets/Component/Pages/Salary/Payroll/Payroll'
import KonwledgeBase from './assets/Component/Pages/Support/KnowledgeBase'
import Users from './assets/Component/Pages/User Mangement/Users/Users'
import { AttendanceProvider } from './assets/Component/Pages/Attendance/AttendanceProvider'

function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar variant="default"/>
     <AttendanceProvider>
        <Routes>
          <Route path="/"element={<Login/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/NewPassword" element={<NewPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path='/hrdashboard' element={<HrDashboard/>}/>
          <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
          <Route path='/employee-details/:empId' element={<EmployeeDetails/>}/>
          <Route path='/document' element={<Document/>} />
          <Route path='/leave/hr-Leave' element={<HRLeave/>}/>
          <Route path='/leave/emp-Leave' element={<EmpLeave/>}/>
          <Route path='/salary/payslip/:year/:month' element={<Payslip/>}/>
          <Route path='/salary/payroll' element={<Payroll/>}/>
          <Route path='/support/add-report' element={<Support/>}/>
          <Route path='/support/konwledgeBase' element={<KonwledgeBase/>}/>
          <Route path='/attendance/hr-attendance' element={<HrAttendance/>}/>
          <Route path='/attendance/emp-attendance' element={<EmpAttendance/>}/>
          <Route path='/user-management/update-role' element={<Roles/>}/>
          <Route path='/user-management/update-user-role' element={<Users/>}/>
          <Route path='/training-dashboard' element={<TrainDash/>}/>
          <Route path='/trainings-list' element={<TrainList/>}/>
        </Routes>
      </AttendanceProvider>
    </BrowserRouter>
  
    </>
  )
}

export default App
