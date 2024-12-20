import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    signedIn: false,
    access_token: "",
    access_token_expires_at: "",
    refresh_token: "",
    refresh_token_expires_at: "",
    session_id: "",
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
      state.access_token_expires_at = action.payload.access_token_expires_at;
      state.refresh_token_expires_at = action.payload.refresh_token_expires_at;
      state.session_id = action.payload.session_id;
    },
    onSignOutSuccess: (state) => {
      state.signedIn = false;
      state.refresh_token = "";
      state.access_token = "";
      state.access_token_expires_at = "";
      state.refresh_token_expires_at ="";
      state.session_id = "";
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const { onSignInSuccess, onSignOutSuccess, setToken } =
  sessionSlice.actions;

export default sessionSlice.reducer;
