import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myNetwork:{}
};

const manageNetworkSlice = createSlice({
  name: "managenetwork",
  initialState,
  reducers: {
    setmyNetwork: (state, action) => {
      state.myNetwork = action.payload;
    },
    resetmyNetwork: (state) => {
      state.myNetwork = {};
    },
  },
});

export const { setmyNetwork, resetmyNetwork } =
manageNetworkSlice.actions;

export default manageNetworkSlice.reducer;
