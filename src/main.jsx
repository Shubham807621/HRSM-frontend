import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AttendanceProvider } from './assets/Component/Pages/Attendance/AttendanceProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AttendanceProvider>
    <App />
  </AttendanceProvider>
)
