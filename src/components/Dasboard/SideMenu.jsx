import { LayoutDashboard, Users, Building2, Calendar, DollarSign, FileChartPie, Briefcase, FileUser, Umbrella, Gift, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

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

    return (
        <div className="w-64 h-screen bg-[#A2A1A80D] flex flex-col rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-10">
                <img src={logo} alt="HRMS Logo" className="w-8 h-8" />
                <h1 className="text-white font-bold text-xl">HRMS</h1>
            </div>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
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
    );
};

export default Sidebar;