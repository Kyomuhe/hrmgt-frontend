import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import overView from '../../assets/overView.png';
import logo from '../../assets/logo.png'
import { makeRequest, showToast } from '../../Utils/util';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const userEmail = location.state?.email;

    const navigate = useNavigate();


    const reset = async () => {
        try {
            const email = userEmail
            if (newPassword !== confirmPassword) {
                showToast('passwords dont match', 'error');
                return;
            }

            const password = confirmPassword

            const resetData = { email, password }
            const response = await makeRequest("resetPassword", "Auth", resetData)

            if (response?.returnCode !== 0) {
                const errorMessage = response?.returnMessage || "reseting password failed"
                console.error(errorMessage)
                showToast(errorMessage, 'error')
                return;
            }

            showToast("reset sucessfully", "success")
            navigate('/')
        } catch (error) {
            const errorMessage = error.message || response?.data?.error || "oops an issue occured"
            console.error(errorMessage)
            showToast(errorMessage);
        }

    }

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
                        Reset Password
                    </h2>
                    <p className='text-gray-400 text-sm mb-8'>
                        Set the new password for your account so you can<br />
                        login and access all features.
                    </p>

                    <div className='space-y-5'>
                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block'>New Password</label>
                            <div className='relative'>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors pr-12'
                                    placeholder='Enter new password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                >
                                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Confirm Password</label>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors pr-12'
                                    placeholder='Re-enter password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => { reset() }}
                            className='w-full bg-[#7152F3] hover:bg-purple-700 text-white font-semibold py-3 rounded-lg mt-2'>
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;