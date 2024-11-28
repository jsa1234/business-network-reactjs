import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    PurchaseData:{}
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchase: (state, action) => {
      state.PurchaseData = action.payload;
    },
    resetPurchase: (state) => {
      state.PurchaseData = {};
    },
  },
});

export const { setPurchase, resetPurchase } =
purchaseSlice.actions;

export default purchaseSlice.reducer;
