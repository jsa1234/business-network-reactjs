import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Quotation:{}
};

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    setQuotation: (state, action) => {
      state.Quotation = action.payload;
    },
    resetQuotation: (state) => {
      state.Quotation = {};
    },
  },
});

export const { setQuotation, resetQuotation } =
quotationSlice.actions;

export default quotationSlice.reducer;
