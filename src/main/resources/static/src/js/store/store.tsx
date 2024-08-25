/** Vendor. */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Reducers. */
import employeeAddReducer from '$store/feature/employee/add-slice';
import employeeListReducer from '$store/feature/employee/list-slice';
import employeeDeleteReducer from '$store/feature/employee/delete-slice';
import employeeUpdateReducer from '$store/feature/employee/update-slice';

/** Configure store. */
export const store = configureStore({
    reducer: {
        employeeAdd: employeeAddReducer,
        employeeList: employeeListReducer,
        employeeDelete: employeeDeleteReducer,
        employeeUpdate: employeeUpdateReducer,
    },
});

/** Typescript stuff. */
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
