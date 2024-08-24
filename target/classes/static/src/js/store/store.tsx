/** Vendor. */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Reducers. */
import employeeAddReducer from '$store/feature/employee/add-slice';

/** Configure store. */
export const store = configureStore({
    reducer: {
        employeeAdd: employeeAddReducer,
    },
});

/** Typescript stuff. */
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
