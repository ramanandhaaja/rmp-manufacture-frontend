import { createSlice } from "@reduxjs/toolkit";

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState: {
    idPo: null,
    paymentMethod: "",
    vendorOfferId: null,
    dataPurchaseOrder: [],
    dataPurchaseQueue: [],
    dataListPoNumber: [],
    dataDetailPurchaseOrder: [],
    selectedPoVendors: [],
    dataOfferPoVendors: [],
    dataPoNotesBod: [],
  },
  reducers: {
    setIdPo: (state, action) => {
      state.idPo = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setVendorOfferId: (state, action) => {
      state.vendorOfferId = action.payload;
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
    setDataOfferPoVendors: (state, action) => {
      state.dataOfferPoVendors = action.payload;
    },
    setDataDetailPurchaseOrder: (state, action) => {
      state.dataDetailPurchaseOrder = action.payload;
    },
    setDataPoNotesBod: (state, action) => {
      state.dataPoNotesBod = action.payload;
    },
    setSelectedPoVendors: (state, action) => {
      // Preserve is_submit_offer status when setting new vendors
      if (Array.isArray(action.payload)) {
        const existingVendors = state.selectedPoVendors || [];
        state.selectedPoVendors = action.payload.map((newVendor) => {
          const existingVendor = existingVendors.find(
            (v) => v.vendor_id === newVendor.vendor_id
          );
          return {
            ...newVendor,
            is_submit_offer: existingVendor
              ? existingVendor.is_submit_offer
              : false,
          };
        });
      } else {
        state.selectedPoVendors = action.payload;
      }
    },
    updateVendorSubmitStatus: (state, action) => {
      if (Array.isArray(state.selectedPoVendors)) {
        state.selectedPoVendors = state.selectedPoVendors.map((vendor) => {
          if (vendor.vendor_id === action.payload) {
            return { ...vendor, is_submit_offer: true };
          }
          return vendor;
        });
      }
    },
    clearVendorSelections: (state) => {
      state.selectedPoVendors = [];
    },
  },
});

export const {
  idPo,
  paymentMethod,
  vendorOfferId,
  dataPurchaseOrder,
  dataPurchaseQueue,
  dataListPoNumber,
  dataDetailPurchaseOrder,
  dataOfferPoVendors,
  dataPoNotesBod,
  setDataPoNotesBod,
  setDataOfferPoVendors,
  selectedPoVendors,
  setDataPurchaseOrder,
  setDataPurchaseQueue,
  setDataListPoNumber,
  setDataDetailPurchaseOrder,
  setSelectedPoVendors,
  setVendorOfferId,
  setIdPo,
  setPaymentMethod,
  clearVendorSelections,
  updateVendorSubmitStatus,
} = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
