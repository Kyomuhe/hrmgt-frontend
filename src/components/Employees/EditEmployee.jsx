import { User, Briefcase } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { makeRequest, showToast } from '../../Utils/util';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const EditEmployee = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { EmployeeId } = location.state || {};
    const employeeId = EmployeeId;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .min(2, 'At least provide 2 characters')
            .required('First name required'),
        lastName: Yup.string()
            .trim()
            .min(2, 'At least provide 2 characters')
            .required('Last name required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        dateOfBirth: Yup.date()
            .max(new Date(), 'Date of birth cannot be in the future'),
        address: Yup.string()
            .trim()
            .min(5, 'At least provide 5 characters'),
        nationality: Yup.string()
            .trim()
            .min(2, 'At least provide 2 characters')
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dateOfBirth: "",
            address: "",
            nationality: "",
            joiningDate: "",
            departmentName: "",
            designation: "",
            employmentType: "",
            officeLocation: ""
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const newData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    birthDate: values.dateOfBirth,
                    address: values.address,
                    designation: values.designation,
                    employmentType: values.employmentType,
                    officeLocation: values.officeLocation,
                    nationality: values.nationality,
                    joiningDate: values.joiningDate,
                    departmentName: values.departmentName
                };

                const id = { employeeId: employeeId };
                const combinedData = { ...newData, ...id };
                console.log('combinedData:', combinedData);

                const response = await makeRequest("updateEmployee", "EmployeesService", combinedData);

                if (response?.returnCode !== 0) {
                    console.error(response?.returnMessage);
                    showToast(response?.returnMessage, 'error');
                    setSubmitting(false);
                    return;
                }

                showToast('Employee updated successfully', 'success');
                navigate('/layout/employees');
            } catch (error) {
                console.error(error.message);
                showToast(error.message, 'error');
                setSubmitting(false);
            }
        }
    });

    const getEmployeeData = async () => {
        try {
            setIsLoading(true);
            const id = { id: employeeId };
            const response = await makeRequest("displayEmployee", "EmployeesService", id);
            console.log('response:', response);

            if (response?.returnCode !== 0) {
                console.error(response?.returnMessage);
                showToast(response?.returnMessage, 'error');
                return;
            }

            const employeeDetails = response?.returnObject;
            setEmployeeData(employeeDetails);

            formik.setValues({
                firstName: employeeDetails.firstName || "",
                lastName: employeeDetails.lastName || "",
                email: employeeDetails.email || "",
                phone: employeeDetails.phone || "",
                dateOfBirth: employeeDetails.birthDate || "",
                address: employeeDetails.address || "",
                nationality: employeeDetails.nationality || "",
                joiningDate: employeeDetails.joiningDate || "",
                departmentName: employeeDetails.departmentName || "",
                designation: employeeDetails.designation || "",
                employmentType: employeeDetails.employmentType || "",
                officeLocation: employeeDetails.officeLocation || ""
            });

            console.log('employee data:', employeeDetails);
        } catch (error) {
            console.error(error.message);
            showToast('Failed to load employee data', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (employeeId) {
            getEmployeeData();
        }
    }, [employeeId]);

    const handleCancel = () => {
        navigate('/layouts/employees');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen py-8 px-4 flex items-center justify-center">
                <div className="text-white">Loading employee data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-white mb-2">Edit Employee</h1>
                    <p className="text-gray-400 text-sm">Update employee information and professional details</p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-6">
                        <div className="bg-[#1E1D24] rounded-xl border border-[#2A2930] p-8 hover:border-[#3A3940] transition-colors">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2930]">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-white">
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
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="Enter first name"
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Last Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="Enter last name"
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.lastName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="email@example.com"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="+256 709867432"
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formik.values.dateOfBirth}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                    />
                                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.dateOfBirth}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="Enter full address"
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.address}</p>
                                    )}
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
                                        value={formik.values.nationality}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="Nationality"
                                    />
                                    {formik.touched.nationality && formik.errors.nationality && (
                                        <p className="text-red-400 text-xs mt-1">{formik.errors.nationality}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Department <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        name="departmentName"
                                        value={formik.values.departmentName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
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
                                        name="designation"
                                        value={formik.values.designation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                        name="joiningDate"
                                        value={formik.values.joiningDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Employment Type
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formik.values.employmentType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    <input
                                        type="text"
                                        name="officeLocation"
                                        value={formik.values.officeLocation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full bg-[#16151C] text-white px-4 py-3 border border-[#2A2930] rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder:text-gray-500"
                                        placeholder="Office location"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 border border-[#2A2930] rounded-lg text-gray-300 hover:bg-[#1E1D24] hover:border-[#3A3940] transition-all font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;