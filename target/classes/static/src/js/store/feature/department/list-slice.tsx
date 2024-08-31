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
    id: number;
    departmentName: string;
    departmentDescription: string;
};

/** Department List type. */
type Departments = {
    loading: boolean;
    departments: Department[];
    status: number;
};

/** Set inital state. */
const initialState: Departments = {
    loading: false,
    status: 200,
    departments: [],
};

/** Login request. */
export const departmentListRequest = createAsyncThunk<any, void, { rejectValue: Error<any> }>(
    'department/list',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: '/api/departments',
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
export const departmentList = createSlice({
    name: 'departmentList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(departmentListRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(departmentListRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.departments = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(departmentListRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.departments = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default departmentList.reducer;
