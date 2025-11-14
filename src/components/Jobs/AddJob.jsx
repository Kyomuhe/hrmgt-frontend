import { useState } from 'react';
import { makeRequest, showToast } from '../../Utils/util';

const AddJob = ({ isOpen, onClose, onAddJobSuccess }) => {
    const [department, setDepartment] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [amount, setAmount] = useState('');
    const [responsibilities, setResponsibilities] = useState('');

    const data = {
        role: jobTitle,
        department: department,
        workLocation: location,
        salary: amount,
        responsibilities: responsibilities}

    const addJob = async () => {
        console.log(data);
        const response = await makeRequest("createJob", "jobService", data);
        console.log(response);

        if (response?.returnCode !== 0) {
            console.error(response?.returnMessage)
            return;
        }
        showToast('Job added successfully', 'success');
        onAddJobSuccess();
        onClose();

    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#16151C] rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col gap-5'>
                    <h3 className='text-white font-medium'>Add New Job</h3>

                    <div>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className='w-full bg-[#1E1D24] text-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700'
                        >
                            <option value="">Select Department</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Job Title"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className='w-full bg-[#1E1D24] text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700'
                        />
                    </div>

                    <div>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className='w-full bg-[#1E1D24] text-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700'
                        >
                            <option value="">Select Location</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='w-full bg-[#1E1D24] text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter responsibilities (e.g., task1, task2)"
                            value={responsibilities}
                            onChange={(e) => setResponsibilities(e.target.value)}
                            className='w-full bg-[#1E1D24] text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700'
                        />
                    </div>



                    <div className='flex gap-3 mt-2'>
                        <button
                            onClick={onClose}
                            className='flex-1 py-3 rounded-lg bg-[#1E1D24] text-gray-300 hover:bg-[#252430] transition-colors border border-gray-700'
                        >
                            Cancel
                        </button>
                        <button
                        onClick={()=>{addJob()}}
                            className='flex-1 py-3 rounded-lg bg-[#7152F3] text-white '
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
            `}</style>
        </div>
    )
}
export default AddJob;

