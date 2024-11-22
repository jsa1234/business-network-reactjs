import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VendorMasterUUID: "C34E50DF-6B95-4228-85F0-14D7B7AC778B",
  VendorType: 1,
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
