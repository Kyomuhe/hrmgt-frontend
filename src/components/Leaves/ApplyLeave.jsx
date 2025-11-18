import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Calendar, FileText, Clock, User, Briefcase, Send, Info } from 'lucide-react';
import { makeRequest, showToast } from '../../Utils/util';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
    const navigate = useNavigate();

    const leaveTypes = [
        { value: '', label: 'Select leave type' },
        { value: 'annual', label: 'Annual Leave' },
        { value: 'sick', label: 'Sick Leave' },
        { value: 'maternity', label: 'Maternity Leave' },
        { value: 'paternity', label: 'Paternity Leave' },
        { value: 'emergency', label: 'Emergency Leave' },
        { value: 'study', label: 'Study Leave' },
        { value: 'unpaid', label: 'Unpaid Leave' },
    ];

    const validationSchema = Yup.object({
        leaveType: Yup.string()
            .required('Leave type is required')
            .notOneOf([''], 'Please select a valid leave type'),
        startDate: Yup.date()
            .required('Start date is required')
            .min(new Date(), 'Start date cannot be in the past'),
        endDate: Yup.date()
            .required('End date is required')
            .min(Yup.ref('startDate'), 'End date must be after start date'),
        reason: Yup.string()
            .required('Reason is required')
            .min(10, 'Reason must be at least 10 characters')
            .max(500, 'Reason must not exceed 500 characters'),

        contactNumber: Yup.string()
            .required('Contact number is required')
            .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits and only numbers are allowed'),
        emergencyContact: Yup.string()
            .required('Emergency contact is required')
            .matches(/^[0-9]{10}$/, 'Emergency contact must be 10 digits and only numbers are allowed'),
    });

    const formik = useFormik({
        initialValues: {
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: '',
            contactNumber: '',
            emergencyContact: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const leaveData = {
                    leaveType: values.leaveType,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    leaveReason: values.reason,
                    phoneNumber: values.contactNumber,
                    emergencyContact: values.emergencyContact,
                }
                const employee = JSON.parse(localStorage.getItem('user'));
                const employeeName = employee?.firstName + " " + employee?.lastName;
                leaveData.name = employeeName;
                leaveData.employeeId = employee?.employeeId;
                leaveData.department = employee?.department;

                const response = await makeRequest("leaveApplication", "leavesService", leaveData);
                if (response?.returnCode !== 0) {
                    const errorMessage = response?.returnMessage || 'Leave application failed. Please try again.';
                    showToast(errorMessage, 'error');
                    return;
                }
                showToast('Leave application submitted successfully', 'success');
                formik.resetForm();
                navigate("/layout/myLeaveStatus");
                
            } catch (error) {
                console.error('Leave application error:', error);
                showToast(error?.message, 'error');
            }
        }
    })

    return (
        <div className="min-h-screen text-white p-4 md:p-3">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-3xl font-bold text-white mb-2">Apply for Leave</h1>
                    <p className="text-gray-400">Submit your leave application for manager review</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-5 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-blue-400 font-semibold mb-3">Important Notes</h3>
                                <ul className="text-sm text-gray-300 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Leave applications must be submitted at least 3 days in advance (except emergency leave)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Sick leave may require medical documentation for periods exceeding 3 days</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Your manager will review and approve/reject your application</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>You will receive a notification once your application is processed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="bg-[#1E1E23] border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <Briefcase className="w-4 h-4 text-purple-400" />
                                    Leave Type <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="leaveType"
                                    value={formik.values.leaveType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                >
                                    {leaveTypes.map((type) => (
                                        <option key={type.value} value={type.value} className="bg-[#1A1A1D]">
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.leaveType && formik.errors.leaveType && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                        {formik.errors.leaveType}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        Start Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    {formik.touched.startDate && formik.errors.startDate && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            {formik.errors.startDate}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        End Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    {formik.touched.endDate && formik.errors.endDate && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            {formik.errors.endDate}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <FileText className="w-4 h-4 text-purple-400" />
                                    Reason for Leave <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    name="reason"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows="4"
                                    placeholder="Please provide a detailed reason for your leave application..."
                                    className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                />
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        {formik.touched.reason && formik.errors.reason && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                {formik.errors.reason}
                                            </p>
                                        )}
                                    </div>
                                    <p className={`text-xs ml-2 ${formik.values.reason.length > 450 ? 'text-yellow-400' : 'text-gray-500'}`}>
                                        {formik.values.reason.length}/500
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                        <User className="w-4 h-4 text-purple-400" />
                                        Contact Number <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={formik.values.contactNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="0700000000"
                                        className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    {formik.touched.contactNumber && formik.errors.contactNumber && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            {formik.errors.contactNumber}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                        <User className="w-4 h-4 text-purple-400" />
                                        Emergency Contact <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={formik.values.emergencyContact}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="0700000000"
                                        className="w-full px-4 py-3 bg-[#25252A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    {formik.touched.emergencyContact && formik.errors.emergencyContact && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            {formik.errors.emergencyContact}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#16161A] px-6 md:px-8 py-5 border-t border-gray-800">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={() => formik.resetForm()}
                                    disabled={formik.isSubmitting}
                                    className="flex-1 px-6 py-3 bg-[#25252A] text-white font-medium rounded-lg border border-gray-700 hover:bg-[#2D2D32] hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Reset Form
                                </button>
                                <button
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                    className='flex-1 sm:flex-[1.5] px-6 py-3 bg-[#7152F3] text-white font-semibold rounded-lg  transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;