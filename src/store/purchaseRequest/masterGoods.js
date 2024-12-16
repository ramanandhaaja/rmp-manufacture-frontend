import { createSlice } from "@reduxjs/toolkit";

export const masterGoodsSlice = createSlice({
  name: "masterGoods",
  initialState: {
    dataMasterGoods: [],
    detailGoods: [],
  },
  reducers: {
    setData: (state, action) => {
      state.dataMasterGoods = action.payload;
    },
    setDataDetailGoods: (state, action) => {
      state.detailGoods = action.payload;
    },
  },
});

export const { data, setData, setDataDetailGoods } = masterGoodsSlice.actions;
export default masterGoodsSlice.reducer;
