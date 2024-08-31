/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Department type. */
type Department = {
    loading: boolean;
    message: string;
    status: number;
};

/** Department input type. */
type InputDepartment = {
    id: number;
};

/** Set inital state. */
const initialState: Department = {
    loading: false,
    status: 200,
    message: '',
};

/** Login request. */
export const departmentDeleteRequest = createAsyncThunk<any, InputDepartment, { rejectValue: Error<any> }>(
    'department/delete',
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
                url: `/api/departments/${id}`,
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
export const departmentDelete = createSlice({
    name: 'departmentDelete',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Add request case. */
        builder.addCase(departmentDeleteRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(departmentDeleteRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(departmentDeleteRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default departmentDelete.reducer;
