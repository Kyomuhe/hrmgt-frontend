import { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight, MoreVertical, CalendarDays } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
    { day: 'Mon', present: 85, leave: 10, absent: 5 },
    { day: 'Tue', present: 90, leave: 8, absent: 2 },
    { day: 'Wed', present: 88, leave: 10, absent: 2 },
    { day: 'Thu', present: 82, leave: 15, absent: 3 },
    { day: 'Fri', present: 87, leave: 10, absent: 3 },
    { day: 'Sat', present: 80, leave: 12, absent: 8 },
    { day: 'Sun', present: 75, leave: 18, absent: 7 },
];

const StatsCard = ({ title, value, change, isPositive, icon }) => {
    return (
        <div className="rounded-xl p-5 border border-[#A2A1A833]">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                {icon}
                <span>{title}</span>
            </div>
            <div className="flex items-end justify-between">
                <p className="text-white text-3xl font-bold">{value}</p>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                    isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
                }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{change}</span>
                </div>
            </div>
            <p className="text-gray-500 text-xs mt-2">Update: July 16, 2025</p>
        </div>
    );
};

const Calendar = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dates = [
        [null, null, null, null, null, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
    ];

    return (
        <div className=" rounded-xl p-5 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">My Schedule</h3>
                <button className="text-purple-500 hover:text-purple-400">
                    <CalendarDays size={18} />
                </button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <button className="text-gray-400 hover:text-white p-2 bg-purple-600/20 rounded">
                    <ChevronLeft size={16} />
                </button>
                <span className="text-white text-sm font-medium">July, 2025</span>
                <button className="text-gray-400 hover:text-white p-2 bg-purple-600/20 rounded">
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="mb-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-gray-500 text-xs text-center font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {dates.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-2 mb-1">
                        {week.map((date, dateIndex) => (
                            <div
                                key={dateIndex}
                                className={`text-center py-2 text-xs rounded-lg ${
                                    date === null
                                        ? ''
                                        : date === 6
                                        ? 'bg-purple-600 text-white font-semibold'
                                        : 'text-gray-400 hover:bg-gray-700/50 cursor-pointer'
                                }`}
                            >
                                {date}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="space-y-3 mt-6">
                <div className="border-l-2 border-gray-600 pl-3">
                    <p className="text-gray-400 text-xs mb-2">Wednesday, 06 July 2025</p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <span className="text-white text-xs font-medium mt-0.5">09:30</span>
                            <div>
                                <p className="text-gray-400 text-xs">UI/UX Designer</p>
                                <p className="text-white text-sm font-medium">Practical Task Review</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-white text-xs font-medium mt-0.5">12:00</span>
                            <div>
                                <p className="text-gray-400 text-xs">Magento Developer</p>
                                <p className="text-white text-sm font-medium">Resume Review</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-white text-xs font-medium mt-0.5">01:30</span>
                            <div>
                                <p className="text-gray-400 text-xs">Sales Manager</p>
                                <p className="text-white text-sm font-medium">Final HR Round</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-l-2 border-gray-600 pl-3">
                    <p className="text-gray-400 text-xs mb-2">Thursday, 07 July 2025</p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <span className="text-white text-xs font-medium mt-0.5">09:30</span>
                            <div>
                                <p className="text-gray-400 text-xs">Front end Developer</p>
                                <p className="text-white text-sm font-medium">Practical Task Review</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-white text-xs font-medium mt-0.5">11:00</span>
                            <div>
                                <p className="text-gray-400 text-xs">Room 3D</p>
                                <p className="text-white text-sm font-medium">TL Meeting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CompleteDashboard = () => {
    return (
        <div className="min-h-screen bg-[#16151C] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatsCard 
                            title="Total Employee" 
                            value="560" 
                            change="12%" 
                            isPositive={true}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        />
                        <StatsCard 
                            title="Total Applicant" 
                            value="1050" 
                            change="10%" 
                            isPositive={true}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatsCard 
                            title="Today Attendance" 
                            value="470" 
                            change="1%" 
                            isPositive={false}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        />
                        <StatsCard 
                            title="Total Projects" 
                            value="250" 
                            change="2%" 
                            isPositive={true}
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                    </div>

                    <div className=" rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white text-base font-semibold">Attendance Overview</h2>
                            <select className="bg-[#16151C] text-gray-400 text-xs px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500">
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={chartData} barSize={16}>
                                <XAxis 
                                    dataKey="day" 
                                    stroke="#6B7280" 
                                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis 
                                    stroke="#6B7280" 
                                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                    axisLine={false}
                                    tickLine={false}
                                    ticks={[0, 20, 40, 60, 80, 100]}
                                    domain={[0, 100]}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Bar dataKey="present" stackId="a" fill="#8B5CF6" radius={[0, 0, 8, 8]} />
                                <Bar dataKey="leave" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="absent" stackId="a" fill="#EF4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default CompleteDashboard;