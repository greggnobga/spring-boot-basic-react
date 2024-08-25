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
    message: string;
    status: number;
};

/** Input employee. */
type InputEmployee = {
    id: number;
};

/** Set inital state. */
const initialState: Employee = {
    loading: false,
    status: 200,
    message: '',
};

/** Login request. */
export const employeeDeleteRequest = createAsyncThunk<any, InputEmployee, { rejectValue: Error<any> }>(
    'employee/delete',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { id } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
                url: `/api/employees/${id}`,
                params: {},
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
export const employeeDelete = createSlice({
    name: 'employeeDelete',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(employeeDeleteRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(employeeDeleteRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(employeeDeleteRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default employeeDelete.reducer;
