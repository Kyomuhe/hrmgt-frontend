import { User, Briefcase } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { makeRequest, showToast } from '../../Utils/util';
import { useEffect , useState} from 'react';


const EditEmployee = () => {
    useEffect(()=>{
        getEmployeeData();
    },[])
    const [employeeData, setEmployeeData] = useState("");

    const location = useLocation();
    const { EmployeeId } = location.state || {};
    const employeeId = EmployeeId;

    const getEmployeeData = async() => {
        try{
        const id = {id:employeeId};
        const response = await makeRequest("displayEmployee", "EmployeesService", id);
        console.log('response:', response);
        
        if(response?.returnCode !==0){
            console.error(response?.returnMessage);
            showToast(response?.returnMessage, 'error');
            return;
        }
        const employeeDetails = response?.returnObject;
        setEmployeeData(employeeDetails);

        console.log('employee data:', employeeData);

        }catch(error){
            console.error(error.message);
        }

    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-white mb-2">Edit Employee</h1>
                    <p className="text-gray-400 text-sm">Update employee information and professional details</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#1E1D24] rounded-xl border border-[#2A2930] p-8 hover:border-[#3A3940] transition-colors">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2930]">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className=" text-white">
                                Personnel Details
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    First Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value = {employeeData.firstName}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Last Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value ={employeeData.lastName}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="Enter last name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value = {employeeData.email}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value = {employeeData.phone}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="+256 709867432"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={employeeData.birthDate}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={employeeData.address}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="Enter full address"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1E1D24] rounded-xl border border-[#2A2930] p-8 hover:border-[#3A3940] transition-colors">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2930]">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-purple-400" />
                            </div>
                            <h2 className="font-medium text-white">
                                Professional Details
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Nationality <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={employeeData.nationality}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="nationality"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Department <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="department"
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                    value={employeeData.departmentName}
                                >
                                    <option value="" className="bg-[#1E1D24]">Select department</option>
                                    <option value="engineering" className="bg-[#1E1D24]">Engineering</option>
                                    <option value="sales" className="bg-[#1E1D24]">Sales</option>
                                    <option value="marketing" className="bg-[#1E1D24]">Marketing</option>
                                    <option value="hr" className="bg-[#1E1D24]">Human Resources</option>
                                    <option value="finance" className="bg-[#1E1D24]">Finance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Position <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={employeeData.designation}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                    placeholder="Job title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={employeeData.joiningDate}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Employment Type
                                </label>
                                <select
                                    name="employmentType"
                                    value={employeeData.employmentType}
                                    className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                >
                                    <option value="full-time" className="bg-[#1E1D24]">Full-time</option>
                                    <option value="part-time" className="bg-[#1E1D24]">Part-time</option>
                                    <option value="contract" className="bg-[#1E1D24]">Contract</option>
                                    <option value="intern" className="bg-[#1E1D24]">Intern</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Office Location
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="office location"
                                        value={employeeData.officeLocation}
                                        className="w-full bg-[#16151C] text-white pl-8 pr-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="office location"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            className="px-6 py-3 border border-[#2A2930] rounded-lg text-gray-300 hover:bg-[#1E1D24] hover:border-[#3A3940] transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-500/20"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;