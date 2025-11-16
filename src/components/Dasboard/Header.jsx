import { Bell, ChevronDown } from 'lucide-react';
import ProfileModal from '../Modals/ProfileModal';
import { useState } from 'react';
import userAvatar from '../../assets/default.png'
import { useMemo } from 'react';
import { useGreetings } from '../../Hooks/useGreetings';


const Header = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const greetings = useGreetings();
    const user = useMemo(
        ()=>{
            return JSON.parse(localStorage.getItem('user'))
        },[]
    )

    return (
        <div className="h-16 flex items-center justify-between px-6">
            <div>
                <h2 className="text-white font-semibold text-base flex items-center gap-2">
                    Hello {user.firstName} 👋
                </h2>
                <p className="text-gray-400 text-xs">{greetings}</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}

                    className="flex items-center gap-3 hover:bg-gray-700/50 rounded-lg px-3 py-2 transition-colors">
                    <img
                        src={userAvatar}
                        alt="Robert Allen"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                        <p className="text-white text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-gray-400 text-xs">HR Manager</p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </button>
            </div>
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />

        </div>
    );
};

export default Header;