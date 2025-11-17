import { makeRequest, showToast } from "../../Utils/util";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddDepartment = ({ isOpen, onAddSuccess, onClose }) => {

    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required('department name is required')
            .min(5, 'department name must be atleast 5 characters')
            .matches(/^[A-Za-z]+$/, "Only letters are allowed")

    })

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const departmentDate = {
                    name: values.name
                };
                const response = await makeRequest("addDepartment", "departmentService", departmentDate);

                if (response?.returnCode !== 0) {
                    console.error(response?.returnMessage);
                    showToast(response?.returnMessage, 'errror');
                    return;
                }
                showToast('department added successfully', 'success');
                onAddSuccess();
                onClose();

            } catch (error) {
                console.error(error.message);
                showToast(error.message, 'error');
            } finally {
                setSubmitting(false);
            }

        }

    })

    // const addDepartment = async ()=>{
    //     const response = await makeRequest("addDepartment", "departmentService",)

    // }
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div onClick={(e) => e.stopPropagation()} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8">
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                                <svg
                                    className="w-8 h-8 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Add New Department
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Create a department to organize your team
                            </p>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="department-name"
                                    className="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Department Name
                                </label>
                                <input
                                    id="department-name"
                                    type="text"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="e.g., Engineering, Marketing"
                                    className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.name && formik.errors.name
                                        ? 'border-red-500 ring-red-400'
                                        : 'border-gray-400'
                                        }`}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className='mt-1 text-sm text-red-500'>{formik.errors.name}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-full bg-blue-500 hover:from-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 "
                            >
                                {formik.isSubmitting ? 'Creating...' : 'Create Department'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-xs text-slate-500">
                            You can edit or delete departments later
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDepartment;