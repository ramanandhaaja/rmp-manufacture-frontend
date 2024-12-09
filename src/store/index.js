import { configureStore } from "@reduxjs/toolkit";
import tipeBarangReducer from "./vendorManagement/tipeBarangSlice";
import vendorListReducer from "./vendorManagement/vendorSlice";

const store = configureStore({
  reducer: {
    tipeBarang: tipeBarangReducer,
    vendorList: vendorListReducer,
  },
});

export default store;
