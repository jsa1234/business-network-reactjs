import { configureStore } from '@reduxjs/toolkit';
import vendorReducer from './vendorSlice';
import quotationReducer from './quotationSlice';
import stockReducer from './stockSlice';
export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    quotation:quotationReducer,
    stock:stockReducer
  },
});
