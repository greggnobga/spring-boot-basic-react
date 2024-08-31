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
    loading: boolean;
    firstName: string;
    lastName: string;
    email: string;
    department_id: string;
    status: number;
};

/** Employee input type. */
type InputEmployee = {
    firstName: string;
    lastName: string;
    email: string;
    department_id: string;
};

/** Set inital state. */
const initialState: Employee = {
    loading: false,
    status: 200,
    firstName: '',
    lastName: '',
    email: '',
    department_id: '',
};

/** Login request. */
export const employeeCreateRequest = createAsyncThunk<any, InputEmployee, { rejectValue: Error<any> }>(
    'employee/create',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { firstName, lastName, email, department_id } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('firstName', firstName as string);
            form_data.append('lastName', lastName as string);
            form_data.append('email', email as string);
            form_data.append('departmentId', department_id as string);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: `/api/employees`,
                data: form_data,
            });

            /** Return something. */
            return { status, ...(data as unknown as Record<any, unknown>) };
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
export const employeeCreate = createSlice({
    name: 'employeeCreate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(employeeCreateRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(employeeCreateRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.status = action.payload.status;
        });

        builder.addCase(employeeCreateRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default employeeCreate.reducer;
