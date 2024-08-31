/** Vendor. */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Reducers. */
import employeeListReducer from '$store/feature/employee/list-slice';
import employeeCreateReducer from '$store/feature/employee/create-slice';
import employeeDeleteReducer from '$store/feature/employee/delete-slice';
import employeeUpdateReducer from '$store/feature/employee/update-slice';

import departmentListReducer from '$store/feature/department/list-slice';
import departmentCreateReducer from '$store/feature/department/create-slice';
import departmentUpdateReducer from '$store/feature/department/update-slice';
import departmentDeleteReducer from '$store/feature/department/delete-slice';

/** Configure store. */
export const store = configureStore({
    reducer: {
        employeeList: employeeListReducer,
        employeeCreate: employeeCreateReducer,
        employeeDelete: employeeDeleteReducer,
        employeeUpdate: employeeUpdateReducer,
        departmentList: departmentListReducer,
        departmentCreate: departmentCreateReducer,
        departmentUpdate: departmentUpdateReducer,
        departmentDelete: departmentDeleteReducer,
    },
});

/** Typescript stuff. */
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
