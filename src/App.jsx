import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EnterOTP from "./components/Auth/Otp";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Dasboard/Layout";
import CompleteDashboard from "./components/Dasboard/DashboardScreen";
import { Toaster } from "sonner";


const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/otp' element={<EnterOTP />} />
        <Route path='/reset' element={<ResetPassword />} />

        <Route path='/layout' element={<Layout />}>
          <Route index element={<CompleteDashboard />} />
          <Route path="dashboard" element={<CompleteDashboard />} />

        </Route>

      </Routes>
    </Router>
  )
}
export default App;