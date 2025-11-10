import { Search, ChevronRight } from 'lucide-react';

const Departments = () => {
  const departments = [
    {
      name: 'Design Department',
      count: 20,
      members: [
        { name: 'Dianne Russell', role: 'Senior UI/UX Designer'},
        { name: 'Arlene McCoy', role: 'UI/UX Designer' },
        { name: 'Cody Fisher', role: 'UI/UX Designer' },
        { name: 'Theresa Webb', role: 'UI/UX Designer'},
      ]
    },
    {
      name: 'Sales Department',
      count: 18,
      members: [
        { name: 'Darrell Steward', role: 'Sales Manager' },
        { name: 'Kristin Watson', role: 'Sales' },
        { name: 'Courtney Henry', role: 'Sales' },
        { name: 'Kathryn Murphy', role: 'Sales'},
      ]
    },
    {
      name: 'Project Manager Department',
      count: 12,
      members: [
        { name: 'Leslie Alexander', role: 'Sr. Project Manager' },
        { name: 'Ronald Richards', role: 'Project Manager'},
        { name: 'Savannah Nguyen', role: 'Project Manager'},
        { name: 'Eleanor Pena', role: 'Project Manager'},
      ]
    },
    {
      name: 'Marketing Department',
      count: 7,
      members: [
        { name: 'Wade Warren', role: 'Sr. Marketing Manager' },
        { name: 'Brooklyn Simmons', role: 'Marketing Manager' },
        { name: 'Kristin Watson', role: 'Marketing Manager'},
        { name: 'Jacob Jones', role: 'Marketing Manager' },
      ]
    }
  ];

  return (
    <div className="min-h-screen border border-[#A2A1A833] rounded-lg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className=" border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {departments.map((dept, idx) => (
            <div key={idx} className=" border border-gray-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-semibold text-lg">{dept.name}</h2>
                  <p className="text-gray-500 text-sm">{dept.count} Members</p>
                </div>
                <button className="text-blue-500 text-sm font-medium hover:text-blue-400">
                  View All
                </button>
              </div>
              <div className='h-px bg-[#A2A1A833]'></div>

              <div className="">
                {dept.members.map((member, memberIdx) => (
                  <div
                    key={memberIdx}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#242424] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="text-white font-medium text-sm">{member.name}</h3>
                        <p className="text-gray-500 text-xs">{member.role}</p>
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
    </div>
  );
};

export default Departments;