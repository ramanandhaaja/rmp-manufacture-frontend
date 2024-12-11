import { configureStore } from "@reduxjs/toolkit";
import tipeBarangReducer from "./vendorManagement/tipeBarangSlice";
import vendorListReducer from "./vendorManagement/vendorSlice";
import authReducer from "./Auth/index";

const store = configureStore({
  reducer: {
    tipeBarang: tipeBarangReducer,
    vendorList: vendorListReducer,
    auth: authReducer,
  },
});

export default store;
