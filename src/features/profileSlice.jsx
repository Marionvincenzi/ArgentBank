import { apiUrl } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../redux/store"

export const fetchUserProfile = createAsyncThunk(
    "profile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = store.getState().auth.token;
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get(
                `${apiUrl}/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.log("Profile API error:" ,error);
            if(!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "profile/updateUserProfile",
    async (userName, { rejectWithValue }) => {
        try {
            const token = store.getState().auth.token;
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.put(
                `${apiUrl}/profile`,
                { userName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log("Update Profile API error:", error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data)
        }
    }
);

const initialState = {
    profile: null,
    loading: false,
    error: null,
};

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        resetProfile: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload.body;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Profile fetch error:", action.payload);
            
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
       
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false; 
            state.profile = action.payload.body;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;