import { useEffect, useState } from "react";
import { MessageCircle, CircleUser, PenLine, User, FileBadge, SquareUser, Mail, Phone, MapPin, Calendar, Building, Briefcase, Clock } from "lucide-react";
import Avator from '../../assets/Avator.png';
import { makeRequest, showToast } from "../../Utils/util";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
    useEffect(() => {
        displayEmployeeDetails();
    }, []);

    const location = useLocation();
    const { EmployeeId } = location.state || {};
    const employeeId = EmployeeId;
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState("personal");
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const displayEmployeeDetails = async () => {
        try {
            setIsLoading(true);
            const id = { id: employeeId };
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
        <div className="h-full border border-[#A2A1A833] rounded-lg flex flex-col p-3 sm:p-4 gap-4 overflow-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <div className="flex gap-2 sm:gap-3 flex-1">
                    <img
                        className="rounded-lg h-16 w-16 sm:h-20 sm:w-20 object-cover flex-shrink-0"
                        src={Avator}
                        alt="Profile"
                    />
                    <div className="flex flex-col gap-1 sm:gap-2 min-w-0">
                        <h2 className="font-medium text-white text-base sm:text-lg truncate">
                            {employeeDetails.lastName} {employeeDetails.firstName}
                        </h2>
                        <div className="flex text-xs sm:text-sm text-white/70 gap-2 items-center">
                            <CircleUser size={16} className="flex-shrink-0" />
                            <span className="truncate">{employeeDetails.designation}</span>
                        </div>
                        <div className="flex text-xs sm:text-sm text-white/70 gap-2 items-center">
                            <MessageCircle size={16} className="flex-shrink-0" />
                            <span className="truncate">{employeeDetails.email}</span>
                        </div>
                    </div>
                </div>

                <div className="sm:ml-auto">
                    <button
                        onClick={() => {
                            navigate('/layout/edit', { state: { EmployeeId: employeeId } });
                        }}
                        className="flex gap-2 items-center justify-center w-full sm:w-auto bg-[#7152F3] text-white rounded-lg p-2 px-4 hover:bg-[#5f3dd1] transition-colors text-sm"
                    >
                        <PenLine size={15} />
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="h-px bg-[#A2A1A833]"></div>

            <div className="flex sm:hidden gap-2">
                <button
                    onClick={() => setSelectedTab("personal")}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${selectedTab === "personal" ? "bg-[#7152F3] text-white" : "bg-gray-800/50 text-white/70"
                        }`}
                >
                    <SquareUser size={16} />
                    <span className="text-sm">Personal</span>
                </button>
                <button
                    onClick={() => setSelectedTab("professional")}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${selectedTab === "professional" ? "bg-[#7152F3] text-white" : "bg-gray-800/50 text-white/70"
                        }`}
                >
                    <FileBadge size={16} />
                    <span className="text-sm">Professional</span>
                </button>
            </div>

            <div className="flex gap-4 flex-1 min-h-0">
                <div className="hidden sm:flex flex-col border border-[#A2A1A833] rounded-lg w-56 lg:w-64 h-fit overflow-hidden">
                    <div className="flex text-white font-medium bg-[#7152F3] gap-2 items-center p-2 text-sm">
                        <User size={15} />Profile
                    </div>
                    <div className="flex flex-col gap-3 p-2">
                        <div
                            onClick={() => setSelectedTab("personal")}
                            className={`flex text-white/70 gap-2 items-center hover:bg-gray-800/50 rounded cursor-pointer p-2 transition-colors text-sm ${selectedTab === "personal" ? "bg-gray-800/70 text-white" : ""
                                }`}
                        >
                            <SquareUser size={15} />Personal Details
                        </div>
                        <div
                            onClick={() => setSelectedTab("professional")}
                            className={`flex text-white/70 gap-2 items-center hover:bg-gray-800/50 rounded cursor-pointer p-2 transition-colors text-sm ${selectedTab === "professional" ? "bg-gray-800/70 text-white" : ""
                                }`}
                        >
                            <FileBadge size={15} />Professional Details
                        </div>
                    </div>
                </div>

                <div className="flex-1 border border-[#A2A1A833] rounded-lg p-4 sm:p-6 overflow-auto">
                    {selectedTab === "personal" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Personal Details</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Full Name</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <User size={16} className="text-white/70 flex-shrink-0" />
                                        <span className="break-words">{employeeDetails.lastName} {employeeDetails.firstName}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Email Address</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Mail size={16} className="text-white/70 flex-shrink-0" />
                                        <span className="break-all">{employeeDetails.email}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Phone Number</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Phone size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.phone}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Date of Birth</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Calendar size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.birthDate}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Address</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <MapPin size={16} className="text-white/70 flex-shrink-0" />
                                        <span className="break-words">{employeeDetails.address}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Nationality</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <User size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.nationality}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Marital Status</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <User size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.maritalStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTab === "professional" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Professional Details</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Position</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Briefcase size={16} className="text-white/70 flex-shrink-0" />
                                        <span className="break-words">{employeeDetails.designation}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Department</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Building size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.departmentName}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Employee ID</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <FileBadge size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.id}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Date Joined</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Calendar size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.joiningDate}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Employment Type</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <Clock size={16} className="text-white/70 flex-shrink-0" />
                                        <span>{employeeDetails.employmentType}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/50 text-xs sm:text-sm">Work Location</label>
                                    <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                                        <MapPin size={16} className="text-white/70 flex-shrink-0" />
                                        <span className="break-words">{employeeDetails.officeLocation}</span>
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