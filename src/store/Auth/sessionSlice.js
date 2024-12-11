import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    token: "",
    refreshToken: "",
    signedIn: false,
    user: {},
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    onSignOutSuccess: (state) => {
      state.signedIn = false;
      state.token = "";
      state.refreshToken = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMe: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { onSignInSuccess, onSignOutSuccess, setToken, setUserMe } =
  sessionSlice.actions;

export default sessionSlice.reducer;
