import { useEffect, useState } from 'react';
import { Search, Plus, Filter, Eye, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { makeRequest, showToast } from '../../Utils/util';
import Delete from '../Modals/Delete';


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isDelete, setDeleteModal] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // const handleClick = (employeeId) => {
  //   setSelectedEmployeeId(employeeId);
  //   navigate("/layout/profile", { state: { EmployeeId : selectedEmployeeId } });

  // };

  useEffect(() => {
    displayEmployees();
  }, []);

  const displayEmployees = async () => {
    try {
      const response = await makeRequest("displayAllEmployees", "EmployeesService", {});

      if (response?.returnCode !== 0) {
        showToast(response?.returnMessage, 'error')
        console.error(response?.returnMessage)
        return;
      }

      setEmployees(response?.returnObject || []);


    } catch (error) {
      console.error(error.message)
      showToast(error.message, 'error');

    }
  }
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // const filteredEmployees = employees.filter(emp =>
  //   emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   emp.employeeId.includes(searchTerm) ||
  //   emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen border border-[#A2A1A833] rounded-lg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#A2A1A833] placeholder-white rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3 ml-4">
            <button
              onClick={() => { navigate('/layout/register') }}
              className="flex items-center gap-2 px-4 py-2 bg-[#7152F3] text-white rounded-lg hover:bg-purple-700 transition">
              <Plus className="w-5 h-5" />
              Add New Employee
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white border border-gray-300 rounded-lg">
              <Filter className="w-5 h-5 " />
              Filter
            </button>
          </div>
        </div>

        <div className=" rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[#A2A1A81A]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A2A1A81A]">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm  text-white/50">
                        {employee.firstName} {employee.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                    {employee.departmentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                    }>
                      {employee.employmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedEmployeeId(employee.id);
                          navigate("/layout/profile", { state: { EmployeeId: employee.id } });
                        }}
                        className="text-gray-400 hover:text-gray-600 transition">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                      onClick={()=>{
                        setSelectedEmployeeId(employee.id);
                        navigate('/layout/edit', {state: {EmployeeId: employee.id}});
                      }}
                      className="text-gray-400 hover:text-gray-600 transition">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setSelectedEmployeeId(employee.id)
                        }}
                        className="text-gray-400 hover:text-red-600 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Delete
        isOpen={isDelete}
        onClose={() => setDeleteModal(false)}
        employeeId={selectedEmployeeId}
        onDeleteSuccess={displayEmployees}
      />
    </div>
  );
}
export default Employees;