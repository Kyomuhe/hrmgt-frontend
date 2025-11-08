import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName :"",
    lastName :"",
    phoneNumber :"",
    email : '',
    dateOfBirth: '',
    maritalStatus: '',
    gender:"",
    nationality: '',
    address:'',
    employmentType:'',
    department:'',
    designation:'',
    joiningDate:'',
    officeLocation:'',

}

const EmployeeSlice = createSlice({
    name:"employee",
    initialState:initialState,
    reducers:{
        setFirstName: (state, action) =>{
            state.firstName = action.payload;
        },
        setLastName: (state, action) =>{
            state.lastName = action.payload;
        },
        setPhoneNumber: (state, action) =>{
            state.phoneNumber = action.payload;
        },
        setEmail: (state, action) =>{
            state.email = action.payload;
        },
        setDateOfBirth: (state, action) =>{
            state.dateOfBirth = action.payload;
        },
        setMaritalStatus: (state, action) =>{
            state.maritalStatus = action.payload;
        },
        setGender: (state, action) =>{
            state.gender = action.payload;
        },
        setNationality: (state, action) =>{
            state.nationality = action.payload;
        },
        setAddress: (state, action) =>{
            state.address = action.payload;
        },
        setEmploymentType: (state, action) =>{
            state.employmentType = action.payload;
        },
        setDepartment: (state, action) =>{
            state.department = action.payload;
        },
        setDesignation: (state, action) =>{
            state.designation = action.payload;
        },
        setJoiningDate: (state, action) =>{
            state.joiningDate = action.payload;
        },
        setOfficeLocation: (state, action) =>{
            state.officeLocation = action.payload;
        },
        resetEmployee: (state) => {
            return initialState;
        }

    }

})
export const { setFirstName, setLastName, setAddress, setDateOfBirth, setDepartment,
    setDesignation, setEmail, setEmploymentType, setGender,setMaritalStatus,
     setNationality, setPhoneNumber, setOfficeLocation, setJoiningDate, resetEmployee
 } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;