import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { makeRequest, showToast } from '../../Utils/util';
import DashboardOverview from './DashboardOverview';

const EnterOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const userEmail = location.state?.email;

    useEffect(
        () => {
            if (!userEmail) {
                navigate('/forgot')
            }
        }, [userEmail, navigate]
    )

    const verifyOtp = async () => {
        try {
            //const inputOtp = otp
            const inputOtp = otp.join(''); 

            const email = userEmail
            const userData = { email, inputOtp }
            const response = await makeRequest("verifyOtp", "Auth", userData)

            if (response?.returnCode !== 0) {
                const errorMessage = response?.returnMessage || "otp verification failed"
                console.error(errorMessage)
                showToast(errorMessage, 'error')
                return;
                
            }
            showToast('otp verified', 'success');
            navigate('/reset',{state: {email:userEmail}});
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "error verifying otp";
            console.error(errorMessage)
            showToast(errorMessage, 'error')

        }
    }

    const handleChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

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

                <button className='flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 self-start'>
                    <ArrowLeft size={18} />
                    <span className='text-sm'>Back</span>
                </button>

                <div className='w-full'>
                    <h2 className='text-white text-3xl font-semibold mb-3'>
                        Enter OTP
                    </h2>
                    <p className='text-gray-400 text-sm mb-8'>
                        We have shared a code to your registered email address<br />
                        robert.boller@example.com
                    </p>

                    <div className='flex gap-3 mb-8 justify-center'>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-14 h-14 bg-transparent border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:border-purple-500 transition-colors'
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => { verifyOtp() }}
                        className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg'>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterOTP;