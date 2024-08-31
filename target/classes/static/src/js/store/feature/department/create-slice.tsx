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
    departmentName: string;
    departmentDescription: string;
    status: number;
};

/** Department input type. */
type InputDepartment = {
    departmentName: string;
    departmentDescription: string;
};

/** Set inital state. */
const initialState: Department = {
    loading: false,
    status: 200,
    departmentName: '',
    departmentDescription: '',
};

/** Login request. */
export const departmentCreateRequest = createAsyncThunk<any, InputDepartment, { rejectValue: Error<any> }>(
    'department/create',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { departmentName, departmentDescription } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('departmentName', departmentName as string);
            form_data.append('departmentDescription', departmentDescription as string);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: `/api/departments`,
                data: form_data,
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
export const departmentCreate = createSlice({
    name: 'departmentCreate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(departmentCreateRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(departmentCreateRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.departmentName = action.payload.departmentName;
            state.departmentDescription = action.payload.departmentDescription;
            state.status = action.payload.status;
        });

        builder.addCase(departmentCreateRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.departmentName = action.payload.departmentName;
            state.departmentDescription = action.payload.departmentDescription;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default departmentCreate.reducer;
