import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from './Employee'

export const store = configureStore({
    reducer: {
        employee: EmployeeReducer
    }
})

