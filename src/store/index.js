import { configureStore } from "@reduxjs/toolkit";
import tipeBarangReducer from "./vendorManagement/tipeBarangSlice";
import vendorListReducer from "./vendorManagement/vendorSlice";
import authReducer from "./Auth/index";
import statusErrorReducer from "./statusErrorSlice";

const store = configureStore({
  reducer: {
    tipeBarang: tipeBarangReducer,
    vendorList: vendorListReducer,
    auth: authReducer,
    errorStatus: statusErrorReducer,
  },
});

export default store;
