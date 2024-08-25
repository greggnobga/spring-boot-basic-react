/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Employee type. */
type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

/** Employee List type. */
type Employees = {
    loading: boolean;
    employees: Employee[];
    status: number;
};

/** Set inital state. */
const initialState: Employees = {
    loading: false,
    status: 200,
    employees: [],
};

/** Login request. */
export const employeeListRequest = createAsyncThunk<any, void, { rejectValue: Error<any> }>(
    'employee/list',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: '/api/employees',
            });

            /** Return something. */
            return { status, data };
        } catch (error: any) {
            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                });
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                });
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                });
            }
        }
    },
);

/** Export slice. */
export const employeeList = createSlice({
    name: 'employeeList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(employeeListRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(employeeListRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.employees = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(employeeListRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.employees = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default employeeList.reducer;
