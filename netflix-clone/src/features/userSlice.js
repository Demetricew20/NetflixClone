import { createSlice } from "@reduxjs/toolkit";

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
        },
        // storeImage: (state) => {

        // }
    },
});


export const { login, logout } = userSlice.actions;
// selector returns the data from the slice
export const selectUser = state => state.user.user;

export default userSlice.reducer;
