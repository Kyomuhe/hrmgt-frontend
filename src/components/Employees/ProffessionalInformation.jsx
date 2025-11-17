import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeRequest, showToast } from '../../Utils/util';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDesignation, setOfficeLocation, setDepartment, setJoiningDate,
  setEmploymentType, resetEmployee
} from '../../store/Employee';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfessionalInformation = ({ onCancel }) => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    displayDepartments();
  }, []);

  const displayDepartments = async () => {
    try {
      const response = await makeRequest("diplayDepartment", "departmentService", {});

      if (response?.returnCode !== 0) {
        console.error(response?.returnMessage);
        showToast(response?.returnMessage, 'error');
        return;
      }
      const allDepartments = response?.returnObject || [];
      setDepartments(allDepartments);
      // console.log('response:', response);
      // console.log('departments:', departments);

    } catch (error) {
      console.error(error.message);
      showToast(error.message, 'error');
    }

  };

  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employee);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    designation: Yup.string()
      .trim()
      .min(3, 'atleast provide 3 characters')
      .matches(/^[A-Za-z]+$/, "Only letters are allowed")
      .required('designation required'),
    officeLocation: Yup.string()
      .trim()
      .min(4, "this has to have atleast 4 characters"),

    department: Yup.string()
      .required("Department is required"),
    employmentType: Yup.string()
      .required("Employment type is required"),
    joiningDate: Yup.string()
      .required("Joining date is required")

  })

  const formik = useFormik({
    initialValues: {
      designation: "",
      officeLocation: "",
      department: "",
      joiningDate: "",
      employmentType: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const combinedData = {
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          phoneNumber: employeeData.phoneNumber,
          email: employeeData.email,
          address: employeeData.address,
          birthDate: employeeData.dateOfBirth,
          maritalStatus: employeeData.maritalStatus,
          gender: employeeData.gender,
          nationality: employeeData.nationality,

          designation: values.designation,
          officeLocation: values.officeLocation,
          departmentName: values.department,
          joiningDate: values.joiningDate,
          employmentType: values.employmentType,
          departmentId: departments.find(dept => dept.name === values.department)?.id || null
        };
        console.log("this is the combined employee info")
        console.log(combinedData)

        const response = await makeRequest("addEmployee", "EmployeesService", combinedData);

        if (response?.returnCode !== 0) {
          console.error(response?.returnMessage);
          showToast(response?.returnMessage || 'Failed to add employee', "error");
          return;
        }

        showToast("employee added successfully", "success");

        dispatch(resetEmployee());
        formik.resetForm();

        navigate('/layout/employees');

      } catch (error) {
        console.error(error.message);
        showToast(error.message, 'error');
      } finally {
        setSubmitting(false)
      }

    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <select
            name="employmentType"
            id="employmentType"
            value={formik.values.employmentType}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-600 appearance-none ${formik.touched.employmentType && formik.errors.employmentType
              ? 'border-red-500'
              : 'border-gray-700'
              }`}
          >
            <option value="">Select Employee Type</option>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
          </select>
          {formik.touched.employmentType && formik.errors.employmentType && (
            <p className='mt-1 text-sm text-red-500'>{formik.errors.employmentType}</p>
          )}

        </div>
        <div>
          <select
            name="department"
            id='department'
            value={formik.values.department}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.department && formik.errors.department
              ? 'border-red-500'
              : 'border-gray-700'
              }`}
          >
            <option value="">Select Department</option>
            {/* <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
    */}
            {departments.map((dept, idx) => (
              <option className='bg-[#7152F3]' key={idx} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          {formik.touched.department && formik.errors.department && (
            <p className='mt-1 text-sm text-red-500'>{formik.errors.department}</p>
          )}

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            name="designation"
            id="designation"
            value={formik.values.designation}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Desigination"
            className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.designation && formik.errors.designation
              ? 'border-red-500 ring-red-500'
              : 'border-gray-400'
              }`}
          />
          {formik.touched.designation && formik.errors.designation && (
            <p className='mt-1 text-sm text-red-500'>{formik.errors.designation}</p>
          )}
        </div>


        <div className="relative">
          <input
            type="type"
            name="joiningDate"
            value={formik.values.joiningDate}
            onChange={formik.handleChange}
            placeholder="Select Joining Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.joiningDate && formik.errors.joiningDate
              ? 'border-red-500'
              : 'border-gray-700'
              }`}
          />
          {formik.touched.joiningDate && formik.errors.joiningDate && (
            <p className='mt-1 text-sm text-red-500'>{formik.errors.joiningDate}</p>
          )}

        </div>
      </div>

      <div className="mb-6">
        <select
          name="officeLocation"
          id="officeLocation"
          value={formik.values.officeLocation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className={`w-full px-4 py-3 text-gray-300 rounded-lg border border-[#A2A1A833] ${formik.touched.officeLocation && formik.errors.officeLocation
            ? 'border-red-500'
            : 'border-gray-700'
            }`}
        >
          <option value="">Select Office Location</option>
          <option value="hq">Headquarters - New York</option>
          <option value="branch1">Branch Office - San Francisco</option>
          <option value="branch2">Branch Office - London</option>
          <option value="remote">Remote</option>
        </select>
        {formik.touched.officeLocation && formik.errors.officeLocation && (
          <p className='mt-1 text-sm text-red-500'>{formik.errors.officeLocation}</p>
        )}

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
          type='submit'
          disabled={formik.isSubmitting}
          className="px-6 py-2 bg-[#7152F3] text-white rounded-lg"
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
export default ProfessionalInformation;