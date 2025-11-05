function ProfessionalInformation({ onCancel }) {
  return (
    <form>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <select
            name="employeeType"
            className="w-full px-4 py-3 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-600 appearance-none"
          >
            <option value="">Select Employee Type</option>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        <div>
          <select
            name="department"
            className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
          >
            <option value="">Select Department</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            name="designation"
            placeholder="Desigination"
            className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
          />
        </div>


        <div className="relative">
          <input
            type="type"
            name="joiningDate"
            placeholder="Select Joining Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
          />
        </div>
      </div>

      <div className="mb-6">
        <select
          name="officeLocation"
          className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
        >
          <option value="">Select Office Location</option>
          <option value="hq">Headquarters - New York</option>
          <option value="branch1">Branch Office - San Francisco</option>
          <option value="branch2">Branch Office - London</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-300 hover:text-white transition"
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-[#7152F3] text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default ProfessionalInformation;