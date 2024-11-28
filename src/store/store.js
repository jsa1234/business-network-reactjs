import { configureStore } from '@reduxjs/toolkit';
import vendorReducer from './vendorSlice';
import quotationReducer from './quotationSlice';
import stockReducer from './stockSlice';
import purchaseReducer from './purchaseSlice';
import manageNetworkReducer from './manageNetworkSlice';
export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    quotation:quotationReducer,
    stock:stockReducer,
    purchase:purchaseReducer,
    managenetwork:manageNetworkReducer
  },
});
