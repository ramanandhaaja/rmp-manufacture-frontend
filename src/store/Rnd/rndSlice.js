import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rndRequestId: null,
  dataRndRequest: [],
  dataDetailProduct: null,
  dataDetailRndRequest: [],
  dataRndDocReference: [],
  isEdit: false,
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
    setDataRndDocReference: (state, action) => {
      state.dataRndDocReference = action.payload;
    },
    setIsEdit: (state) => {
      state.isEdit = true;
    },
    clearDataRndRequest: () => initialState,
  },
});

export const {
  setIdRndRequest,
  setDataRndRequest,
  setDataDetailRndRequest,
  setDataDetailProduct,
  resetDataDetailProduct,
  clearDataRndRequest,
  setDataRndDocReference,
  setIsEdit,
} = rndSlice.actions;
export default rndSlice.reducer;
