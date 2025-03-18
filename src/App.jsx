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



function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar variant="default"/>

        <Routes>
          <Route path="/"element={<Login/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/NewPassword" element={<NewPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path='/hrdashboard' element={<HrDashboard/>}/>
        </Routes>
    
    </BrowserRouter>
  
    </>
  )
}

export default App
