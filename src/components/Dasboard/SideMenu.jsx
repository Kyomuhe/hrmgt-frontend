import { LayoutDashboard, Users, Building2, Calendar, DollarSign, Briefcase, UserCheck, Umbrella, Gift, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/layout/dashboard' },
        { icon: Users, label: 'All Employees', path: '/layout/employees' },
        { icon: Building2, label: 'All Departments', path: '/layout/departments' },
        // { icon: Calendar, label: 'Attendance'},
        { icon: DollarSign, label: 'Payroll' },
        { icon: Briefcase, label: 'Jobs', path: '/layout/jobs' },
        { icon: UserCheck, label: 'Candidates'},
        { icon: Umbrella, label: 'Leaves' },
        { icon: Gift, label: 'Holidays'},
        // { icon: Settings, label: 'Settings'},
    ];

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
    );
};

export default Sidebar;