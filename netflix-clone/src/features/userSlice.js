import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counter/counterAPI";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    //reducers are dispatch actions within the slice
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.value += action.payload;
            });
    },
});


export const { login, logout } = (state) = userSlice.actions;
// selector returns the data from the slice
export const selectUser = state => state.user.value;

export default userSlice.reducer;
