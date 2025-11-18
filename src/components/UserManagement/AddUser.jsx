import { useState } from 'react';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { makeRequest, showToast } from '../../Utils/util';

const AddUser = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        employeeId: Yup.string()
            .trim()
            .matches(/^[0-9]+$/, "Employee ID must contain only numbers")
            .required("Employee ID is required"),

        firstName: Yup.string()
            .trim()
            .required("First name is required")
            .matches(/^[A-Za-z]+$/, "Only letters are allowed")
            .min(3, "First name must be at least 3 characters"),

        lastName: Yup.string()
            .trim()
            .required("Last name is required")
            .matches(/^[A-Za-z]+$/, "Only letters are allowed")
            .min(3, "Last name must be at least 3 characters"),

        email: Yup.string()
            .trim()
            .required("Email is required")
            .email("Invalid email address"),

        username: Yup.string()
            .trim()
            .required("Username is required")
            .min(5, "Username must be at least 5 characters")
            .matches(/^[A-Za-z0-9]+$/, "Username must contain only letters and numbers"),

        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(4, "Password must be at least 4 characters"),

        department: Yup.string()
            .trim()
            .required("Department is required")
            .matches(/^[A-Za-z]+$/, "Only letters are allowed"),

        role: Yup.string()
            .trim()
            .required("Role is required")
            .matches(/^[A-Za-z]+$/, "Only letters are allowed")
            .min(4, "role must be at least 4 characters")

    });

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            department: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const userData = {
                    employeeId: values.employeeId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    department: values.department,
                    role: values.role
                };

                const response = await makeRequest('signup', 'Auth', userData);

                if (response?.returnCode !== 0) {
                    const errorMessage = response?.returnMessage || 'Failed to add user';
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }

                showToast('User added successfully', 'success');
                formik.resetForm();
                navigate('/layout/users');
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message || 'Failed to add user';
                setFieldError('general', errorMessage);
                showToast(errorMessage, 'error');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-1">
            <div className='flex flex-col items-center justify-center max-w-3xl w-full'>
                <div className='text-center mb-2'>
                    <div className='flex items-center justify-center mb-4'>
                        <div className='bg-[#7152F3] p-4 rounded-full'>
                            <UserPlus size={32} className='text-white' />
                        </div>
                    </div>
                    <h2 className='text-white text-2xl font-semibold mb-2'>
                        Add New User
                    </h2>
                    <p className='text-gray-400 text-sm'>
                        Create a new user account with employee details
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className='w-full rounded-2xl p-8 border border-[#A2A1A833]'>
                    <div className='w-full space-y-5'>
                        {formik.errors.general && (
                            <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                                <p className="text-sm text-red-500">{formik.errors.general}</p>
                            </div>
                        )}

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                Employee ID <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='employeeId'
                                id='employeeId'
                                value={formik.values.employeeId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.employeeId && formik.errors.employeeId
                                    ? 'border-red-500 focus:ring-red-400'
                                    : 'border-[#7152F3] focus:ring-[#7152F3]'
                                    }`}
                                placeholder="EMP-001"
                            />
                            {formik.touched.employeeId && formik.errors.employeeId && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.employeeId}</p>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    First Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    id='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.firstName && formik.errors.firstName
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder="John"
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    Last Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='lastName'
                                    id='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.lastName && formik.errors.lastName
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder="Doe"
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    Email Address <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.email && formik.errors.email
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder="john.doe@company.com"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    Username <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    id='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.username && formik.errors.username
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder='johndoe123'
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.username}</p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    Department <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='department'
                                    id='username'
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.username && formik.errors.username
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder='department name'
                                />
                                {formik.touched.department && formik.errors.department && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.department}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                    Role <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='role'
                                    id='username'
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.username && formik.errors.username
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder='role'
                                />
                                {formik.touched.role && formik.errors.role && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.role}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block font-medium'>
                                Temporary Password <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#16151C] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${formik.touched.password && formik.errors.password
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-[#7152F3] focus:ring-[#7152F3]'
                                        }`}
                                    placeholder='Create temporary password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                            )}
                            <p className='mt-1 text-xs text-gray-400'>
                                User will be prompted to change password on first login
                            </p>
                        </div>

                        <div className='flex gap-4 pt-4'>
                            <button
                                type='button'
                                onClick={() => navigate('/layout/users')}
                                className='flex-1 bg-[#16151C] border border-gray-600 text-gray-300 font-semibold py-3 rounded-lg hover:bg-[#1E1D24] hover:border-gray-500 transition-all flex items-center justify-center gap-2'
                            >
                                <ArrowLeft size={18} />
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={formik.isSubmitting}
                                className='flex-1 bg-[#7152F3] text-white font-semibold py-3 rounded-lg hover:bg-[#5d3ed9] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                        Adding User...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Add User
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;