import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  canApprove: false,
  canVerify: false,
  canCreate: false,
  canEdit: false,
};

export const permissionSlice = createSlice({
  name: "auth/permission",
  initialState,
  reducers: {
    setPermission: (state, action) => {
      return { ...state, ...action.payload };
    },
    userLoggedOut: () => initialState,
  },
});

export const { setPermission, userLoggedOut } = permissionSlice.actions;

export default permissionSlice.reducer;
