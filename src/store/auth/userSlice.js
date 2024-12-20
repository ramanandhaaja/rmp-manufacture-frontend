import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  authority: [],
  user: {},
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: () => initialState,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
