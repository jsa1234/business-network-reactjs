import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VendorDetails:{}
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
