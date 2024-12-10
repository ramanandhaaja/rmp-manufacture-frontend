import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";

// Initial state
const initialState = {
  data: [],
  barangPerId: [],
  status: "idle",
  statusFetchBarangId: "idle",
  errorFetchBarangId: null,
  error: null,
};

// Async thunk for fetching Tipe Barang
export const fetchTipeBarang = createAsyncThunk(
  "tipeBarang/fetchTipeBarang",
  async ({ page = 1, perPage = 10 }) => {
    const response = await ApiService.fetchData({
      url: `goods-category?page=${page}&per_page=${perPage}`,
      method: "get",
    });
    return response.data;
  }
);
export const fetchTipeBarangId = createAsyncThunk(
  "tipeBarang/fetchTipeBarangId",
  async (id) => {
    const response = await ApiService.fetchData({
      url: `goods-category/${id}`,
      method: "get",
    });
    return response.data;
  }
);

// Create the slice
const tipeBarangSlice = createSlice({
  name: "tipeBarang",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTipeBarang.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTipeBarang.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTipeBarang.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch Tipe Barang";
      })
      .addCase(fetchTipeBarangId.pending, (state) => {
        state.statusFetchBarangId = "loading";
      })
      .addCase(fetchTipeBarangId.fulfilled, (state, action) => {
        state.statusFetchBarangId = "succeeded";
        state.barangPerId = action.payload;
      })
      .addCase(fetchTipeBarangId.rejected, (state, action) => {
        state.statusFetchBarangId = "failed";
        state.errorFetchBarangId =
          action.errorFetchBarangId.message || "Failed to fetch Barang per Id";
      });
  },
});

export default tipeBarangSlice.reducer;
