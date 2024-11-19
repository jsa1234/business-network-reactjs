import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VendorMasterUUID: "21C7586F-9F29-457B-8E3D-4C75213183DF", // Default value
  VendorType:1,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorMasterUUID: (state, action) => {
      state.VendorMasterUUID = action.payload;
    },
    resetVendorMasterUUID: (state) => {
      state.VendorMasterUUID = "";
    },
  },
});

export const { setVendorMasterUUID, resetVendorMasterUUID } =
  vendorSlice.actions;

export default vendorSlice.reducer;
