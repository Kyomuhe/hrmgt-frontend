import { Search, ChevronRight } from 'lucide-react';
import { makeRequest, showToast } from '../../Utils/util';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddDepartment from '../Modals/AddDepartment';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isAddDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const navigate = useNavigate();
  useEffect(
    () => {
      displayDepartments();
    }, []
  )

  const displayDepartments = async () => {
    try {
      const response = await makeRequest("displayDepartmentsWithEmployees", "departmentService", {});
      console.log(response);

      if (response?.returnCode !== 0) {
        console.error(response?.returnMessage);
        showToast(response?.returnMessage, 'error');
        return;
      }
      const departmentDetails = response?.returnObject || [];
      setDepartments(departmentDetails);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="min-h-screen border border-[#A2A1A833] rounded-lg p-6">
      <div className="max-w-7xl mx-auto">
        <div className='flex'>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className=" border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-700"
            />

          </div>
          <div className='ml-auto'>
            <button
              onClick={() => { setIsDepartmentOpen(true) }}
              className='bg-[#7152F3] rounded-lg text-white p-3'>Create Department</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {departments.map((dept, idx) => (
            <div key={idx} className=" border border-gray-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-semibold text-lg">{dept.department.name}</h2>
                  <p className="text-gray-500 text-sm">{dept.department.employeeCount} Members</p>
                </div>
                <button 
                onClick={()=>{
                  setSelectedDepartmentId(dept.department.id)
                  navigate('/layout/deptEmployees',{state :{departmentId :dept.department.id}} )
                }}
                className="text-blue-500 text-sm font-medium hover:text-blue-400">
                  View All
                </button>
              </div>
              <div className='h-px bg-[#A2A1A833]'></div>

              <div className="">
                {dept.employees.map((member, memberIdx) => (
                  <div
                    key={memberIdx}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#242424] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="text-white text-sm">{member.firstName} {member.lastName}</h3>
                        <p className="text-gray-500 text-xs">{member.designation}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-600 w-5 h-5 group-hover:text-gray-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddDepartment
        isOpen={isAddDepartmentOpen}
        onClose={() => { setIsDepartmentOpen(false) }}
        onAddSuccess={displayDepartments}
      />
    </div>
  );
};

export default Departments;