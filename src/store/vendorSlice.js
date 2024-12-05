import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VendorDetails:{}
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorData: (state, action) => {
      state.VendorDetails = action.payload;
    },
    resetVendorData: (state) => {
      state.VendorDetails = {};
    },
  },
});

export const { setVendorData, resetVendorData } =
  vendorSlice.actions;

export default vendorSlice.reducer;
