import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { makeRequest, showToast } from '../../Utils/util';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .trim()
            .required("Username is required")
            .min(5, "Username must be at least 5 characters"),
        firstName: Yup.string()
            .trim()
            .required("First name is required")
            .min(3, "First name must be at least 3 characters"),
        lastName: Yup.string()
            .trim()
            .required("Last name is required")
            .min(3, "Last name must be at least 3 characters"),
        email: Yup.string()
            .trim()
            .required("Email is required")
            .email("Invalid email address"),
        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(4, "Password must be at least 4 characters")
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const userData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username,
                    email: values.email,
                    password: values.password
                };

                const response = await makeRequest('signup', 'Auth', userData);

                if (response?.returnCode !== 0) {
                    const errorMessage = response?.returnMessage || 'Signup failed';
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }

                const { token, user } = response?.returnObject || {};

                if (!token || !user) {
                    const errorMessage = "Signup failed, no user data received";
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }

                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                showToast('Account created successfully', 'success');
                formik.resetForm();
                navigate('/layout');
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
                setFieldError('general', errorMessage);
                showToast(errorMessage, 'error');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="h-screen bg-[#16151C] flex flex-row items-center justify-center p-8 gap-8">
            <DashboardOverview />

            <div className='flex flex-col items-center justify-center max-w-md w-full'>
                {/* <div className='text-center mb-8'>
                    <h2 className='text-white text-3xl font-semibold mb-2'>
                        Create Account 🚀
                    </h2>
                </div> */}

                <form onSubmit={formik.handleSubmit} className='w-full'>
                    <div className='w-full space-y-5'>
                        {formik.errors.general && (
                            <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                                <p className="text-sm text-red-500">{formik.errors.general}</p>
                            </div>
                        )}

                        <div className='flex gap-4'>
                            <div className='flex-1'>
                                <label className='text-[#7152F3] text-sm mb-2 block'>First Name</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    id='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.firstName && formik.errors.firstName
                                        ? 'border-red-500 ring-red-400'
                                        : 'border-gray-400 focus:ring-green-400'
                                        }`}
                                    placeholder="Enter first name"
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.firstName}</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className='text-[#7152F3] text-sm mb-2 block'>Last Name</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    id='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.lastName && formik.errors.lastName
                                        ? 'border-red-500 ring-red-400'
                                        : 'border-gray-400 focus:ring-green-400'
                                        }`}
                                    placeholder="Enter last name"
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Email Address</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.email && formik.errors.email
                                    ? 'border-red-500 ring-red-400'
                                    : 'border-gray-400 focus:ring-green-400'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Username</label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.username && formik.errors.username
                                    ? 'border-red-500 ring-red-400'
                                    : 'border-gray-400 focus:ring-green-400'
                                    }`}
                                placeholder='johndoe123'
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.password && formik.errors.password
                                        ? 'border-red-500 ring-red-400'
                                        : 'border-gray-400 focus:ring-green-400'
                                        }`}
                                    placeholder='Enter your password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors'
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                            )}
                        </div>

                        <button
                            type='submit'
                            disabled={formik.isSubmitting}
                            className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg cursor-pointer mt-2 hover:bg-[#5d3ed9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {formik.isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className='flex items-center gap-2 my-6'>
                            <div className='flex-1 h-px bg-gray-600'></div>
                            <span className='text-gray-400 text-sm'>or</span>
                            <div className='flex-1 h-px bg-gray-600'></div>
                        </div>

                        <div className='text-center'>
                            <button
                                type='button'
                                onClick={() => navigate('/')}
                                className='text-gray-300 text-sm hover:text-white transition-colors'
                            >
                                Already have an account?{' '}
                                <span className='text-[#7152F3] font-semibold'>
                                    Login
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;