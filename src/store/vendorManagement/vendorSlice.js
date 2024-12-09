import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";

// Initial state
const initialState = {
  data: [],
  vendorDetails: [],
  status: "idle",
  postStatus: "idle",
  deleteStatus: "idle",
  postError: null,
  deleteError: null,
  error: null,
};

export const fetchVendorList = createAsyncThunk(
  "vendorList/fetchVendorList",
  async ({ page = 1, perPage = 10 }) => {
    const response = await ApiService.fetchData({
      url: `vendors?page=${page}&per_page=${perPage}`,
      method: "get",
    });
    return response.data;
  }
);

export const fetchVendorById = createAsyncThunk(
  "vendorList/fetchVendorById",
  async (id) => {
    const response = await ApiService.fetchData({
      url: `vendors/${id}`,
      method: "get",
    });
    return response.data;
  }
);

export const createVendor = createAsyncThunk(
  "vendorList/createVendor",
  async (vendorData) => {
    const response = await ApiService.fetchData({
      url: `vendors`,
      method: "post",
      data: vendorData,
    });
    return response.data;
  }
);

export const deleteVendor = createAsyncThunk(
  "vendorList/deleteVendor",
  async (vendorId) => {
    const response = await ApiService.fetchData({
      url: `vendors/${vendorId}`,
      method: "delete",
    });
    return response.status;
  }
);
// Create the slice
const vendorListSlice = createSlice({
  name: "vendorList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVendorList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch vendor list";
      })
      .addCase(fetchVendorById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorDetails = action.payload; // Store vendor details
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch vendor details";
      })
      .addCase(createVendor.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload); // Add the newly created vendor
        } else {
          console.error("state.data is not an array:", state.data);
        }
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.postStatus = "failed";
        state.postError = action.postError.message || "Failed to create vendor";
      })
      .addCase(deleteVendor.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(
            (vendor) => vendor.id !== action.payload
          );
        } else {
          console.error("state.data is not an array:", state.data);
        }
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message || "Failed to delete vendor";
      });
  },
});

export default vendorListSlice.reducer;
