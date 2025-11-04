import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EnterOTP from "./components/Auth/Otp";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Dasboard/Layout";
import CompleteDashboard from "./components/Dasboard/DashboardScreen";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./components/Dasboard/Employees";
import EmployeeForm from "./components/Dasboard/EmployeeForm";


const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/otp' element={<EnterOTP />} />
        <Route path='/reset' element={<ResetPassword />} />

        <Route path ="/layout" element ={
          <ProtectedRoute>
            <Layout/>
          </ProtectedRoute>
          }>
            <Route index element={<CompleteDashboard />} />
            <Route path="dashboard" element={<CompleteDashboard />} />
            <Route path ="employees" element= {<Employees/>}/>
            <Route path = "register" element = {<EmployeeForm/>}/>

        </Route>

      </Routes>
    </Router>
  )
}
export default App;