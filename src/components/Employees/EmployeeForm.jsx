import React, { useState } from 'react';
import { User, Briefcase } from 'lucide-react';
import PersonalInformation from './PersonnelInformation';
import ProfessionalInformation from './ProffessionalInformation';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'professional', label: 'Professional Information', icon: Briefcase }
];

function EmployeeForm() {
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  const handleNext = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } 
  };

  const handleCancel = () => {
    // setActiveTab('personal');
    navigate('/layout/employees')
  };

  return (
    <div className="border border-[#A2A1A833] rounded-lg p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex border-b border-gray-700 mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;

            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 cursor-pointer relative 
                  text-sm font-medium transition-colors duration-300 
                  ${isActive ? 'text-[#7152F3]' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7152F3] rounded-full"></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <PersonalInformation 
              onNext={handleNext}
              onCancel={handleCancel}
            />
          )}
          {activeTab === 'professional' && (
            <ProfessionalInformation 
              onNext={handleNext}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
