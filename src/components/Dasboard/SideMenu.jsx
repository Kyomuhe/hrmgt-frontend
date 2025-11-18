import { useState } from 'react';
import { LayoutDashboard, Users, Building2, Calendar, DollarSign, Briefcase, Umbrella, X, Menu, FileUser, FileChartPie } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const allMenuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/layout/dashboard', roles: ['HR'] },
        { icon: Users, label: 'All Employees', path: '/layout/employees', roles: ['HR'] },
        { icon: Building2, label: 'All Departments', path: '/layout/departments', roles: ['HR'] },
        { icon: Calendar, label: 'Add User', path: '/layout/addUser', roles: ['HR'] },
        { icon: DollarSign, label: 'All Users', path: '/layout/users', roles: ['HR'] },
        { icon: Briefcase, label: 'Jobs', path: '/layout/jobs', roles: ['HR'] },
        { icon: Umbrella, label: 'Leaves', path: '/layout/leaves', roles: ['HR'] },
        { icon: FileChartPie, label: 'Leave Status', path: '/layout/myLeaveStatus', roles: ['USER'] },
        { icon: FileUser, label: 'Leave Application', path: '/layout/applyLeave', roles: ['USER'] },
    ];

    const menuItems = allMenuItems.filter(item => {
        if (!user || !user.roleCode) return false;
        return item.roles.includes(user.roleCode);
    });

    const handleNavigate = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors lg:hidden"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed lg:static top-0 left-0 h-screen w-64 bg-gray-900 lg:bg-[#A2A1A80D] flex flex-col rounded-3xl lg:rounded-3xl p-6 z-50 lg:z-auto transform lg:transform-none transition-transform duration-300 ease-in-out lg:transition-none ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors lg:hidden"
                    aria-label="Close menu"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-10">
                    <img src={logo} alt="HRMS Logo" className="w-8 h-8" />
                    <h1 className="text-white font-bold text-xl">HRMS</h1>
                </div>

                <nav className="flex flex-col gap-2 overflow-y-auto">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={index}
                                onClick={() => handleNavigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-Primary/Primary-5% text-[#7152F3] border-l-3 border-[#7152F3]'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <Icon size={20} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;