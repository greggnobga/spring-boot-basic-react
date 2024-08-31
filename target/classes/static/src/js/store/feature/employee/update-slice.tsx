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
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department_id: string;
    status: number;
};

/** Employee input type. */
type InputEmployee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department_id: string;
};

/** Set inital state. */
const initialState: Employee = {
    loading: false,
    status: 200,
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department_id: '',
};

/** Login request. */
export const employeeUpdateRequest = createAsyncThunk<any, InputEmployee, { rejectValue: Error<any> }>(
    'employee/update',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { id, firstName, lastName, email, department_id } = inputData;

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
                method: 'PUT',
                url: `/api/employees/${id}`,
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
export const employeeUpdate = createSlice({
    name: 'employeeUpdate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(employeeUpdateRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(employeeUpdateRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.department_id = action.payload.departmentId;
            state.status = action.payload.status;
        });

        builder.addCase(employeeUpdateRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.department_id = action.payload.departmentId;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default employeeUpdate.reducer;
