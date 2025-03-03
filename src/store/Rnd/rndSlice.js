import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rndRequestId: null,
  dataRndRequest: [],
  dataDetailProduct: null,
  dataDetailRndRequest: [],
};

export const rndSlice = createSlice({
  name: "rnd",
  initialState,
  reducers: {
    setIdRndRequest: (state, action) => {
      state.rndRequestId = action.payload;
    },
    setDataRndRequest: (state, action) => {
      state.dataRndRequest = action.payload;
    },
    setDataDetailRndRequest: (state, action) => {
      state.dataDetailRndRequest = action.payload;
    },
    setDataDetailProduct: (state, action) => {
      state.dataDetailProduct = action.payload;
    },
    resetDataDetailProduct: (state) => {
      state.dataDetailProduct = null;
    },
    clearDataRndRequest: () => initialState,
  },
});

export const {
  rndRequestId,
  dataRndRequest,
  dataDetailRndRequest,
  dataDetailProduct,
  setIdRndRequest,
  setDataRndRequest,
  setDataDetailRndRequest,
  setDataDetailProduct,
  resetDataDetailProduct,
  clearDataRndRequest,
} = rndSlice.actions;
export default rndSlice.reducer;
