import { createSlice } from "@reduxjs/toolkit";

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    dataPurchase: [],
    dataDetailPurchase: [],
    dataPurchaseHistory: [],
  },
  reducers: {
    setData: (state, action) => {
      state.dataPurchase = action.payload;
    },
    setDataDetailPurchase: (state, action) => {
      state.dataDetailPurchase = action.payload;
    },
    setDataPurchaseHistory: (state, action) => {
      state.dataPurchaseHistory = action.payload;
    },
  },
});

export const {
  dataPurchase,
  dataDetailPurchase,
  dataPurchaseHistory,
  setData,
  setDataDetailPurchase,
  setDataPurchaseHistory,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
