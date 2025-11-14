import { useState, useEffect } from 'react';
import { Search, Plus, Briefcase, MapPin } from 'lucide-react';
import AddJob from './AddJob';
import { makeRequest, showToast } from '../../Utils/util';

const AllJobs = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  
  useEffect(() => {
    displayJobs();
  }, []);

  const displayJobs = async () => {
    const response = await makeRequest("displayJobs", "jobService", {});
    console.log(response);

    if (response?.returnCode !== 0) {
      showToast(response?.returnMessage, 'error')
      console.error(response?.returnMessage)
      return;
    }

    const jobs = response?.returnObject || [];
    console.log("jobs: ", jobs);
    setJobsData(jobs);
  }

  const getFilteredJobs = () => {
    return jobsData.filter(job => {
      const status = job.status?.toLowerCase();
      if (activeTab === 'active') return status === 'active';
      if (activeTab === 'inactive') return status === 'inactive';
      if (activeTab === 'completed') return status === 'completed';
      return false;
    });
  }

  const parseResponsibilities = (responsibilities) => {
    if (!responsibilities) return [];
    return responsibilities.split(',').map(tag => tag.trim());
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#25252A] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <button
          onClick={() => { setIsAddJobOpen(true) }}
          className="ml-4 flex items-center gap-2 bg-[#7152F3] text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Add New Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-1 py-2 border-b-2 transition-colors ${activeTab === 'active'
              ? 'border-green-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
          Active Jobs
        </button>
        <button
          onClick={() => setActiveTab('inactive')}
          className={`flex items-center gap-2 px-1 py-2 border-b-2 transition-colors ${activeTab === 'inactive'
              ? 'border-red-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'inactive' ? 'bg-red-500' : 'bg-gray-500'}`} />
          Inactive Jobs
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-1 py-2 border-b-2 transition-colors ${activeTab === 'completed'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'completed' ? 'bg-blue-500' : 'bg-gray-500'}`} />
          Completed Jobs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredJobs().map((job) => (
          <div
            key={job.id}
            className="bg-[#25252A] border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors"
          >            
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1A1A1D] rounded border border-gray-700 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-base mb-1">{job.role}</h3>
                <p className="text-gray-400 text-sm">{job.department}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {parseResponsibilities(job.responsibilities).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#7152F3] text-white text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>{job.workLocation}</span>
            </div>
            <div className="text-white font-medium">
              UGX {Number(job.salary).toLocaleString()}
              <span className="text-gray-400 font-normal">/Month</span>
            </div>
          </div>
        ))}
      </div>
      <AddJob
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        onAddJobSuccess={displayJobs}
      />
    </div>
  );
};

export default AllJobs;