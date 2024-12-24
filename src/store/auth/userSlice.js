import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  authority: [],
  user: {},
  userRole: "",
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    userLoggedOut: () => initialState,
  },
});

export const { setUser, setUserRole } = userSlice.actions;

export default userSlice.reducer;
