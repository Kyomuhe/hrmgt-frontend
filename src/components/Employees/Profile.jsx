import { useEffect, useState } from "react";
import { MessageCircle, CircleUser, PenLine, User, FileBadge, SquareUser, Mail, Phone, MapPin, Calendar, Building, Briefcase, DollarSign, Clock } from "lucide-react";
import Avator from '../../assets/Avator.png';
import { makeRequest, showToast } from "../../Utils/util";
import { useLocation , useNavigate} from "react-router-dom";

const Profile = () => {
    useEffect(() => {
        deisplayEmployeeDetails();
    }, []);

    const location = useLocation();
    const { EmployeeId } = location.state || {};
    const employeeId = EmployeeId;
    const navigate = useNavigate();


    const [selectedTab, setSelectedTab] = useState("personal");
    const [employeeDetails, setEmployeeDetails] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 


    const deisplayEmployeeDetails = async () => {
        try {
            setIsLoading(true); 
            const id = {id: employeeId};
            console.log("this is the employee id");
            console.log(id);
            const response = await makeRequest("displayEmployee", "EmployeesService", id)
            console.log("Employee Details Response: ", response);

            if (response?.returnCode !== 0) {
                showToast(response?.returnMessage, 'error')
                console.error(response?.message || "Failed to fetch employee details.");
                setIsLoading(false);
                return;
            }
            const details = response?.returnObject || null;
            setEmployeeDetails(details);
            console.log("Employee Details: ", details);
            // showToast("Employee details fetched successfully.", 'success');


        } catch (error) {
            console.error(error.message);
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false); 
        }
    }

    if (isLoading || !employeeDetails) {
        return (
            <div className="h-full border border-[#A2A1A833] rounded-lg flex items-center justify-center p-4">
                <div className="text-white/70">Loading employee details...</div>
            </div>
        );
    }

    return (
        <div className="h-full border border-[#A2A1A833] rounded-lg flex flex-col p-4 gap-4">
            <div className="flex gap-2">
                <img
                    className="rounded-lg h-25 w-25"
                    src={Avator}
                />
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-white">{employeeDetails.lastName} {employeeDetails.firstName}</h2>
                    <div className="flex text-sm text-white/70 gap-2">
                        <CircleUser size={20} /> {employeeDetails.designation}
                    </div>
                    <div className="flex text-sm text-white/70 gap-2">
                        <MessageCircle size={20} /> {employeeDetails.email}
                    </div>
                </div>

                <div className="ml-auto">
                    <button
                     onClick ={()=>{
                        navigate('/layout/edit', {state: {EmployeeId: employeeId}});
                    }}
                     className="flex gap-2 items-center bg-[#7152F3] text-white rounded-lg p-2 hover:bg-[#5f3dd1] transition-colors">
                        <PenLine size={15} />
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="h-px bg-[#A2A1A833]"></div>

            <div className="flex gap-4 flex-1">
                <div className="flex flex-col border border-[#A2A1A833] rounded-lg w-64 h-fit overflow-hidden">
                    <div className="flex text-white font-medium bg-[#7152F3] gap-2 items-center p-2">
                        <User size={15} />Profile
                    </div>
                    <div className="flex flex-col gap-3 p-2">
                        <div
                            onClick={() => setSelectedTab("personal")}
                            className={`flex text-white/70 gap-2 items-center hover:bg-gray-800/50 rounded cursor-pointer p-2 transition-colors ${selectedTab === "personal" ? "bg-gray-800/70 text-white" : ""}`}
                        >
                            <SquareUser size={15} />Personal Details
                        </div>
                        <div
                            onClick={() => setSelectedTab("professional")}
                            className={`flex text-white/70 gap-2 items-center hover:bg-gray-800/50 rounded cursor-pointer p-2 transition-colors ${selectedTab === "professional" ? "bg-gray-800/70 text-white" : ""}`}
                        >
                            <FileBadge size={15} />Professional Details
                        </div>
                    </div>
                </div>

                <div className="flex-1 border border-[#A2A1A833] rounded-lg p-6">
                    {selectedTab === "personal" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Personal Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Full Name</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <User size={16} className="text-white/70" />
                                        {employeeDetails.lastName} {employeeDetails.firstName}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Email Address</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Mail size={16} className="text-white/70" />
                                        {employeeDetails.email}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Phone Number</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Phone size={16} className="text-white/70" />
                                        {employeeDetails.phone}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Date of Birth</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Calendar size={16} className="text-white/70" />
                                        {employeeDetails.birthDate}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Address</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin size={16} className="text-white/70" />
                                        {employeeDetails.address}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Nationality</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <User size={16} className="text-white/70" />
                                        {employeeDetails.nationality}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Marital Status</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <User size={16} className="text-white/70" />
                                        {employeeDetails.maritalStatus}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTab === "professional" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Professional Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Position</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Briefcase size={16} className="text-white/70" />
                                        {employeeDetails.designation}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Department</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Building size={16} className="text-white/70" />
                                        {employeeDetails.departmentName}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Employee ID</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <FileBadge size={16} className="text-white/70" />
                                        {employeeDetails.id}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Date Joined</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Calendar size={16} className="text-white/70" />
                                        {employeeDetails.joiningDate}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Employment Type</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Clock size={16} className="text-white/70" />
                                        {employeeDetails.employmentType}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-sm">Work Location</label>
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin size={16} className="text-white/70" />
                                        {employeeDetails.officeLocation}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;