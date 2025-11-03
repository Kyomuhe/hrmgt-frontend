import { useState } from 'react';
import overView from '../../assets/overView.png';
import logo from '../../assets/logo.png'
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { showToast, makeRequest } from '../../Utils/util';
import DashboardOverview from './DashboardOverview';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must be at least 3 characters'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const userData = {
                    username: values.username,
                    password: values.password
                }
                const response = await makeRequest("login", "Auth", userData);
                const data = response;

                if (data?.returnCode !== 0) {
                    const errorMessage = data?.returnMessage || 'Login failed. Please try again.';
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }

                const { token, user } = data?.returnObject || {};

                if (!token || !user) {
                    const errorMessage = 'server is misbahaved. please try again later.';
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }

                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                formik.resetForm();
                showToast('Login successful', 'success');
                navigate('/layout', { replace: true });
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="h-screen bg-[#16151C] flex flex-row items-center justify-center p-2 gap-8">
            <DashboardOverview/>
            {/* <div className="bg-[#F8F6FE] rounded-3xl p-8 shadow-2xl max-w-2xl">
                <img
                    className='w-140 h-140'
                    src={overView}
                    alt="Dashboard Overview"
                />
            </div> */}

            <div className='flex flex-col items-center justify-center max-w-md w-full'>
                <div className='flex flex-row items-center gap-3 mb-8'>
                    <img
                        src={logo}
                        className='w-10 h-10'
                        alt="HRMS Logo"
                    />
                    <h1 className='text-white font-bold text-2xl'>HRMS</h1>
                </div>

                <div className='text-center mb-8'>
                    <h2 className='text-white text-2xl font-semibold mb-2'>
                        Welcome 👋
                    </h2>
                    <p className='text-gray-400 text-sm'>Please login here</p>
                </div>

                <form onSubmit={formik.handleSubmit} className='w-full space-y-5'>
                    <div>
                        <label className='text-[#7152F3] text-sm mb-2 block'>User name</label>
                        <input
                            type='text'
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white ${formik.touched.username && formik.errors.username
                                ? 'border-red-500 ring-red-400'
                                : 'border-gray-400 focus:ring-green-400'
                                }`}
                            placeholder='Enter your user name'
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
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full border border-[#7152F3] rounded-lg px-4 py-3 text-white pr-12 ${formik.touched.password && formik.errors.password
                                    ? 'border-red-500 ring-red-400'
                                    : 'border-gray-400 focus:ring-green-400'
                                    }`}
                                placeholder="********"
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-4 h-4 accent-purple-600 cursor-pointer'
                            />
                            <span className='text-gray-300 text-sm'>Remember Me</span>
                        </label>
                        <a
                            onClick={() => { navigate('forgot') }}
                            className='text-[#7152F3] text-sm cursor-pointer'>
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg'>
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    <div className='flex items-center gap-1 my-6'>
                        <div className='flex-1 h-px bg-gray-600'></div>
                        <span className='text-gray-400 text-sm'>or</span>
                        <div className='flex-1 h-px bg-gray-600'></div>
                    </div>

                    <div className='text-center'>
                        <a
                            onClick={() => { navigate('/signup') }}
                            className='text-gray-300 text-sm cursor-pointer'>
                            Don't have an account?{' '}
                            <span className='text-[#7152F3] font-semibold'>
                                Create Account
                            </span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
