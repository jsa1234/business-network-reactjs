import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    StockData:{}
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock: (state, action) => {
      state.StockData = action.payload;
    },
    resetStock: (state) => {
      state.StockData = {};
    },
  },
});

export const { setStock, resetStock } =
stockSlice.actions;

export default stockSlice.reducer;
