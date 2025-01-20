import { createSlice } from "@reduxjs/toolkit";
import { dataDetailPurchase } from "store/PurchaseRequest/purchaseSlice";

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState: {
    idPo: null,
    dataPurchaseOrder: [],
    dataPurchaseQueue: [],
    dataListPoNumber: [],
    dataDetailPurchaseOrder: [],
  },
  reducers: {
    setIdPo: (state, action) => {
      state.idPo = action.payload;
    },
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
  idPo,
  dataPurchaseOrder,
  dataPurchaseQueue,
  dataListPoNumber,
  dataDetailPurchaseOrder,
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
  setDataDetailPurchaseOrder,
  setIdPo,
} = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
