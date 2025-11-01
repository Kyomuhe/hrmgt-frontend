import { ArrowLeft } from 'lucide-react';
import overView from '../../assets/overView.png';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate =useNavigate();

    return (
        <div className="h-screen bg-[#16151C] flex flex-row items-center justify-center p-8 gap-8">
            <div className="bg-[#F8F6FE] rounded-3xl p-8 shadow-2xl max-w-2xl">
                <img
                    className='w-140 h-140'
                    src={overView}
                    alt="Dashboard Overview"
                />
            </div>

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
                        Forgot Password
                    </h2>
                    <p className='text-gray-400 text-sm mb-8'>
                        Enter your registered email address. we'll send you a code<br />
                        to reset your password.
                    </p>

                    <div className='mb-8'>
                        <label className='text-[#7152F3] text-sm mb-2 block'>Email Address</label>
                        <input
                            type='email'
                            className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors'
                            placeholder='Enter your email'
                        />
                    </div>

                    <button 
                    onClick={()=>{navigate('/otp')}}
                    className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg'>
                        Send OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;