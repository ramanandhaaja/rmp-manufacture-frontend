import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";

// Initial state
const initialState = {
  data: [],
  barangPerId: [],
  status: "idle",
  statusFetchBarangId: "idle",
  statusEdit: "idle",
  deleteStatus: "idle",
  postStatus: "idle",
  deleteError: null,
  postError: null,
  errorEdit: null,
  errorFetchBarangId: null,
  error: null,
};

// Async thunk for fetching Tipe Barang
export const fetchTipeBarang = createAsyncThunk(
  "kategoriBarang/fetchTipeBarang",
  async ({ page = 1, perPage = 10 }) => {
    const response = await ApiService.fetchData({
      url: `goods-category?page=${page}&per_page=${perPage}`,
      method: "get",
    });
    return response.data;
  }
);
export const fetchTipeBarangId = createAsyncThunk(
  "kategoriBarang/fetchTipeBarangId",
  async (id) => {
    const response = await ApiService.fetchData({
      url: `goods-category/${id}`,
      method: "get",
    });
    return response.data;
  }
);

export const editTipeBarang = createAsyncThunk(
  "kategoriBarang/editTipeBarang",
  async ({ barangId, data }) => {
    const response = await ApiService.fetchData({
      url: `goods-category/${barangId}`,
      method: "put",
      data: data,
    });
    return response.data;
  }
);

export const postTipeBarang = createAsyncThunk(
  "kategoriBarang/postTipeBarang",
  async (data) => {
    const response = await ApiService.fetchData({
      url: `goods-category`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response.data;
  }
);

export const deleteTipeBarang = createAsyncThunk(
  "kategoriBarang/deleteTipeBarang",
  async (id) => {
    const response = await ApiService.fetchData({
      url: `goods-category/${id}`,
      method: "delete",
    });
    return response.data;
  }
);

// Create the slice
const kategoriBarangSlice = createSlice({
  name: "kategoriBarang",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch tipe barang reducer
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

      //fetch tipe barang per id reducer

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
      })

      //post tipe barang reducer
      .addCase(postTipeBarang.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(postTipeBarang.fulfilled, (state, action) => {
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(postTipeBarang.rejected, (state, action) => {
        state.postStatus = "failed";
        state.postError =
          action.postError.message || "Failed to create tipe barang";
      })

      //edit tipe barang reducer

      .addCase(editTipeBarang.pending, (state) => {
        state.statusEdit = "loading";
      })
      .addCase(editTipeBarang.fulfilled, (state, action) => {
        state.statusEdit = "succeeded";
        if (Array.isArray(state.data)) {
          const index = state.data.findIndex(
            (barang) => barang.id === action.payload.id
          );
          if (index !== -1) {
            state.data[index] = action.payload; // Update the barang in the state
          }
        }
      })
      .addCase(editTipeBarang.rejected, (state, action) => {
        state.statusEdit = "failed";
        state.errorEdit = action.errorEdit.message || "Failed to edit barang";
      })

      //delete tipe barang reducer
      .addCase(deleteTipeBarang.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTipeBarang.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(
            (vendor) => vendor.id !== action.payload
          );
        } else {
          console.error("state.data is not an array:", state.data);
        }
      })
      .addCase(deleteTipeBarang.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message || "Failed to delete vendor";
      });
  },
});

export default kategoriBarangSlice.reducer;
