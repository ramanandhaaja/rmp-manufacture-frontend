import { createSlice } from "@reduxjs/toolkit";

export const goodsCategorySlice = createSlice({
  name: "goodsCategory",
  initialState: {
    dataGoodsCategory: [],
    detailGoodsCategory: [],
  },
  reducers: {
    setData: (state, action) => {
      state.dataGoodsCategory = action.payload;
    },
    setDataDetailGoodsCategory: (state, action) => {
      state.detailGoodsCategory = action.payload;
    },
  },
});

export const {
  dataGoodsCategory,
  detailGoodsCategory,
  setData,
  setDataDetailGoodsCategory,
} = goodsCategorySlice.actions;
export default goodsCategorySlice.reducer;
