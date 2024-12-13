import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  message: "",
};

const statusErrorSlice = createSlice({
  name: "errorStatus",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
  },
});

export const { setError, clearError } = statusErrorSlice.actions;

export default statusErrorSlice.reducer;
