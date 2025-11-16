import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EnterOTP from "./components/Auth/Otp";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Dasboard/Layout";
import CompleteDashboard from "./components/Dasboard/DashboardScreen";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./components/Employees/Employees";
import EmployeeForm from "./components/Employees/EmployeeForm";
import Departments from "./components/Departments/Departments";
import Profile from './components/Employees/Profile';
import EditEmployee from './components/Employees/EditEmployee';
import DepartmentEmployees from './components/Departments/DepartmentEmployees';
import AllJobs from './components/Jobs/AllJobs';
import Leaves from './components/Leaves/Leaves';
import ApplyLeave from './components/Leaves/ApplyLeave';
import MyLeaveStatus from './components/Leaves/MyLeaveStatus';
import AddUser from './components/UserManagement/AddUser';
import AllUsers from './components/UserManagement/AllUsers';

const RoleBasedRedirect = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.roleCode) {
    return <Navigate to="/" replace />;
  }
  
  if (user.roleCode === 'HR') {
    return <Navigate to="/layout/dashboard" replace />;
  } else if (user.roleCode === 'user') {
    return <Navigate to="/layout/myLeaveStatus" replace />;
  }
  
  return <Navigate to="/layout/myLeaveStatus" replace />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/otp' element={<EnterOTP />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path = "/departments" element= {<Departments />} />

          <Route path="/layout" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<RoleBasedRedirect />} />
            
            <Route path="dashboard" element={<CompleteDashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="register" element={<EmployeeForm />} />
            <Route path="departments" element={<Departments />} />
            <Route path="deptEmployees" element = {<DepartmentEmployees/>}/>
            <Route path="jobs" element ={<AllJobs/>}/>
            <Route path="leaves" element ={<Leaves/>}/>
            <Route path="addUser" element = {<AddUser/>}/>
            <Route path="users" element = {<AllUsers/>}/>
            
            <Route path="applyLeave" element = {<ApplyLeave/>}/>
            <Route path="myLeaveStatus" element = {<MyLeaveStatus/>}/>
            <Route path="profile" element = {<Profile/>} />
            <Route path="edit" element ={<EditEmployee/>}/>
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;