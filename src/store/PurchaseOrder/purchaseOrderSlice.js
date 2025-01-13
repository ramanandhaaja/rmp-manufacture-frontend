import { createSlice } from "@reduxjs/toolkit";
import { dataDetailPurchase } from "store/PurchaseRequest/purchaseSlice";

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState: {
    dataPurchaseOrder: [],
    dataPurchaseQueue: [],
    dataListPoNumber: [],
    dataDetailPurchaseOrder: [],
  },
  reducers: {
    setDataPurchaseOrder: (state, action) => {
      state.dataPurchaseOrder = action.payload;
    },
    setDataPurchaseQueue: (state, action) => {
      state.dataPurchaseQueue = action.payload;
    },
    setDataListPoNumber: (state, action) => {
      state.dataListPoNumber = action.payload;
    },
    setDataDetailPurchaseOrder: (state, action) => {
      state.dataDetailPurchaseOrder = action.payload;
    },
  },
});

export const {
  dataPurchaseOrder,
  dataPurchaseQueue,
  dataListPoNumber,
  dataDetailPurchaseOrder,
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
  setDataDetailPurchaseOrder,
} = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
