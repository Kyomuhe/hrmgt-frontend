import { useNavigate } from "react-router-dom";

function PersonalInformation({ onNext, onCancel }) {
    const navigate = useNavigate

    return (
        <form>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] focus:outline-none focus:border-purple-600"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="emailAddress"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="Date of birth"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                    }}
                    className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                />
                <div>
                    <select
                        name="maritalStatus"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option className="bg-[#7152F3]" value="">Marital Status</option>
                        <option className="bg-[#7152F3]" value="single">Single</option>
                        <option className="bg-[#7152F3]" value="married">Married</option>
                        <option className="bg-[#7152F3]" value="divorced">Divorced</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <select
                        name="gender"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option className="bg-[#7152F3]" value="">Gender</option>
                        <option className="bg-[#7152F3]" value="male">Male</option>
                        <option className="bg-[#7152F3]" value="female">Female</option>
                        <option className="bg-[#7152F3]" value="other">Other</option>
                    </select>
                </div>
                <div>
                    <select
                        name="nationality"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option className="bg-[#7152F3]" value="">Nationality</option>
                        <option className="bg-[#7152F3]" value="us">United States</option>
                        <option className="bg-[#7152F3]" value="uk">United Kingdom</option>
                        <option className="bg-[#7152F3]" value="ca">Canada</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                />
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
                    onClick={() => { onNext() }}

                    className="px-6 py-2 bg-[#7152F3] text-white rounded-lg"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
export default PersonalInformation;
