import { createSlice } from "@reduxjs/toolkit";

export const goodsTypeSlice = createSlice({
  name: "goodsType",
  initialState: {
    goodsType: "material",
  },
  reducers: {
    setGoodsType: (state, action) => {
      state.goodsType = action.payload;
    },
  },
});

export const { goodsType, setGoodsType } = goodsTypeSlice.actions;
export default goodsTypeSlice.reducer;
