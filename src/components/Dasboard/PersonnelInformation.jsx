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
                <div className="relative">
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    />
                </div>
                <div>
                    <select
                        name="maritalStatus"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <select
                        name="gender"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <select
                        name="nationality"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">Nationality</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
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

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <select
                        name="city"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">City</option>
                        <option value="ny">New York</option>
                        <option value="la">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                    </select>
                </div>
                <div>
                    <select
                        name="state"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">State</option>
                        <option value="ny">New York</option>
                        <option value="ca">California</option>
                        <option value="il">Illinois</option>
                    </select>
                </div>
                <div>
                    <select
                        name="zipCode"
                        className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                    >
                        <option value="">ZIP Code</option>
                        <option value="10001">10001</option>
                        <option value="90001">90001</option>
                        <option value="60601">60601</option>
                    </select>
                </div>
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
                onClick={()=>{onNext()}}

                    className="px-6 py-2 bg-[#7152F3] text-white rounded-lg"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
export default PersonalInformation;
