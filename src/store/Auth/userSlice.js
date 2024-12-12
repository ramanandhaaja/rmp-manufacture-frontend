import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  email: "",
  id: "",
  name: "",
  roles: [],
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
