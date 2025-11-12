import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '../../Utils/util';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setLastName, setPhoneNumber, setEmail, setAddress, setDateOfBirth
    ,setMaritalStatus, setGender, setNationality
 } from '../../store/Employee';


const PersonalInformation = ({ onNext, onCancel }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.employee);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .min(4, "atleast 4 characters")
            .required("First name is required"),
        lastName: Yup.string()
            .trim()
            .min(4, "atleast 4 characters")
            .required("last name is required"),
        phoneNumber: Yup.string()
            .trim()
            .min(10, "phone number must be 10 digits"),
        email: Yup.string()
            .trim()
            .email("invalid email"),
        address: Yup.string()
            .trim()
            .min(3, "address must atleast be 3 characters")

    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            dateOfBirth: '',
            maritalStatus: '',
            gender: '',
            nationality: ''

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                    dispatch(setFirstName(values.firstName));
                    dispatch(setLastName(values.lastName));
                    dispatch(setPhoneNumber(values.phoneNumber));
                    dispatch(setEmail(values.email));
                    dispatch(setAddress(values.address));
                    dispatch(setDateOfBirth(values.dateOfBirth));
                    dispatch(setMaritalStatus(values.maritalStatus));
                    dispatch(setGender(values.gender));
                    dispatch(setNationality(values.nationality));

                    showToast("personal information saved", "success");
                    onNext();

            } catch (error) {
                console.error(error.message)
                showToast(error.message, "error")
            }
        }
    });


    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={!data.firstName? formik.values.firstName : data.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='First Name'
                        className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.firstName && formik.errors.firstName
                            ? 'border-red-500 ring-red-400'
                            : 'border-gray-400'
                            }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <p className='mt-1 text-sm text-red-500'>{formik.errors.firstName}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Last Name"
                        className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.lastName && formik.errors.lastName
                            ? 'border-red-500 ring-red-400'
                            : 'border-gray-400'
                            }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <p className='mt-1 text-sm text-red-500'>{formik.errors.lastName}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Mobile Number"
                        className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] focus:outline-none focus:border-purple-600 ${formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? 'border-red-500 ring-red-400'
                            : 'border-gray-400'
                            }`}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <p className='mt-1 text-sm text-red-500'>{formik.errors.phoneNumber}</p>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email Address"
                        className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.email && formik.errors.email
                            ? 'border-red-500 ring-red-400'
                            : 'border-gray-400'
                            }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className='mt-1 text-sm text-red-500'>{formik.errors.email}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="Date of birth"
                    id="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                    }}
                    className="w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833]"
                />
                <div>
                    <select
                        name="maritalStatus"
                        id="maritalStatus"
                        value={formik.values.maritalStatus}
                        onChange={formik.handleChange}
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
                        id="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
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
                        id="nationality"
                        onChange={formik.handleChange}
                        value={formik.values.nationality}
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
                    id="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    name="address"
                    placeholder="Address"
                    className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.address && formik.errors.address
                        ? 'border-red-500 ring-red-400'
                        : 'border-gray-400'
                        }`}
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
                    type="submit"
                    className="px-6 py-2 bg-[#7152F3] text-white rounded-lg"
                >
                    Next
                </button>
            </div>
        </form>
    );
}
export default PersonalInformation;
