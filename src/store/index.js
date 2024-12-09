import { configureStore } from "@reduxjs/toolkit";
import tipeBarangReducer from "./vendorManagement/tipeBarangSlice";

const store = configureStore({
  reducer: {
    tipeBarang: tipeBarangReducer,
  },
});

export default store;
