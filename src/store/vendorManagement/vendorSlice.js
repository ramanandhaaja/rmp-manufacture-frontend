import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    dataVendor: [],
    dataDetailVendor: [],
  },
  reducers: {
    setData: (state, action) => {
      state.dataVendor = action.payload;
    },
    setDataDetailVendor: (state, action) => {
      state.dataDetailVendor = action.payload;
    },
  },
});

export const { dataVendor, dataDetailVendor, setData, setDataDetailVendor } =
  vendorSlice.actions;
export default vendorSlice.reducer;
