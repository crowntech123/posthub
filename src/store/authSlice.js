import { createSlice } from "@reduxjs/toolkit";
//this store is created to check wheather the user is authenticated or not

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth ",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload.userData);
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
