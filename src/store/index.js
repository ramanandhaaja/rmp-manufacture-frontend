import { configureStore } from "@reduxjs/toolkit";
import vendorListReducer from "./vendorManagement/vendorSlice";
import authReducer from "./Auth/index";
import statusErrorReducer from "./statusErrorSlice";
import masterGoodsReducer from "./purchaseRequest/masterGoods";
import kategoriBarangReducer from "./vendorManagement/kategoriBarangSlice";

const store = configureStore({
  reducer: {
    kategoriBarang: kategoriBarangReducer,
    vendorList: vendorListReducer,
    auth: authReducer,
    errorStatus: statusErrorReducer,
    masterGoods: masterGoodsReducer,
  },
});

export default store;
