import { createSlice } from "@reduxjs/toolkit";

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState: {
    dataPurchaseOrder: [],
    dataPurchaseQueue: [],
    dataListPoNumber: [],
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
  },
});

export const {
  dataPurchaseOrder,
  dataPurchaseQueue,
  dataListPoNumber,
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
} = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
