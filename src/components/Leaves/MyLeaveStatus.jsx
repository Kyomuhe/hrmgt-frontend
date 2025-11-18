import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle, FileText, Trash2, User, Phone } from 'lucide-react';
import { makeRequest, showToast } from '../../Utils/util';
import CancelModal from '../Modals/CancelLeave';

const MyLeaveStatus = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);

    useEffect(() => {
        fetchMyLeaves();
    }, []);

    const fetchMyLeaves = async () => {
        setIsLoading(true);
        try {
            const employee = JSON.parse(localStorage.getItem('user'));
            console.log("Employee Data:", employee);
            const Id = employee?.employeeId;
            const EmployeeId = { id: Id };
            const response = await makeRequest('displayEmployeeLeaves', 'leavesService', EmployeeId);

            if (response?.returnCode !== 0) {
                showToast(response?.returnMessage || 'Failed to fetch leave applications', 'error');
                console.error(response?.returnMessage);
                return;
            }

            const leaves = response?.returnObject || [];
            setLeaveApplications(leaves);
        } catch (error) {
            console.error('Error fetching leaves:', error);
            showToast('An error occurred while fetching your leave applications', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const displayLeaves = leaveApplications || [];

    const getFilteredLeaves = () => {
        return displayLeaves.filter(leave => {
            const matchesTab = activeTab === 'all' || leave.status === activeTab;
            const matchesSearch =
                leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (leave.leaveReason && leave.leaveReason.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesTab && matchesSearch;
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
            case 'approved':
                return 'text-green-500 bg-green-500/10 border-green-500/30';
            case 'rejected':
                return 'text-red-500 bg-red-500/10 border-red-500/30';
            default:
                return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <AlertCircle className="w-5 h-5" />;
            case 'approved':
                return <CheckCircle className="w-5 h-5" />;
            case 'rejected':
                return <XCircle className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const getLeaveTypeColor = (leaveType) => {
        switch (leaveType.toLowerCase()) {
            case 'annual':
            case 'annual leave':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'sick':
            case 'sick leave':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'maternity':
            case 'maternity leave':
                return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
            case 'paternity':
            case 'paternity leave':
                return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
            case 'emergency':
            case 'emergency leave':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'study':
            case 'study leave':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'unpaid':
            case 'unpaid leave':
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatLeaveType = (leaveType) => {
        const typeMap = {
            'annual': 'Annual Leave',
            'sick': 'Sick Leave',
            'maternity': 'Maternity Leave',
            'paternity': 'Paternity Leave',
            'emergency': 'Emergency Leave',
            'study': 'Study Leave',
            'unpaid': 'Unpaid Leave',
        };
        return typeMap[leaveType.toLowerCase()] || leaveType;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const calculateDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const pendingCount = displayLeaves.filter(l => l.status === 'pending').length;
    const approvedCount = displayLeaves.filter(l => l.status === 'approved').length;
    const rejectedCount = displayLeaves.filter(l => l.status === 'rejected').length;

    return (
        <div className="min-h-screen text-white p-4 md:p-2">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <p className="text-gray-400">Track the status of your leave requests</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#1E1E23] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Total Applications</p>
                                <p className="text-3xl font-bold">{displayLeaves.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1E1E23] border border-yellow-500/30 rounded-xl p-5 hover:border-yellow-500/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-yellow-500">{pendingCount}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1E1E23] border border-green-500/30 rounded-xl p-5 hover:border-green-500/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Approved</p>
                                <p className="text-3xl font-bold text-green-500">{approvedCount}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1E1E23] border border-red-500/30 rounded-xl p-5 hover:border-red-500/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Rejected</p>
                                <p className="text-3xl font-bold text-red-500">{rejectedCount}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 mb-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by leave type or reason..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'all'
                            ? 'bg-[#7152F3] text-white'
                            : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
                            }`}
                    >
                        All Applications
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
                            }`}
                    >
                        <AlertCircle className="w-4 h-4" />
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveTab('approved')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'approved'
                            ? 'bg-green-600 text-white'
                            : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
                            }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Approved
                    </button>
                    <button
                        onClick={() => setActiveTab('rejected')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'rejected'
                            ? 'bg-red-600 text-white'
                            : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
                            }`}
                    >
                        <XCircle className="w-4 h-4" />
                        Rejected
                    </button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!isLoading && (
                    <div className="space-y-4">
                        {getFilteredLeaves().map((leave) => (
                            <div
                                key={leave.id}
                                className="bg-[#1E1E23] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-lg border ${getLeaveTypeColor(leave.leaveType)}`}>
                                                {formatLeaveType(leave.leaveType)}
                                            </span>
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusColor(leave.status)}`}>
                                                {getStatusIcon(leave.status)}
                                                <span className="text-xs font-semibold capitalize">{leave.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <User className="w-4 h-4" />
                                            <span>{leave.name}</span>
                                            <span className="text-gray-600">•</span>
                                            <span>{leave.department}</span>
                                        </div>
                                    </div>
                                    {leave.status === 'pending' && (
                                        <button
                                            onClick={() => {
                                                setSelectedLeaveId(leave.id);
                                                setIsCancelOpen(true);
                                            }}
                                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                                            title="Cancel Application"
                                        >
                                            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Start Date</p>
                                            <p className="text-sm font-medium text-white">{formatDate(leave.startDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">End Date</p>
                                            <p className="text-sm font-medium text-white">{formatDate(leave.endDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Duration</p>
                                            <p className="text-sm font-medium text-white">{calculateDuration(leave.startDate, leave.endDate)} days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#25252A] rounded-lg p-4 mb-4">
                                    <p className="text-sm text-gray-400 mb-2 font-medium">Reason:</p>
                                    <p className="text-white text-sm leading-relaxed">{leave.leaveReason || 'No reason provided'}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-400">Contact:</span>
                                        <span className="text-white">{leave.phoneNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-400">Emergency:</span>
                                        <span className="text-white">{leave.emergencyContact || 'N/A'}</span>
                                    </div>
                                </div>

                                {leave.status === 'approved' && leave.approvedBy && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
                                        <p className="text-sm text-green-400">
                                            Approved by {leave.approvedBy} {leave.approvedDate && `on ${formatDate(leave.approvedDate)}`}
                                        </p>
                                    </div>
                                )}

                                {leave.status === 'rejected' && leave.rejectionReason && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                                        <p className="text-sm text-gray-400 mb-1 font-medium">Rejection Reason:</p>
                                        <p className="text-sm text-red-400">{leave.rejectionReason}</p>
                                        {leave.rejectedBy && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Rejected by {leave.rejectedBy} {leave.rejectedDate && `on ${formatDate(leave.rejectedDate)}`}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 pt-4 border-t border-gray-800">
                                    Application ID: #{leave.id} {leave.appliedDate && `• Applied on ${formatDate(leave.appliedDate)}`}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && getFilteredLeaves().length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-[#25252A] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No leave applications found</h3>
                        <p className="text-gray-400">
                            {searchQuery
                                ? 'Try adjusting your search criteria'
                                : activeTab === 'all'
                                    ? "You haven't submitted any leave applications yet"
                                    : `No ${activeTab} leave applications`}
                        </p>
                    </div>
                )}
            </div>
            <CancelModal
                isOpen={isCancelOpen}
                onClose={() => setIsCancelOpen(false)}
                leaveId={selectedLeaveId}
                onCancelSuccess ={fetchMyLeaves}
            />
        </div>
    );
};

export default MyLeaveStatus;