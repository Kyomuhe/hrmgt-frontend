import { ArrowLeft } from 'lucide-react';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { makeRequest, showToast } from '../../Utils/util';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DashboardOverview from './DashboardOverview';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape(
        {
            email: Yup.string()
                .trim()
                .email("invalid email address")
                .required("email is required")
        }
    );
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            console.log("we are making a request")
            try {
                const userEmail = {
                    email: values.email
                };
                const response = await makeRequest('forgotPassword', 'Auth', userEmail);

                if (response?.returnCode !== 0) {
                    const errorMessage = response?.returnMessage || 'email submission failed';
                    setFieldError('general', errorMessage);
                    showToast(errorMessage, 'error');
                    return;
                }
                showToast('otp sent, check your email', 'success');
                formik.resetForm();
                console.log('ForgotPassword: navigating to /otp with email', values.email);
                navigate('/otp', { replace: true, state: { email: values.email } });

            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message || "email submission failed";
                setFieldError('general', 'error');
                showToast(errorMessage, 'error');
                console.error(errorMessage)
            } finally {
                setSubmitting(false);
            }
        }

    })

    // const sendOtp = async () => {
    //     const response = await makeRequest('forgotPassword', 'Auth');

    // }

    return (
        <div className="h-screen bg-[#16151C] flex flex-row items-center justify-center p-8 gap-8">
            <DashboardOverview/>

            <div className='flex flex-col items-center justify-center max-w-md w-full'>
                <div className='flex flex-row items-center gap-3 mb-8'>
                    <img
                        src={logo}
                        className='w-10 h-10'
                        alt="HRMS Logo"
                    />
                    <h1 className='text-white font-bold text-2xl'>HRMS</h1>
                </div>

                <button
                onClick ={()=>{navigate(-1)}} 
                className='flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 self-start'>
                    <ArrowLeft size={18} />
                    <span className='text-sm'>Back</span>
                </button>

                <div className='w-full'>
                    <h2 className='text-white text-3xl font-semibold mb-3'>
                        Forgot Password
                    </h2>
                    <p className='text-gray-400 text-sm mb-8'>
                        Enter your registered email address. we'll send you a code<br />
                        to reset your password.
                    </p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-8'>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Email Address</label>
                            <input
                                type='email'
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="email"
                                className={`w-full p-2 border rounded bg-white text-black focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                    ? 'border-red-500 ring-red-400'
                                    : 'border-gray-400 focus:ring-green-400'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        <button
                            type='submit'
                            disabled={formik.isSubmitting}
                            className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg'>
                            {formik.isSubmitting ? 'Sending otp...' : 'Send Otp'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;