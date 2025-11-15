import { useEffect, useState } from 'react';
import { Search, Filter, Calendar, User, Clock, CheckCircle, XCircle, AlertCircle, Phone, FileText, X } from 'lucide-react';
import { makeRequest, showToast } from '../../Utils/util';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1E1E23] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-[#25252A] hover:bg-[#2D2D32] text-white font-medium rounded-lg transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 ${confirmColor} text-white font-medium rounded-lg transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Rejection Modal Component
const RejectionModal = ({ isOpen, onClose, onConfirm, employeeName, isLoading }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }
    onConfirm(reason);
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1E1E23] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Reject Leave Application</h3>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-300 mb-4">
          You are about to reject <span className="font-semibold text-white">{employeeName}</span>'s leave application.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rejection Reason <span className="text-red-400">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError('');
            }}
            placeholder="Please provide a detailed reason for rejection..."
            className="w-full bg-[#25252A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            rows="4"
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-[#25252A] hover:bg-[#2D2D32] text-white font-medium rounded-lg transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Reject Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Leaves = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [leavesData, setLeavesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [approveModal, setApproveModal] = useState({ isOpen: false, leaveId: null, employeeName: '' });
  const [rejectModal, setRejectModal] = useState({ isOpen: false, leaveId: null, employeeName: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    displayLeaves();
  }, []);

  const displayLeaves = async () => {
    setIsLoading(true);
    try {
      const response = await makeRequest("displayAllLeaves", "leavesService", {});
      if (response?.returnCode !== 0) {
        showToast(response?.returnMessage || 'Failed to fetch leave applications', 'error');
        return;
      }
      const leaves = response?.returnObject || [];
      setLeavesData(leaves);
    } catch (error) {
      console.error("Error fetching leaves data:", error);
      showToast(error?.message || 'An error occurred while fetching leave applications', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveClick = (leaveId, employeeName) => {
    setApproveModal({ isOpen: true, leaveId, employeeName });
  };

  const approveLeave = async () => {
    setIsProcessing(true);
    try {
      const id = approveModal.leaveId;
      const LeaveId = { leavesId: id };
      const response = await makeRequest("approve", "leavesService", LeaveId);
      if (response?.returnCode !== 0) {
        showToast(response?.returnMessage || 'Failed to approve leave application', 'error');
        return;
      }
      showToast('Leave application approved successfully', 'success');
      setApproveModal({ isOpen: false, leaveId: null, employeeName: '' });
      displayLeaves();
    } catch (error) {
      console.error("Error approving leave:", error);
      showToast(error?.message || 'An error occurred while approving leave application', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = (leaveId, employeeName) => {
    setRejectModal({ isOpen: true, leaveId, employeeName });
  };

  const rejectLeave = async (reason) => {
    setIsProcessing(true);
    try {
      const id = rejectModal.leaveId;
      const rejectData = { leavesId: id, rejectionReason: reason };
      const response = await makeRequest("reject", "leavesService", rejectData);
      if (response?.returnCode !== 0) {
        showToast(response?.returnMessage || 'Failed to reject leave application', 'error');
        return;
      }
      showToast('Leave application rejected successfully', 'success');
      setRejectModal({ isOpen: false, leaveId: null, employeeName: '' });
      displayLeaves();
    } catch (error) {
      console.error("Error rejecting leave:", error);
      showToast(error?.message || 'An error occurred while rejecting leave application', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getFilteredLeaves = () => {
    return leavesData.filter(leave => {
      const matchesTab = leave.status === activeTab;
      const matchesSearch =
        leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.employeeId.toString().includes(searchQuery.toLowerCase()) ||
        leave.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const pendingCount = leavesData.filter(l => l.status === 'pending').length;
  const approvedCount = leavesData.filter(l => l.status === 'approved').length;
  const rejectedCount = leavesData.filter(l => l.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-[#16161A] text-white p-4 md:p-6">
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <ConfirmationModal
        isOpen={approveModal.isOpen}
        onClose={() => setApproveModal({ isOpen: false, leaveId: null, employeeName: '' })}
        onConfirm={approveLeave}
        title="Approve Leave Application"
        message={`Are you sure you want to approve ${approveModal.employeeName}'s leave application? This action will grant them the requested time off.`}
        confirmText="Approve Leave"
        confirmColor="bg-green-600 hover:bg-green-700"
        isLoading={isProcessing}
      />

      <RejectionModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, leaveId: null, employeeName: '' })}
        onConfirm={rejectLeave}
        employeeName={rejectModal.employeeName}
        isLoading={isProcessing}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-2xl font-bold mb-2">Leave Applications</h1>
          <p className="text-gray-400">Manage employee leave requests</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1E1E23] border border-yellow-500/30 rounded-xl p-5 hover:border-yellow-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pending Review</p>
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

        <div className="bg-[#1E1E23] border border-gray-800 rounded-xl p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, employee ID, department, or leave type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#25252A] text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Pending
            <span className="px-2 py-0.5 bg-black/20 text-xs rounded-full">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Approved
            <span className="px-2 py-0.5 bg-black/20 text-xs rounded-full">
              {approvedCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-[#25252A] text-gray-400 hover:text-white hover:bg-[#2D2D32]'
            }`}
          >
            <XCircle className="w-4 h-4" />
            Rejected
            <span className="px-2 py-0.5 bg-black/20 text-xs rounded-full">
              {rejectedCount}
            </span>
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {getFilteredLeaves().map((leave) => (
              <div
                key={leave.id}
                className="bg-[#1E1E23] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {getInitials(leave.name)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{leave.name}</h3>
                      <p className="text-sm text-gray-400">ID: {leave.employeeId} • {leave.department}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusColor(leave.status)}`}>
                    {getStatusIcon(leave.status)}
                    <span className="text-xs font-semibold capitalize">{leave.status}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-lg border ${getLeaveTypeColor(leave.leaveType)}`}>
                    {formatLeaveType(leave.leaveType)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
                    <div>
                      <p className="text-xs text-gray-400">Start Date</p>
                      <p className="text-sm font-medium text-white">{formatDate(leave.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
                    <div>
                      <p className="text-xs text-gray-400">End Date</p>
                      <p className="text-sm font-medium text-white">{formatDate(leave.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#25252A] rounded-lg">
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
                  <div className="flex items-center gap-2 text-sm bg-[#25252A] rounded-lg p-3">
                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Contact</p>
                      <p className="text-white">{leave.phoneNumber || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-[#25252A] rounded-lg p-3">
                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Emergency</p>
                      <p className="text-white">{leave.emergencyContact || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {leave.status === 'rejected' && leave.rejectionReason && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                    <p className="text-sm text-gray-400 mb-1 font-medium">Rejection Reason:</p>
                    <p className="text-red-400 text-sm">{leave.rejectionReason}</p>
                  </div>
                )}

                {leave.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => handleApproveClick(leave.id, leave.name)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-green-900/20"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectClick(leave.id, leave.name)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-red-900/20"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                <div className="text-xs text-gray-500 pt-3 border-t border-gray-800 mt-3">
                  Application ID: #{leave.id}
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
                : `No ${activeTab} leave applications at the moment`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaves;