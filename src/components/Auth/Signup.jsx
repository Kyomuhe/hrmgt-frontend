import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import overView from '../../assets/overView.png';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';


const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-screen bg-[#16151C] flex flex-row items-center justify-center p-8 gap-8">
            <DashboardOverview/>

            <div className='flex flex-col items-center justify-center max-w-md w-full'>
                <div className='text-center mb-8'>
                    <h2 className='text-white text-3xl font-semibold mb-2'>
                        Create Account 🚀
                    </h2>
                </div>

                <div className='w-full space-y-5'>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <label className='text-[#7152F3] text-sm mb-2 block'>First Name</label>
                            <input
                                type='text'
                                className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors'
                                placeholder='John'
                            />
                        </div>

                        <div className='flex-1'>
                            <label className='text-[#7152F3] text-sm mb-2 block'>Last Name</label>
                            <input
                                type='text'
                                className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors'
                                placeholder='Doe'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='text-[#7152F3] text-sm mb-2 block'>Email Address</label>
                        <input
                            type='email'
                            className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors'
                            placeholder='john.doe@example.com'
                        />
                    </div>

                    <div>
                        <label className='text-[#7152F3] text-sm mb-2 block'>Username</label>
                        <input
                            type='text'
                            className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors'
                            placeholder='johndoe123'
                        />
                    </div>

                    <div>
                        <label className='text-[#7152F3] text-sm mb-2 block'>Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors pr-12'
                                placeholder='Enter your password'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button className='w-full bg-[#7152F3] text-white font-semibold py-3 rounded-lg cursor-pointer mt-2'>
                        Sign Up
                    </button>

                    <div className='flex items-center gap-2 my-6'>
                        <div className='flex-1 h-px bg-gray-600'></div>
                        <span className='text-gray-400 text-sm'>or</span>
                        <div className='flex-1 h-px bg-gray-600'></div>
                    </div>

                    <div className='text-center'>
                        <a 
                        onClick={()=>{navigate('/')}}
                        className='text-gray-300 text-sm'>
                            Already have an account? {' '}
                            <span className='text-[#7152F3] font-semibold'>
                                Login
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;